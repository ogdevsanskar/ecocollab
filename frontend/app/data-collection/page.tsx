"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"
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
  Filter,
  Calendar,
} from "lucide-react"

export default function DataCollectionPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

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

  const recentSubmissions = [
    {
      id: 1,
      type: "Deforestation",
      title: "Deforestation Alert - Costa Rica",
      description: "Illegal logging activity detected with GPS coordinates",
      location: "Costa Rica",
      submitter: "EcoWatcher_CR",
      time: "15 minutes ago",
      status: "Urgent",
      verified: false,
      icon: TreePine,
    },
    {
      id: 2,
      type: "Marine Species",
      title: "Marine Species Sighting - Mediterranean",
      description: "Rare dolphin species spotted with photo evidence",
      location: "Mediterranean Sea",
      submitter: "MarineBio_IT",
      time: "2 hours ago",
      status: "Verified",
      verified: true,
      icon: Fish,
    },
    {
      id: 3,
      type: "Air Quality",
      title: "Air Quality Measurement - Beijing",
      description: "PM2.5 levels recorded at 85 μg/m³",
      location: "Beijing, China",
      submitter: "AirWatch_CN",
      time: "4 hours ago",
      status: "High",
      verified: true,
      icon: BarChart3,
    },
    {
      id: 4,
      type: "Biodiversity",
      title: "Endangered Species Sighting - Amazon",
      description: "Jaguar spotted in protected area with camera trap",
      location: "Amazon Rainforest",
      submitter: "WildlifeGuard_BR",
      time: "6 hours ago",
      status: "Verified",
      verified: true,
      icon: Leaf,
    },
  ]

  const dataStats = {
    totalSubmissions: "48.2K",
    verifiedData: "42.1K",
    activeContributors: "8.7K",
    dataPoints: "156K",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0B3C5D] to-[#0A0A0A] text-[#F6F6F6]">
      <Navigation isWalletConnected={isWalletConnected} userRole={userRole} onConnectWallet={connectWallet} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Crowdsourced Environmental Data Collection</h1>
          <p className="text-gray-300">
            Contribute environmental observations and help build the world's largest climate database
          </p>
        </div>

        {/* Data Collection Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#328CC1]">Total Submissions</p>
                  <p className="text-2xl font-bold">{dataStats.totalSubmissions}</p>
                </div>
                <Upload className="w-8 h-8 text-[#145214]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#328CC1]">Verified Data</p>
                  <p className="text-2xl font-bold">{dataStats.verifiedData}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-[#145214]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#328CC1]">Active Contributors</p>
                  <p className="text-2xl font-bold">{dataStats.activeContributors}</p>
                </div>
                <Camera className="w-8 h-8 text-[#145214]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#328CC1]">Data Points</p>
                  <p className="text-2xl font-bold">{dataStats.dataPoints}</p>
                </div>
                <Database className="w-8 h-8 text-[#145214]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Collection Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black/40 border border-[#328CC1]/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="submit">Submit Data</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Tools</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              {/* Data Collection Types */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {dataCollectionTypes.map((dataType) => {
                  const IconComponent = dataType.icon
                  return (
                    <Card key={dataType.type} className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-[#328CC1]">{dataType.type}</p>
                            <p className="text-2xl font-bold">{dataType.submissions.toLocaleString()}</p>
                            <p className="text-xs text-gray-400">submissions</p>
                          </div>
                          <IconComponent className="w-8 h-8" style={{ color: dataType.color }} />
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Data Collection Tools */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Smartphone className="w-5 h-5 text-[#328CC1]" />
                      <span>Mobile Data Collection</span>
                    </CardTitle>
                    <CardDescription>Upload environmental data using your mobile device</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Button className="h-16 bg-[#328CC1]/20 hover:bg-[#328CC1]/30 border border-[#328CC1]/40 flex flex-col items-center justify-center space-y-1">
                        <Camera className="w-5 h-5" />
                        <span className="text-xs">Photo Upload</span>
                      </Button>
                      <Button className="h-16 bg-[#145214]/20 hover:bg-[#145214]/30 border border-[#145214]/40 flex flex-col items-center justify-center space-y-1">
                        <MapPin className="w-5 h-5" />
                        <span className="text-xs">GPS Location</span>
                      </Button>
                    </div>
                    <Button className="w-full bg-[#328CC1] hover:bg-[#328CC1]/80">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Launch Mobile App
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Database className="w-5 h-5 text-[#145214]" />
                      <span>Web Data Portal</span>
                    </CardTitle>
                    <CardDescription>Submit detailed environmental observations and measurements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Input placeholder="Location coordinates" className="bg-black/40 border-[#328CC1]/20" />
                      <Input placeholder="Environmental observation" className="bg-black/40 border-[#328CC1]/20" />
                      <Input placeholder="Measurement value" className="bg-black/40 border-[#328CC1]/20" />
                    </div>
                    <Button className="w-full bg-[#145214] hover:bg-[#145214]/80">
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Observation
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Submissions */}
              <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Community Submissions</CardTitle>
                  <CardDescription>Latest environmental data from citizen scientists</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSubmissions.slice(0, 3).map((submission) => {
                      const IconComponent = submission.icon
                      return (
                        <div key={submission.id} className="p-4 bg-black/20 rounded-lg border border-[#328CC1]/10">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  submission.type === "Deforestation"
                                    ? "bg-[#145214]/20"
                                    : submission.type === "Marine Species"
                                      ? "bg-[#328CC1]/20"
                                      : submission.type === "Air Quality"
                                        ? "bg-[#0B3C5D]/20"
                                        : "bg-[#145214]/20"
                                }`}
                              >
                                <IconComponent
                                  className="w-5 h-5"
                                  color={
                                    submission.type === "Deforestation"
                                      ? "#145214"
                                      : submission.type === "Marine Species"
                                        ? "#328CC1"
                                        : submission.type === "Air Quality"
                                          ? "#0B3C5D"
                                          : "#145214"
                                  }
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">{submission.title}</h4>
                                <p className="text-xs text-gray-300">{submission.description}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <MapPin className="w-3 h-3 text-[#328CC1]" />
                                  <span className="text-xs text-[#328CC1]">{submission.location}</span>
                                </div>
                              </div>
                            </div>
                            <Badge
                              className={
                                submission.status === "Urgent"
                                  ? "bg-red-600"
                                  : submission.status === "Verified"
                                    ? "bg-[#145214]"
                                    : submission.status === "High"
                                      ? "bg-orange-600"
                                      : "bg-gray-600"
                              }
                            >
                              {submission.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>Submitted by: {submission.submitter}</span>
                            <span>{submission.time}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="submit" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Submit Environmental Data</h3>
                <Button className="bg-[#145214] hover:bg-[#145214]/80">
                  <Eye className="w-4 h-4 mr-2" />
                  View Guidelines
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Environmental Observation Form</CardTitle>
                    <CardDescription>Submit detailed environmental data and observations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Observation Type</label>
                        <select className="w-full p-2 bg-black/40 border border-[#328CC1]/20 rounded-md text-[#F6F6F6]">
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
                        <select className="w-full p-2 bg-black/40 border border-[#328CC1]/20 rounded-md text-[#F6F6F6]">
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                          <option>Critical</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Latitude</label>
                        <Input placeholder="e.g., 40.7128" className="bg-black/40 border-[#328CC1]/20" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Longitude</label>
                        <Input placeholder="e.g., -74.0060" className="bg-black/40 border-[#328CC1]/20" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Location Description</label>
                      <Input
                        placeholder="e.g., Amazon Rainforest, Brazil"
                        className="bg-black/40 border-[#328CC1]/20"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Observation Details</label>
                      <Textarea
                        placeholder="Describe what you observed, including any measurements, species identified, or environmental changes..."
                        className="bg-black/40 border-[#328CC1]/20 min-h-[100px]"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Photo Evidence</label>
                      <div className="border-2 border-dashed border-[#328CC1]/40 rounded-lg p-6 text-center">
                        <Camera className="w-8 h-8 text-[#328CC1] mx-auto mb-2" />
                        <p className="text-sm text-gray-300 mb-2">Upload photos or drag and drop</p>
                        <Button variant="outline" className="border-[#328CC1]/40 bg-transparent">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Files
                        </Button>
                      </div>
                    </div>

                    <Button className="w-full bg-[#145214] hover:bg-[#145214]/80">
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Observation
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Quick Data Entry</CardTitle>
                      <CardDescription>Fast submission for common observations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <Button className="h-20 bg-red-600/20 hover:bg-red-600/30 border border-red-600/40 flex flex-col items-center justify-center space-y-1">
                          <AlertTriangle className="w-6 h-6 text-red-500" />
                          <span className="text-xs">Report Emergency</span>
                        </Button>
                        <Button className="h-20 bg-[#145214]/20 hover:bg-[#145214]/30 border border-[#145214]/40 flex flex-col items-center justify-center space-y-1">
                          <TreePine className="w-6 h-6 text-[#145214]" />
                          <span className="text-xs">Forest Alert</span>
                        </Button>
                        <Button className="h-20 bg-[#328CC1]/20 hover:bg-[#328CC1]/30 border border-[#328CC1]/40 flex flex-col items-center justify-center space-y-1">
                          <Fish className="w-6 h-6 text-[#328CC1]" />
                          <span className="text-xs">Marine Life</span>
                        </Button>
                        <Button className="h-20 bg-[#0B3C5D]/20 hover:bg-[#0B3C5D]/30 border border-[#0B3C5D]/40 flex flex-col items-center justify-center space-y-1">
                          <BarChart3 className="w-6 h-6 text-[#0B3C5D]" />
                          <span className="text-xs">Air Quality</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Submission Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#145214] mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Accurate Location</p>
                          <p className="text-xs text-gray-300">Provide precise GPS coordinates when possible</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#145214] mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Clear Photos</p>
                          <p className="text-xs text-gray-300">Upload high-quality images as evidence</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#145214] mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Detailed Description</p>
                          <p className="text-xs text-gray-300">Include measurements and context</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mobile" className="mt-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Mobile Data Collection Tools</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Smartphone className="w-5 h-5 text-[#328CC1]" />
                      <span>EcoChain Mobile</span>
                    </CardTitle>
                    <CardDescription>Official mobile app for data collection</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#145214]" />
                        <span className="text-sm">GPS auto-location</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#145214]" />
                        <span className="text-sm">Offline data collection</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#145214]" />
                        <span className="text-sm">Photo compression</span>
                      </div>
                    </div>
                    <Button className="w-full bg-[#328CC1] hover:bg-[#328CC1]/80">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Download App
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Camera className="w-5 h-5 text-[#145214]" />
                      <span>Photo Tools</span>
                    </CardTitle>
                    <CardDescription>Advanced photo collection features</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#145214]" />
                        <span className="text-sm">Metadata embedding</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#145214]" />
                        <span className="text-sm">Time-lapse capture</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#145214]" />
                        <span className="text-sm">Species identification</span>
                      </div>
                    </div>
                    <Button className="w-full bg-[#145214] hover:bg-[#145214]/80">
                      <Camera className="w-4 h-4 mr-2" />
                      Launch Camera
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-[#0B3C5D]" />
                      <span>Location Services</span>
                    </CardTitle>
                    <CardDescription>Precise location tracking and mapping</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#145214]" />
                        <span className="text-sm">High-precision GPS</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#145214]" />
                        <span className="text-sm">Area mapping</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#145214]" />
                        <span className="text-sm">Route tracking</span>
                      </div>
                    </div>
                    <Button className="w-full bg-[#0B3C5D] hover:bg-[#0B3C5D]/80">
                      <MapPin className="w-4 h-4 mr-2" />
                      Enable GPS
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Mobile App Features</CardTitle>
                  <CardDescription>Comprehensive tools for field data collection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#328CC1]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Camera className="w-8 h-8 text-[#328CC1]" />
                      </div>
                      <h4 className="font-medium mb-2">Smart Camera</h4>
                      <p className="text-sm text-gray-300">AI-powered species identification and automatic tagging</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#145214]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MapPin className="w-8 h-8 text-[#145214]" />
                      </div>
                      <h4 className="font-medium mb-2">GPS Tracking</h4>
                      <p className="text-sm text-gray-300">Precise location recording with offline capability</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#0B3C5D]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Database className="w-8 h-8 text-[#0B3C5D]" />
                      </div>
                      <h4 className="font-medium mb-2">Data Sync</h4>
                      <p className="text-sm text-gray-300">Automatic synchronization when connection is available</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#328CC1]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-8 h-8 text-[#328CC1]" />
                      </div>
                      <h4 className="font-medium mb-2">Real-time Analysis</h4>
                      <p className="text-sm text-gray-300">Instant data validation and quality assessment</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Community Submissions</h3>
                <div className="flex items-center space-x-4">
                  <Input placeholder="Search submissions..." className="max-w-sm bg-black/40 border-[#328CC1]/20" />
                  <Button variant="outline" className="border-[#328CC1]/20 bg-transparent">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {recentSubmissions.map((submission) => {
                  const IconComponent = submission.icon
                  return (
                    <Card
                      key={submission.id}
                      className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm hover:bg-black/60 transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                submission.type === "Deforestation"
                                  ? "bg-[#145214]/20"
                                  : submission.type === "Marine Species"
                                    ? "bg-[#328CC1]/20"
                                    : submission.type === "Air Quality"
                                      ? "bg-[#0B3C5D]/20"
                                      : "bg-[#145214]/20"
                              }`}
                            >
                              <IconComponent
                                className="w-6 h-6"
                                color={
                                  submission.type === "Deforestation"
                                    ? "#145214"
                                    : submission.type === "Marine Species"
                                      ? "#328CC1"
                                      : submission.type === "Air Quality"
                                        ? "#0B3C5D"
                                        : "#145214"
                                }
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-lg">{submission.title}</h4>
                              <p className="text-sm text-gray-300 mb-2">{submission.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {submission.location}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {submission.time}
                                </span>
                                <span>By: {submission.submitter}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {submission.verified && (
                              <Badge className="bg-[#145214]">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <Badge
                              className={
                                submission.status === "Urgent"
                                  ? "bg-red-600"
                                  : submission.status === "Verified"
                                    ? "bg-[#145214]"
                                    : submission.status === "High"
                                      ? "bg-orange-600"
                                      : "bg-gray-600"
                              }
                            >
                              {submission.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" className="border-[#328CC1]/40 bg-transparent">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline" className="border-[#328CC1]/40 bg-transparent">
                              <MapPin className="w-4 h-4 mr-1" />
                              View on Map
                            </Button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" className="bg-[#145214] hover:bg-[#145214]/80">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Verify
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Data Analytics</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-[#145214]" />
                      <span>Submission Trends</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#145214]">+23%</p>
                      <p className="text-sm text-gray-300">This Month</p>
                      <div className="mt-4 flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-[#145214] rounded-full"></div>
                        <span className="text-xs text-[#145214]">Increasing trend</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#328CC1]" />
                      <span>Verification Rate</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#328CC1]">87.3%</p>
                      <p className="text-sm text-gray-300">Data Verified</p>
                      <div className="mt-4 flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-[#328CC1] rounded-full"></div>
                        <span className="text-xs text-[#328CC1]">High quality</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-[#145214]" />
                      <span>Response Time</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#145214]">2.4h</p>
                      <p className="text-sm text-gray-300">Avg. Verification</p>
                      <div className="mt-4 flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-[#145214] rounded-full"></div>
                        <span className="text-xs text-[#145214]">Fast response</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Data Quality Metrics</CardTitle>
                  <CardDescription>Track the quality and reliability of submitted data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Photo Quality</span>
                        <span className="text-sm text-[#145214]">92%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div className="bg-[#145214] h-3 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Location Accuracy</span>
                        <span className="text-sm text-[#328CC1]">89%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div className="bg-[#328CC1] h-3 rounded-full" style={{ width: "89%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Description Completeness</span>
                        <span className="text-sm text-[#0B3C5D]">76%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div className="bg-[#0B3C5D] h-3 rounded-full" style={{ width: "76%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Metadata Richness</span>
                        <span className="text-sm text-[#145214]">84%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div className="bg-[#145214] h-3 rounded-full" style={{ width: "84%" }}></div>
                      </div>
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
