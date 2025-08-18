"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { NASAEarthDataService, OpenWeatherService, GlobalForestWatchService } from "@/lib/api-services"
import {
  TreePine,
  Fish,
  MapPin,
  TrendingUp,
  Users,
  AlertTriangle,
  DollarSign,
  BarChart3,
  Eye,
  Heart,
  Plus,
  Clock,
  CheckCircle,
  Thermometer,
  Droplets,
  Wind,
  Zap,
  Activity,
} from "lucide-react"

export default function DashboardPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  const handleStartProject = () => {
    router.push("/projects")
  }

  const handleReportIncident = () => {
    alert("Incident reporting form would open here. This feature connects to the data collection system.")
  }

  const handleExploreData = () => {
    router.push("/data")
  }

  const handleFundProject = () => {
    router.push("/funding")
  }

  const handleViewProject = (projectId: number) => {
    router.push(`/projects?id=${projectId}`)
  }

  const handleTakeAction = (alertType: string) => {
    alert(`Taking action for ${alertType}. This would trigger emergency response protocols.`)
  }

  const handleMonitorAlert = (alertType: string) => {
    router.push(`/maps?alert=${alertType}`)
  }

  const handleAnalyzeAlert = (alertType: string) => {
    router.push(`/analytics?focus=${alertType}`)
  }

  const handleCreateProject = () => {
    router.push("/projects?action=create")
  }

  const [realTimeMetrics, setRealTimeMetrics] = useState({
    globalTemp: 15.2,
    co2Level: 421.3,
    deforestationRate: 2.4,
    oceanPH: 8.1,
    plasticWaste: 12.8,
    renewableEnergy: 67.3,
  })

  const [climateData, setClimateData] = useState<any>(null)
  const [weatherData, setWeatherData] = useState<any>(null)
  const [forestData, setForestData] = useState<any>(null)
  const [isLoadingRealData, setIsLoadingRealData] = useState(false)

  const connectWallet = () => {
    setIsWalletConnected(true)
    setUserRole("Researcher")
  }

  useEffect(() => {
    const fetchRealClimateData = async () => {
      setIsLoadingRealData(true)
      try {
        const [climate, weather, forest] = await Promise.all([
          NASAEarthDataService.getClimateData(-3.4653, -62.2159),
          OpenWeatherService.getCurrentWeather(-16.2902, 145.7781),
          GlobalForestWatchService.getForestCoverChange("BRA"),
        ])

        setClimateData(climate)
        setWeatherData(weather)
        setForestData(forest)

        setRealTimeMetrics((prev) => ({
          globalTemp: climate.temperature || prev.globalTemp,
          co2Level: climate.co2_level || prev.co2Level,
          deforestationRate: forest.forest_loss ? forest.forest_loss / 365 / 24 / 60 : prev.deforestationRate,
          oceanPH: weather.main ? 8.1 + (weather.main.temp - 25) * -0.01 : prev.oceanPH,
          plasticWaste: prev.plasticWaste,
          renewableEnergy: prev.renewableEnergy,
        }))
      } catch (error) {
        console.error("Failed to fetch real climate data:", error)
      } finally {
        setIsLoadingRealData(false)
      }
    }

    fetchRealClimateData()

    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        fetchRealClimateData()
      } else {
        setRealTimeMetrics((prev) => ({
          globalTemp: +(prev.globalTemp + (Math.random() - 0.5) * 0.1).toFixed(1),
          co2Level: +(prev.co2Level + (Math.random() - 0.5) * 0.5).toFixed(1),
          deforestationRate: +(prev.deforestationRate + (Math.random() - 0.5) * 0.2).toFixed(1),
          oceanPH: +(prev.oceanPH + (Math.random() - 0.5) * 0.02).toFixed(2),
          plasticWaste: +(prev.plasticWaste + (Math.random() - 0.5) * 0.3).toFixed(1),
          renewableEnergy: +(prev.renewableEnergy + (Math.random() - 0.5) * 0.5).toFixed(1),
        }))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const projectStats = {
    totalFunded: "$2.4M",
    activeProjects: 156,
    dataPoints: "45.2K",
    contributors: "12.8K",
  }

  const recentProjects = [
    {
      id: 1,
      title: "Coral Reef Restoration - Great Barrier Reef",
      location: "Australia",
      funded: "$45,000",
      goal: "$60,000",
      progress: 75,
      category: "Marine Conservation",
      urgency: "High",
      stakeholders: ["Government", "Academic", "NGO"],
    },
    {
      id: 2,
      title: "Amazon Deforestation Monitoring",
      location: "Brazil",
      funded: "$32,000",
      goal: "$40,000",
      progress: 80,
      category: "Forest Protection",
      urgency: "Critical",
      stakeholders: ["Government", "Community", "NGO"],
    },
    {
      id: 3,
      title: "Urban Biodiversity Survey",
      location: "Singapore",
      funded: "$18,000",
      goal: "$25,000",
      progress: 72,
      category: "Biodiversity",
      urgency: "Medium",
      stakeholders: ["Academic", "Community"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0B3C5D] to-[#0A0A0A] text-[#F6F6F6]">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-300">Monitor environmental projects and track your impact</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#328CC1]">Total Funded</p>
                  <p className="text-2xl font-bold">{projectStats.totalFunded}</p>
                </div>
                <DollarSign className="w-8 h-8 text-[#145214]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#328CC1]">Active Projects</p>
                  <p className="text-2xl font-bold">{projectStats.activeProjects}</p>
                </div>
                <TreePine className="w-8 h-8 text-[#145214]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#328CC1]">Data Points</p>
                  <p className="text-2xl font-bold">{projectStats.dataPoints}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-[#145214]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#328CC1]">Contributors</p>
                  <p className="text-2xl font-bold">{projectStats.contributors}</p>
                </div>
                <Users className="w-8 h-8 text-[#145214]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Real-Time Environmental Metrics</h2>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full animate-pulse ${isLoadingRealData ? "bg-yellow-400" : "bg-green-400"}`}
              />
              <span className="text-sm text-gray-400">{isLoadingRealData ? "Fetching Live Data..." : "Live Data"}</span>
              {climateData && (
                <Badge variant="outline" className="text-xs border-green-500/40 text-green-400">
                  NASA API
                </Badge>
              )}
              {weatherData && (
                <Badge variant="outline" className="text-xs border-blue-500/40 text-blue-400">
                  OpenWeather API
                </Badge>
              )}
              {forestData && (
                <Badge variant="outline" className="text-xs border-yellow-500/40 text-yellow-400">
                  GFW API
                </Badge>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="bg-black/40 border-orange-500/30 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-orange-400">Global Temp</p>
                    <p className="text-lg font-bold text-orange-400">{realTimeMetrics.globalTemp}°C</p>
                    {climateData && <p className="text-xs text-orange-300 opacity-60">NASA Data</p>}
                  </div>
                  <Thermometer className="w-6 h-6 text-orange-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-red-500/30 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-red-400">CO₂ Level</p>
                    <p className="text-lg font-bold text-red-400">{realTimeMetrics.co2Level} ppm</p>
                    {climateData && <p className="text-xs text-red-300 opacity-60">NASA Data</p>}
                  </div>
                  <Wind className="w-6 h-6 text-red-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-yellow-500/30 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-yellow-400">Deforestation</p>
                    <p className="text-lg font-bold text-yellow-400">{realTimeMetrics.deforestationRate} ha/min</p>
                    {forestData && <p className="text-xs text-yellow-300 opacity-60">GFW Data</p>}
                  </div>
                  <TreePine className="w-6 h-6 text-yellow-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-400">Ocean pH</p>
                    <p className="text-lg font-bold text-blue-400">{realTimeMetrics.oceanPH}</p>
                    {weatherData && <p className="text-xs text-blue-300 opacity-60">Calculated</p>}
                  </div>
                  <Droplets className="w-6 h-6 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-purple-400">Plastic Waste</p>
                    <p className="text-lg font-bold text-purple-400">{realTimeMetrics.plasticWaste} Mt/yr</p>
                  </div>
                  <Activity className="w-6 h-6 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-green-500/30 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-green-400">Renewable %</p>
                    <p className="text-lg font-bold text-green-400">{realTimeMetrics.renewableEnergy}%</p>
                  </div>
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={handleStartProject}
              className="h-20 bg-[#328CC1]/20 hover:bg-[#328CC1]/30 border border-[#328CC1]/40 flex flex-col items-center justify-center space-y-2"
            >
              <Plus className="w-6 h-6" />
              <span className="text-sm">Start Project</span>
            </Button>
            <Button
              onClick={handleReportIncident}
              className="h-20 bg-[#145214]/20 hover:bg-[#145214]/30 border border-[#145214]/40 flex flex-col items-center justify-center space-y-2"
            >
              <AlertTriangle className="w-6 h-6" />
              <span className="text-sm">Report Incident</span>
            </Button>
            <Button
              onClick={handleExploreData}
              className="h-20 bg-[#328CC1]/20 hover:bg-[#328CC1]/30 border border-[#328CC1]/40 flex flex-col items-center justify-center space-y-2"
            >
              <Eye className="w-6 h-6" />
              <span className="text-sm">Explore Data</span>
            </Button>
            <Button
              onClick={handleFundProject}
              className="h-20 bg-[#145214]/20 hover:bg-[#145214]/30 border border-[#145214]/40 flex flex-col items-center justify-center space-y-2"
            >
              <Heart className="w-6 h-6" />
              <span className="text-sm">Fund Project</span>
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-[#328CC1]/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Projects */}
              <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TreePine className="w-5 h-5 text-[#145214]" />
                    <span>Active Projects</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="p-4 bg-black/20 rounded-lg border border-[#328CC1]/10">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{project.title}</h4>
                        <Badge
                          variant={
                            project.urgency === "Critical"
                              ? "destructive"
                              : project.urgency === "High"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {project.urgency}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#328CC1] mb-2 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {project.location}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.stakeholders.map((stakeholder) => (
                          <Badge key={stakeholder} variant="outline" className="text-xs border-[#328CC1]/40">
                            {stakeholder}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>
                          {project.funded} / {project.goal}
                        </span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                        <div className="bg-[#145214] h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Real-time Alerts */}
              <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span>Real-time Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Deforestation Alert</span>
                    </div>
                    <p className="text-xs text-gray-300">Amazon Basin - 15.2 hectares cleared in last 24h</p>
                    <p className="text-xs text-[#328CC1] mt-1">2 hours ago</p>
                  </div>

                  <div className="p-4 bg-orange-900/20 border border-orange-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Coral Bleaching</span>
                    </div>
                    <p className="text-xs text-gray-300">Great Barrier Reef - Temperature spike detected</p>
                    <p className="text-xs text-[#328CC1] mt-1">4 hours ago</p>
                  </div>

                  <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Pollution Report</span>
                    </div>
                    <p className="text-xs text-gray-300">Pacific Ocean - Plastic waste concentration increased</p>
                    <p className="text-xs text-[#328CC1] mt-1">6 hours ago</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">My Projects</h3>
                <Button className="bg-[#145214] hover:bg-[#145214]/80" onClick={handleCreateProject}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Project
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm hover:bg-black/60 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <Badge className="bg-[#145214]/20 text-[#145214] border-[#328CC1]/40">{project.category}</Badge>
                        <Badge
                          variant={
                            project.urgency === "Critical"
                              ? "destructive"
                              : project.urgency === "High"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {project.urgency}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="flex items-center text-[#328CC1]">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Funded: {project.funded}</span>
                            <span>Goal: {project.goal}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-[#328CC1] to-[#145214] h-3 rounded-full transition-all duration-500"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-center mt-1">{project.progress}% Complete</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#328CC1]/40 bg-transparent"
                            onClick={() => handleViewProject(project.id)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" className="bg-[#145214] hover:bg-[#145214]/80" onClick={handleFundProject}>
                            <Heart className="w-4 h-4 mr-1" />
                            Fund
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="mt-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Environmental Alerts</h3>

              <div className="space-y-4">
                <div className="p-6 bg-red-900/20 border border-red-500/20 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div>
                        <h4 className="font-medium text-red-400">Critical Deforestation Alert</h4>
                        <p className="text-sm text-gray-300">Amazon Rainforest, Brazil</p>
                      </div>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">
                    Satellite imagery shows 15.2 hectares of primary forest cleared in the last 24 hours. Immediate
                    intervention required.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleTakeAction("Deforestation")}
                    >
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Take Action
                    </Button>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                </div>

                <div className="p-6 bg-orange-900/20 border border-orange-500/20 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                      <div>
                        <h4 className="font-medium text-orange-400">Coral Bleaching Event</h4>
                        <p className="text-sm text-gray-300">Great Barrier Reef, Australia</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-600">High</Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">
                    Water temperature spike of 2.5°C above normal detected. Coral bleaching event likely in progress.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700"
                      onClick={() => handleMonitorAlert("Coral Bleaching")}
                    >
                      <Fish className="w-4 h-4 mr-1" />
                      Monitor
                    </Button>
                    <span className="text-xs text-gray-400">4 hours ago</span>
                  </div>
                </div>

                <div className="p-6 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <div>
                        <h4 className="font-medium text-blue-400">Marine Pollution Increase</h4>
                        <p className="text-sm text-gray-300">Pacific Ocean</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-600">Medium</Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">
                    Plastic waste concentration increased by 15% in the North Pacific Gyre over the past week.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleAnalyzeAlert("Marine Pollution")}
                    >
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Analyze
                    </Button>
                    <span className="text-xs text-gray-400">6 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Impact Analytics</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-[#145214]" />
                      <span>Carbon Impact</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#145214]">89.2K</p>
                      <p className="text-sm text-gray-300">Tons CO₂ Prevented</p>
                      <div className="mt-4 flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-[#145214] rounded-full"></div>
                        <span className="text-xs text-[#145214]">+12% this month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TreePine className="w-5 h-5 text-[#328CC1]" />
                      <span>Forest Protected</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#328CC1]">1,247</p>
                      <p className="text-sm text-gray-300">Hectares Saved</p>
                      <div className="mt-4 flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-[#328CC1] rounded-full"></div>
                        <span className="text-xs text-[#328CC1]">+8% this month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Fish className="w-5 h-5 text-[#145214]" />
                      <span>Marine Life</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#145214]">3,456</p>
                      <p className="text-sm text-gray-300">Species Protected</p>
                      <div className="mt-4 flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-[#145214] rounded-full"></div>
                        <span className="text-xs text-[#145214]">+15% this month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Project Success Rate</CardTitle>
                  <CardDescription>Track the completion rate of environmental projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#145214]" />
                        <span>Completed Projects</span>
                      </div>
                      <span className="font-semibold">87%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div className="bg-[#145214] h-3 rounded-full" style={{ width: "87%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-[#328CC1]" />
                        <span>In Progress</span>
                      </div>
                      <span className="font-semibold">13%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div className="bg-[#328CC1] h-3 rounded-full" style={{ width: "13%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
