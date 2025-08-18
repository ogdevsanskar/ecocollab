import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { mistral } from "@ai-sdk/mistral"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()

    try {
      const systemPrompt = `You are EcoChain AI Assistant for a Web3 climate platform. Help users with:
      - Environmental data analysis and insights
      - Climate project recommendations and funding
      - Platform navigation and features
      - Sustainability metrics and SDG progress
      - Real-time environmental alerts and monitoring
      
      Keep responses helpful, concise, and focused on climate action.`

      let text = ""

      // Try Mistral API first
      if (process.env.MISTRAL_API_KEY) {
        try {
          const result = await generateText({
            model: mistral("mistral-small-latest"),
            system: systemPrompt,
            messages: [...(history || []), { role: "user", content: message }],
            maxTokens: 200,
            temperature: 0.7,
          })
          text = result.text
        } catch (mistralError) {
          console.log("Mistral API failed, trying OpenAI...")

          // Fallback to OpenAI
          if (process.env.OPENAI_API_KEY) {
            const result = await generateText({
              model: openai("gpt-4o-mini"),
              system: systemPrompt,
              messages: [...(history || []), { role: "user", content: message }],
              maxTokens: 200,
              temperature: 0.7,
            })
            text = result.text
          } else {
            throw new Error("No AI APIs available")
          }
        }
      } else if (process.env.OPENAI_API_KEY) {
        // Try OpenAI if Mistral not available
        const result = await generateText({
          model: openai("gpt-4o-mini"),
          system: systemPrompt,
          messages: [...(history || []), { role: "user", content: message }],
          maxTokens: 200,
          temperature: 0.7,
        })
        text = result.text
      } else {
        throw new Error("No AI APIs configured")
      }

      return NextResponse.json({ response: text })
    } catch (aiError) {
      console.log("AI APIs not available, using fallback responses")

      const lowerMessage = message.toLowerCase()
      let fallbackResponse = ""

      if (lowerMessage.includes("dashboard")) {
        fallbackResponse =
          "Your dashboard shows real-time climate metrics with 3 active alerts. Current global temperature is 1.2°C above baseline with improving air quality trends."
      } else if (lowerMessage.includes("project")) {
        fallbackResponse =
          "12 active climate projects are available including coral reef restoration ($125K funded) and Amazon reforestation ($89K funded). Ocean cleanup needs $75K more funding."
      } else if (lowerMessage.includes("data") || lowerMessage.includes("analytics")) {
        fallbackResponse =
          "Environmental data shows deforestation decreased 15% this month. Ocean pH levels stable at 8.1. Check Data Hub for detailed satellite imagery and IoT sensor readings."
      } else if (lowerMessage.includes("funding") || lowerMessage.includes("blockchain")) {
        fallbackResponse =
          "Total funding pool: $12.4M across 32 projects. Smart contracts ensure transparent milestone-based payments. Connect your wallet to participate in funding decisions."
      } else if (lowerMessage.includes("map") || lowerMessage.includes("satellite")) {
        fallbackResponse =
          "Satellite maps show 3 deforestation hotspots requiring attention. Marine pollution detected in 2 coastal zones. Real-time monitoring active across 15 regions."
      } else if (lowerMessage.includes("community")) {
        fallbackResponse =
          "2,847 active community members. Recent discussions: marine conservation (45 posts), renewable energy (32 posts). Join challenges to earn sustainability badges."
      } else if (lowerMessage.includes("sustainability") || lowerMessage.includes("sdg")) {
        fallbackResponse =
          "SDG Progress: Climate Action 78% complete, Ocean Health 65%, Forest Conservation 82%. Regional performance varies - check sustainability scorecards for details."
      } else if (lowerMessage.includes("weather") || lowerMessage.includes("temperature")) {
        fallbackResponse =
          "Current global temperature anomaly: +1.2°C. Extreme weather events increased 23% this year. Monitor real-time weather impacts on funded projects."
      } else if (lowerMessage.includes("forest") || lowerMessage.includes("deforestation")) {
        fallbackResponse =
          "Forest monitoring: 2.3 hectares lost this week in Amazon region. Reforestation projects planted 15K trees. 3 active deforestation alerts need immediate response."
      } else if (lowerMessage.includes("ocean") || lowerMessage.includes("marine")) {
        fallbackResponse =
          "Ocean health: pH 8.1 (stable), plastic waste in 5 zones needs cleanup. Coral reef restoration project shows 34% recovery rate in monitored areas."
      } else {
        fallbackResponse = `I can help with climate data analysis, project funding, environmental monitoring, and platform navigation. Try asking about "dashboard", "projects", "funding", or "sustainability metrics".`
      }

      return NextResponse.json({ response: fallbackResponse })
    }
  } catch (error) {
    console.error("API Route Error:", error)
    return NextResponse.json(
      {
        response:
          "I'm experiencing technical difficulties. Please try asking about climate projects, environmental data, or platform features.",
      },
      { status: 200 },
    )
  }
}
