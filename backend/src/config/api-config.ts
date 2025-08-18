export const API_CONFIG = {
  // Global Forest Watch API
  GLOBAL_FOREST_WATCH: {
    BASE_URL: "https://production-api.globalforestwatch.org",
    API_KEY: process.env.GLOBAL_FOREST_WATCH_API_KEY || "",
    ENDPOINTS: {
      FOREST_CHANGE: "/v1/forest-change",
      DEFORESTATION: "/v1/glad-alerts",
      FIRES: "/v1/fires",
      FOREST_COVER: "/v1/forest-cover",
    },
  },

  // NASA Earth Data API
  NASA_EARTH_DATA: {
    BASE_URL: "https://api.earthdata.nasa.gov",
    API_KEY: process.env.NASA_EARTH_DATA_API_KEY || "",
    ENDPOINTS: {
      MODIS: "/api/v2/modis",
      VIIRS: "/api/v2/viirs",
      LANDSAT: "/api/v2/landsat",
      CLIMATE: "/api/v2/climate",
    },
  },

  // World Bank Climate API
  WORLD_BANK_CLIMATE: {
    BASE_URL: "https://climateknowledgeportal.worldbank.org/api",
    API_KEY: process.env.WORLD_BANK_CLIMATE_API_KEY || "",
    ENDPOINTS: {
      COUNTRY_DATA: "/country",
      CLIMATE_DATA: "/climatology",
      PROJECTIONS: "/projections",
    },
  },

  // OpenWeather API
  OPENWEATHER: {
    BASE_URL: "https://api.openweathermap.org/data/2.5",
    API_KEY: process.env.OPENWEATHER_API_KEY || "",
    ENDPOINTS: {
      CURRENT: "/weather",
      FORECAST: "/forecast",
      AIR_POLLUTION: "/air_pollution",
      UV_INDEX: "/uvi",
    },
  },

  // SendGrid API
  SENDGRID: {
    BASE_URL: "https://api.sendgrid.com/v3",
    API_KEY: process.env.SENDGRID_API_KEY || "",
    ENDPOINTS: {
      SEND_EMAIL: "/mail/send",
      TEMPLATES: "/templates",
    },
  },

  // Mapbox API
  MAPBOX: {
    BASE_URL: "https://api.mapbox.com",
    ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN || "",
    ENDPOINTS: {
      GEOCODING: "/geocoding/v5/mapbox.places",
      STATIC_IMAGES: "/styles/v1/mapbox/satellite-v9/static",
      TILESETS: "/v1/tilesets",
    },
  },
}

// API Response Types
export interface ForestChangeData {
  alerts: Array<{
    lat: number
    lng: number
    confidence: number
    date: string
    area_ha: number
  }>
}

export interface ClimateData {
  temperature: number
  humidity: number
  co2_level: number
  timestamp: string
  location: {
    lat: number
    lng: number
  }
}

export interface SatelliteImageData {
  url: string
  date: string
  cloud_cover: number
  resolution: string
}
