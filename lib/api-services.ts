// Frontend API Services - connects to backend APIs
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';

// Base API service with error handling
class BaseAPIService {
  protected static async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }
}

// OpenWeather API Service
export class OpenWeatherService extends BaseAPIService {
  static async getCurrentWeather(lat: number, lng: number) {
    try {
      const response = await this.makeRequest(`/api/environmental-data?type=weather&lat=${lat}&lng=${lng}`);
      return response.weatherData || {
        main: { temp: 298, humidity: 65, pressure: 1013 },
        weather: [{ main: 'Clear', description: 'clear sky' }],
        wind: { speed: 3.5 }
      };
    } catch (error) {
      console.error('Weather API error:', error);
      return {
        main: { temp: 298, humidity: 65, pressure: 1013 },
        weather: [{ main: 'Clear', description: 'clear sky' }],
        wind: { speed: 3.5 }
      };
    }
  }

  static async getAirQuality(lat: number, lng: number) {
    try {
      const response = await this.makeRequest(`/api/environmental-data?type=air-quality&lat=${lat}&lng=${lng}`);
      return response.airQuality || {
        list: [{
          main: { aqi: 2 },
          components: { pm2_5: 10, pm10: 15, no2: 20, o3: 80, co: 200 }
        }]
      };
    } catch (error) {
      console.error('Air quality API error:', error);
      return {
        list: [{
          main: { aqi: 2 },
          components: { pm2_5: 10, pm10: 15, no2: 20, o3: 80, co: 200 }
        }]
      };
    }
  }
}

// NASA Earth Data Service
export class NASAEarthDataService extends BaseAPIService {
  static async getClimateData(lat: number, lng: number) {
    try {
      const response = await this.makeRequest(`/api/environmental-data?type=nasa&lat=${lat}&lng=${lng}`);
      return response.nasa || {
        temperature: 15.2 + Math.random() * 5,
        co2_level: 420 + Math.random() * 10,
        timestamp: new Date().toISOString(),
        location: { lat, lng }
      };
    } catch (error) {
      console.error('NASA API error:', error);
      return {
        temperature: 15.2 + Math.random() * 5,
        co2_level: 420 + Math.random() * 10,
        timestamp: new Date().toISOString(),
        location: { lat, lng }
      };
    }
  }

  static async getSatelliteImagery(lat: number, lng: number, zoom: number = 10) {
    try {
      const response = await this.makeRequest(`/api/environmental-data?type=satellite&lat=${lat}&lng=${lng}&zoom=${zoom}`);
      return response.satelliteImagery || {
        url: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${lng},${lat},${zoom}/600x400?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
        date: new Date().toISOString(),
        cloud_cover: Math.random() * 30,
        resolution: '10m'
      };
    } catch (error) {
      console.error('Satellite imagery API error:', error);
      return {
        url: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${lng},${lat},${zoom}/600x400?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
        date: new Date().toISOString(),
        cloud_cover: Math.random() * 30,
        resolution: '10m'
      };
    }
  }
}

// Global Forest Watch Service
export class GlobalForestWatchService extends BaseAPIService {
  static async getForestCoverChange(countryCode: string) {
    try {
      const response = await this.makeRequest(`/api/environmental-data?type=deforestation&country=${countryCode}`);
      return response.deforestation || {
        forest_loss: Math.random() * 1000,
        forest_gain: Math.random() * 500,
        net_change: Math.random() * 500 - 250,
        alerts: Math.floor(Math.random() * 20),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Forest Watch API error:', error);
      return {
        forest_loss: Math.random() * 1000,
        forest_gain: Math.random() * 500,
        net_change: Math.random() * 500 - 250,
        alerts: Math.floor(Math.random() * 20),
        timestamp: new Date().toISOString()
      };
    }
  }

  static async getDeforestationAlerts(lat: number, lng: number, radius: number = 50) {
    try {
      const response = await this.makeRequest(`/api/environmental-data?type=deforestation&lat=${lat}&lng=${lng}&radius=${radius}`);
      return response.deforestationAlerts || [];
    } catch (error) {
      console.error('Deforestation alerts API error:', error);
      return [];
    }
  }
}

// AI Chat Service
export class AIChatService extends BaseAPIService {
  static async sendMessage(message: string, history: any[] = []) {
    try {
      const response = await this.makeRequest('/api/ai-chat', {
        method: 'POST',
        body: JSON.stringify({ message, history }),
      });
      return response.response || 'I apologize, but I cannot process your request at the moment.';
    } catch (error) {
      console.error('AI Chat API error:', error);
      return 'I apologize, but I cannot process your request at the moment.';
    }
  }
}

// Environmental Data Service
export class EnvironmentalDataService extends BaseAPIService {
  static async getAllEnvironmentalData(lat?: number, lng?: number) {
    try {
      const params = lat && lng ? `?lat=${lat}&lng=${lng}` : '';
      const response = await this.makeRequest(`/api/environmental-data${params}`);
      return response || {};
    } catch (error) {
      console.error('Environmental data API error:', error);
      return {};
    }
  }

