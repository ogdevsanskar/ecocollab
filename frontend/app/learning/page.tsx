"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Play,
  Award,
  Target,
  Brain,
  Clock,
  CheckCircle,
  Lock,
  Star,
  Trophy,
  Zap,
  Globe,
  TreePine,
  Waves,
  Lightbulb,
  GraduationCap,
  Medal,
  Gift,
} from "lucide-react"

export default function LearningPage() {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null)
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2, 3])

  const learningTracks = [
    {
      id: "climate-science",
      title: "Climate Science Fundamentals",
      description: "Understanding the science behind climate change and environmental systems",
      icon: Globe,
      color: "#328CC1",
      lessons: 12,
      duration: "6 hours",
      difficulty: "Beginner",
      progress: 25,
      nftReward: "Climate Scholar NFT",
      participants: 2847,
    },
    {
      id: "marine-conservation",
      title: "Marine Ecosystem Conservation",
      description: "Protecting ocean life and marine biodiversity",
      icon: Waves,
      color: "#0B3C5D",
      lessons: 8,
      duration: "4 hours",
      difficulty: "Intermediate",
      progress: 62,
      nftReward: "Ocean Guardian NFT",
      participants: 1923,
    },
    {
      id: "forest-restoration",
      title: "Forest Restoration & Management",
      description: "Techniques for reforestation and sustainable forest management",
      icon: TreePine,
      color: "#145214",
      lessons: 10,
      duration: "5 hours",
      difficulty: "Advanced",
      progress: 0,
      nftReward: "Forest Protector NFT",
      participants: 1456,
    },
    {
      id: "renewable-energy",
      title: "Renewable Energy Systems",
      description: "Solar, wind, and sustainable energy technologies",
      icon: Zap,
      color: "#ff8800",
      lessons: 15,
      duration: "8 hours",
      difficulty: "Intermediate",
      progress: 40,
      nftReward: "Energy Pioneer NFT",
      participants: 3241,
    },
  ]

  const lessons = [
    {
      id: 1,
      title: "Introduction to Climate Systems",
      description: "Basic understanding of Earth's climate mechanisms",
      duration: "30 min",
      type: "Video + Quiz",
      completed: true,
      locked: false,
      points: 100,
    },
    {
      id: 2,
      title: "Greenhouse Effect Explained",
      description: "How greenhouse gases affect global temperature",
      duration: "25 min",
      type: "Interactive",
      completed: true,
      locked: false,
      points: 150,
    },
    {
      id: 3,
      title: "Carbon Cycle Dynamics",
      description: "Understanding carbon flow in ecosystems",
      duration: "35 min",
      type: "Simulation",
      completed: true,
      locked: false,
      points: 200,
    },
    {
      id: 4,
      title: "Climate Data Analysis",
      description: "Interpreting climate data and trends",
      duration: "45 min",
      type: "Hands-on Lab",
      completed: false,
      locked: false,
      points: 250,
    },
    {
      id: 5,
      title: "Mitigation Strategies",
      description: "Solutions for reducing climate impact",
      duration: "40 min",
      type: "Case Study",
      completed: false,
      locked: false,
      points: 300,
    },
    {
      id: 6,
      title: "Advanced Climate Modeling",
      description: "Using AI for climate predictions",
      duration: "60 min",
      type: "Project",
      completed: false,
      locked: true,
      points: 500,
    },
  ]

  const achievements = [
    {
      title: "First Steps",
      description: "Complete your first lesson",
      icon: GraduationCap,
      earned: true,
      rarity: "Common",
      points: 50,
    },
    {
      title: "Knowledge Seeker",
      description: "Complete 5 lessons in any track",
      icon: BookOpen,
      earned: true,
      rarity: "Uncommon",
      points: 200,
    },
    {
      title: "Climate Expert",
      description: "Complete an entire learning track",
      icon: Trophy,
      earned: false,
      rarity: "Rare",
      points: 1000,
    },
    {
      title: "Master Learner",
      description: "Complete 3 different learning tracks",
      icon: Medal,
      earned: false,
      rarity: "Epic",
      points: 2500,
    },
    {
      title: "Knowledge Champion",
      description: "Complete all available learning tracks",
      icon: Star,
      earned: false,
      rarity: "Legendary",
      points: 5000,
    },
  ]

  const personalizedRecommendations = [
    {
      title: "Ocean Acidification Impact",
      reason: "Based on your marine conservation progress",
      duration: "20 min",
      points: 150,
      type: "Video",
    },
    {
      title: "Blockchain for Carbon Credits",
      reason: "Matches your funding activity",
      duration: "35 min",
      points: 250,
      type: "Interactive",
    },
    {
      title: "AI in Environmental Monitoring",
      reason: "Recommended for data contributors",
      duration: "45 min",
      points: 300,
      type: "Lab",
    },
  ]

  const completeLesson = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0B3C5D] to-[#0A0A0A] text-[#F6F6F6]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#328CC1] to-[#145214] bg-clip-text text-transparent">
            Climate Education Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Gamified learning with AI-personalized content. Earn NFT badges and build expertise in environmental science
            and conservation.
          </p>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <BookOpen className="w-8 h-8 text-[#328CC1] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#328CC1] mb-1">24</p>
              <p className="text-sm text-gray-300">Lessons Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <Trophy className="w-8 h-8 text-[#145214] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#145214] mb-1">1,250</p>
              <p className="text-sm text-gray-300">Learning Points</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <Award className="w-8 h-8 text-[#0B3C5D] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#0B3C5D] mb-1">5</p>
              <p className="text-sm text-gray-300">NFT Badges</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <Target className="w-8 h-8 text-[#328CC1] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#328CC1] mb-1">67%</p>
              <p className="text-sm text-gray-300">Track Progress</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Tracks */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Learning Tracks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningTracks.map((track) => {
                  const IconComponent = track.icon
                  return (
                    <Card
                      key={track.id}
                      className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedTrack(track.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                            style={{ backgroundColor: `${track.color}20` }}
                          >
                            <IconComponent className="w-6 h-6" style={{ color: track.color }} />
                          </div>
                          <Badge
                            variant="outline"
                            className={`${
                              track.difficulty === "Beginner"
                                ? "border-green-500/40 text-green-400"
                                : track.difficulty === "Intermediate"
                                  ? "border-yellow-500/40 text-yellow-400"
                                  : "border-red-500/40 text-red-400"
                            }`}
                          >
                            {track.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{track.title}</CardTitle>
                        <p className="text-gray-300 text-sm">{track.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-1" />
                              {track.lessons} lessons
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {track.duration}
                            </span>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Progress</span>
                              <span>{track.progress}%</span>
                            </div>
                            <Progress value={track.progress} className="h-2" />
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <Gift className="w-4 h-4 text-[#145214]" />
                              <span className="text-sm text-[#145214]">{track.nftReward}</span>
                            </div>
                            <span className="text-xs text-gray-400">{track.participants} learners</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Current Lessons */}
            {selectedTrack && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Climate Science Lessons</h2>
                <div className="space-y-4">
                  {lessons.map((lesson) => (
                    <Card
                      key={lesson.id}
                      className={`bg-black/40 border-[#328CC1]/20 backdrop-blur-sm ${
                        lesson.locked ? "opacity-50" : "hover:bg-black/60"
                      } transition-all duration-300`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                lesson.completed
                                  ? "bg-[#145214]/20"
                                  : lesson.locked
                                    ? "bg-gray-600/20"
                                    : "bg-[#328CC1]/20"
                              }`}
                            >
                              {lesson.completed ? (
                                <CheckCircle className="w-6 h-6 text-[#145214]" />
                              ) : lesson.locked ? (
                                <Lock className="w-6 h-6 text-gray-400" />
                              ) : (
                                <Play className="w-6 h-6 text-[#328CC1]" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{lesson.title}</h3>
                              <p className="text-gray-300 text-sm">{lesson.description}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-xs text-gray-400 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {lesson.duration}
                                </span>
                                <Badge variant="outline" className="border-[#328CC1]/40 text-[#328CC1] text-xs">
                                  {lesson.type}
                                </Badge>
                                <span className="text-xs text-[#145214] flex items-center">
                                  <Star className="w-3 h-3 mr-1" />
                                  {lesson.points} points
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            disabled={lesson.locked}
                            onClick={() => completeLesson(lesson.id)}
                            className={
                              lesson.completed
                                ? "bg-[#145214] hover:bg-[#145214]/80"
                                : "bg-[#328CC1] hover:bg-[#328CC1]/80"
                            }
                          >
                            {lesson.completed ? "Completed" : lesson.locked ? "Locked" : "Start"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* AI Recommendations */}
            <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-[#328CC1]" />
                  AI Recommendations
                </CardTitle>
                <p className="text-sm text-gray-300">Personalized content based on your activity</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personalizedRecommendations.map((rec, index) => (
                    <div key={index} className="border border-[#328CC1]/20 rounded-lg p-4">
                      <h3 className="font-semibold text-sm mb-2">{rec.title}</h3>
                      <p className="text-xs text-gray-400 mb-3">{rec.reason}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-400">{rec.duration}</span>
                          <Star className="w-3 h-3 text-[#145214]" />
                          <span className="text-xs text-[#145214]">{rec.points}pts</span>
                        </div>
                        <Button size="sm" className="bg-[#328CC1] hover:bg-[#328CC1]/80 text-xs">
                          Start
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-black/40 border-[#328CC1]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-[#145214]" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        achievement.earned ? "bg-[#145214]/20" : "bg-gray-600/10"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          achievement.earned ? "bg-[#145214]/30" : "bg-gray-600/20"
                        }`}
                      >
                        <achievement.icon
                          className={`w-5 h-5 ${achievement.earned ? "text-[#145214]" : "text-gray-400"}`}
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-semibold text-sm ${achievement.earned ? "text-[#145214]" : "text-gray-400"}`}
                        >
                          {achievement.title}
                        </p>
                        <p className="text-xs text-gray-400">{achievement.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              achievement.rarity === "Common"
                                ? "border-gray-500/40 text-gray-400"
                                : achievement.rarity === "Uncommon"
                                  ? "border-green-500/40 text-green-400"
                                  : achievement.rarity === "Rare"
                                    ? "border-blue-500/40 text-blue-400"
                                    : achievement.rarity === "Epic"
                                      ? "border-purple-500/40 text-purple-400"
                                      : "border-yellow-500/40 text-yellow-400"
                            }`}
                          >
                            {achievement.rarity}
                          </Badge>
                          <span className="text-xs text-[#328CC1]">{achievement.points} pts</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Streak */}
            <Card className="bg-gradient-to-r from-[#328CC1]/20 to-[#145214]/20 border-[#328CC1]/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Lightbulb className="w-12 h-12 text-[#328CC1] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">7-Day Streak!</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Keep learning daily to maintain your streak and earn bonus points
                </p>
                <div className="flex justify-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div
                      key={day}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        day <= 7 ? "bg-[#145214] text-white" : "bg-gray-600/20 text-gray-400"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <Button size="sm" className="bg-[#328CC1] hover:bg-[#328CC1]/80">
                  Continue Streak
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
