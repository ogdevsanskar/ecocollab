"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Search,
  Activity,
  Zap,
  Globe,
  TreePine,
  Waves,
  Wind,
  MessageSquare,
  Bell,
  Eye,
  Target,
  Calendar,
} from "lucide-react"

export default function AnalyticsPage() {
  const [query, setQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [aiResponse, setAiResponse] = useState("")

  const handleNaturalLanguageQuery = async () => {
    if (!query.trim()) return

    setIsProcessing(true)
    // Simulate AI processing
    setTimeout(() => {
      const responses = {
        "show funded coral projects in pacific":
          "Found 12 coral restoration projects in the Pacific region with total funding of 234.5 ETH. Top project: Great Barrier Reef Initiative (78.2 ETH raised).",
        "deforestation trends amazon":
          "Amazon deforestation has decreased by 23% this quarter. AI models predict continued improvement with current conservation efforts.",
        "carbon emissions spike":
          "Detected unusual CO₂ spike in Southeast Asia region (+15% above normal). Likely causes: industrial activity increase and reduced forest cover.",
        "coral health predictions":
          "AI models predict 67% coral recovery probability in monitored reefs over next 2 years with current protection measures.",
      }

      const lowerQuery = query.toLowerCase()
      let response = "AI Analysis: "

      if (lowerQuery.includes("coral") && lowerQuery.includes("pacific")) {
        response += responses["show funded coral projects in pacific"]
      } else if (lowerQuery.includes("deforestation") && lowerQuery.includes("amazon")) {
        response += responses["deforestation trends amazon"]
      } else if (lowerQuery.includes("carbon") || lowerQuery.includes("co2")) {
        response += responses["carbon emissions spike"]
      } else if (lowerQuery.includes("coral") && lowerQuery.includes("health")) {
        response += responses["coral health predictions"]
      } else {
        response += `Based on current environmental data, I found ${Math.floor(Math.random() * 50) + 10} relevant data points. The analysis shows ${Math.floor(Math.random() * 30) + 40}% improvement in the queried environmental metrics over the past quarter.`
      }

      setAiResponse(response)
      setIsProcessing(false)
    }, 2000)
  }

  const anomalies = [
    {
      id: 1,
      type: "CO₂ Spike",
      location: "Southeast Asia",
      severity: "High",
      change: "+15%",
      description: "Unusual carbon emission increase detected",
      icon: Wind,
      color: "#ff4444",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "Deforestation Alert",
      location: "Amazon Basin",
      severity: "Medium",
      change: "+8%",
      description: "Increased forest loss in protected area",
      icon: TreePine,
      color: "#ff8800",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      type: "Ocean Temperature",
      location: "Great Barrier Reef",
      severity: "Low",
      change: "+2°C",
      description: "Temperature rise above seasonal average",
      icon: Waves,
      color: "#ffaa00",
      timestamp: "1 day ago",
    },
  ]

  const predictions = [
    {
      title: "Deforestation Trends",
      region: "Amazon Rainforest",
      prediction: "23% reduction expected",
      confidence: 87,
      timeframe: "Next 6 months",
      icon: TreePine,
      color: "#145214",
    },
    {
      title: "Coral Recovery",
      region: "Pacific Reefs",
      prediction: "67% recovery probability",
      confidence: 74,
      timeframe: "Next 2 years",
      icon: Waves,
      color: "#328CC1",
    },
    {
      title: "Species Survival",
      region: "Global",
      prediction: "15% population increase",
      confidence: 92,
      timeframe: "Next 5 years",
      icon: Globe,
      color: "#0B3C5D",
    },
  ]

  const insights = [
    {
      title: "Funding Impact Analysis",
      description: "Projects with blockchain funding show 34% higher success rates",
      metric: "+34%",
      trend: "up",
    },
    {
      title: "Data Quality Score",
      description: "AI validation has improved data accuracy by 45%",
      metric: "95.2%",
      trend: "up",
    },
    {
      title: "Community Engagement",
      description: "Verified contributors provide 67% more reliable data",
      metric: "+67%",
      trend: "up",
    },
    {
      title: "Project Success Rate",
      description: "Milestone-based funding increases completion by 28%",
      metric: "89%",
      trend: "up",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0B3C5D] to-[#0A0A0A] text-[#F6F6F6]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#328CC1] to-[#145214] bg-clip-text text-transparent">
            AI-Powered Analytics
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Advanced insights, anomaly detection, and predictive analytics for environmental data using artificial
            intelligence.
          </p>
        </div>

        {/* Natural Language Query */}
        <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-[#328CC1]" />
              Natural Language Queries
            </CardTitle>
            <p className="text-sm text-gray-300">Ask questions about environmental data in plain English</p>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="e.g., 'Show funded coral projects in Pacific' or 'Deforestation trends in Amazon'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-black/20 border-[#328CC1]/20"
                onKeyPress={(e) => e.key === "Enter" && handleNaturalLanguageQuery()}
              />
              <Button
                onClick={handleNaturalLanguageQuery}
                disabled={isProcessing || !query.trim()}
                className="bg-[#328CC1] hover:bg-[#328CC1]/80"
              >
                {isProcessing ? (
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                {isProcessing ? "Processing..." : "Analyze"}
              </Button>
            </div>

            {aiResponse && (
              <div className="mt-4 p-4 bg-[#145214]/20 border border-[#145214]/40 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 text-[#145214] mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#145214] mb-1">AI Analysis Result</p>
                    <p className="text-sm text-gray-300">{aiResponse}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4">
              <p className="text-xs text-gray-400 mb-2">Try these example queries:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Show funded coral projects in Pacific",
                  "Deforestation trends Amazon",
                  "Carbon emissions spike",
                  "Coral health predictions",
                ].map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(example)}
                    className="text-xs border-[#328CC1]/40 text-[#328CC1] hover:bg-[#328CC1]/10"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Anomaly Detection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-[#ff4444]" />
            Real-Time Anomaly Detection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {anomalies.map((anomaly) => {
              const IconComponent = anomaly.icon
              return (
                <Card
                  key={anomaly.id}
                  className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm hover:bg-black/60 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${anomaly.color}20` }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: anomaly.color }} />
                      </div>
                      <Badge
                        variant="outline"
                        className={`${
                          anomaly.severity === "High"
                            ? "border-red-500/40 text-red-400"
                            : anomaly.severity === "Medium"
                              ? "border-orange-500/40 text-orange-400"
                              : "border-yellow-500/40 text-yellow-400"
                        }`}
                      >
                        {anomaly.severity}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{anomaly.type}</CardTitle>
                    <p className="text-sm text-gray-300">{anomaly.location}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-300">{anomaly.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold" style={{ color: anomaly.color }}>
                          {anomaly.change}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {anomaly.timestamp}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-[#328CC1]/40 text-[#328CC1] hover:bg-[#328CC1]/10 bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Investigate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Predictive Analytics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Target className="w-6 h-6 mr-2 text-[#328CC1]" />
            Predictive Analytics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((prediction, index) => {
              const IconComponent = prediction.icon
              return (
                <Card key={index} className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${prediction.color}20` }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: prediction.color }} />
                    </div>
                    <CardTitle className="text-lg">{prediction.title}</CardTitle>
                    <p className="text-sm text-gray-300">{prediction.region}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-lg font-bold mb-2" style={{ color: prediction.color }}>
                          {prediction.prediction}
                        </p>
                        <p className="text-sm text-gray-300">{prediction.timeframe}</p>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Confidence Level</span>
                          <span>{prediction.confidence}%</span>
                        </div>
                        <Progress value={prediction.confidence} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* AI Insights */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-[#145214]" />
            AI-Generated Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <Card key={index} className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{insight.title}</h3>
                      <p className="text-sm text-gray-300 mb-3">{insight.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#145214] mb-1">{insight.metric}</p>
                      <TrendingUp className="w-5 h-5 text-[#145214] ml-auto" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-[#145214]/40 text-[#145214]">
                      Positive Impact
                    </Badge>
                    <Button size="sm" variant="ghost" className="text-[#328CC1] hover:text-[#328CC1]/80">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Real-time Alerts */}
        <Card className="bg-gradient-to-r from-[#0B3C5D]/40 to-[#145214]/40 border-[#328CC1]/20 backdrop-blur-sm mt-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 flex items-center">
                  <Bell className="w-6 h-6 mr-2 text-[#328CC1]" />
                  Real-Time Alert System
                </h3>
                <p className="text-gray-300">
                  Get instant notifications when AI detects environmental anomalies or significant changes
                </p>
              </div>
              <Zap className="w-12 h-12 text-[#328CC1]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#328CC1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-[#328CC1]" />
                </div>
                <h4 className="font-semibold mb-2">Real-Time Monitoring</h4>
                <p className="text-sm text-gray-300">24/7 AI surveillance of environmental data streams</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#145214]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-[#145214]" />
                </div>
                <h4 className="font-semibold mb-2">Instant Alerts</h4>
                <p className="text-sm text-gray-300">Immediate notifications for critical environmental changes</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#0B3C5D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-[#0B3C5D]" />
                </div>
                <h4 className="font-semibold mb-2">Predictive Warnings</h4>
                <p className="text-sm text-gray-300">Early warning system for potential environmental threats</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
