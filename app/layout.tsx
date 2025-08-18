import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import AIVoiceAssistant from "@/components/ai-voice-assistant"
import Navigation from "@/components/navigation"

export const metadata: Metadata = {
  title: "Climate Action Platform",
  description: "Web3-powered climate action and environmental monitoring platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark antialiased">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="bg-black text-white">
        <Navigation />
        {children}
        <AIVoiceAssistant />
      </body>
    </html>
  )
}
