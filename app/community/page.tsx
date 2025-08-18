"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { EmailService, MapboxService } from "@/lib/api-services"
import {
  Users,
  Trophy,
  Star,
  MessageCircle,
  Heart,
  Share2,
  Award,
  Target,
  Zap,
  Crown,
  Medal,
  Gift,
  MapPin,
  Camera,
  Globe,
  Mail,
} from "lucide-react"

export default function CommunityPage() {
  const [newPost, setNewPost] = useState("")
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null)
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([])
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const router = useRouter()

  const handleCreatePost = async () => {
    if (!newPost.trim()) {
      alert("Please enter some content for your post.")
      return
    }

    if (emailNotifications) {
      try {
        await EmailService.sendAlert(
          "community@ecochain.org",
          "New Community Post",
          `
          <h2>New Environmental Impact Update</h2>
          <p>A community member has shared a new update:</p>
          <blockquote style="border-left: 4px solid #328CC1; padding-left: 16px; margin: 16px 0;">
            ${newPost}
          </blockquote>
          <p>Join the conversation on the EcoChain platform!</p>
          <a href="${window.location.origin}/community" style="background: #328CC1; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px;">View Post</a>
          `,
        )
      } catch (error) {
        console.error("Failed to send community notification:", error)
      }
    }

    alert(
      `Post created successfully!\n\n"${newPost}"\n\nYour environmental impact update has been shared with the community and will help inspire others to take action.`,
    )
    setNewPost("")
  }

  const handleAddPhoto = () => {
    alert(
      "Photo upload interface would open here. Users can attach images of their environmental work, data visualizations, or project progress.",
    )
  }

  const handleAddLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          setCurrentLocation({ lat, lng })

          try {
            const locationData = await MapboxService.geocodeLocation(`${lng},${lat}`)
            const placeName = locationData.features?.[0]?.place_name || `${lat}, ${lng}`

            alert(
              `Location added: ${placeName}\n\nThis helps other community members see where environmental work is happening globally. Your location will be shown on the community impact map.`,
            )
          } catch (error) {
            console.error("Failed to geocode location:", error)
            alert(
              `Location added: ${lat}, ${lng}\n\nThis helps other community members see where environmental work is happening globally.`,
            )
          }
        },
        () => alert("Unable to get location. You can manually enter your project location."),
      )
    } else {
      alert("Location services not available. You can manually enter your project location.")
    }
  }

  const handleLikePost = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const handleCommentPost = (postId: number, authorName: string) => {
    alert(
      `Comment interface would open for ${authorName}'s post. You can engage with community members, ask questions about their projects, or share related experiences.`,
    )
  }

  const handleSharePost = async (postId: number, content: string) => {
    if (navigator.share) {
      navigator.share({
        title: "Environmental Impact Update",
        text: content.substring(0, 100) + "...",
        url: window.location.href + `?post=${postId}`,
      })
    } else {
      navigator.clipboard.writeText(window.location.href + `?post=${postId}`)
      alert("Post link copied to clipboard! Share this environmental impact story with others.")
    }
  }

  const handleJoinChallenge = async (challengeId: number, challengeTitle: string) => {
    if (joinedChallenges.includes(challengeId)) {
      alert(`You're already participating in "${challengeTitle}"! Check your progress in the dashboard.`)
      return
    }

    setJoinedChallenges((prev) => [...prev, challengeId])

    if (emailNotifications) {
      try {
        await EmailService.sendAlert(
          "user@example.com", // In real app, this would be the user's email
          `Welcome to ${challengeTitle}!`,
          `
          <h2>Challenge Joined Successfully!</h2>
          <p>You've successfully joined the <strong>${challengeTitle}</strong> challenge.</p>
          <h3>Next Steps:</h3>
          <ul>
            <li>Check your dashboard for challenge requirements</li>
            <li>Track your progress daily</li>
            <li>Connect with other participants</li>
            <li>Earn EcoTokens and NFT badges upon completion</li>
          </ul>
          <p>Good luck making a positive environmental impact!</p>
          <a href="${window.location.origin}/dashboard" style="background: #145214; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px;">View Dashboard</a>
          `,
        )
      } catch (error) {
        console.error("Failed to send challenge notification:", error)
      }
    }

    alert(
      `Successfully joined "${challengeTitle}"!\n\nYou'll receive notifications about requirements and can track your progress. Complete challenges to earn EcoTokens and NFT badges.`,
    )
  }

  const handleViewProfile = (userName: string, userRole: string) => {
    alert(
      `Opening profile for ${userName} (${userRole})\n\nThis would show their contributions, projects, NFT badges, and environmental impact metrics.`,
    )
  }

  const handleToggleEmailNotifications = async () => {
    setEmailNotifications(!emailNotifications)

    if (!emailNotifications) {
      try {
        await EmailService.sendAlert(
          "user@example.com",
          "Email Notifications Enabled",
          `
          <h2>Email Notifications Activated</h2>
          <p>You'll now receive email updates for:</p>
          <ul>
            <li>New community posts and interactions</li>
            <li>Challenge updates and deadlines</li>
            <li>Environmental alerts in your area</li>
            <li>Project funding milestones</li>
          </ul>
          <p>You can disable these anytime in your community settings.</p>
          `,
        )
      } catch (error) {
        console.error("Failed to send notification settings update:", error)
      }
    }

    alert(
      emailNotifications
        ? "Email notifications disabled. You'll no longer receive community updates via email."
        : "Email notifications enabled! You'll receive updates about community activity, challenges, and environmental alerts.",
    )
  }

  const leaderboard = [
    {
      rank: 1,
      name: "Dr. Sarah Chen",
      role: "Marine Biologist",
      points: 2847,
      badges: ["Data Expert", "Coral Guardian", "Top Contributor"],
      avatar: "SC",
      contributions: 156,
      projects: 12,
      walletBadges: ["Verified Researcher", "Climate Champion"],
    },
    {
      rank: 2,
      name: "Amazon Conservation NGO",
      role: "Environmental Organization",
      points: 2634,
      badges: ["Forest Protector", "Community Leader", "Project Pioneer"],
      avatar: "AC",
      contributions: 203,
      projects: 8,
      walletBadges: ["Verified NGO", "Impact Leader"],
    },
    {
      rank: 3,
      name: "Marcus Rodriguez",
      role: "Community Scientist",
      points: 2156,
      badges: ["Data Collector", "Local Hero", "Consistent Contributor"],
      avatar: "MR",
      contributions: 89,
      projects: 15,
      walletBadges: ["Verified Community", "Data Pioneer"],
    },
    {
      rank: 4,
      name: "Green Future Foundation",
      role: "Research Institution",
      points: 1923,
      badges: ["Innovation Leader", "Tech Pioneer", "Sustainability Expert"],
      avatar: "GF",
      contributions: 134,
      projects: 6,
      walletBadges: ["Verified Institution", "Tech Innovator"],
    },
    {
      rank: 5,
      name: "Elena Kowalski",
      role: "Environmental Student",
      points: 1687,
      badges: ["Rising Star", "Learning Champion", "Future Leader"],
      avatar: "EK",
      contributions: 67,
      projects: 9,
      walletBadges: ["Verified Student", "Future Scientist"],
    },
  ]

  const challenges = [
    {
      id: 1,
      title: "Ocean Cleanup Champion",
      description: "Document and report marine pollution in your local area",
      reward: "500 EcoTokens + Marine Guardian NFT",
      participants: 1247,
      timeLeft: "12 days",
      difficulty: "Medium",
      category: "Marine Conservation",
      icon: Globe,
      color: "#328CC1",
      requirements: ["Upload 10 pollution photos", "GPS location data", "Impact assessment"],
      progress: 67,
    },
    {
      id: 2,
      title: "Carbon Footprint Tracker",
      description: "Track and reduce your carbon emissions for 30 days",
      reward: "300 EcoTokens + Carbon Neutral NFT",
      participants: 892,
      timeLeft: "8 days",
      difficulty: "Easy",
      category: "Climate Action",
      icon: Zap,
      color: "#145214",
      requirements: ["Daily emission logs", "Reduction strategies", "Final report"],
      progress: 43,
    },
    {
      id: 3,
      title: "Biodiversity Survey Master",
      description: "Conduct species surveys in protected areas",
      reward: "750 EcoTokens + Biodiversity Expert NFT",
      participants: 456,
      timeLeft: "20 days",
      difficulty: "Hard",
      category: "Wildlife Conservation",
      icon: Camera,
      color: "#0B3C5D",
      requirements: ["Species identification", "Population counts", "Habitat assessment"],
      progress: 28,
    },
  ]

  const communityPosts = [
    {
      id: 1,
      author: "Dr. Sarah Chen",
      role: "Marine Biologist",
      avatar: "SC",
      timestamp: "2 hours ago",
      content:
        "Just completed our coral restoration project in the Maldives! 🐠 The AI predictions were spot-on - we achieved 89% coral survival rate. Blockchain funding made this transparent and efficient.",
      likes: 156,
      comments: 23,
      shares: 12,
      images: ["/coral-reef-restoration.png"],
      badges: ["Verified Researcher", "Coral Guardian"],
    },
    {
      id: 2,
      author: "Amazon Conservation NGO",
      role: "Environmental Organization",
      avatar: "AC",
      timestamp: "5 hours ago",
      content:
        "Our reforestation milestone has been reached! 🌳 Thanks to the community's support, we've planted 50,000 trees. Smart contracts automatically released the next funding phase.",
      likes: 234,
      comments: 45,
      shares: 67,
      images: ["/amazon-rainforest-planting.png"],
      badges: ["Verified NGO", "Forest Protector"],
    },
    {
      id: 3,
      author: "Marcus Rodriguez",
      role: "Community Scientist",
      avatar: "MR",
      timestamp: "1 day ago",
      content:
        "Sharing my latest water quality data from the local river. pH levels have improved by 15% since the cleanup initiative started! Data is now on IPFS for transparency.",
      likes: 89,
      comments: 17,
      shares: 8,
      images: ["/placeholder-8f1c8.png"],
      badges: ["Verified Community", "Data Collector"],
    },
  ]

  const nftBadges = [
    { name: "Climate Champion", rarity: "Legendary", holders: 23, color: "#ff6b35" },
    { name: "Ocean Guardian", rarity: "Epic", holders: 156, color: "#328CC1" },
    { name: "Forest Protector", rarity: "Rare", holders: 342, color: "#145214" },
    { name: "Data Pioneer", rarity: "Uncommon", holders: 789, color: "#0B3C5D" },
    { name: "Community Leader", rarity: "Common", holders: 1247, color: "#666666" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0B3C5D] to-[#0A0A0A] text-[#F6F6F6]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#328CC1] to-[#145214] bg-clip-text text-transparent">
                Community Hub
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                Connect with environmental advocates worldwide. Earn NFT badges, participate in challenges, and build a
                sustainable future together.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleEmailNotifications}
                className={`border-[#328CC1]/40 ${
                  emailNotifications ? "text-[#328CC1] bg-[#328CC1]/10" : "text-gray-400 bg-transparent"
                } hover:bg-[#328CC1]/20`}
              >
                <Mail className="w-4 h-4 mr-2" />
                {emailNotifications ? "Email Alerts On" : "Email Alerts Off"}
              </Button>
              {currentLocation && (
                <Badge className="bg-[#145214]/20 text-[#145214] border-[#145214]/40">
                  <MapPin className="w-3 h-3 mr-1" />
                  Location Set
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-[#328CC1] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#328CC1] mb-1">12.8K</p>
              <p className="text-sm text-gray-300">Active Members</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <Trophy className="w-8 h-8 text-[#145214] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#145214] mb-1">2.4K</p>
              <p className="text-sm text-gray-300">NFT Badges Earned</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <Target className="w-8 h-8 text-[#0B3C5D] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#0B3C5D] mb-1">156</p>
              <p className="text-sm text-gray-300">Active Challenges</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <Award className="w-8 h-8 text-[#328CC1] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#328CC1] mb-1">45.2K</p>
              <p className="text-sm text-gray-300">Contributions Made</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Create Post */}
            <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-[#328CC1]" />
                  Share Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Share your environmental project updates, data findings, or conservation insights..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="bg-black/20 border-[#328CC1]/20 min-h-[100px]"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#328CC1]/40 text-[#328CC1] bg-transparent"
                        onClick={handleAddPhoto}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Add Photo
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#145214]/40 text-[#145214] bg-transparent"
                        onClick={handleAddLocation}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Add Location
                      </Button>
                    </div>
                    <Button className="bg-[#328CC1] hover:bg-[#328CC1]/80" onClick={handleCreatePost}>
                      Post Update
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Feed */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Community Feed</h2>
              {communityPosts.map((post) => {
                const isLiked = likedPosts.includes(post.id)
                return (
                  <Card key={post.id} className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className="w-12 h-12 bg-[#328CC1] rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-[#328CC1]/80 transition-colors"
                          onClick={() => handleViewProfile(post.author, post.role)}
                        >
                          {post.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3
                              className="font-semibold cursor-pointer hover:text-[#328CC1] transition-colors"
                              onClick={() => handleViewProfile(post.author, post.role)}
                            >
                              {post.author}
                            </h3>
                            <Badge variant="outline" className="border-[#328CC1]/40 text-[#328CC1] text-xs">
                              {post.role}
                            </Badge>
                            <span className="text-xs text-gray-400">{post.timestamp}</span>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.badges.map((badge, index) => (
                              <Badge key={index} variant="secondary" className="bg-[#145214]/20 text-[#145214] text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                {badge}
                              </Badge>
                            ))}
                          </div>

                          <p className="text-gray-300 mb-4">{post.content}</p>

                          {post.images && (
                            <div className="mb-4">
                              <img
                                src={post.images[0] || "/placeholder.svg"}
                                alt="Post content"
                                className="rounded-lg max-w-full h-48 object-cover"
                              />
                            </div>
                          )}

                          <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <button
                              className={`flex items-center space-x-1 hover:text-[#328CC1] transition-colors ${
                                isLiked ? "text-red-400" : ""
                              }`}
                              onClick={() => handleLikePost(post.id)}
                            >
                              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                              <span>{post.likes + (isLiked ? 1 : 0)}</span>
                            </button>
                            <button
                              className="flex items-center space-x-1 hover:text-[#328CC1] transition-colors"
                              onClick={() => handleCommentPost(post.id, post.author)}
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </button>
                            <button
                              className="flex items-center space-x-1 hover:text-[#328CC1] transition-colors"
                              onClick={() => handleSharePost(post.id, post.content)}
                            >
                              <Share2 className="w-4 h-4" />
                              <span>{post.shares}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Leaderboard */}
            <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-[#328CC1]" />
                  Community Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.slice(0, 5).map((user) => (
                    <div key={user.rank} className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          user.rank === 1
                            ? "bg-yellow-500 text-black"
                            : user.rank === 2
                              ? "bg-gray-400 text-black"
                              : user.rank === 3
                                ? "bg-orange-600 text-white"
                                : "bg-[#328CC1] text-white"
                        }`}
                      >
                        {user.rank === 1 ? (
                          <Crown className="w-4 h-4" />
                        ) : user.rank === 2 ? (
                          <Medal className="w-4 h-4" />
                        ) : user.rank === 3 ? (
                          <Award className="w-4 h-4" />
                        ) : (
                          user.rank
                        )}
                      </div>
                      <div
                        className="w-10 h-10 bg-[#328CC1] rounded-full flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-[#328CC1]/80 transition-colors"
                        onClick={() => handleViewProfile(user.name, user.role)}
                      >
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <p
                          className="font-semibold text-sm cursor-pointer hover:text-[#328CC1] transition-colors"
                          onClick={() => handleViewProfile(user.name, user.role)}
                        >
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-400">{user.points} points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Challenges */}
            <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-[#145214]" />
                  Active Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {challenges.slice(0, 2).map((challenge) => {
                    const IconComponent = challenge.icon
                    const isJoined = joinedChallenges.includes(challenge.id)
                    return (
                      <div key={challenge.id} className="border border-[#328CC1]/20 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${challenge.color}20` }}
                          >
                            <IconComponent className="w-5 h-5" style={{ color: challenge.color }} />
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              challenge.difficulty === "Easy"
                                ? "border-green-500/40 text-green-400"
                                : challenge.difficulty === "Medium"
                                  ? "border-yellow-500/40 text-yellow-400"
                                  : "border-red-500/40 text-red-400"
                            }`}
                          >
                            {challenge.difficulty}
                          </Badge>
                        </div>

                        <h3 className="font-semibold text-sm mb-2">{challenge.title}</h3>
                        <p className="text-xs text-gray-300 mb-3">{challenge.description}</p>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{challenge.progress}%</span>
                          </div>
                          <Progress value={challenge.progress} className="h-1" />
                        </div>

                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-gray-400">{challenge.participants} participants</span>
                          <Button
                            size="sm"
                            className={`text-xs ${
                              isJoined ? "bg-[#145214] hover:bg-[#145214]/80" : "bg-[#328CC1] hover:bg-[#328CC1]/80"
                            }`}
                            onClick={() => handleJoinChallenge(challenge.id, challenge.title)}
                          >
                            {isJoined ? "Joined" : "Join Challenge"}
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* NFT Badge Collection */}
            <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="w-5 h-5 mr-2 text-[#145214]" />
                  NFT Badge Collection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nftBadges.map((badge, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${badge.color}20` }}
                        >
                          <Star className="w-4 h-4" style={{ color: badge.color }} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{badge.name}</p>
                          <p className="text-xs text-gray-400">{badge.rarity}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{badge.holders}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
