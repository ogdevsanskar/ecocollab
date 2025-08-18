// API Configuration for Frontend
export const API_BASE_URL = 'http://localhost:5000';

// API Service class for making requests to the backend
export class ApiService {
  private static async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const finalOptions = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, finalOptions);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // AI Chat Service
  static async sendChatMessage(message: string, history: any[] = []) {
    return this.makeRequest('/api/ai-chat', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    });
  }

  // Environmental Data Service
  static async getEnvironmentalData(type: string = 'all') {
    return this.makeRequest(`/api/environmental-data?type=${encodeURIComponent(type)}`);
  }

  // Health Check
  static async healthCheck() {
    return this.makeRequest('/health');
  }
}

export default ApiService;
