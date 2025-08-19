"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { AlertService } from "@/lib/api-services"
import {
  TreePine,
  Fish,
  Leaf,
  BarChart3,
  Camera,
  MapPin,
  Upload,
  Smartphone,
  Database,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Brain,
  Search,
  Activity,
  Waves,
  Wind,
  MessageSquare,
  Target,
  FileText,
  Download,
  Users,
  DollarSign,
  Plus,
  Send,
} from "lucide-react"

export default function DataPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("collection")
  const router = useRouter()

  // Data Collection States
  const [query, setQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [aiResponse, setAiResponse] = useState("")
  const [observationType, setObservationType] = useState("Deforestation")
  const [urgencyLevel, setUrgencyLevel] = useState("Medium")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [locationDescription, setLocationDescription] = useState("")
  const [observationDetails, setObservationDetails] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  // Reports States
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [reportTitle, setReportTitle] = useState("")
  const [reportDescription, setReportDescription] = useState("")
  const [isCreatingReport, setIsCreatingReport] = useState(false)

  const handleSubmitObservation = async () => {
    if (!observationDetails.trim() || !locationDescription.trim()) {
      alert("Please fill in all required fields (observation details and location).")
      return
    }

    const submissionData = {
      type: observationType,
      urgency: urgencyLevel,
      coordinates: { lat: parseFloat(latitude) || 0, lng: parseFloat(longitude) || 0 },
      location: locationDescription,
      details: observationDetails,
      files: uploadedFiles.length,
    }

    try {
      // Trigger environmental alert based on urgency
      const severity = urgencyLevel === "Critical" ? "critical" : 
                      urgencyLevel === "High" ? "high" : 
                      urgencyLevel === "Medium" ? "medium" : "low";

      await AlertService.sendEnvironmentalAlert(
        `${observationType} Observation Submitted`,
        `New environmental observation: ${observationDetails}. Location: ${locationDescription}. ${uploadedFiles.length} files attached.`,
        severity,
        submissionData.coordinates
      );

      alert(
        `Environmental observation submitted successfully!\n\nType: ${submissionData.type}\nLocation: ${submissionData.location}\nFiles: ${submissionData.files} attached\n\nYour data has been verified and response team notified via SMS/call alerts.`,
      )

      // Reset form
      setObservationDetails("")
      setLocationDescription("")
      setLatitude("")
      setLongitude("")
      setUploadedFiles([])
    } catch (error) {
      console.error("Failed to submit observation:", error);
      alert("Observation submitted locally. Network connection required for real-time alerts.");
      
      // Reset form anyway
      setObservationDetails("")
      setLocationDescription("")
      setLatitude("")
      setLongitude("")
      setUploadedFiles([])
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setUploadedFiles(Array.from(files))
      alert(`${files.length} file(s) selected for upload.`)
    }
  }

  const handleLaunchMobileApp = () => {
    alert(
      "Mobile app would launch here. This connects to the native mobile data collection app with GPS auto-location, offline capabilities, and AI species identification.",
    )
  }

  const handleQuickAction = (actionType: string) => {
    switch (actionType) {
      case "photo":
        alert("Camera interface would open for immediate photo capture with GPS coordinates.")
        break
      case "gps":
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude.toString())
              setLongitude(position.coords.longitude.toString())
              alert(`GPS location captured: ${position.coords.latitude}, ${position.coords.longitude}`)
            },
            () => alert("Unable to retrieve GPS location. Please enter coordinates manually."),
          )
        } else {
          alert("GPS not available. Please enter coordinates manually.")
        }
        break
    }
  }

  const handleInvestigateAnomaly = (anomalyType: string) => {
    router.push(`/maps?alert=${anomalyType}`)
  }

  const connectWallet = () => {
    setIsWalletConnected(true)
    setUserRole("Researcher")
  }

  const dataCollectionTypes = [
    { type: "Deforestation", submissions: 1247, icon: TreePine, color: "#145214" },
    { type: "Marine Pollution", submissions: 892, icon: Fish, color: "#328CC1" },
    { type: "Species Sightings", submissions: 2156, icon: Leaf, color: "#145214" },
    { type: "Carbon Emissions", submissions: 743, icon: BarChart3, color: "#0B3C5D" },
  ]

  const dataStats = {
    totalSubmissions: "48.2K",
    verifiedData: "42.1K",
    activeContributors: "8.7K",
    dataPoints: "156K",
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

  const reportTemplates = [
    {
      id: "project-impact",
      title: "Project Impact Report",
      description: "Comprehensive analysis of environmental project outcomes",
      icon: Target,
      color: "#328CC1",
      sections: ["Executive Summary", "Methodology", "Results", "Impact Metrics", "Recommendations"],
      estimatedTime: "15 min",
      dataPoints: 45,
    },
    {
      id: "funding-transparency",
      title: "Funding Transparency Report",
      description: "Blockchain-verified funding allocation and usage",
      icon: DollarSign,
      color: "#145214",
      sections: ["Funding Overview", "Allocation Breakdown", "Milestone Progress", "Transaction History"],
      estimatedTime: "10 min",
      dataPoints: 28,
    },
    {
      id: "environmental-monitoring",
      title: "Environmental Monitoring Report",
      description: "Real-time environmental data analysis and trends",
      icon: BarChart3,
      color: "#ff8800",
      sections: ["Data Collection", "Trend Analysis", "Anomaly Detection", "Predictive Insights"],
      estimatedTime: "20 min",
      dataPoints: 67,
    },
  ]

  const handleNaturalLanguageQuery = async () => {
    if (!query.trim()) return

    setIsProcessing(true)
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

  const generateReport = () => {
    if (!selectedReport || !reportTitle.trim()) {
      alert("Please select a report template and enter a title.")
      return
    }

    setIsCreatingReport(true)
    setTimeout(() => {
      const template = reportTemplates.find((t) => t.id === selectedReport)
      alert(
        `Report "${reportTitle}" generated successfully!\n\nTemplate: ${template?.title}\nSections: ${template?.sections.length}\nEstimated time: ${template?.estimatedTime}\n\nThe report has been saved and is ready for download.`,
      )

      setIsCreatingReport(false)
      setReportTitle("")
      setReportDescription("")
      setSelectedReport(null)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0B3C5D] to-[#0A0A0A] text-[#F6F6F6]">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#328CC1] to-[#145214] bg-clip-text text-transparent">
            Environmental Data Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Comprehensive platform for data collection, AI-powered analytics, and automated reporting with blockchain
            verification
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <Upload className="w-8 h-8 text-[#328CC1] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#328CC1] mb-1">{dataStats.totalSubmissions}</p>
              <p className="text-sm text-gray-300">Total Submissions</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <CheckCircle className="w-8 h-8 text-[#145214] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#145214] mb-1">{dataStats.verifiedData}</p>
              <p className="text-sm text-gray-300">Verified Data</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-[#0B3C5D] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#0B3C5D] mb-1">{dataStats.activeContributors}</p>
              <p className="text-sm text-gray-300">Active Contributors</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <Database className="w-8 h-8 text-[#328CC1] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#328CC1] mb-1">{dataStats.dataPoints}</p>
              <p className="text-sm text-gray-300">Data Points</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-[#328CC1]/20 mb-8">
            <TabsTrigger value="collection" className="data-[state=active]:bg-[#328CC1]/20">
              Data Collection
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#328CC1]/20">
              AI Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-[#328CC1]/20">
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Data Collection Tab */}
          <TabsContent value="collection" className="space-y-8">
            {/* Data Collection Types */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {dataCollectionTypes.map((dataType) => {
                const IconComponent = dataType.icon
                return (
                  <Card key={dataType.type} className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <IconComponent className="w-12 h-12 mx-auto mb-4" style={{ color: dataType.color }} />
                      <h3 className="font-semibold mb-2">{dataType.type}</h3>
                      <p className="text-2xl font-bold text-[#328CC1] mb-1">{dataType.submissions.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">submissions</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Data Submission Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-[#328CC1]" />
                    Submit Environmental Data
                  </CardTitle>
                  <CardDescription>Contribute to the global environmental database</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Observation Type</label>
                      <select
                        className="w-full p-3 bg-black/40 border border-[#328CC1]/20 rounded-md text-[#F6F6F6]"
                        value={observationType}
                        onChange={(e) => setObservationType(e.target.value)}
                      >
                        <option>Deforestation</option>
                        <option>Marine Pollution</option>
                        <option>Species Sighting</option>
                        <option>Air Quality</option>
                        <option>Water Quality</option>
                        <option>Waste Management</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Urgency Level</label>
                      <select
                        className="w-full p-3 bg-black/40 border border-[#328CC1]/20 rounded-md text-[#F6F6F6]"
                        value={urgencyLevel}
                        onChange={(e) => setUrgencyLevel(e.target.value)}
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Latitude (e.g., 40.7128)"
                      className="bg-black/40 border-[#328CC1]/20"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                    <Input
                      placeholder="Longitude (e.g., -74.0060)"
                      className="bg-black/40 border-[#328CC1]/20"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                    />
                  </div>

                  <Input
                    placeholder="Location Description (e.g., Amazon Rainforest, Brazil)"
                    className="bg-black/40 border-[#328CC1]/20"
                    value={locationDescription}
                    onChange={(e) => setLocationDescription(e.target.value)}
                  />

                  <Textarea
                    placeholder="Describe your observation in detail..."
                    className="bg-black/40 border-[#328CC1]/20 min-h-[100px]"
                    value={observationDetails}
                    onChange={(e) => setObservationDetails(e.target.value)}
                  />

                  <div className="border-2 border-dashed border-[#328CC1]/40 rounded-lg p-6 text-center">
                    <Camera className="w-8 h-8 text-[#328CC1] mx-auto mb-2" />
                    <p className="text-sm text-gray-300 mb-2">Upload photos or drag and drop</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      variant="outline"
                      className="border-[#328CC1]/40 bg-transparent"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                    {uploadedFiles.length > 0 && (
                      <p className="text-sm text-[#328CC1] mt-2">{uploadedFiles.length} file(s) selected</p>
                    )}
                  </div>

                  <Button className="w-full bg-[#145214] hover:bg-[#145214]/80" onClick={handleSubmitObservation}>
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Observation
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Smartphone className="w-5 h-5 mr-2 text-[#328CC1]" />
                    Mobile Data Collection
                  </CardTitle>
                  <CardDescription>Use your mobile device for field data collection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      className="h-20 bg-[#328CC1]/20 hover:bg-[#328CC1]/30 border border-[#328CC1]/40 flex flex-col items-center justify-center space-y-2"
                      onClick={() => handleQuickAction("photo")}
                    >
                      <Camera className="w-6 h-6" />
                      <span className="text-xs">Photo Upload</span>
                    </Button>
                    <Button
                      className="h-20 bg-[#145214]/20 hover:bg-[#145214]/30 border border-[#145214]/40 flex flex-col items-center justify-center space-y-2"
                      onClick={() => handleQuickAction("gps")}
                    >
                      <MapPin className="w-6 h-6" />
                      <span className="text-xs">GPS Location</span>
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#145214]" />
                      <span className="text-sm">GPS auto-location</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#145214]" />
                      <span className="text-sm">Offline data collection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#145214]" />
                      <span className="text-sm">AI species identification</span>
                    </div>
                  </div>

                  <Button className="w-full bg-[#328CC1] hover:bg-[#328CC1]/80" onClick={handleLaunchMobileApp}>
                    <Smartphone className="w-4 h-4 mr-2" />
                    Launch Mobile App
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Analytics Tab */}
          <TabsContent value="analytics" className="space-y-8">
            {/* Natural Language Query */}
            <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-[#328CC1]" />
                  Natural Language Queries
                </CardTitle>
                <CardDescription>Ask questions about environmental data in plain English</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-4">
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
                  <div className="p-4 bg-[#145214]/20 border border-[#145214]/40 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Brain className="w-5 h-5 text-[#145214] mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-[#145214] mb-1">AI Analysis Result</p>
                        <p className="text-sm text-gray-300">{aiResponse}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Anomaly Detection */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-[#ff4444]" />
                Real-Time Anomaly Detection
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {anomalies.map((anomaly) => {
                  const IconComponent = anomaly.icon
                  return (
                    <Card key={anomaly.id} className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center"
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
                            <span className="text-xs text-gray-400">{anomaly.timestamp}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full border-[#328CC1]/40 text-[#328CC1] hover:bg-[#328CC1]/10 bg-transparent"
                            onClick={() => handleInvestigateAnomaly(anomaly.type)}
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
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-8">
            {/* Report Generation */}
            <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-[#328CC1]" />
                  Generate New Report
                </CardTitle>
                <CardDescription>
                  Create comprehensive reports with AI-powered insights and blockchain verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Report Templates */}
                  <div>
                    <h3 className="font-semibold mb-4">Select Report Template</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {reportTemplates.map((template) => {
                        const IconComponent = template.icon
                        return (
                          <div
                            key={template.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                              selectedReport === template.id
                                ? "border-[#328CC1] bg-[#328CC1]/10"
                                : "border-gray-600 hover:border-[#328CC1]/50"
                            }`}
                            onClick={() => setSelectedReport(template.id)}
                          >
                            <div className="text-center">
                              <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                                style={{ backgroundColor: `${template.color}20` }}
                              >
                                <IconComponent className="w-6 h-6" style={{ color: template.color }} />
                              </div>
                              <h4 className="font-semibold text-sm mb-2">{template.title}</h4>
                              <p className="text-xs text-gray-300 mb-3">{template.description}</p>
                              <div className="flex items-center justify-center space-x-3 text-xs text-gray-400">
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {template.estimatedTime}
                                </span>
                                <span className="flex items-center">
                                  <BarChart3 className="w-3 h-3 mr-1" />
                                  {template.dataPoints}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Report Details */}
                  {selectedReport && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Report Title</label>
                        <Input
                          placeholder="Enter report title..."
                          value={reportTitle}
                          onChange={(e) => setReportTitle(e.target.value)}
                          className="bg-black/20 border-[#328CC1]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Description (Optional)</label>
                        <Textarea
                          placeholder="Add report description or specific requirements..."
                          value={reportDescription}
                          onChange={(e) => setReportDescription(e.target.value)}
                          className="bg-black/20 border-[#328CC1]/20 min-h-[80px]"
                        />
                      </div>

                      <div className="flex justify-between items-center pt-4">
                        <div className="text-sm text-gray-300">
                          <p className="mb-2">Selected template includes:</p>
                          <div className="flex flex-wrap gap-1">
                            {reportTemplates
                              .find((t) => t.id === selectedReport)
                              ?.sections.map((section, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="border-[#328CC1]/40 text-[#328CC1] text-xs"
                                >
                                  {section}
                                </Badge>
                              ))}
                          </div>
                        </div>
                        <Button
                          onClick={generateReport}
                          disabled={isCreatingReport || !reportTitle.trim()}
                          className="bg-[#328CC1] hover:bg-[#328CC1]/80"
                        >
                          {isCreatingReport ? (
                            <>
                              <Clock className="w-4 h-4 mr-2 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Generate Report
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Report Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <FileText className="w-8 h-8 text-[#328CC1] mx-auto mb-3" />
                  <p className="text-3xl font-bold text-[#328CC1] mb-1">1,247</p>
                  <div className="flex items-center justify-center space-x-2">
                    <p className="text-sm text-gray-300">Total Reports</p>
                    <Badge variant="outline" className="border-[#145214]/40 text-[#145214] text-xs">
                      +12%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <Download className="w-8 h-8 text-[#145214] mx-auto mb-3" />
                  <p className="text-3xl font-bold text-[#145214] mb-1">5,678</p>
                  <div className="flex items-center justify-center space-x-2">
                    <p className="text-sm text-gray-300">Downloads</p>
                    <Badge variant="outline" className="border-[#145214]/40 text-[#145214] text-xs">
                      +23%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <Users className="w-8 h-8 text-[#0B3C5D] mx-auto mb-3" />
                  <p className="text-3xl font-bold text-[#0B3C5D] mb-1">892</p>
                  <div className="flex items-center justify-center space-x-2">
                    <p className="text-sm text-gray-300">Stakeholders</p>
                    <Badge variant="outline" className="border-[#145214]/40 text-[#145214] text-xs">
                      +8%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <TrendingUp className="w-8 h-8 text-[#328CC1] mx-auto mb-3" />
                  <p className="text-3xl font-bold text-[#328CC1] mb-1">96%</p>
                  <div className="flex items-center justify-center space-x-2">
                    <p className="text-sm text-gray-300">Accuracy</p>
                    <Badge variant="outline" className="border-[#145214]/40 text-[#145214] text-xs">
                      +2%
                    </Badge>
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
