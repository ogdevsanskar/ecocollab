"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { AlertService } from "@/lib/api-services"
import {
  Search,
  Plus,
  MapPin,
  Calendar,
  Users,
  Target,
  TrendingUp,
  Leaf,
  Waves,
  Zap,
  Recycle,
  Heart,
  Share2,
  Eye,
  DollarSign,
} from "lucide-react"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([])
  const [loadMoreCount, setLoadMoreCount] = useState(12)
  const router = useRouter()

  const handleCreateProject = async () => {
    try {
      // Trigger project alert for new project creation
      await AlertService.sendProjectAlert(
        "New Project Creation Request",
        "A new environmental project creation has been initiated. Multi-stakeholder collaboration setup required.",
        "medium"
      );
      alert("Project creation initiated! Stakeholders have been notified via SMS/call alerts for collaboration setup.");
    } catch (error) {
      console.error("Failed to initiate project creation:", error);
      alert("Project creation form would open here. This connects to the collaboration system for multi-stakeholder project setup.");
    }
  }

  const handleViewProject = async (projectId: number) => {
    try {
      // Log project view activity
      await AlertService.sendProjectAlert(
        "Project View Activity",
        `Project ${projectId} is being viewed. Detailed analytics and milestone tracking accessed.`,
        "low",
        projectId.toString()
      );
      alert(`Opening detailed view for project ${projectId}. This would show full project details, milestones, funding history, and collaboration tools.`);
    } catch (error) {
      console.error("Failed to log project view:", error);
      alert(`Opening detailed view for project ${projectId}. This would show full project details, milestones, funding history, and collaboration tools.`);
    }
  }

  const handleFavoriteProject = (projectId: number) => {
    setFavorites((prev) => (prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]))
  }

  const handleShareProject = (projectId: number, projectTitle: string) => {
    if (navigator.share) {
      navigator.share({
        title: projectTitle,
        text: `Check out this environmental project: ${projectTitle}`,
        url: window.location.href + `?project=${projectId}`,
      })
    } else {
      navigator.clipboard.writeText(window.location.href + `?project=${projectId}`)
      alert("Project link copied to clipboard!")
    }
  }

  const handleLoadMore = () => {
    setLoadMoreCount((prev) => prev + 12)
  }

  const categories = [
    { id: "all", label: "All Projects", icon: Target },
    { id: "reforestation", label: "Reforestation", icon: Leaf },
    { id: "ocean", label: "Ocean Cleanup", icon: Waves },
    { id: "renewable", label: "Renewable Energy", icon: Zap },
    { id: "waste", label: "Waste Management", icon: Recycle },
  ]

  const projects = [
    {
      id: 1,
      title: "Amazon Rainforest Restoration",
      description: "Large-scale reforestation project to restore 10,000 hectares of degraded Amazon rainforest",
      category: "reforestation",
      status: "active",
      location: "Brazil",
      fundingGoal: 500000,
      fundingRaised: 342000,
      progress: 68,
      participants: 156,
      startDate: "2024-01-15",
      endDate: "2026-12-31",
      impact: {
        treesPlanted: 45000,
        co2Absorbed: 12500,
        biodiversityScore: 85,
      },
      image: "/amazon-rainforest-planting.png",
      tags: ["SDG 15", "Carbon Credits", "Biodiversity"],
      milestones: [
        { title: "Site Preparation", completed: true, date: "2024-02-01" },
        { title: "Seedling Production", completed: true, date: "2024-03-15" },
        { title: "Planting Phase 1", completed: true, date: "2024-06-30" },
        { title: "Planting Phase 2", completed: false, date: "2024-12-31" },
        { title: "Monitoring & Maintenance", completed: false, date: "2026-12-31" },
      ],
    },
    {
      id: 2,
      title: "Great Barrier Reef Coral Restoration",
      description: "Innovative coral farming and transplantation to restore damaged reef ecosystems",
      category: "ocean",
      status: "active",
      location: "Australia",
      fundingGoal: 750000,
      fundingRaised: 425000,
      progress: 57,
      participants: 89,
      startDate: "2024-03-01",
      endDate: "2027-02-28",
      impact: {
        coralTransplanted: 2500,
        reefAreaRestored: 15,
        marineSpeciesProtected: 120,
      },
      image: "/coral-reef-restoration.png",
      tags: ["SDG 14", "Marine Biology", "Climate Resilience"],
      milestones: [
        { title: "Coral Nursery Setup", completed: true, date: "2024-04-01" },
        { title: "Coral Propagation", completed: true, date: "2024-07-15" },
        { title: "Transplantation Phase 1", completed: false, date: "2024-11-30" },
        { title: "Monitoring & Assessment", completed: false, date: "2027-02-28" },
      ],
    },
    {
      id: 3,
      title: "Solar Microgrid for Rural Communities",
      description: "Installing solar microgrids to provide clean energy access to remote communities",
      category: "renewable",
      status: "planning",
      location: "Kenya",
      fundingGoal: 300000,
      fundingRaised: 85000,
      progress: 28,
      participants: 34,
      startDate: "2024-09-01",
      endDate: "2025-08-31",
      impact: {
        householdsConnected: 0,
        co2Reduced: 0,
        energyGenerated: 0,
      },
      image: "/rural-village-solar.png",
      tags: ["SDG 7", "Energy Access", "Community Development"],
      milestones: [
        { title: "Community Engagement", completed: false, date: "2024-09-15" },
        { title: "Site Assessment", completed: false, date: "2024-10-30" },
        { title: "Equipment Procurement", completed: false, date: "2024-12-15" },
        { title: "Installation", completed: false, date: "2025-06-30" },
      ],
    },
    {
      id: 4,
      title: "Ocean Plastic Collection Network",
      description: "Deploying advanced collection systems to remove plastic waste from ocean gyres",
      category: "waste",
      status: "completed",
      location: "Pacific Ocean",
      fundingGoal: 1200000,
      fundingRaised: 1200000,
      progress: 100,
      participants: 203,
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      impact: {
        plasticCollected: 45000,
        oceanAreaCleaned: 500,
        recyclingRate: 92,
      },
      image: "/ocean-cleanup-vessel.png",
      tags: ["SDG 14", "Circular Economy", "Innovation"],
      milestones: [
        { title: "System Deployment", completed: true, date: "2023-03-01" },
        { title: "Collection Operations", completed: true, date: "2023-06-30" },
        { title: "Plastic Processing", completed: true, date: "2023-10-31" },
        { title: "Impact Assessment", completed: true, date: "2023-12-31" },
      ],
    },
    {
      id: 5,
      title: "Mangrove Forest Conservation",
      description: "Protecting and restoring critical mangrove ecosystems along coastal regions",
      category: "reforestation",
      status: "active",
      location: "Philippines",
      fundingGoal: 450000,
      fundingRaised: 278000,
      progress: 62,
      participants: 127,
      startDate: "2024-02-01",
      endDate: "2026-01-31",
      impact: {
        treesPlanted: 32000,
        co2Absorbed: 8500,
        biodiversityScore: 78,
      },
      image: "/mangrove-restoration-coastal-protection.png",
      tags: ["SDG 15", "Coastal Protection", "Blue Carbon"],
      milestones: [
        { title: "Community Training", completed: true, date: "2024-03-01" },
        { title: "Seedling Preparation", completed: true, date: "2024-04-15" },
        { title: "Planting Campaign", completed: false, date: "2024-10-31" },
        { title: "Monitoring Program", completed: false, date: "2026-01-31" },
      ],
    },
    {
      id: 6,
      title: "Wind Farm Development",
      description: "Establishing offshore wind turbines to generate clean renewable energy",
      category: "renewable",
      status: "active",
      location: "Denmark",
      fundingGoal: 2500000,
      fundingRaised: 1875000,
      progress: 75,
      participants: 312,
      startDate: "2023-06-01",
      endDate: "2025-12-31",
      impact: {
        householdsConnected: 15000,
        co2Reduced: 25000,
        energyGenerated: 180,
      },
      image: "/placeholder-jmt04.png",
      tags: ["SDG 7", "Clean Energy", "Carbon Neutral"],
      milestones: [
        { title: "Environmental Assessment", completed: true, date: "2023-08-01" },
        { title: "Turbine Installation", completed: true, date: "2024-06-30" },
        { title: "Grid Connection", completed: false, date: "2024-12-31" },
        { title: "Full Operation", completed: false, date: "2025-12-31" },
      ],
    },
    {
      id: 7,
      title: "Urban Vertical Farming Initiative",
      description: "Implementing sustainable vertical farming systems in urban environments",
      category: "renewable",
      status: "planning",
      location: "Singapore",
      fundingGoal: 180000,
      fundingRaised: 45000,
      progress: 25,
      participants: 28,
      startDate: "2024-11-01",
      endDate: "2025-10-31",
      impact: {
        householdsConnected: 0,
        co2Reduced: 0,
        energyGenerated: 0,
      },
      image: "/placeholder-boc1q.png",
      tags: ["SDG 2", "Urban Agriculture", "Food Security"],
      milestones: [
        { title: "Site Selection", completed: false, date: "2024-11-15" },
        { title: "System Design", completed: false, date: "2024-12-31" },
        { title: "Construction", completed: false, date: "2025-06-30" },
        { title: "Harvest Operations", completed: false, date: "2025-10-31" },
      ],
    },
    {
      id: 8,
      title: "Mediterranean Sea Cleanup",
      description: "Comprehensive marine debris removal and prevention program",
      category: "ocean",
      status: "active",
      location: "Mediterranean",
      fundingGoal: 680000,
      fundingRaised: 412000,
      progress: 61,
      participants: 156,
      startDate: "2024-04-01",
      endDate: "2025-09-30",
      impact: {
        coralTransplanted: 0,
        reefAreaRestored: 0,
        marineSpeciesProtected: 85,
      },
      image: "/mediterranean-cleanup.png",
      tags: ["SDG 14", "Marine Protection", "Waste Reduction"],
      milestones: [
        { title: "Fleet Deployment", completed: true, date: "2024-05-01" },
        { title: "Cleanup Operations", completed: true, date: "2024-08-31" },
        { title: "Waste Processing", completed: false, date: "2025-03-31" },
        { title: "Prevention Programs", completed: false, date: "2025-09-30" },
      ],
    },
    {
      id: 9,
      title: "E-Waste Recycling Network",
      description: "Building comprehensive electronic waste collection and recycling infrastructure",
      category: "waste",
      status: "active",
      location: "India",
      fundingGoal: 320000,
      fundingRaised: 198000,
      progress: 62,
      participants: 94,
      startDate: "2024-01-01",
      endDate: "2025-06-30",
      impact: {
        plasticCollected: 0,
        oceanAreaCleaned: 0,
        recyclingRate: 78,
      },
      image: "/e-waste-recycling-sustainable.png",
      tags: ["SDG 12", "Circular Economy", "Technology"],
      milestones: [
        { title: "Collection Centers", completed: true, date: "2024-03-01" },
        { title: "Processing Facility", completed: true, date: "2024-07-31" },
        { title: "Community Outreach", completed: false, date: "2024-12-31" },
        { title: "Scale Operations", completed: false, date: "2025-06-30" },
      ],
    },
    {
      id: 10,
      title: "Arctic Ice Preservation Research",
      description: "Innovative research project to develop ice preservation technologies",
      category: "ocean",
      status: "planning",
      location: "Arctic",
      fundingGoal: 950000,
      fundingRaised: 142000,
      progress: 15,
      participants: 67,
      startDate: "2025-01-01",
      endDate: "2027-12-31",
      impact: {
        coralTransplanted: 0,
        reefAreaRestored: 0,
        marineSpeciesProtected: 0,
      },
      image: "/arctic-research-polar-bears.png",
      tags: ["SDG 13", "Climate Research", "Innovation"],
      milestones: [
        { title: "Research Planning", completed: false, date: "2025-02-28" },
        { title: "Equipment Development", completed: false, date: "2025-08-31" },
        { title: "Field Testing", completed: false, date: "2026-06-30" },
        { title: "Implementation", completed: false, date: "2027-12-31" },
      ],
    },
    {
      id: 11,
      title: "Sahara Desert Solar Farm",
      description: "Massive solar installation project to harness desert solar potential",
      category: "renewable",
      status: "planning",
      location: "Morocco",
      fundingGoal: 3200000,
      fundingRaised: 640000,
      progress: 20,
      participants: 189,
      startDate: "2025-03-01",
      endDate: "2028-02-29",
      impact: {
        householdsConnected: 0,
        co2Reduced: 0,
        energyGenerated: 0,
      },
      image: "/sahara-solar-morocco.png",
      tags: ["SDG 7", "Mega Project", "Desert Solar"],
      milestones: [
        { title: "Land Acquisition", completed: false, date: "2025-06-30" },
        { title: "Infrastructure Build", completed: false, date: "2026-12-31" },
        { title: "Panel Installation", completed: false, date: "2027-09-30" },
        { title: "Grid Integration", completed: false, date: "2028-02-29" },
      ],
    },
    {
      id: 12,
      title: "Biodegradable Packaging Innovation",
      description: "Developing and scaling biodegradable packaging alternatives",
      category: "waste",
      status: "active",
      location: "Netherlands",
      fundingGoal: 280000,
      fundingRaised: 224000,
      progress: 80,
      participants: 52,
      startDate: "2023-09-01",
      endDate: "2024-12-31",
      impact: {
        plasticCollected: 0,
        oceanAreaCleaned: 0,
        recyclingRate: 95,
      },
      image: "/biodegradable-packaging-innovation.png",
      tags: ["SDG 12", "Innovation", "Sustainable Materials"],
      milestones: [
        { title: "Material Development", completed: true, date: "2023-12-31" },
        { title: "Pilot Testing", completed: true, date: "2024-06-30" },
        { title: "Commercial Production", completed: false, date: "2024-10-31" },
        { title: "Market Launch", completed: false, date: "2024-12-31" },
      ],
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const displayedProjects = filteredProjects.slice(0, loadMoreCount)
  const hasMoreProjects = filteredProjects.length > loadMoreCount

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#145214] text-white"
      case "planning":
        return "bg-[#328CC1] text-white"
      case "completed":
        return "bg-[#0B3C5D] text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find((cat) => cat.id === category)
    return categoryData ? categoryData.icon : Target
  }

  return (
    <div className="min-h-screen bg-black text-[#F6F6F6] pt-8">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Environmental Projects</h1>
              <p className="text-[#328CC1] text-lg">
                Discover, fund, and collaborate on climate action initiatives worldwide
              </p>
            </div>
            <Button className="bg-[#145214] hover:bg-[#145214]/80 text-white" onClick={handleCreateProject}>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-black/40 border-[#328CC1]/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#328CC1]">Active Projects</p>
                    <p className="text-2xl font-bold">32</p>
                  </div>
                  <Target className="w-8 h-8 text-[#328CC1]" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border-[#328CC1]/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#145214]">Total Funding</p>
                    <p className="text-2xl font-bold">$12.4M</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-[#145214]" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border-[#328CC1]/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#328CC1]">Participants</p>
                    <p className="text-2xl font-bold">2,847</p>
                  </div>
                  <Users className="w-8 h-8 text-[#328CC1]" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border-[#328CC1]/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#145214]">CO₂ Reduced</p>
                    <p className="text-2xl font-bold">78.5K tons</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-[#145214]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#328CC1]" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/40 border border-[#328CC1]/20 text-[#F6F6F6]"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-black/40 border border-[#328CC1]/20 rounded-md text-[#F6F6F6]"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-black/40 border border-[#328CC1]/20 rounded-md text-[#F6F6F6]"
              >
                <option value="all">All Status</option>
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayedProjects.map((project) => {
            const CategoryIcon = getCategoryIcon(project.category)
            const isFavorited = favorites.includes(project.id)
            return (
              <Card
                key={project.id}
                className="bg-black/40 border-[#328CC1]/20 hover:border-[#328CC1]/40 transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/60 backdrop-blur-sm rounded-full p-2">
                      <CategoryIcon className="w-4 h-4 text-[#328CC1]" />
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg group-hover:text-[#328CC1] transition-colors">
                      {project.title}
                    </CardTitle>
                  </div>
                  <p className="text-sm text-[#F6F6F6]/70 line-clamp-2">{project.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Location and Timeline */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-[#328CC1]">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-[#F6F6F6]/70">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(project.endDate).getFullYear()}
                    </div>
                  </div>

                  {/* Funding Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#F6F6F6]/70">Funding Progress</span>
                      <span className="text-[#145214] font-medium">
                        ${project.fundingRaised.toLocaleString()} / ${project.fundingGoal.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    <div className="text-right text-sm text-[#328CC1]">{project.progress}% funded</div>
                  </div>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-2 gap-4 py-3 border-t border-[#328CC1]/20">
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#145214]">
                        {project.impact.treesPlanted ||
                          project.impact.coralTransplanted ||
                          project.impact.plasticCollected ||
                          0}
                      </div>
                      <div className="text-xs text-[#F6F6F6]/70">
                        {project.category === "reforestation"
                          ? "Trees Planted"
                          : project.category === "ocean"
                            ? "Coral Transplanted"
                            : project.category === "waste"
                              ? "Plastic Collected (kg)"
                              : "Impact Units"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#328CC1]">{project.participants}</div>
                      <div className="text-xs text-[#F6F6F6]/70">Participants</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-[#328CC1]/30 text-[#328CC1]">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-[#328CC1] hover:bg-[#328CC1]/80 text-white"
                      onClick={() => handleViewProject(project.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`border-[#145214] hover:bg-[#145214] hover:text-white bg-transparent ${
                        isFavorited ? "bg-[#145214] text-white" : "text-[#145214]"
                      }`}
                      onClick={() => handleFavoriteProject(project.id)}
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#328CC1]/30 text-[#328CC1] hover:bg-[#328CC1] hover:text-white bg-transparent"
                      onClick={() => handleShareProject(project.id, project.title)}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Load More */}
        {hasMoreProjects && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-[#328CC1]/30 text-[#328CC1] hover:bg-[#328CC1] hover:text-white bg-transparent"
              onClick={handleLoadMore}
            >
              Load More Projects
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-[#328CC1]/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-[#F6F6F6]/70 mb-4">Try adjusting your search criteria or create a new project</p>
            <Button className="bg-[#145214] hover:bg-[#145214]/80 text-white" onClick={handleCreateProject}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Project
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
