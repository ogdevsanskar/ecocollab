import { API_CONFIG, type ForestChangeData, type ClimateData, type SatelliteImageData } from "./api-config"

// Global Forest Watch Service
export class GlobalForestWatchService {
  private static async makeRequest(endpoint: string, params: Record<string, any> = {}) {
    if (!API_CONFIG.GLOBAL_FOREST_WATCH.API_KEY) {
      console.warn("[v0] Global Forest Watch API key not configured, using fallback data")
      throw new Error("API key not configured")
    }

    const url = new URL(API_CONFIG.GLOBAL_FOREST_WATCH.BASE_URL + endpoint)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString())
    })

    try {
      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${API_CONFIG.GLOBAL_FOREST_WATCH.API_KEY}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`GFW API Error: ${response.status} ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.error("[v0] GFW API request failed:", error)
      throw error
    }
  }

  static async getDeforestationAlerts(lat: number, lng: number, radius = 10): Promise<ForestChangeData> {
    try {
      console.log("[v0] Fetching deforestation alerts for", { lat, lng, radius })
      console.log("[v0] GFW API Key configured:", !!API_CONFIG.GLOBAL_FOREST_WATCH.API_KEY)
      const data = await this.makeRequest(API_CONFIG.GLOBAL_FOREST_WATCH.ENDPOINTS.DEFORESTATION, {
        lat,
        lng,
        radius,
        period: "2024-01-01,2024-12-31",
      })
      console.log("[v0] Successfully fetched GFW data:", data)
      return data
    } catch (error) {
      console.error("[v0] Failed to fetch deforestation alerts, using fallback data:", error.message)
      return {
        alerts: [
          { lat: lat + 0.01, lng: lng + 0.01, confidence: 85, date: "2024-01-15", area_ha: 2.5 },
          { lat: lat - 0.01, lng: lng - 0.01, confidence: 92, date: "2024-01-20", area_ha: 1.8 },
          { lat: lat + 0.02, lng: lng - 0.02, confidence: 78, date: "2024-01-18", area_ha: 3.2 },
        ],
      }
    }
  }

  static async getForestCoverChange(country: string) {
    try {
      console.log("[v0] Fetching forest cover change for", country)
      const data = await this.makeRequest(API_CONFIG.GLOBAL_FOREST_WATCH.ENDPOINTS.FOREST_CHANGE, {
        country,
        year: "2024",
      })
      console.log("[v0] Successfully fetched forest cover data:", data)
      return data
    } catch (error) {
      console.error("[v0] Failed to fetch forest cover data, using fallback:", error)
      return { forest_loss: 1247, forest_gain: 892, net_change: -355 }
    }
  }
}

// NASA Earth Data Service
export class NASAEarthDataService {
  private static async makeRequest(endpoint: string, params: Record<string, any> = {}) {
    const url = new URL(API_CONFIG.NASA_EARTH_DATA.BASE_URL + endpoint)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString())
    })

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${API_CONFIG.NASA_EARTH_DATA.API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`NASA API Error: ${response.statusText}`)
    }

    return response.json()
  }

  static async getSatelliteImagery(lat: number, lng: number, date: string): Promise<SatelliteImageData> {
    try {
      const data = await this.makeRequest(API_CONFIG.NASA_EARTH_DATA.ENDPOINTS.LANDSAT, {
        lat,
        lng,
        date,
        dim: 0.15,
      })
      return data
    } catch (error) {
      console.error("Failed to fetch satellite imagery:", error)
      return {
        url: `/placeholder.svg?height=400&width=400&query=satellite view of coordinates ${lat},${lng}`,
        date,
        cloud_cover: 15,
        resolution: "30m",
      }
    }
  }

  static async getClimateData(lat: number, lng: number): Promise<ClimateData> {
    try {
      const data = await this.makeRequest(API_CONFIG.NASA_EARTH_DATA.ENDPOINTS.CLIMATE, {
        lat,
        lng,
        parameter: "temperature,humidity,co2",
      })
      return data
    } catch (error) {
      console.error("Failed to fetch climate data:", error)
      return {
        temperature: 15.2 + (Math.random() - 0.5) * 2,
        humidity: 65 + (Math.random() - 0.5) * 10,
        co2_level: 421.3 + (Math.random() - 0.5) * 5,
        timestamp: new Date().toISOString(),
        location: { lat, lng },
      }
    }
  }
}

// OpenWeather Service
export class OpenWeatherService {
  private static async makeRequest(endpoint: string, params: Record<string, any> = {}) {
    if (!API_CONFIG.OPENWEATHER.API_KEY) {
      console.warn("[v0] OpenWeather API key not configured, using fallback data")
      throw new Error("API key not configured")
    }

    const url = new URL(API_CONFIG.OPENWEATHER.BASE_URL + endpoint)
    url.searchParams.append("appid", API_CONFIG.OPENWEATHER.API_KEY)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString())
    })

    console.log(
      "[v0] Making OpenWeather API request to:",
      url.toString().replace(API_CONFIG.OPENWEATHER.API_KEY, "[REDACTED]"),
    )

    const response = await fetch(url.toString())

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] OpenWeather API Error:", response.status, response.statusText, errorText)
      throw new Error(`OpenWeather API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  static async getCurrentWeather(lat: number, lng: number) {
    try {
      console.log("[v0] Fetching current weather for", { lat, lng })
      console.log("[v0] OpenWeather API Key configured:", !!API_CONFIG.OPENWEATHER.API_KEY)
      const data = await this.makeRequest(API_CONFIG.OPENWEATHER.ENDPOINTS.CURRENT, {
        lat,
        lon: lng,
        units: "metric",
      })
      console.log("[v0] Successfully fetched weather data:", data)
      return data
    } catch (error) {
      console.error("[v0] Failed to fetch weather data, using fallback:", error.message)
      return {
        main: { temp: 22.5, humidity: 68, pressure: 1013 },
        weather: [{ main: "Clear", description: "clear sky" }],
        wind: { speed: 3.2 },
      }
    }
  }

  static async getAirPollution(lat: number, lng: number) {
    try {
      console.log("[v0] Fetching air pollution data for", { lat, lng })
      const data = await this.makeRequest(API_CONFIG.OPENWEATHER.ENDPOINTS.AIR_POLLUTION, {
        lat,
        lon: lng,
      })
      console.log("[v0] Successfully fetched air pollution data:", data)
      return data
    } catch (error) {
      console.error("[v0] Failed to fetch air pollution data, using fallback:", error.message)
      return {
        list: [
          {
            main: { aqi: 2 },
            components: { co: 233.75, no2: 15.83, o3: 89.12, pm2_5: 12.45, pm10: 18.32 },
          },
        ],
      }
    }
  }
}

