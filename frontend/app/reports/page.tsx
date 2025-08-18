"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Download,
  Share2,
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  Search,
  Plus,
  Send,
} from "lucide-react"

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [reportTitle, setReportTitle] = useState("")
  const [reportDescription, setReportDescription] = useState("")
  const [isCreatingReport, setIsCreatingReport] = useState(false)

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
      id: "community-engagement",
      title: "Community Engagement Report",
      description: "Stakeholder participation and collaboration metrics",
      icon: Users,
      color: "#0B3C5D",
      sections: ["Participation Stats", "Contribution Analysis", "Geographic Distribution", "Growth Trends"],
      estimatedTime: "12 min",
      dataPoints: 36,
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

  const recentReports = [
    {
      id: 1,
      title: "Q4 2024 Amazon Restoration Impact",
      type: "Project Impact",
      author: "Amazon Conservation NGO",
      date: "2024-12-15",
      status: "Published",
      downloads: 234,
      views: 1567,
      stakeholders: ["Government", "NGO", "Community"],
    },
    {
      id: 2,
      title: "Coral Reef Funding Transparency",
      type: "Funding Report",
      author: "Dr. Sarah Chen",
      date: "2024-12-10",
      status: "Draft",
      downloads: 0,
      views: 45,
      stakeholders: ["Researcher", "Funder"],
    },
    {
      id: 3,
      title: "Global Community Engagement Analysis",
      type: "Community Report",
      author: "EcoChain Platform",
      date: "2024-12-08",
      status: "Published",
      downloads: 456,
      views: 2834,
      stakeholders: ["Government", "NGO", "Community", "Researcher"],
    },
    {
      id: 4,
      title: "Pacific Ocean Temperature Monitoring",
      type: "Environmental Report",
      author: "Marine Research Institute",
      date: "2024-12-05",
      status: "Under Review",
      downloads: 89,
      views: 567,
      stakeholders: ["Researcher", "Government"],
    },
  ]

  const reportMetrics = [
    { label: "Total Reports", value: "1,247", icon: FileText, change: "+12%" },
    { label: "Monthly Downloads", value: "5,678", icon: Download, change: "+23%" },
    { label: "Active Stakeholders", value: "892", icon: Users, change: "+8%" },
    { label: "Data Points Analyzed", value: "45.2K", icon: BarChart3, change: "+34%" },
  ]

  const generateReport = () => {
    if (!selectedReport || !reportTitle.trim()) return

    setIsCreatingReport(true)
    // Simulate report generation
    setTimeout(() => {
      setIsCreatingReport(false)
      setReportTitle("")
      setReportDescription("")
      setSelectedReport(null)
      // In real implementation, this would generate and save the report
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0B3C5D] to-[#0A0A0A] text-[#F6F6F6]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#328CC1] to-[#145214] bg-clip-text text-transparent">
            Reporting & Analytics
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Generate comprehensive reports for stakeholders with real-time data, blockchain verification, and AI-powered
            insights.
          </p>
        </div>

        {/* Report Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {reportMetrics.map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <Card key={index} className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <IconComponent className="w-8 h-8 text-[#328CC1] mx-auto mb-3" />
                  <p className="text-3xl font-bold text-[#328CC1] mb-1">{metric.value}</p>
                  <div className="flex items-center justify-center space-x-2">
                    <p className="text-sm text-gray-300">{metric.label}</p>
                    <Badge variant="outline" className="border-[#145214]/40 text-[#145214] text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Report Generation */}
            <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-[#328CC1]" />
                  Generate New Report
                </CardTitle>
                <p className="text-sm text-gray-300">
                  Create comprehensive reports with AI-powered insights and blockchain verification
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Report Templates */}
                  <div>
                    <h3 className="font-semibold mb-4">Select Report Template</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <div className="flex items-start space-x-3">
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${template.color}20` }}
                              >
                                <IconComponent className="w-5 h-5" style={{ color: template.color }} />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm">{template.title}</h4>
                                <p className="text-xs text-gray-300 mb-2">{template.description}</p>
                                <div className="flex items-center space-x-3 text-xs text-gray-400">
                                  <span className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {template.estimatedTime}
                                  </span>
                                  <span className="flex items-center">
                                    <BarChart3 className="w-3 h-3 mr-1" />
                                    {template.dataPoints} data points
                                  </span>
                                </div>
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
                          <p>Selected template includes:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
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

            {/* Recent Reports */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recent Reports</h2>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="border-[#328CC1]/40 text-[#328CC1] bg-transparent">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm" variant="outline" className="border-[#328CC1]/40 text-[#328CC1] bg-transparent">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {recentReports.map((report) => (
                  <Card
                    key={report.id}
                    className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm hover:bg-black/60 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg">{report.title}</h3>
                            <Badge
                              variant={report.status === "Published" ? "default" : "outline"}
                              className={
                                report.status === "Published"
                                  ? "bg-[#145214] text-white"
                                  : report.status === "Draft"
                                    ? "border-yellow-500/40 text-yellow-400"
                                    : "border-orange-500/40 text-orange-400"
                              }
                            >
                              {report.status}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
                            <span className="flex items-center">
                              <FileText className="w-4 h-4 mr-1" />
                              {report.type}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {report.author}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {report.date}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {report.stakeholders.map((stakeholder, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="border-[#0B3C5D]/40 text-[#0B3C5D] text-xs"
                              >
                                {stakeholder}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {report.views} views
                            </span>
                            <span className="flex items-center">
                              <Download className="w-4 h-4 mr-1" />
                              {report.downloads} downloads
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#328CC1]/40 text-[#328CC1] bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" className="bg-[#328CC1] hover:bg-[#328CC1]/80">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#145214]/40 text-[#145214] bg-transparent"
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Report Analytics */}
            <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-[#328CC1]" />
                  Report Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Monthly Growth</span>
                      <span className="text-[#145214]">+23%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Stakeholder Engagement</span>
                      <span className="text-[#328CC1]">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Data Accuracy</span>
                      <span className="text-[#0B3C5D]">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-[#328CC1] hover:bg-[#328CC1]/80 justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Create Custom Report
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#145214]/40 text-[#145214] bg-transparent justify-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export All Data
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#0B3C5D]/40 text-[#0B3C5D] bg-transparent justify-start"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#328CC1]/40 text-[#328CC1] bg-transparent justify-start"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Report Status */}
            <Card className="bg-gradient-to-r from-[#0B3C5D]/40 to-[#145214]/40 border-[#328CC1]/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-[#145214] mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">All Systems Operational</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Real-time data feeds are active and blockchain verification is functioning normally
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-[#145214]">99.9%</p>
                      <p className="text-xs text-gray-400">Uptime</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#328CC1]">&lt; 2s</p>
                      <p className="text-xs text-gray-400">Response Time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
