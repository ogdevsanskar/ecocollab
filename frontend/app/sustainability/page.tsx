"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  Target,
  Globe,
  Waves,
  TreePine,
  BarChart3,
  MapPin,
  Calendar,
  Award,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

export default function SustainabilityPage() {
  const [selectedRegion, setSelectedRegion] = useState("global")
  const [selectedTimeframe, setSelectedTimeframe] = useState("2024")
  const [userRole, setUserRole] = useState<string | null>(null)

  // SDG Progress Data
  const sdgData = {
    sdg13: {
      title: "Climate Action",
      icon: Globe,
      color: "#0B3C5D",
      progress: 67,
      status: "On Track",
      targets: [
        { id: "13.1", name: "Strengthen resilience to climate hazards", progress: 72, trend: "up" },
        { id: "13.2", name: "Integrate climate measures into policies", progress: 58, trend: "up" },
        { id: "13.3", name: "Improve education on climate change", progress: 81, trend: "up" },
        { id: "13.a", name: "Mobilize climate finance", progress: 45, trend: "down" },
        { id: "13.b", name: "Promote climate planning in LDCs", progress: 63, trend: "up" },
      ],
    },
    sdg14: {
      title: "Life Below Water",
      icon: Waves,
      color: "#328CC1",
      progress: 52,
      status: "Needs Attention",
      targets: [
        { id: "14.1", name: "Reduce marine pollution", progress: 48, trend: "up" },
        { id: "14.2", name: "Protect marine ecosystems", progress: 61, trend: "up" },
        { id: "14.3", name: "Minimize ocean acidification", progress: 39, trend: "down" },
        { id: "14.4", name: "Regulate fishing practices", progress: 67, trend: "up" },
        { id: "14.5", name: "Conserve marine areas", progress: 58, trend: "up" },
      ],
    },
    sdg15: {
      title: "Life on Land",
      icon: TreePine,
      color: "#145214",
      progress: 59,
      status: "Moderate Progress",
      targets: [
        { id: "15.1", name: "Conserve terrestrial ecosystems", progress: 64, trend: "up" },
        { id: "15.2", name: "Halt deforestation", progress: 42, trend: "down" },
        { id: "15.3", name: "Combat desertification", progress: 56, trend: "up" },
        { id: "15.4", name: "Conserve mountain ecosystems", progress: 71, trend: "up" },
        { id: "15.5", name: "Protect biodiversity", progress: 53, trend: "down" },
      ],
    },
  }

  const regionalData = {
    global: { name: "Global", population: "8.1B", projects: 2847 },
    africa: { name: "Africa", population: "1.4B", projects: 523 },
    asia: { name: "Asia", population: "4.7B", projects: 1204 },
    europe: { name: "Europe", population: "748M", projects: 687 },
    americas: { name: "Americas", population: "1.0B", projects: 433 },
  }

  const impactMetrics = [
    { label: "CO₂ Reduced", value: "2.4M", unit: "tons", trend: "up", change: "+12%" },
    { label: "Forest Protected", value: "847K", unit: "hectares", trend: "up", change: "+8%" },
    { label: "Ocean Cleaned", value: "156K", unit: "tons plastic", trend: "up", change: "+15%" },
    { label: "Species Protected", value: "1,247", unit: "species", trend: "up", change: "+6%" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-[#145214] text-white"
      case "Needs Attention":
        return "bg-orange-600 text-white"
      case "Moderate Progress":
        return "bg-[#328CC1] text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? TrendingUp : TrendingDown
  }

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-[#145214]" : "text-red-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0A0A0A] to-[#0B3C5D]/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-[#F6F6F6] mb-2">Sustainability Scorecards</h1>
              <p className="text-[#328CC1] text-lg">Track progress against SDG 13, 14, and 15 goals</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-40 bg-black/40 border-[#328CC1]/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(regionalData).map(([key, data]) => (
                    <SelectItem key={key} value={key}>
                      {data.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32 bg-black/40 border-[#328CC1]/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Regional Overview */}
          <Card className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-8 h-8 text-[#328CC1]" />
                  <div>
                    <p className="text-sm text-gray-400">Region</p>
                    <p className="text-xl font-bold text-[#F6F6F6]">
                      {regionalData[selectedRegion as keyof typeof regionalData].name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-8 h-8 text-[#145214]" />
                  <div>
                    <p className="text-sm text-gray-400">Population</p>
                    <p className="text-xl font-bold text-[#F6F6F6]">
                      {regionalData[selectedRegion as keyof typeof regionalData].population}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-8 h-8 text-[#328CC1]" />
                  <div>
                    <p className="text-sm text-gray-400">Active Projects</p>
                    <p className="text-xl font-bold text-[#F6F6F6]">
                      {regionalData[selectedRegion as keyof typeof regionalData].projects}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-8 h-8 text-[#145214]" />
                  <div>
                    <p className="text-sm text-gray-400">Reporting Period</p>
                    <p className="text-xl font-bold text-[#F6F6F6]">{selectedTimeframe}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {impactMetrics.map((metric, index) => {
            const TrendIcon = getTrendIcon(metric.trend)
            return (
              <Card key={index} className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-400">{metric.label}</p>
                    <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
                      <TrendIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{metric.change}</span>
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-[#F6F6F6]">{metric.value}</p>
                    <p className="text-sm text-gray-400">{metric.unit}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* SDG Scorecards */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-black/40 border-[#328CC1]/30">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sdg13">SDG 13</TabsTrigger>
            <TabsTrigger value="sdg14">SDG 14</TabsTrigger>
            <TabsTrigger value="sdg15">SDG 15</TabsTrigger>
            <TabsTrigger value="reporting">Reporting</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(sdgData).map(([key, sdg]) => {
                const IconComponent = sdg.icon
                return (
                  <Card key={key} className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: sdg.color }}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-[#F6F6F6]">{sdg.title}</CardTitle>
                            <CardDescription>SDG {key.replace("sdg", "")}</CardDescription>
                          </div>
                        </div>
                        <Badge className={getStatusColor(sdg.status)}>{sdg.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Overall Progress</span>
                            <span className="text-sm font-medium text-[#F6F6F6]">{sdg.progress}%</span>
                          </div>
                          <Progress value={sdg.progress} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-[#F6F6F6]">Key Targets:</p>
                          {sdg.targets.slice(0, 3).map((target) => {
                            const TrendIcon = getTrendIcon(target.trend)
                            return (
                              <div key={target.id} className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">{target.id}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-[#F6F6F6]">{target.progress}%</span>
                                  <TrendIcon className={`w-3 h-3 ${getTrendColor(target.trend)}`} />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {Object.entries(sdgData).map(([key, sdg]) => (
            <TabsContent key={key} value={key}>
              <Card className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-16 h-16 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: sdg.color }}
                    >
                      <sdg.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-[#F6F6F6]">{sdg.title}</CardTitle>
                      <CardDescription className="text-lg">
                        Detailed progress tracking for SDG {key.replace("sdg", "")}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {sdg.targets.map((target) => {
                      const TrendIcon = getTrendIcon(target.trend)
                      return (
                        <div key={target.id} className="border border-[#328CC1]/20 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <Badge variant="outline" className="border-[#328CC1]/50 text-[#328CC1]">
                                {target.id}
                              </Badge>
                              <h3 className="font-medium text-[#F6F6F6]">{target.name}</h3>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-[#F6F6F6]">{target.progress}%</span>
                              <TrendIcon className={`w-5 h-5 ${getTrendColor(target.trend)}`} />
                            </div>
                          </div>
                          <Progress value={target.progress} className="h-3" />
                          <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-gray-400">
                              {target.progress >= 70
                                ? "On track"
                                : target.progress >= 50
                                  ? "Moderate progress"
                                  : "Needs attention"}
                            </span>
                            <span className={getTrendColor(target.trend)}>
                              {target.trend === "up" ? "Improving" : "Declining"}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}

          <TabsContent value="reporting">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#F6F6F6] flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Generate Reports</span>
                  </CardTitle>
                  <CardDescription>Create comprehensive sustainability reports for stakeholders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button className="w-full bg-[#0B3C5D] hover:bg-[#0B3C5D]/80 text-white">
                      <Award className="w-4 h-4 mr-2" />
                      Annual Sustainability Report
                    </Button>
                    <Button variant="outline" className="w-full border-[#328CC1]/50 text-[#328CC1] bg-transparent">
                      <Target className="w-4 h-4 mr-2" />
                      SDG Progress Summary
                    </Button>
                    <Button variant="outline" className="w-full border-[#145214]/50 text-[#145214] bg-transparent">
                      <Globe className="w-4 h-4 mr-2" />
                      Regional Impact Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-[#328CC1]/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#F6F6F6] flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Action Items</span>
                  </CardTitle>
                  <CardDescription>Priority areas requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium text-[#F6F6F6]">Ocean Acidification</p>
                        <p className="text-sm text-gray-400">SDG 14.3 - 39% progress</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="font-medium text-[#F6F6F6]">Deforestation</p>
                        <p className="text-sm text-gray-400">SDG 15.2 - 42% progress</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-[#145214]/10 border border-[#145214]/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-[#145214]" />
                      <div>
                        <p className="font-medium text-[#F6F6F6]">Climate Education</p>
                        <p className="text-sm text-gray-400">SDG 13.3 - 81% progress</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
