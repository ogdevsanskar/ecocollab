import { AlertService, AlertData } from './alert-service';
import { WorkingAPIServices } from './working-api-services';
import dotenv from 'dotenv';

dotenv.config();

export interface MonitoringThresholds {
  temperature: {
    high: number;
    critical: number;
  };
  airQuality: {
    unhealthy: number;
    hazardous: number;
  };
  deforestation: {
    moderate: number;
    severe: number;
  };
  funding: {
    low: number;
    critical: number;
  };
}

export interface MonitoringLocation {
  name: string;
  lat: number;
  lng: number;
  enabled: boolean;
}

export class MonitoringService {
  private static isMonitoring = false;
  private static monitoringInterval: NodeJS.Timeout | null = null;
  
  // Default thresholds
  private static thresholds: MonitoringThresholds = {
    temperature: {
      high: 35, // Celsius
      critical: 40
    },
    airQuality: {
      unhealthy: 150, // AQI
      hazardous: 200
    },
    deforestation: {
      moderate: 10, // hectares per day
      severe: 50
    },
    funding: {
      low: 10000, // USD
      critical: 5000
    }
  };

  // Monitoring locations
  private static locations: MonitoringLocation[] = [
    { name: "Amazon Basin", lat: -3.4653, lng: -62.2159, enabled: true },
    { name: "Great Barrier Reef", lat: -16.2902, lng: 145.7781, enabled: true },
    { name: "Arctic Circle", lat: 66.5, lng: -165, enabled: true },
    { name: "Sahel Region", lat: 15, lng: 10, enabled: true }
  ];

  /**
   * Start automated monitoring
   */
  static startMonitoring(intervalMinutes: number = 30): void {
    if (this.isMonitoring) {
      console.log('⚠️ Monitoring already active');
      return;
    }

    console.log(`🔍 Starting environmental monitoring (every ${intervalMinutes} minutes)`);
    
    this.isMonitoring = true;
    
    // Run initial check
    this.performMonitoringCheck();
    
    // Set up recurring checks
    this.monitoringInterval = setInterval(() => {
      this.performMonitoringCheck();
    }, intervalMinutes * 60 * 1000);
  }

  /**
   * Stop automated monitoring
   */
  static stopMonitoring(): void {
    if (!this.isMonitoring) {
      console.log('⚠️ Monitoring not active');
      return;
    }

    console.log('🛑 Stopping environmental monitoring');
    
    this.isMonitoring = false;
    
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }

  /**
   * Perform a complete monitoring check
   */
  static async performMonitoringCheck(): Promise<void> {
    console.log('🔍 Performing monitoring check...');

    try {
      const results = await Promise.allSettled([
        this.checkTemperatureAlerts(),
        this.checkAirQualityAlerts(),
        this.checkDeforestationAlerts(),
        this.checkFundingAlerts()
      ]);

      let alertsTriggered = 0;
      results.forEach((result, index) => {
        const checkNames = ['Temperature', 'Air Quality', 'Deforestation', 'Funding'];
        if (result.status === 'fulfilled') {
          alertsTriggered += result.value;
          console.log(`✅ ${checkNames[index]} check completed - ${result.value} alerts triggered`);
        } else {
          console.error(`❌ ${checkNames[index]} check failed:`, result.reason);
        }
      });

      console.log(`📊 Monitoring check complete - ${alertsTriggered} total alerts triggered`);
    } catch (error) {
      console.error('❌ Monitoring check failed:', error);
    }
  }

  /**
   * Check temperature alerts for all locations
   */
  private static async checkTemperatureAlerts(): Promise<number> {
    let alertsTriggered = 0;

    for (const location of this.locations.filter(l => l.enabled)) {
      try {
        const weatherData = await WorkingAPIServices.getCurrentWeather(location.lat, location.lng);
        
        if (weatherData && weatherData.main) {
          const tempCelsius = weatherData.main.temp - 273.15; // Convert from Kelvin
          
          if (tempCelsius >= this.thresholds.temperature.critical) {
            await AlertService.sendEnvironmentalAlert(
              `Critical Temperature Alert: ${location.name}`,
              `Extreme temperature detected: ${tempCelsius.toFixed(1)}°C. Immediate action required to monitor heat-related environmental impacts.`,
              'critical',
              location
            );
            alertsTriggered++;
          } else if (tempCelsius >= this.thresholds.temperature.high) {
            await AlertService.sendEnvironmentalAlert(
              `High Temperature Alert: ${location.name}`,
              `High temperature detected: ${tempCelsius.toFixed(1)}°C. Monitor for potential environmental stress.`,
              'high',
              location
            );
            alertsTriggered++;
          }
        }
      } catch (error) {
        console.error(`Temperature check failed for ${location.name}:`, error);
      }
    }

    return alertsTriggered;
  }

