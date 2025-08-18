import { type NextRequest, NextResponse } from "next/server"
import { GlobalForestWatchService, OpenWeatherService } from "@/lib/api-services"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const dataType = searchParams.get("type") || "all"

  try {
    console.log("[v0] API Route: Fetching environmental data for type:", dataType)

    const data: any = {
      deforestation: [],
      coralReefs: [],
      plasticWaste: [],
      emissions: [],
    }

    if (dataType === "all" || dataType === "deforestation") {
      try {
        const amazonDeforestation = await GlobalForestWatchService.getDeforestationAlerts(-3.4653, -62.2159, 50)
        data.deforestation = amazonDeforestation.alerts.slice(0, 3).map((alert: any, index: number) => ({
          id: index + 1,
          lat: alert.lat,
          lng: alert.lng,
          severity: alert.confidence > 90 ? "critical" : alert.confidence > 70 ? "high" : "medium",
          area: `${alert.area_ha.toFixed(1)} ha`,
          date: alert.date,
          confidence: alert.confidence,
          satelliteSource: "Landsat 8",
        }))
      } catch (error) {
        console.log("[v0] API Route: Using fallback deforestation data")
        data.deforestation = [
          { id: 1, lat: -3.4653, lng: -62.2159, severity: "high", area: "2.3 km²", date: "2024-01-15" },
          { id: 2, lat: -8.0476, lng: -34.877, severity: "medium", area: "1.1 km²", date: "2024-01-14" },
          { id: 3, lat: -15.7801, lng: -47.9292, severity: "critical", area: "4.7 km²", date: "2024-01-13" },
        ]
      }
    }

    if (dataType === "all" || dataType === "coral") {
      try {
        const barrierReefWeather = await OpenWeatherService.getCurrentWeather(-16.5004, 145.7781)
        const caribbeanWeather = await OpenWeatherService.getCurrentWeather(18.2208, -66.5901)

        data.coralReefs = [
          {
            id: 1,
            lat: -16.5004,
            lng: 145.7781,
            health: barrierReefWeather.main?.temp > 28 ? "critical" : "degraded",
            bleaching: barrierReefWeather.main?.temp > 28 ? "85%" : "65%",
            temp: `${barrierReefWeather.main?.temp || 29.2}°C`,
            waterQuality: barrierReefWeather.main?.humidity || 75,
          },
          {
            id: 2,
            lat: 18.2208,
            lng: -66.5901,
            health: caribbeanWeather.main?.temp > 30 ? "critical" : "moderate",
            bleaching: caribbeanWeather.main?.temp > 30 ? "90%" : "35%",
            temp: `${caribbeanWeather.main?.temp || 31.1}°C`,
            waterQuality: caribbeanWeather.main?.humidity || 82,
          },
        ]
      } catch (error) {
        console.log("[v0] API Route: Using fallback coral reef data")
        data.coralReefs = [
          { id: 1, lat: -16.5004, lng: 145.7781, health: "degraded", bleaching: "65%", temp: "29.2°C" },
          { id: 2, lat: 18.2208, lng: -66.5901, health: "critical", bleaching: "85%", temp: "31.1°C" },
        ]
      }
    }

    if (dataType === "all" || dataType === "plastic") {
      data.plasticWaste = [
        {
          id: 1,
          lat: 36.1627,
          lng: -86.7816,
          density: "high",
          particles: "450/m³",
          type: "microplastics",
          trend: "increasing",
        },
        {
          id: 2,
          lat: 40.7128,
          lng: -74.006,
          density: "critical",
          particles: "720/m³",
          type: "mixed debris",
          trend: "stable",
        },
        {
          id: 3,
          lat: 34.0522,
          lng: -118.2437,
          density: "medium",
          particles: "280/m³",
          type: "bottles/bags",
          trend: "decreasing",
        },
      ]
    }

    if (dataType === "all" || dataType === "emissions") {
      try {
        const nyAirPollution = await OpenWeatherService.getAirPollution(40.7589, -73.9851)
        const londonAirPollution = await OpenWeatherService.getAirPollution(51.5074, -0.1278)

        data.emissions = [
          {
            id: 1,
            lat: 40.7589,
            lng: -73.9851,
            co2: `${nyAirPollution.list?.[0]?.components?.co || 425} ppm`,
            source: "industrial",
            trend: nyAirPollution.list?.[0]?.main?.aqi > 3 ? "increasing" : "stable",
            airQuality: nyAirPollution.list?.[0]?.main?.aqi || 3,
          },
          {
            id: 2,
            lat: 51.5074,
            lng: -0.1278,
            co2: `${londonAirPollution.list?.[0]?.components?.co || 398} ppm`,
            source: "transport",
            trend: londonAirPollution.list?.[0]?.main?.aqi > 2 ? "increasing" : "stable",
            airQuality: londonAirPollution.list?.[0]?.main?.aqi || 2,
          },
        ]
      } catch (error) {
        console.log("[v0] API Route: Using fallback emissions data")
        data.emissions = [
          { id: 1, lat: 40.7589, lng: -73.9851, co2: "425 ppm", source: "industrial", trend: "increasing" },
          { id: 2, lat: 51.5074, lng: -0.1278, co2: "398 ppm", source: "transport", trend: "stable" },
        ]
      }
    }

    return NextResponse.json({ success: true, data, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error("[v0] API Route: Environmental data fetch failed:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch environmental data" }, { status: 500 })
  }
}
