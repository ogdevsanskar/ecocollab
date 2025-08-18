"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  Globe,
  TreePine,
  MapPin,
  Users,
  BookOpen,
  DollarSign,
  BarChart3,
  Camera,
  Shield,
  ArrowRight,
  Zap,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string | null
  chainId: number | null
  role: string | null
  isVerified: boolean
  nftBadges: string[]
}

export default function LandingPage() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    role: null,
    isVerified: false,
    nftBadges: [],
  })
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    setIsConnecting(true)
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        const chainId = await window.ethereum.request({ method: "eth_chainId" })
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        })

        // Simulate role verification and NFT badges
        const mockRoles = ["Government", "NGO", "Researcher", "Community Leader", "Student"]
        const selectedRole = mockRoles[Math.floor(Math.random() * mockRoles.length)]
        const mockBadges = ["Climate Advocate", "Data Contributor", "Project Funder"]

        setWallet({
          isConnected: true,
          address: accounts[0],
          balance: (Number.parseInt(balance, 16) / 1e18).toFixed(4),
          chainId: Number.parseInt(chainId, 16),
          role: selectedRole,
          isVerified: true,
          nftBadges: mockBadges,
        })
      } else {
        alert("Please install MetaMask or another Web3 wallet")
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
      role: null,
      isVerified: false,
      nftBadges: [],
    })
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        }
      }

      const handleChainChanged = (chainId: string) => {
        setWallet((prev) => ({ ...prev, chainId: Number.parseInt(chainId, 16) }))
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

  const features = [
    {
      icon: Users,
      title: "Multi-Stakeholder Collaboration",
      description: "Unite governments, academics, NGOs, and communities for environmental action",
      color: "#328CC1",
    },
    {
      icon: Camera,
      title: "Crowdsourced Data Collection",
      description: "Collect real-time environmental data from citizen scientists worldwide",
      color: "#145214",
    },
    {
      icon: DollarSign,
      title: "Blockchain Funding",
      description: "Transparent, secure funding for environmental projects using cryptocurrency",
      color: "#0B3C5D",
    },
    {
      icon: BarChart3,
      title: "AI-Powered Analytics",
      description: "Advanced insights and predictions from environmental data",
      color: "#328CC1",
    },
    {
      icon: MapPin,
      title: "Interactive Maps",
      description: "Visualize environmental changes and project locations globally",
      color: "#145214",
    },
    {
      icon: BookOpen,
      title: "Climate Education",
      description: "Learn about climate science and conservation strategies",
      color: "#0B3C5D",
    },
  ]

  const stats = [
    { label: "Active Projects", value: "156", icon: TreePine },
    { label: "Total Funded", value: "$2.4M", icon: DollarSign },
    { label: "Contributors", value: "12.8K", icon: Users },
    { label: "Data Points", value: "45.2K", icon: BarChart3 },
  ]

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 w-full h-full z-0">
        <iframe
          src="https://my.spline.design/realisticearthwithdayandnightcycle-JCAdahmg8v0ZFstYA2pfle6G/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 min-h-screen bg-gradient-to-br from-black/60 via-[#0B3C5D]/40 to-black/60 text-[#F6F6F6]">
        <main>
          {/* Hero Section */}
          <section className="relative h-screen flex items-center justify-center">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <Badge className="bg-[#145214]/80 text-[#145214] border-[#145214]/40 backdrop-blur-sm">
                    <Zap className="w-3 h-3 mr-1" />
                    Web3 Powered
                  </Badge>
                  <Badge className="bg-[#328CC1]/80 text-[#328CC1] border-[#328CC1]/40 backdrop-blur-sm">
                    <Globe className="w-3 h-3 mr-1" />
                    Global Impact
                  </Badge>
                  {wallet.isConnected && (
                    <Badge className="bg-green-500/80 text-green-100 border-green-400/40 backdrop-blur-sm">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Wallet Connected
                    </Badge>
                  )}
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#328CC1] via-[#F6F6F6] to-[#145214] bg-clip-text text-transparent drop-shadow-lg">
                  Climate Action Through Collaboration
                </h1>

                <p className="text-xl text-white/90 mb-8 leading-relaxed drop-shadow-md backdrop-blur-sm bg-black/30 rounded-lg p-6">
                  Unite stakeholders worldwide to monitor, fund, and protect our environment using blockchain
                  technology, AI-powered insights, and crowdsourced data collection.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  {!wallet.isConnected ? (
                    <Button
                      onClick={connectWallet}
                      disabled={isConnecting}
                      size="lg"
                      className="bg-[#328CC1]/90 hover:bg-[#328CC1] text-white px-8 py-4 text-lg backdrop-blur-sm shadow-lg"
                    >
                      <Wallet className="w-5 h-5 mr-2" />
                      {isConnecting ? "Connecting..." : "Connect Wallet"}
                    </Button>
                  ) : (
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        className="bg-[#328CC1]/90 hover:bg-[#328CC1] text-white px-8 py-4 text-lg backdrop-blur-sm shadow-lg"
                      >
                        <Globe className="w-5 h-5 mr-2" />
                        Explore Platform
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  )}
                  <Link href="/projects">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[#145214] text-[#145214] hover:bg-[#145214]/20 px-8 py-4 text-lg bg-white/10 backdrop-blur-sm shadow-lg"
                    >
                      <TreePine className="w-5 h-5 mr-2" />
                      View Projects
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {wallet.isConnected && (
            <section className="container mx-auto px-4 py-16">
              <Card className="bg-gradient-to-r from-[#328CC1]/30 to-[#145214]/30 border-[#328CC1]/30 backdrop-blur-md">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Welcome to EcoChain, {wallet.role}!</h3>
                      <p className="text-gray-300">Your verified status gives you access to exclusive features</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-8 h-8 text-[#145214]" />
                      <span className="text-sm font-semibold text-[#145214]">Verified Account</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <DollarSign className="w-12 h-12 text-[#328CC1] mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Crypto Funding</h4>
                      <p className="text-sm text-gray-300">Fund projects with ETH, USDT, USDC, and more</p>
                    </div>
                    <div className="text-center">
                      <Shield className="w-12 h-12 text-[#145214] mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">On-Chain Identity</h4>
                      <p className="text-sm text-gray-300">Your role and contributions are verified on blockchain</p>
                    </div>
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-[#0B3C5D] mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">DAO Governance</h4>
                      <p className="text-sm text-gray-300">Vote on project funding and platform decisions</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-center">
                    <Button
                      onClick={disconnectWallet}
                      variant="outline"
                      className="border-red-500/40 text-red-400 hover:bg-red-500/10 bg-transparent"
                    >
                      Disconnect Wallet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Stats Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <Card key={index} className="bg-black/60 border-[#328CC1]/20 backdrop-blur-md text-center">
                    <CardContent className="p-6">
                      <IconComponent className="w-8 h-8 text-[#145214] mx-auto mb-3" />
                      <p className="text-3xl font-bold text-[#328CC1] mb-1">{stat.value}</p>
                      <p className="text-sm text-gray-300">{stat.label}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Features Section */}
          <section className="container mx-auto px-4 py-20">
            <div className="text-center mb-16 bg-black/40 backdrop-blur-md rounded-lg p-8">
              <h2 className="text-4xl font-bold mb-4">Powerful Features for Climate Action</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Comprehensive tools to monitor, fund, and protect our environment through collaborative action
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Card
                    key={index}
                    className="bg-black/60 border-[#328CC1]/20 backdrop-blur-md hover:bg-black/70 transition-all duration-300 group"
                  >
                    <CardHeader>
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `${feature.color}20` }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: feature.color }} />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{feature.description}</p>
                      <Button variant="ghost" className="text-[#328CC1] hover:text-[#328CC1]/80 p-0">
                        Learn more <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* How It Works Section */}
          <section className="container mx-auto px-4 py-20">
            <div className="text-center mb-16 bg-black/40 backdrop-blur-md rounded-lg p-8">
              <h2 className="text-4xl font-bold mb-4">How EcoChain Works</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Simple steps to make a global environmental impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-black/40 backdrop-blur-md rounded-lg p-6">
                <div className="w-16 h-16 bg-[#328CC1]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-[#328CC1]">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Connect & Collaborate</h3>
                <p className="text-gray-300">
                  Join a global network of governments, researchers, NGOs, and communities working together for
                  environmental protection.
                </p>
              </div>

              <div className="text-center bg-black/40 backdrop-blur-md rounded-lg p-6">
                <div className="w-16 h-16 bg-[#145214]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-[#145214]">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Contribute Data</h3>
                <p className="text-gray-300">
                  Upload environmental observations, photos, and measurements to build the world's largest climate
                  database.
                </p>
              </div>

              <div className="text-center bg-black/40 backdrop-blur-md rounded-lg p-6">
                <div className="w-16 h-16 bg-[#0B3C5D]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-[#0B3C5D]">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Fund & Monitor</h3>
                <p className="text-gray-300">
                  Support environmental projects with cryptocurrency and track their real-world impact through
                  transparent blockchain funding.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 py-20">
            <Card className="bg-gradient-to-r from-[#0B3C5D]/60 to-[#145214]/60 border-[#328CC1]/20 backdrop-blur-md">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold mb-4">Ready to Make an Impact?</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of environmental advocates using blockchain technology to create real change for our
                  planet.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-[#328CC1] hover:bg-[#328CC1]/80 text-white px-8 py-4 text-lg">
                      <Wallet className="w-5 h-5 mr-2" />
                      Get Started Now
                    </Button>
                  </Link>
                  <Link href="/learning">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[#F6F6F6]/20 text-[#F6F6F6] hover:bg-[#F6F6F6]/10 px-8 py-4 text-lg bg-transparent"
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#328CC1]/20 bg-black/60 backdrop-blur-md">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#328CC1] to-[#145214] rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">EcoChain</span>
                </div>
                <p className="text-sm text-gray-300">
                  Empowering global climate action through blockchain technology and collaborative environmental
                  monitoring.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Platform</h4>
                <div className="space-y-2">
                  <Link
                    href="/dashboard"
                    className="block text-sm text-gray-300 hover:text-[#328CC1] transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link href="/projects" className="block text-sm text-gray-300 hover:text-[#328CC1] transition-colors">
                    Projects
                  </Link>
                  <Link
                    href="/collaboration"
                    className="block text-sm text-gray-300 hover:text-[#328CC1] transition-colors"
                  >
                    Collaboration
                  </Link>
                  <Link
                    href="/data-collection"
                    className="block text-sm text-gray-300 hover:text-[#328CC1] transition-colors"
                  >
                    Data Collection
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <div className="space-y-2">
                  <Link href="/learning" className="block text-sm text-gray-300 hover:text-[#328CC1] transition-colors">
                    Learning
                  </Link>
                  <Link
                    href="/community"
                    className="block text-sm text-gray-300 hover:text-[#328CC1] transition-colors"
                  >
                    Community
                  </Link>
                  <Link href="/maps" className="block text-sm text-gray-300 hover:text-[#328CC1] transition-colors">
                    Maps
                  </Link>
                  <Link href="/funding" className="block text-sm text-gray-300 hover:text-[#328CC1] transition-colors">
                    Funding
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-sm text-gray-300 hover:text-[#328CC1] transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="block text-sm text-gray-300 hover:text-[#328CC1] transition-colors">
                    Discord
                  </a>
                  <a href="#" className="block text-sm text-gray-300 hover:text-[#328CC1] transition-colors">
                    GitHub
                  </a>
                  <a href="#" className="block text-sm text-gray-300 hover:text-[#328CC1] transition-colors">
                    Documentation
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-[#328CC1]/20 mt-8 pt-8 text-center">
              <p className="text-sm text-gray-300">
                © 2024 EcoChain. All rights reserved. Building a sustainable future through technology.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