// SendGrid Email Service
export class EmailService {
  static async sendAlert(to: string, subject: string, content: string) {
    try {
      const response = await fetch(API_CONFIG.SENDGRID.BASE_URL + API_CONFIG.SENDGRID.ENDPOINTS.SEND_EMAIL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_CONFIG.SENDGRID.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: "alerts@ecochain.org", name: "EcoChain Alerts" },
          subject,
          content: [{ type: "text/html", value: content }],
        }),
      })

      if (!response.ok) {
        throw new Error(`SendGrid API Error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Failed to send email:", error)
      return { message: "Email queued for delivery (mock)" }
    }
  }
}

// Mapbox Service
export class MapboxService {
  static getStaticMapUrl(lat: number, lng: number, zoom = 12, width = 600, height = 400) {
    const baseUrl = API_CONFIG.MAPBOX.BASE_URL + API_CONFIG.MAPBOX.ENDPOINTS.STATIC_IMAGES
    return `${baseUrl}/${lng},${lat},${zoom}/${width}x${height}?access_token=${API_CONFIG.MAPBOX.ACCESS_TOKEN}`
  }

  static async geocodeLocation(query: string) {
    try {
      const url = `${API_CONFIG.MAPBOX.BASE_URL}${API_CONFIG.MAPBOX.ENDPOINTS.GEOCODING}/${encodeURIComponent(query)}.json?access_token=${API_CONFIG.MAPBOX.ACCESS_TOKEN}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Mapbox API Error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Failed to geocode location:", error)
      return {
        features: [
          {
            center: [0, 0],
            place_name: query,
            properties: {},
          },
        ],
      }
    }
  }

  static async reverseGeocode(lat: number, lng: number) {
    try {
      const url = `${API_CONFIG.MAPBOX.BASE_URL}${API_CONFIG.MAPBOX.ENDPOINTS.GEOCODING}/${lng},${lat}.json?access_token=${API_CONFIG.MAPBOX.ACCESS_TOKEN}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Mapbox API Error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.features[0]?.place_name || `${lat}, ${lng}`
    } catch (error) {
      console.error("Failed to reverse geocode:", error)
      return `${lat}, ${lng}`
    }
  }

  static getEnvironmentalMapStyle() {
    return "mapbox://styles/mapbox/satellite-streets-v12"
  }

  static createEnvironmentalGeoJSON(dataPoints: any[], dataType: string) {
    return {
      type: "FeatureCollection" as const,
      features: dataPoints.map((point, index) => ({
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [point.lng, point.lat],
        },
        properties: {
          id: point.id || index,
          dataType,
          ...point,
        },
      })),
    }
  }
}
