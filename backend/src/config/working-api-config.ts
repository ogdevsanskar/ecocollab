// Working API Configuration for Climate Platform Backend
export const WORKING_API_CONFIG = {
  OPENWEATHER: {
    BASE_URL: 'https://api.openweathermap.org',
    API_KEY: process.env.OPENWEATHER_API_KEY,
    ENDPOINTS: {
      CURRENT: '/data/2.5/weather',
      AIR_POLLUTION: '/data/2.5/air_pollution'
    }
  },
  MAPBOX: {
    BASE_URL: 'https://api.mapbox.com',
    ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    ENDPOINTS: {
      GEOCODING: '/geocoding/v5/mapbox.places',
      STATIC_IMAGES: '/styles/v1/mapbox/satellite-v9/static'
    }
  },
  MISPLE_AI: {
    BASE_URL: 'https://openrouter.ai/api/v1',
    API_KEY: process.env.MISPLE_API_KEY,
    ENDPOINTS: {
      CHAT: '/chat/completions'
    },
    MODEL: 'mistralai/mistral-7b-instruct'
  }
};

// Interface definitions
export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  clouds?: {
    all: number;
  };
}

export interface AirPollutionData {
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no2: number;
      o3: number;
      pm2_5: number;
      pm10: number;
      so2?: number;
    };
  }>;
}

export interface GeocodeData {
  features: Array<{
    center: [number, number];
    place_name: string;
    properties: any;
  }>;
}

export interface AIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}
