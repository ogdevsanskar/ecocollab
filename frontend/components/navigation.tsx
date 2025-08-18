"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Wallet, Shield, Menu, X } from "lucide-react"

interface NavigationProps {
  isWalletConnected?: boolean
  userRole?: string | null
  onConnectWallet?: () => void
}

export default function Navigation({ isWalletConnected = false, userRole = null, onConnectWallet }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/projects", label: "Projects" },
    { href: "/collaboration", label: "Collaboration" },
    { href: "/data", label: "Data Hub" },
    { href: "/maps", label: "Maps" },
    { href: "/sustainability", label: "Sustainability" },
    { href: "/funding", label: "Funding" },
    { href: "/community", label: "Community" },
    { href: "/learning", label: "Learning" },
  ]

  return (
    <header className="border-b border-[#328CC1]/20 bg-black/20 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#328CC1] to-[#145214] rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">EcoChain</h1>
              <p className="text-sm text-[#328CC1]">Climate Action Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  pathname === item.href ? "text-[#328CC1] font-medium" : "text-[#F6F6F6] hover:text-[#328CC1]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {!isWalletConnected ? (
              <Button onClick={onConnectWallet} className="bg-[#328CC1] hover:bg-[#328CC1]/80 text-white">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-[#145214] text-white">
                  <Shield className="w-3 h-3 mr-1" />
                  {userRole}
                </Badge>
                <div className="w-8 h-8 bg-[#328CC1] rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">0x</span>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-[#328CC1]/20 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors ${
                    pathname === item.href ? "text-[#328CC1] font-medium" : "text-[#F6F6F6] hover:text-[#328CC1]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
