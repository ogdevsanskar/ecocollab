"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, X, Bot, Sparkles } from "lucide-react"

export default function AIVoiceAssistant() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [textInput, setTextInput] = useState("")
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: string; content: string }>>([])

  const handleTextMessage = async (message: string) => {
    if (!message.trim()) return

    setTranscript(message)
    setTextInput("")
    setIsProcessing(true)

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          history: conversationHistory.slice(-4), // Keep last 4 exchanges for context
        }),
      })

      if (!response.ok) {
        throw new Error("API request failed")
      }

      const data = await response.json()
      const aiResponse = data.response

      setResponse(aiResponse)

      // Update conversation history
      setConversationHistory((prev) => [
        ...prev.slice(-4), // Keep last 4 exchanges for context
        { role: "user", content: message },
        { role: "assistant", content: aiResponse },
      ])
    } catch (error) {
      console.error("AI API Error:", error)

      let aiResponse = ""
      const lowerCommand = message.toLowerCase()

      if (lowerCommand.includes("dashboard")) {
        aiResponse =
          "Navigating to your dashboard where you can view real-time climate metrics, project updates, and environmental alerts."
      } else if (lowerCommand.includes("project")) {
        aiResponse =
          "I found 12 active climate projects including coral reef restoration and Amazon reforestation. Which category interests you most?"
      } else if (lowerCommand.includes("data") || lowerCommand.includes("analytics")) {
        aiResponse =
          "Your environmental data shows recent improvements in air quality and successful forest monitoring. Check the Data Hub for detailed analytics."
      } else if (lowerCommand.includes("funding") || lowerCommand.includes("blockchain")) {
        aiResponse =
          "Current funding pool has $12.4M available across projects. The ocean cleanup initiative needs $75K more to reach its milestone."
      } else if (lowerCommand.includes("map") || lowerCommand.includes("satellite")) {
        aiResponse =
          "Opening environmental maps with real-time satellite data. I detected 3 deforestation alerts requiring attention in monitored regions."
      } else if (lowerCommand.includes("community") || lowerCommand.includes("collaborate")) {
        aiResponse =
          "The community has 2,847 active participants. Recent discussions focus on marine conservation and renewable energy projects."
      } else if (lowerCommand.includes("sustainability") || lowerCommand.includes("sdg")) {
        aiResponse =
          "SDG progress shows 78% completion on Climate Action goals. Ocean health metrics need attention in coastal regions."
      } else if (lowerCommand.includes("weather") || lowerCommand.includes("temperature")) {
        aiResponse =
          "Current global temperature is 1.2°C above pre-industrial levels. Recent weather patterns show increased extreme events in monitored regions."
      } else if (lowerCommand.includes("forest") || lowerCommand.includes("deforestation")) {
        aiResponse =
          "Forest monitoring shows 3 active deforestation alerts. The Amazon region needs immediate attention with 2.3 hectares lost this week."
      } else if (lowerCommand.includes("ocean") || lowerCommand.includes("marine")) {
        aiResponse =
          "Ocean health metrics indicate pH levels at 8.1 with plastic waste concentrations requiring cleanup in 5 monitored zones."
      } else {
        aiResponse = `I understand: "${message}". I can help with climate data, project funding, environmental monitoring, or platform navigation. What would you like to explore?`
      }

      setResponse(aiResponse)
    }

    setIsProcessing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTextMessage(textInput)
    }
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setTranscript("")
      setResponse("")
      setTextInput("")
      setConversationHistory([])
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <Card className="mb-4 w-80 p-4 bg-black/80 backdrop-blur-md border-[#328CC1]/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bot className="w-5 h-5 text-[#328CC1]" />
                <Sparkles className="w-3 h-3 text-[#145214] absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-sm font-medium text-[#F6F6F6]">EcoChain AI Assistant</span>
              <div className="px-2 py-1 bg-gradient-to-r from-[#328CC1]/20 to-[#145214]/20 rounded-full">
                <span className="text-xs text-[#328CC1]">AI-Powered</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={toggleExpanded}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="mb-3">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-[#0B3C5D]/30 border-[#328CC1]/30 text-[#F6F6F6] placeholder-[#F6F6F6]/50"
                disabled={isProcessing}
              />
              <Button
                onClick={() => handleTextMessage(textInput)}
                size="sm"
                className="bg-[#328CC1] hover:bg-[#328CC1]/80 text-white"
                disabled={isProcessing || !textInput.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {transcript && (
            <div className="mb-3 p-2 bg-[#0B3C5D]/30 rounded-lg">
              <p className="text-xs text-[#328CC1] mb-1">You said:</p>
              <p className="text-sm text-[#F6F6F6]">{transcript}</p>
            </div>
          )}

          {isProcessing && (
            <div className="mb-3 p-2 bg-[#145214]/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#328CC1] rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-[#328CC1] rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-[#328CC1] rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <span className="text-xs text-[#F6F6F6]">Processing...</span>
              </div>
            </div>
          )}

          {response && (
            <div className="mb-3 p-2 bg-[#145214]/30 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-[#145214]">AI Response:</p>
              </div>
              <p className="text-sm text-[#F6F6F6]">{response}</p>
            </div>
          )}

          <p className="text-xs text-[#F6F6F6]/60 mt-2 text-center">
            Ask about climate data, projects, funding, or type "Show me the dashboard"
          </p>
        </Card>
      )}

      <Button
        onClick={toggleExpanded}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isExpanded
            ? "bg-[#0B3C5D] hover:bg-[#0B3C5D]/80"
            : "bg-gradient-to-r from-[#328CC1] to-[#145214] hover:scale-110 shadow-[#328CC1]/25"
        } text-white relative overflow-hidden`}
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <Bot className="w-6 h-6" />
            <Sparkles className="w-3 h-3 absolute -top-1 -right-1 animate-pulse" />
          </div>
        )}
        {!isExpanded && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#328CC1]/20 to-[#145214]/20 animate-pulse rounded-full" />
        )}
      </Button>
    </div>
  )
}