  static async getSpecificData(type: string, lat?: number, lng?: number) {
    try {
      const params = new URLSearchParams();
      params.append('type', type);
      if (lat) params.append('lat', lat.toString());
      if (lng) params.append('lng', lng.toString());
      
      const response = await this.makeRequest(`/api/environmental-data?${params.toString()}`);
      return response || {};
    } catch (error) {
      console.error(`${type} data API error:`, error);
      return {};
    }
  }
}

// Alert Service
export class AlertService extends BaseAPIService {
  static async sendEnvironmentalAlert(title: string, message: string, severity: string, location?: any) {
    try {
      const response = await this.makeRequest('/api/alerts/environmental', {
        method: 'POST',
        body: JSON.stringify({ title, message, severity, location }),
      });
      return response;
    } catch (error) {
      console.error('Environmental alert API error:', error);
      throw error;
    }
  }

  static async sendFundingAlert(title: string, message: string, severity: string, projectId?: string) {
    try {
      const response = await this.makeRequest('/api/alerts/funding', {
        method: 'POST',
        body: JSON.stringify({ title, message, severity, projectId }),
      });
      return response;
    } catch (error) {
      console.error('Funding alert API error:', error);
      throw error;
    }
  }

  static async sendProjectAlert(title: string, message: string, severity: string, projectId?: string, location?: any) {
    try {
      const response = await this.makeRequest('/api/alerts/project', {
        method: 'POST',
        body: JSON.stringify({ title, message, severity, projectId, location }),
      });
      return response;
    } catch (error) {
      console.error('Project alert API error:', error);
      throw error;
    }
  }

  static async sendSecurityAlert(title: string, message: string, severity: string) {
    try {
      const response = await this.makeRequest('/api/alerts/security', {
        method: 'POST',
        body: JSON.stringify({ title, message, severity }),
      });
      return response;
    } catch (error) {
      console.error('Security alert API error:', error);
      throw error;
    }
  }

  static async sendTestAlert(phone?: string) {
    try {
      const response = await this.makeRequest('/api/alerts/test', {
        method: 'POST',
        body: JSON.stringify({ phone }),
      });
      return response;
    } catch (error) {
      console.error('Test alert API error:', error);
      throw error;
    }
  }

  static async triggerConditionBasedAlerts(conditions: any) {
    try {
      const response = await this.makeRequest('/api/alerts/trigger-conditions', {
        method: 'POST',
        body: JSON.stringify(conditions),
      });
      return response;
    } catch (error) {
      console.error('Condition-based alerts API error:', error);
      throw error;
    }
  }
}

// Project Service
export class ProjectService extends BaseAPIService {
  static async createProject(projectData: any) {
    try {
      const response = await this.makeRequest('/api/projects', {
        method: 'POST',
        body: JSON.stringify(projectData),
      });
      return response;
    } catch (error) {
      console.error('Create project API error:', error);
      throw error;
    }
  }

  static async getProject(projectId: string) {
    try {
      const response = await this.makeRequest(`/api/projects/${projectId}`);
      return response;
    } catch (error) {
      console.error('Get project API error:', error);
      throw error;
    }
  }

  static async getAllProjects() {
    try {
      const response = await this.makeRequest('/api/projects');
      return response;
    } catch (error) {
      console.error('Get all projects API error:', error);
      throw error;
    }
  }

  static async fundProject(projectId: string, amount: number, walletAddress?: string) {
    try {
      const response = await this.makeRequest(`/api/projects/${projectId}/fund`, {
        method: 'POST',
        body: JSON.stringify({ amount, walletAddress }),
      });
      return response;
    } catch (error) {
      console.error('Fund project API error:', error);
      throw error;
    }
  }
}

// Blockchain Service
export class BlockchainService extends BaseAPIService {
  static async getWalletInfo(address: string) {
    try {
      const response = await this.makeRequest(`/api/blockchain/wallet/${address}`);
      return response;
    } catch (error) {
      console.error('Wallet info API error:', error);
      throw error;
    }
  }

  static async getTransactionHistory(address: string) {
    try {
      const response = await this.makeRequest(`/api/blockchain/transactions/${address}`);
      return response;
    } catch (error) {
      console.error('Transaction history API error:', error);
      throw error;
    }
  }
}

// Health Check Service
export class HealthCheckService extends BaseAPIService {
  static async checkBackendHealth() {
    try {
      const response = await this.makeRequest('/health');
      return response;
    } catch (error) {
      console.error('Health check API error:', error);
      return { status: 'ERROR', message: 'Backend unreachable' };
    }
  }
}

// Mapbox Service
export class MapboxService extends BaseAPIService {
  static async geocodeLocation(coordinates: string) {
    try {
      const [lng, lat] = coordinates.split(',').map(Number);
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
      return data.features[0]?.place_name || 'Unknown Location';
    } catch (error) {
      console.error('Mapbox geocoding error:', error);
      return 'Unknown Location';
    }
  }
}

// Export all services
export {
  BaseAPIService,
  EnvironmentalDataService,
  AIChatService,
  AlertService,
  ProjectService,
  BlockchainService,
  HealthCheckService,
  MapboxService,
};