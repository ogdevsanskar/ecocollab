"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Building2,
  GraduationCap,
  HandHeart,
  MessageSquare,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  Target,
  Plus,
  Eye,
  Filter,
  MapPin,
  TrendingUp,
} from "lucide-react"

export default function CollaborationPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const collaborationStats = {
    activeCollaborations: 23,
    stakeholderTypes: 4,
    ongoingProjects: 12,
    completedProjects: 8,
  }

  const stakeholderTypes = [
    { type: "Government", count: 15, icon: Building2, color: "#0B3C5D" },
    { type: "Academic", count: 28, icon: GraduationCap, color: "#328CC1" },
    { type: "NGO", count: 34, icon: HandHeart, color: "#145214" },
    { type: "Community", count: 67, icon: Users, color: "#328CC1" },
  ]

  const activeCollaborations = [
    {
      id: 1,
      title: "Global Ocean Cleanup Initiative",
      description: "Multi-national effort to reduce marine plastic pollution",
      status: "Active",
      participants: {
        governments: 3,
        universities: 5,
        ngos: 8,
        communities: 12,
      },
      progress: 65,
      startDate: "2024-01-15",
      location: "Pacific Ocean",
      funding: "$2.4M",
    },
    {
      id: 2,
      title: "Amazon Rainforest Monitoring Network",
      description: "Collaborative deforestation tracking and prevention",
      status: "Planning",
      participants: {
        governments: 2,
        universities: 7,
        ngos: 4,
        communities: 15,
      },
      progress: 25,
      startDate: "2024-03-01",
      location: "Amazon Basin",
      funding: "$1.8M",
    },
    {
      id: 3,
      title: "Urban Biodiversity Conservation",
      description: "City-wide ecosystem protection and restoration",
      status: "Active",
      participants: {
        governments: 1,
        universities: 3,
        ngos: 6,
        communities: 8,
      },
      progress: 80,
      startDate: "2023-11-20",
      location: "Singapore",
      funding: "$950K",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "meeting",
      title: "Ocean Cleanup Strategy Meeting",
      organization: "Marine Conservation Alliance",
      time: "2 hours ago",
      participants: 15,
    },
    {
      id: 2,
      type: "proposal",
      title: "New Coral Restoration Proposal",
      organization: "Pacific Research Institute",
      time: "4 hours ago",
      participants: 8,
    },
    {
      id: 3,
      type: "milestone",
      title: "Amazon Monitoring Phase 1 Complete",
      organization: "Forest Protection Coalition",
      time: "1 day ago",
      participants: 23,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0B3C5D] to-[#0A0A0A] text-[#F6F6F6]">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Multi-Stakeholder Collaboration Portal</h1>
          <p className="text-gray-300">
            Unite governments, academic institutions, NGOs, and local communities for environmental action
          </p>
        </div>

        {/* Collaboration Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#328CC1]">Active Collaborations</p>
                  <p className="text-2xl font-bold">{collaborationStats.activeCollaborations}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-[#145214]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#328CC1]">Stakeholder Types</p>
                  <p className="text-2xl font-bold">{collaborationStats.stakeholderTypes}</p>
                </div>
                <Users className="w-8 h-8 text-[#145214]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#328CC1]">Ongoing Projects</p>
                  <p className="text-2xl font-bold">{collaborationStats.ongoingProjects}</p>
                </div>
                <Clock className="w-8 h-8 text-[#145214]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#328CC1]">Completed Projects</p>
                  <p className="text-2xl font-bold">{collaborationStats.completedProjects}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-[#145214]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Collaboration Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black/40 border border-[#328CC1]/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Active Collaborations */}
              <div className="lg:col-span-2">
                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Active Collaborative Projects</CardTitle>
                      <Button className="bg-[#145214] hover:bg-[#145214]/80">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Collaboration
                      </Button>
                    </div>
                    <CardDescription>Multi-stakeholder environmental initiatives</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activeCollaborations.map((collaboration) => (
                        <div key={collaboration.id} className="p-4 bg-black/20 rounded-lg border border-[#328CC1]/10">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{collaboration.title}</h4>
                              <p className="text-sm text-gray-300">{collaboration.description}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                                <span className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {collaboration.location}
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Started {collaboration.startDate}
                                </span>
                                <span className="flex items-center">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  {collaboration.funding}
                                </span>
                              </div>
                            </div>
                            <Badge
                              className={
                                collaboration.status === "Active"
                                  ? "bg-[#145214]"
                                  : collaboration.status === "Planning"
                                    ? "bg-orange-600"
                                    : "bg-gray-600"
                              }
                            >
                              {collaboration.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm mb-3">
                            <div className="flex items-center space-x-1">
                              <Building2 className="w-4 h-4 text-[#0B3C5D]" />
                              <span>{collaboration.participants.governments} Governments</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <GraduationCap className="w-4 h-4 text-[#328CC1]" />
                              <span>{collaboration.participants.universities} Universities</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <HandHeart className="w-4 h-4 text-[#145214]" />
                              <span>{collaboration.participants.ngos} NGOs</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4 text-[#328CC1]" />
                              <span>{collaboration.participants.communities} Communities</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex-1 mr-4">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{collaboration.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                  className="bg-[#145214] h-2 rounded-full"
                                  style={{ width: `${collaboration.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="border-[#328CC1]/40 bg-transparent">
                                <FileText className="w-4 h-4 mr-1" />
                                Details
                              </Button>
                              <Button size="sm" className="bg-[#145214] hover:bg-[#145214]/80">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Join
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div>
                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest collaboration updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="p-3 bg-black/20 rounded-lg border border-[#328CC1]/10">
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                activity.type === "meeting"
                                  ? "bg-[#328CC1]/20"
                                  : activity.type === "proposal"
                                    ? "bg-[#145214]/20"
                                    : "bg-orange-600/20"
                              }`}
                            >
                              {activity.type === "meeting" ? (
                                <Calendar className="w-4 h-4 text-[#328CC1]" />
                              ) : activity.type === "proposal" ? (
                                <FileText className="w-4 h-4 text-[#145214]" />
                              ) : (
                                <CheckCircle className="w-4 h-4 text-orange-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{activity.title}</h5>
                              <p className="text-xs text-gray-300">{activity.organization}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-400">{activity.time}</span>
                                <span className="text-xs text-[#328CC1]">{activity.participants} participants</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stakeholders" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Stakeholder Network</h3>
                <div className="flex items-center space-x-4">
                  <Input placeholder="Search organizations..." className="max-w-sm bg-black/40 border-[#328CC1]/20" />
                  <Button variant="outline" className="border-[#328CC1]/20 bg-transparent">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Stakeholder Types Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stakeholderTypes.map((stakeholder) => {
                  const IconComponent = stakeholder.icon
                  return (
                    <Card
                      key={stakeholder.type}
                      className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm hover:bg-black/60 transition-all duration-300"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${stakeholder.color}20` }}
                          >
                            <IconComponent className="w-5 h-5" style={{ color: stakeholder.color }} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{stakeholder.type}</CardTitle>
                            <CardDescription>{stakeholder.count} organizations</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full bg-[#328CC1]/20 hover:bg-[#328CC1]/30 border border-[#328CC1]/40">
                          <Eye className="w-4 h-4 mr-2" />
                          View Partners
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Featured Organizations */}
              <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Featured Organizations</CardTitle>
                  <CardDescription>Leading partners in environmental collaboration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-black/20 rounded-lg border border-[#328CC1]/10">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-[#0B3C5D]/20 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-[#0B3C5D]" />
                        </div>
                        <div>
                          <h4 className="font-medium">Environmental Protection Agency</h4>
                          <p className="text-xs text-gray-300">Government</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        Leading government agency for environmental protection and regulation.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-[#0B3C5D]/40 text-[#0B3C5D]">
                          12 Projects
                        </Badge>
                        <Button size="sm" variant="ghost" className="text-[#328CC1]">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Connect
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-black/20 rounded-lg border border-[#328CC1]/10">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-[#328CC1]/20 rounded-lg flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-[#328CC1]" />
                        </div>
                        <div>
                          <h4 className="font-medium">Marine Research Institute</h4>
                          <p className="text-xs text-gray-300">Academic</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        Premier research institution focused on marine ecosystem conservation.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-[#328CC1]/40 text-[#328CC1]">
                          8 Projects
                        </Badge>
                        <Button size="sm" variant="ghost" className="text-[#328CC1]">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Connect
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-black/20 rounded-lg border border-[#328CC1]/10">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-[#145214]/20 rounded-lg flex items-center justify-center">
                          <HandHeart className="w-5 h-5 text-[#145214]" />
                        </div>
                        <div>
                          <h4 className="font-medium">Global Forest Alliance</h4>
                          <p className="text-xs text-gray-300">NGO</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        International NGO dedicated to forest conservation and restoration.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-[#145214]/40 text-[#145214]">
                          15 Projects
                        </Badge>
                        <Button size="sm" variant="ghost" className="text-[#328CC1]">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Collaborative Projects</h3>
                <div className="flex items-center space-x-4">
                  <Input placeholder="Search projects..." className="max-w-sm bg-black/40 border-[#328CC1]/20" />
                  <Button className="bg-[#145214] hover:bg-[#145214]/80">
                    <Plus className="w-4 h-4 mr-2" />
                    Propose Project
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeCollaborations.map((project) => (
                  <Card
                    key={project.id}
                    className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm hover:bg-black/60 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <CardDescription className="mt-1">{project.description}</CardDescription>
                        </div>
                        <Badge
                          className={
                            project.status === "Active"
                              ? "bg-[#145214]"
                              : project.status === "Planning"
                                ? "bg-orange-600"
                                : "bg-gray-600"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-[#328CC1]" />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-[#145214]" />
                            <span>{project.funding}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center space-x-1">
                            <Building2 className="w-3 h-3 text-[#0B3C5D]" />
                            <span>{project.participants.governments} Gov</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GraduationCap className="w-3 h-3 text-[#328CC1]" />
                            <span>{project.participants.universities} Uni</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <HandHeart className="w-3 h-3 text-[#145214]" />
                            <span>{project.participants.ngos} NGO</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3 text-[#328CC1]" />
                            <span>{project.participants.communities} Com</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-[#145214] h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Button size="sm" variant="outline" className="border-[#328CC1]/40 bg-transparent">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm" className="bg-[#145214] hover:bg-[#145214]/80">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Join Project
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="meetings" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Collaboration Meetings</h3>
                <Button className="bg-[#145214] hover:bg-[#145214]/80">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Upcoming Meetings</CardTitle>
                      <CardDescription>Scheduled collaboration sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-black/20 rounded-lg border border-[#328CC1]/10">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium">Ocean Cleanup Strategy Session</h4>
                              <p className="text-sm text-gray-300">Quarterly planning meeting for marine initiatives</p>
                            </div>
                            <Badge className="bg-[#328CC1]">Tomorrow</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                            <span>10:00 AM - 12:00 PM UTC</span>
                            <span>•</span>
                            <span>Virtual Meeting</span>
                            <span>•</span>
                            <span>25 participants</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="flex -space-x-2">
                                <div className="w-6 h-6 bg-[#0B3C5D] rounded-full border-2 border-black"></div>
                                <div className="w-6 h-6 bg-[#328CC1] rounded-full border-2 border-black"></div>
                                <div className="w-6 h-6 bg-[#145214] rounded-full border-2 border-black"></div>
                              </div>
                              <span className="text-xs text-gray-400">Multi-stakeholder</span>
                            </div>
                            <Button size="sm" className="bg-[#145214] hover:bg-[#145214]/80">
                              Join Meeting
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 bg-black/20 rounded-lg border border-[#328CC1]/10">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium">Amazon Monitoring Review</h4>
                              <p className="text-sm text-gray-300">Monthly progress review and data analysis</p>
                            </div>
                            <Badge variant="outline" className="border-gray-500">
                              Next Week
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                            <span>2:00 PM - 4:00 PM UTC</span>
                            <span>•</span>
                            <span>Hybrid Meeting</span>
                            <span>•</span>
                            <span>18 participants</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="flex -space-x-2">
                                <div className="w-6 h-6 bg-[#0B3C5D] rounded-full border-2 border-black"></div>
                                <div className="w-6 h-6 bg-[#328CC1] rounded-full border-2 border-black"></div>
                              </div>
                              <span className="text-xs text-gray-400">Gov + Academic</span>
                            </div>
                            <Button size="sm" variant="outline" className="border-[#328CC1]/40 bg-transparent">
                              Set Reminder
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Meeting Calendar</CardTitle>
                      <CardDescription>This month's schedule</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-[#328CC1]/10 rounded-lg border border-[#328CC1]/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Today</span>
                            <span className="text-xs text-[#328CC1]">2 meetings</span>
                          </div>
                        </div>
                        <div className="p-3 bg-[#145214]/10 rounded-lg border border-[#145214]/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Tomorrow</span>
                            <span className="text-xs text-[#145214]">1 meeting</span>
                          </div>
                        </div>
                        <div className="p-3 bg-black/20 rounded-lg border border-gray-600/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">This Week</span>
                            <span className="text-xs text-gray-400">5 meetings</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Collaboration Resources</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-[#328CC1]" />
                      <span>Documentation</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300 mb-4">
                      Access collaboration guidelines, templates, and best practices.
                    </p>
                    <Button className="w-full bg-[#328CC1]/20 hover:bg-[#328CC1]/30 border border-[#328CC1]/40">
                      <FileText className="w-4 h-4 mr-2" />
                      View Docs
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-[#145214]" />
                      <span>Communication</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300 mb-4">Join discussion channels and collaboration workspaces.</p>
                    <Button className="w-full bg-[#145214]/20 hover:bg-[#145214]/30 border border-[#145214]/40">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Join Channels
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-[#328CC1]" />
                      <span>Project Tools</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300 mb-4">Access project management and collaboration tools.</p>
                    <Button className="w-full bg-[#328CC1]/20 hover:bg-[#328CC1]/30 border border-[#328CC1]/40">
                      <Target className="w-4 h-4 mr-2" />
                      Launch Tools
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
