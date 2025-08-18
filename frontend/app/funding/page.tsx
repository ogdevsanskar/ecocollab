"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Wallet,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  Globe,
  TreePine,
  Waves,
  Zap,
  Vote,
} from "lucide-react"

export default function FundingPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("ETH")
  const [fundingAmount, setFundingAmount] = useState("")

  const supportedCurrencies = [
    { symbol: "ETH", name: "Ethereum", rate: "1.00" },
    { symbol: "USDT", name: "Tether", rate: "0.0004" },
    { symbol: "USDC", name: "USD Coin", rate: "0.0004" },
    { symbol: "MATIC", name: "Polygon", rate: "0.0012" },
    { symbol: "SOL", name: "Solana", rate: "0.0045" },
  ]

  const fundingProjects = [
    {
      id: 1,
      title: "Amazon Rainforest Restoration",
      description: "Large-scale reforestation project in Brazil",
      raised: 45.8,
      goal: 100,
      backers: 234,
      category: "Reforestation",
      icon: TreePine,
      color: "#145214",
      milestones: [
        { title: "Land Acquisition", completed: true, amount: 25 },
        { title: "Seedling Preparation", completed: true, amount: 15 },
        { title: "Planting Phase 1", completed: false, amount: 35 },
        { title: "Monitoring Setup", completed: false, amount: 25 },
      ],
    },
    {
      id: 2,
      title: "Coral Reef Protection Initiative",
      description: "Marine conservation in the Great Barrier Reef",
      raised: 78.2,
      goal: 150,
      backers: 456,
      category: "Marine Conservation",
      icon: Waves,
      color: "#328CC1",
      milestones: [
        { title: "Research Phase", completed: true, amount: 30 },
        { title: "Equipment Deployment", completed: true, amount: 40 },
        { title: "Restoration Work", completed: false, amount: 50 },
        { title: "Long-term Monitoring", completed: false, amount: 30 },
      ],
    },
    {
      id: 3,
      title: "Solar Energy for Rural Communities",
      description: "Clean energy access in remote African villages",
      raised: 32.5,
      goal: 80,
      backers: 189,
      category: "Clean Energy",
      icon: Zap,
      color: "#0B3C5D",
      milestones: [
        { title: "Site Assessment", completed: true, amount: 10 },
        { title: "Solar Panel Installation", completed: false, amount: 40 },
        { title: "Grid Connection", completed: false, amount: 20 },
        { title: "Training & Maintenance", completed: false, amount: 10 },
      ],
    },
  ]

  const daoProposals = [
    {
      id: 1,
      title: "Increase funding for ocean cleanup projects",
      description: "Allocate 30% more resources to marine pollution initiatives",
      votes: 1247,
      timeLeft: "5 days",
      status: "active",
      support: 78,
    },
    {
      id: 2,
      title: "New verification system for data contributors",
      description: "Implement AI-powered validation for environmental reports",
      votes: 892,
      timeLeft: "12 days",
      status: "active",
      support: 65,
    },
    {
      id: 3,
      title: "Partnership with indigenous communities",
      description: "Establish formal collaboration framework",
      votes: 2156,
      timeLeft: "Ended",
      status: "passed",
      support: 89,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0B3C5D] to-[#0A0A0A] text-[#F6F6F6]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#328CC1] to-[#145214] bg-clip-text text-transparent">
            Blockchain Funding
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Support environmental projects with cryptocurrency. Transparent, secure, and milestone-based funding with
            DAO governance.
          </p>
        </div>

        {/* Funding Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-[#328CC1] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#328CC1] mb-1">$2.4M</p>
              <p className="text-sm text-gray-300">Total Funded</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-[#145214] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#145214] mb-1">1,247</p>
              <p className="text-sm text-gray-300">Active Funders</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Globe className="w-8 h-8 text-[#0B3C5D] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#0B3C5D] mb-1">156</p>
              <p className="text-sm text-gray-300">Active Projects</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-[#328CC1] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#328CC1] mb-1">89%</p>
              <p className="text-sm text-gray-300">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Supported Currencies */}
        <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="w-5 h-5 mr-2 text-[#328CC1]" />
              Supported Cryptocurrencies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {supportedCurrencies.map((currency) => (
                <div
                  key={currency.symbol}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedCurrency === currency.symbol
                      ? "border-[#328CC1] bg-[#328CC1]/10"
                      : "border-gray-600 hover:border-[#328CC1]/50"
                  }`}
                  onClick={() => setSelectedCurrency(currency.symbol)}
                >
                  <div className="text-center">
                    <p className="font-bold text-lg">{currency.symbol}</p>
                    <p className="text-sm text-gray-300">{currency.name}</p>
                    <p className="text-xs text-[#328CC1] mt-1">Rate: {currency.rate} ETH</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Projects */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Active Funding Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {fundingProjects.map((project) => {
              const IconComponent = project.icon
              const completedMilestones = project.milestones.filter((m) => m.completed).length

              return (
                <Card
                  key={project.id}
                  className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm hover:bg-black/60 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${project.color}20` }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: project.color }} />
                      </div>
                      <Badge variant="outline" className="border-[#328CC1]/40 text-[#328CC1]">
                        {project.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <p className="text-gray-300 text-sm">{project.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>
                            {project.raised} ETH / {project.goal} ETH
                          </span>
                        </div>
                        <Progress value={(project.raised / project.goal) * 100} className="h-2" />
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {project.backers} backers
                        </span>
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1 text-[#145214]" />
                          {completedMilestones}/{project.milestones.length} milestones
                        </span>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold">Milestones:</p>
                        {project.milestones.slice(0, 2).map((milestone, index) => (
                          <div key={index} className="flex items-center justify-between text-xs">
                            <span className={milestone.completed ? "text-[#145214]" : "text-gray-400"}>
                              {milestone.completed ? "✓" : "○"} {milestone.title}
                            </span>
                            <span className="text-[#328CC1]">{milestone.amount} ETH</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-2 pt-4">
                        <Input
                          placeholder="Amount"
                          value={fundingAmount}
                          onChange={(e) => setFundingAmount(e.target.value)}
                          className="flex-1 bg-black/20 border-[#328CC1]/20"
                        />
                        <Button className="bg-[#328CC1] hover:bg-[#328CC1]/80">Fund</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* DAO Governance */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Vote className="w-6 h-6 mr-2 text-[#328CC1]" />
            DAO Governance
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {daoProposals.map((proposal) => (
              <Card key={proposal.id} className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{proposal.title}</CardTitle>
                    <Badge
                      variant={proposal.status === "passed" ? "default" : "outline"}
                      className={
                        proposal.status === "passed"
                          ? "bg-[#145214] text-white"
                          : proposal.status === "active"
                            ? "border-[#328CC1]/40 text-[#328CC1]"
                            : "border-gray-500 text-gray-400"
                      }
                    >
                      {proposal.status}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm">{proposal.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Support</span>
                        <span>{proposal.support}%</span>
                      </div>
                      <Progress value={proposal.support} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">
                        <Users className="w-4 h-4 inline mr-1" />
                        {proposal.votes} votes
                      </span>
                      <span className="text-sm text-gray-300 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {proposal.timeLeft}
                      </span>
                    </div>

                    {proposal.status === "active" && (
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="bg-[#145214] hover:bg-[#145214]/80 flex-1">
                          Vote Yes
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/40 text-red-400 hover:bg-red-500/10 flex-1 bg-transparent"
                        >
                          Vote No
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