  /**
   * Check air quality alerts for all locations
   */
  private static async checkAirQualityAlerts(): Promise<number> {
    let alertsTriggered = 0;

    for (const location of this.locations.filter(l => l.enabled)) {
      try {
        const airData = await WorkingAPIServices.getAirPollution(location.lat, location.lng);
        
        if (airData && airData.list && airData.list[0]) {
          const aqi = airData.list[0].main.aqi;
          const aqiValue = aqi * 50; // Convert to standard AQI scale
          
          if (aqiValue >= this.thresholds.airQuality.hazardous) {
            await AlertService.sendEnvironmentalAlert(
              `Hazardous Air Quality Alert: ${location.name}`,
              `Dangerous air quality detected: AQI ${aqiValue}. Health warnings and immediate action required.`,
              'critical',
              location
            );
            alertsTriggered++;
          } else if (aqiValue >= this.thresholds.airQuality.unhealthy) {
            await AlertService.sendEnvironmentalAlert(
              `Unhealthy Air Quality Alert: ${location.name}`,
              `Poor air quality detected: AQI ${aqiValue}. Health advisory issued for sensitive groups.`,
              'high',
              location
            );
            alertsTriggered++;
          }
        }
      } catch (error) {
        console.error(`Air quality check failed for ${location.name}:`, error);
      }
    }

    return alertsTriggered;
  }

  /**
   * Check deforestation alerts (simulated data)
   */
  private static async checkDeforestationAlerts(): Promise<number> {
    let alertsTriggered = 0;

    // Simulate deforestation data (in production, this would use real forest monitoring APIs)
    const forestLocations = this.locations.filter(l => 
      l.name.includes('Amazon') || l.name.includes('forest') || l.name.includes('Basin')
    );

    for (const location of forestLocations.filter(l => l.enabled)) {
      try {
        // Simulate daily forest loss (hectares)
        const dailyLoss = Math.random() * 100; // 0-100 hectares per day
        
        if (dailyLoss >= this.thresholds.deforestation.severe) {
          await AlertService.sendEnvironmentalAlert(
            `Severe Deforestation Alert: ${location.name}`,
            `Severe deforestation detected: ${dailyLoss.toFixed(1)} hectares lost today. Emergency intervention required.`,
            'critical',
            location
          );
          alertsTriggered++;
        } else if (dailyLoss >= this.thresholds.deforestation.moderate) {
          await AlertService.sendEnvironmentalAlert(
            `Deforestation Alert: ${location.name}`,
            `Significant deforestation detected: ${dailyLoss.toFixed(1)} hectares lost today. Monitoring and response needed.`,
            'high',
            location
          );
          alertsTriggered++;
        }
      } catch (error) {
        console.error(`Deforestation check failed for ${location.name}:`, error);
      }
    }

    return alertsTriggered;
  }

  /**
   * Check funding alerts (simulated project data)
   */
  private static async checkFundingAlerts(): Promise<number> {
    let alertsTriggered = 0;

    // Simulate project funding data
    const mockProjects = [
      { id: 'amazon-restoration-001', name: 'Amazon Restoration', remaining: 8500 },
      { id: 'ocean-cleanup-002', name: 'Ocean Cleanup', remaining: 3200 },
      { id: 'solar-kenya-003', name: 'Solar Kenya', remaining: 12000 },
      { id: 'coral-restoration-004', name: 'Coral Restoration', remaining: 4800 }
    ];

    for (const project of mockProjects) {
      try {
        if (project.remaining <= this.thresholds.funding.critical) {
          await AlertService.sendFundingAlert(
            `Critical Funding Alert: ${project.name}`,
            `Project funding critically low: $${project.remaining} remaining. Immediate funding needed to continue operations.`,
            'critical',
            project.id
          );
          alertsTriggered++;
        } else if (project.remaining <= this.thresholds.funding.low) {
          await AlertService.sendFundingAlert(
            `Low Funding Alert: ${project.name}`,
            `Project funding running low: $${project.remaining} remaining. Additional funding needed soon.`,
            'medium',
            project.id
          );
          alertsTriggered++;
        }
      } catch (error) {
        console.error(`Funding check failed for project ${project.name}:`, error);
      }
    }

    return alertsTriggered;
  }

