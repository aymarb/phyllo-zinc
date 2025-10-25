import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ChatbotWidget } from "@/components/chatbot-widget"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Green Synthesis of ZnO Nanoparticles | Research Publication",
  description:
    "Innovative green synthesis of zinc oxide nanoparticles using Phyllanthus niruri leaf extract for sustainable methane mitigation in ruminant feed additives.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <ChatbotWidget />
        <Analytics />
      </body>
    </html>
  )
}
