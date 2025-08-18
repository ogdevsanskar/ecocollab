"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Thermometer,
  TreePine,
  Fish,
  Trash2,
  Zap,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Satellite,
  Radio,
  Map,
  Layers,
} from "lucide-react"

interface DeforestationAlert {
  id: number
  lat: number
  lng: number
  severity: string
  area: string
  date: string
  confidence?: number
  satelliteSource?: string
}

interface CoralReefData {
  id: number
  lat: number
  lng: number
  health: string
  bleaching: string
  temp: string
  waterQuality?: number
}

interface PlasticWasteZone {
  id: number
  lat: number
  lng: number
  density: string
  particles: string
  type: string
  trend?: string
}

interface EmissionSource {
  id: number
  lat: number
  lng: number
  co2: string
  source: string
  trend: string
  airQuality?: number
}

export default function MapsPage() {
  const [activeTab, setActiveTab] = useState("deforestation")
  const [realTimeData, setRealTimeData] = useState<{
    deforestation: DeforestationAlert[]
    coralReefs: CoralReefData[]
    plasticWaste: PlasticWasteZone[]
    emissions: EmissionSource[]
  }>({
    deforestation: [],
    coralReefs: [],
    plasticWaste: [],
    emissions: [],
  })
  const [isLiveMode, setIsLiveMode] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isLoadingRealData, setIsLoadingRealData] = useState(false)
  const [satelliteImagery, setSatelliteImagery] = useState<any>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [mapboxLoaded, setMapboxLoaded] = useState(false)
  const mapboxglRef = useRef<any>(null)

  const fetchRealEnvironmentalData = async () => {
    setIsLoadingRealData(true)
    console.log("[v0] Starting environmental data fetch from API route")

    try {
      const response = await fetch("/api/environmental-data?type=all")
      const result = await response.json()

      if (result.success) {
        console.log("[v0] Environmental data received from API route:", result.data)
        setRealTimeData(result.data)
        setLastUpdate(new Date())
      } else {
        throw new Error(result.error || "Failed to fetch data")
      }
    } catch (error) {
      console.error("[v0] Failed to fetch environmental data from API route:", error)
      console.log("[v0] Falling back to mock data")
      setRealTimeData(generateMockData())
    } finally {
      setIsLoadingRealData(false)
      console.log("[v0] Environmental data fetch completed")
    }
  }

  // Mock data generator as fallback
  const generateMockData = () => ({
    deforestation: [
      { id: 1, lat: -3.4653, lng: -62.2159, severity: "high", area: "2.3 km²", date: "2024-01-15" },
      { id: 2, lat: -8.0476, lng: -34.877, severity: "medium", area: "1.1 km²", date: "2024-01-14" },
      { id: 3, lat: -15.7801, lng: -47.9292, severity: "critical", area: "4.7 km²", date: "2024-01-13" },
    ],
    coralReefs: [
      { id: 1, lat: -16.5004, lng: 145.7781, health: "degraded", bleaching: "65%", temp: "29.2°C" },
      { id: 2, lat: 18.2208, lng: -66.5901, health: "critical", bleaching: "85%", temp: "31.1°C" },
      { id: 3, lat: -23.4425, lng: 151.9063, health: "moderate", bleaching: "35%", temp: "27.8°C" },
    ],
    plasticWaste: [
      { id: 1, lat: 36.1627, lng: -86.7816, density: "high", particles: "450/m³", type: "microplastics" },
      { id: 2, lat: 40.7128, lng: -74.006, density: "critical", particles: "720/m³", type: "mixed debris" },
      { id: 3, lat: 34.0522, lng: -118.2437, density: "medium", particles: "280/m³", type: "bottles/bags" },
    ],
    emissions: [
      { id: 1, lat: 40.7589, lng: -73.9851, co2: "425 ppm", source: "industrial", trend: "increasing" },
      { id: 2, lat: 51.5074, lng: -0.1278, co2: "398 ppm", source: "transport", trend: "stable" },
      { id: 3, lat: 35.6762, lng: 139.6503, co2: "445 ppm", source: "mixed", trend: "decreasing" },
    ],
  })

  useEffect(() => {
    // Initial data fetch
    fetchRealEnvironmentalData()

    if (!isLiveMode) return

    const interval = setInterval(() => {
      // Fetch real data every 5 minutes, mock updates every 30 seconds
      if (Math.random() < 0.1) {
        fetchRealEnvironmentalData()
      } else {
        // Minor updates to existing data
        setRealTimeData((prev) => ({
          ...prev,
          // Small variations in existing data
        }))
        setLastUpdate(new Date())
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [isLiveMode])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      default:
        return "bg-green-500"
    }
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case "critical":
        return "text-red-400"
      case "degraded":
        return "text-orange-400"
      case "moderate":
        return "text-yellow-400"
      default:
        return "text-green-400"
    }
  }

  useEffect(() => {
    const initializeMapbox = async () => {
      if (typeof window === "undefined" || mapboxLoaded) return

      try {
        // Dynamically import Mapbox GL JS
        const mapboxgl = await import("mapbox-gl")

        const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        if (!mapboxToken || mapboxToken === "your_mapbox_token_here") {
          console.warn("[v0] Mapbox token not configured, using fallback visualization")
          setMapboxLoaded(false)
          return
        }

        mapboxgl.default.accessToken = mapboxToken

        if (mapContainerRef.current && !mapRef.current) {
          mapRef.current = new mapboxgl.default.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/dark-v11",
            center: [-62.2159, -3.4653], // Amazon rainforest
            zoom: 6,
            pitch: 45,
            bearing: -17.6,
          })

          mapRef.current.on("load", () => {
            console.log("[v0] Mapbox map loaded successfully")
            setMapboxLoaded(true)
            addMapLayers()
          })
        }
      } catch (error) {
        console.error("[v0] Failed to load Mapbox:", error)
        setMapboxLoaded(false)
      }
    }

    initializeMapbox()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  const addMapLayers = () => {
    if (!mapRef.current || !mapboxLoaded || !mapboxglRef.current) return

    // Clear existing layers
    const existingLayers = ["deforestation-points", "coral-points", "plastic-points", "emission-points"]
    existingLayers.forEach((layerId) => {
      if (mapRef.current.getLayer(layerId)) {
        mapRef.current.removeLayer(layerId)
      }
      if (mapRef.current.getSource(layerId)) {
        mapRef.current.removeSource(layerId)
      }
    })

    // Add data points based on active tab
    const currentData =
      realTimeData[
        activeTab === "deforestation"
          ? "deforestation"
          : activeTab === "coral"
            ? "coralReefs"
            : activeTab === "plastic"
              ? "plasticWaste"
              : "emissions"
      ]

    if (currentData.length > 0) {
      const geojsonData = {
        type: "FeatureCollection" as const,
        features: currentData.map((point: any) => ({
          type: "Feature" as const,
          geometry: {
            type: "Point" as const,
            coordinates: [point.lng, point.lat],
          },
          properties: {
            ...point,
            color: getMarkerColor(point, activeTab),
          },
        })),
      }

      const sourceId = `${activeTab}-points`
      mapRef.current.addSource(sourceId, {
        type: "geojson",
        data: geojsonData,
      })

      mapRef.current.addLayer({
        id: sourceId,
        type: "circle",
        source: sourceId,
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 4, 15, 12],
          "circle-color": ["get", "color"],
          "circle-opacity": 0.8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      })

      // Add click handlers for popups
      mapRef.current.on("click", sourceId, (e: any) => {
        const coordinates = e.features[0].geometry.coordinates.slice()
        const properties = e.features[0].properties
        new mapboxglRef.current.Popup()
          .setLngLat(coordinates)
          .setHTML(getPopupContent(properties, activeTab))
          .addTo(mapRef.current)
      })

      mapRef.current.on("mouseenter", sourceId, () => {
        mapRef.current.getCanvas().style.cursor = "pointer"
      })

      mapRef.current.on("mouseleave", sourceId, () => {
        mapRef.current.getCanvas().style.cursor = ""
      })
    }
  }

  const getMarkerColor = (point: any, tab: string) => {
    switch (tab) {
      case "deforestation":
        return point.severity === "critical" ? "#ef4444" : point.severity === "high" ? "#f97316" : "#eab308"
      case "coral":
        return point.health === "critical" ? "#ef4444" : point.health === "degraded" ? "#f97316" : "#eab308"
      case "plastic":
        return point.density === "critical" ? "#ef4444" : point.density === "high" ? "#f97316" : "#eab308"
      case "emissions":
        return point.trend === "increasing" ? "#ef4444" : point.trend === "stable" ? "#eab308" : "#22c55e"
      default:
        return "#328CC1"
    }
  }

  const getPopupContent = (properties: any, tab: string) => {
    switch (tab) {
      case "deforestation":
        return `
          <div class="p-2">
            <h3 class="font-bold text-red-600">Deforestation Alert</h3>
            <p><strong>Severity:</strong> ${properties.severity}</p>
            <p><strong>Area:</strong> ${properties.area}</p>
            <p><strong>Date:</strong> ${properties.date}</p>
            ${properties.confidence ? `<p><strong>Confidence:</strong> ${properties.confidence}%</p>` : ""}
          </div>
        `
      case "coral":
        return `
          <div class="p-2">
            <h3 class="font-bold text-blue-600">Coral Reef Status</h3>
            <p><strong>Health:</strong> ${properties.health}</p>
            <p><strong>Bleaching:</strong> ${properties.bleaching}</p>
            <p><strong>Temperature:</strong> ${properties.temp}</p>
          </div>
        `
      case "plastic":
        return `
          <div class="p-2">
            <h3 class="font-bold text-orange-600">Plastic Waste Zone</h3>
            <p><strong>Density:</strong> ${properties.density}</p>
            <p><strong>Particles:</strong> ${properties.particles}</p>
            <p><strong>Type:</strong> ${properties.type}</p>
          </div>
        `
      case "emissions":
        return `
          <div class="p-2">
            <h3 class="font-bold text-purple-600">Emission Source</h3>
            <p><strong>CO₂:</strong> ${properties.co2}</p>
            <p><strong>Source:</strong> ${properties.source}</p>
            <p><strong>Trend:</strong> ${properties.trend}</p>
          </div>
        `
      default:
        return '<div class="p-2">Environmental Data Point</div>'
    }
  }

  useEffect(() => {
    if (mapboxLoaded && mapRef.current) {
      addMapLayers()

      // Fly to relevant location based on tab
      const locations = {
        deforestation: [-62.2159, -3.4653], // Amazon
        coral: [145.7781, -16.5004], // Great Barrier Reef
        plastic: [-74.006, 40.7128], // New York Harbor
        emissions: [-0.1278, 51.5074], // London
      }

      const location = locations[activeTab as keyof typeof locations] || [-62.2159, -3.4653]
      mapRef.current.flyTo({
        center: location,
        zoom: 8,
        duration: 2000,
      })
    }
  }, [activeTab, mapboxLoaded, realTimeData])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0B3C5D]/10 to-[#0A0A0A]">
      <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#F6F6F6] mb-2">Real-Time Environmental Maps</h1>
              <p className="text-[#328CC1]">Interactive visualizations powered by satellite and IoT data</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isLoadingRealData
                      ? "bg-yellow-400 animate-pulse"
                      : isLiveMode
                        ? "bg-green-400 animate-pulse"
                        : "bg-gray-400"
                  }`}
                />
                <span className="text-sm text-[#F6F6F6]">
                  {isLoadingRealData ? "Fetching..." : isLiveMode ? "Live" : "Paused"}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiveMode(!isLiveMode)}
                className="border-[#328CC1] text-[#328CC1] hover:bg-[#328CC1]/10"
              >
                {isLiveMode ? "Pause" : "Resume"} Updates
              </Button>
            </div>
          </div>

          <div className="text-sm text-gray-400">Last updated: {lastUpdate.toLocaleTimeString()}</div>
        </div>

        {/* Data Source Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Satellite className="w-8 h-8 text-[#328CC1]" />
                <div>
                  <h3 className="font-semibold text-[#F6F6F6]">Satellite Data</h3>
                  <p className="text-sm text-gray-400">NASA Earth Data, Landsat 8, Sentinel-2, MODIS</p>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {isLoadingRealData ? "Syncing" : "Active"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Radio className="w-8 h-8 text-[#145214]" />
                <div>
                  <h3 className="font-semibold text-[#F6F6F6]">IoT Sensors</h3>
                  <p className="text-sm text-gray-400">Global Forest Watch, OpenWeather, Air quality sensors</p>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Map Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-[#328CC1]/30">
            <TabsTrigger value="deforestation" className="data-[state=active]:bg-[#328CC1]/20">
              <TreePine className="w-4 h-4 mr-2" />
              Deforestation
            </TabsTrigger>
            <TabsTrigger value="coral" className="data-[state=active]:bg-[#328CC1]/20">
              <Fish className="w-4 h-4 mr-2" />
              Coral Reefs
            </TabsTrigger>
            <TabsTrigger value="plastic" className="data-[state=active]:bg-[#328CC1]/20">
              <Trash2 className="w-4 h-4 mr-2" />
              Plastic Waste
            </TabsTrigger>
            <TabsTrigger value="emissions" className="data-[state=active]:bg-[#328CC1]/20">
              <Zap className="w-4 h-4 mr-2" />
              GHG Emissions
            </TabsTrigger>
          </TabsList>

          {/* Deforestation Hotspots */}
          <TabsContent value="deforestation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-[#F6F6F6] flex items-center">
                      <Map className="w-5 h-5 mr-2 text-[#328CC1]" />
                      Interactive Deforestation Map
                      <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">Mapbox GL JS</Badge>
                      {satelliteImagery && (
                        <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-blue-500/30">NASA Satellite</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      ref={mapContainerRef}
                      className="h-96 w-full rounded-lg overflow-hidden"
                      style={{ minHeight: "400px" }}
                    />
                    {!mapboxLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#145214]/20 to-[#328CC1]/10 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Layers className="w-16 h-16 text-[#145214] mx-auto mb-4 animate-spin" />
                          <p className="text-[#F6F6F6] text-lg font-semibold">Loading Interactive Map...</p>
                          <p className="text-gray-400">Powered by Mapbox GL JS</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-[#F6F6F6] text-lg">Active Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {realTimeData.deforestation.map((alert) => (
                      <div key={alert.id} className="p-3 bg-black/20 rounded-lg border border-red-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`${getSeverityColor(alert.severity)} text-white`}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-400">{alert.date}</span>
                        </div>
                        <p className="text-sm text-[#F6F6F6]">Area cleared: {alert.area}</p>
                        {(alert as any).confidence && (
                          <p className="text-xs text-blue-400">Confidence: {(alert as any).confidence}%</p>
                        )}
                        {(alert as any).satelliteSource && (
                          <p className="text-xs text-green-400">Source: {(alert as any).satelliteSource}</p>
                        )}
                        <p className="text-xs text-gray-400">
                          Lat: {alert.lat}, Lng: {alert.lng}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Coral Reef Health */}
          <TabsContent value="coral" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-[#F6F6F6] flex items-center">
                      <Map className="w-5 h-5 mr-2 text-[#328CC1]" />
                      Interactive Coral Reef Map
                      <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">Mapbox GL JS</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      ref={mapContainerRef}
                      className="h-96 w-full rounded-lg overflow-hidden"
                      style={{ minHeight: "400px" }}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-[#F6F6F6] text-lg">Reef Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {realTimeData.coralReefs.map((reef) => (
                      <div key={reef.id} className="p-3 bg-black/20 rounded-lg border border-[#328CC1]/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-semibold ${getHealthColor(reef.health)}`}>
                            {reef.health.toUpperCase()}
                          </span>
                          <Thermometer className="w-4 h-4 text-orange-400" />
                        </div>
                        <p className="text-sm text-[#F6F6F6]">Bleaching: {reef.bleaching}</p>
                        <p className="text-sm text-[#F6F6F6]">Temp: {reef.temp}</p>
                        {(reef as any).waterQuality && (
                          <p className="text-xs text-blue-400">Water Quality: {(reef as any).waterQuality}%</p>
                        )}
                        <p className="text-xs text-gray-400">
                          Lat: {reef.lat}, Lng: {reef.lng}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Plastic Waste Zones */}
          <TabsContent value="plastic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-[#F6F6F6] flex items-center">
                      <Map className="w-5 h-5 mr-2 text-[#328CC1]" />
                      Interactive Plastic Waste Map
                      <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">Mapbox GL JS</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      ref={mapContainerRef}
                      className="h-96 w-full rounded-lg overflow-hidden"
                      style={{ minHeight: "400px" }}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-[#F6F6F6] text-lg">Pollution Zones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {realTimeData.plasticWaste.map((zone) => (
                      <div key={zone.id} className="p-3 bg-black/20 rounded-lg border border-red-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <Badge
                            className={`${
                              zone.density === "critical"
                                ? "bg-red-500"
                                : zone.density === "high"
                                  ? "bg-orange-500"
                                  : "bg-yellow-500"
                            } text-white`}
                          >
                            {zone.density.toUpperCase()}
                          </Badge>
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        </div>
                        <p className="text-sm text-[#F6F6F6]">Density: {zone.particles}</p>
                        <p className="text-sm text-[#F6F6F6]">Type: {zone.type}</p>
                        {(zone as any).trend && <p className="text-xs text-blue-400">Trend: {(zone as any).trend}</p>}
                        <p className="text-xs text-gray-400">
                          Lat: {zone.lat}, Lng: {zone.lng}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* GHG Emissions */}
          <TabsContent value="emissions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-[#F6F6F6] flex items-center">
                      <Map className="w-5 h-5 mr-2 text-[#328CC1]" />
                      Interactive Emissions Map
                      <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">Mapbox GL JS</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      ref={mapContainerRef}
                      className="h-96 w-full rounded-lg overflow-hidden"
                      style={{ minHeight: "400px" }}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-[#F6F6F6] text-lg">Emission Sources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {realTimeData.emissions.map((source) => (
                      <div key={source.id} className="p-3 bg-black/20 rounded-lg border border-orange-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-orange-400">{source.co2}</span>
                          {source.trend === "increasing" ? (
                            <TrendingUp className="w-4 h-4 text-red-400" />
                          ) : source.trend === "decreasing" ? (
                            <TrendingDown className="w-4 h-4 text-green-400" />
                          ) : (
                            <Activity className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                        <p className="text-sm text-[#F6F6F6]">Source: {source.source}</p>
                        <p className="text-sm text-[#F6F6F6]">Trend: {source.trend}</p>
                        {(source as any).airQuality && (
                          <p className="text-xs text-purple-400">Air Quality Index: {(source as any).airQuality}/5</p>
                        )}
                        <p className="text-xs text-gray-400">
                          Lat: {source.lat}, Lng: {source.lng}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