  /**
   * Update monitoring thresholds
   */
  static updateThresholds(newThresholds: Partial<MonitoringThresholds>): void {
    this.thresholds = { ...this.thresholds, ...newThresholds };
    console.log('📊 Monitoring thresholds updated');
  }

  /**
   * Add monitoring location
   */
  static addLocation(location: MonitoringLocation): void {
    this.locations.push(location);
    console.log(`📍 Added monitoring location: ${location.name}`);
  }

  /**
   * Remove monitoring location
   */
  static removeLocation(locationName: string): void {
    this.locations = this.locations.filter(l => l.name !== locationName);
    console.log(`📍 Removed monitoring location: ${locationName}`);
  }

  /**
   * Get monitoring status
   */
  static getStatus(): {
    isMonitoring: boolean;
    locations: MonitoringLocation[];
    thresholds: MonitoringThresholds;
  } {
    return {
      isMonitoring: this.isMonitoring,
      locations: this.locations,
      thresholds: this.thresholds
    };
  }

  /**
   * Trigger a manual check for specific conditions
   */
  static async triggerManualCheck(conditions: {
    temperature?: number;
    airQuality?: number;
    deforestation?: number;
    funding?: { remaining: number; projectId: string; projectName?: string };
  }): Promise<number> {
    let alertsTriggered = 0;

    try {
      // Temperature check
      if (conditions.temperature !== undefined) {
        if (conditions.temperature >= this.thresholds.temperature.critical) {
          await AlertService.sendEnvironmentalAlert(
            'Manual Temperature Alert',
            `Critical temperature condition detected: ${conditions.temperature}°C`,
            'critical'
          );
          alertsTriggered++;
        } else if (conditions.temperature >= this.thresholds.temperature.high) {
          await AlertService.sendEnvironmentalAlert(
            'Manual Temperature Alert',
            `High temperature condition detected: ${conditions.temperature}°C`,
            'high'
          );
          alertsTriggered++;
        }
      }

      // Air quality check
      if (conditions.airQuality !== undefined) {
        if (conditions.airQuality >= this.thresholds.airQuality.hazardous) {
          await AlertService.sendEnvironmentalAlert(
            'Manual Air Quality Alert',
            `Hazardous air quality condition detected: AQI ${conditions.airQuality}`,
            'critical'
          );
          alertsTriggered++;
        } else if (conditions.airQuality >= this.thresholds.airQuality.unhealthy) {
          await AlertService.sendEnvironmentalAlert(
            'Manual Air Quality Alert',
            `Unhealthy air quality condition detected: AQI ${conditions.airQuality}`,
            'high'
          );
          alertsTriggered++;
        }
      }

      // Deforestation check
      if (conditions.deforestation !== undefined) {
        if (conditions.deforestation >= this.thresholds.deforestation.severe) {
          await AlertService.sendEnvironmentalAlert(
            'Manual Deforestation Alert',
            `Severe deforestation condition detected: ${conditions.deforestation} hectares`,
            'critical'
          );
          alertsTriggered++;
        } else if (conditions.deforestation >= this.thresholds.deforestation.moderate) {
          await AlertService.sendEnvironmentalAlert(
            'Manual Deforestation Alert',
            `Significant deforestation condition detected: ${conditions.deforestation} hectares`,
            'high'
          );
          alertsTriggered++;
        }
      }

      // Funding check
      if (conditions.funding !== undefined) {
        if (conditions.funding.remaining <= this.thresholds.funding.critical) {
          await AlertService.sendFundingAlert(
            'Manual Funding Alert',
            `Critical funding condition: $${conditions.funding.remaining} remaining for ${conditions.funding.projectName || 'project'}`,
            'critical',
            conditions.funding.projectId
          );
          alertsTriggered++;
        } else if (conditions.funding.remaining <= this.thresholds.funding.low) {
          await AlertService.sendFundingAlert(
            'Manual Funding Alert',
            `Low funding condition: $${conditions.funding.remaining} remaining for ${conditions.funding.projectName || 'project'}`,
            'medium',
            conditions.funding.projectId
          );
          alertsTriggered++;
        }
      }

      console.log(`📊 Manual check complete - ${alertsTriggered} alerts triggered`);
      return alertsTriggered;
    } catch (error) {
      console.error('❌ Manual check failed:', error);
      return alertsTriggered;
    }
  }
}

export default MonitoringService;