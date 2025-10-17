"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "./auth-provider"
import { useRouter } from "next/navigation"
import ThemeToggle from "./theme-toggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
    setIsProfileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
              <span className="text-primary-foreground font-bold text-lg">UC</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Uni Connect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              href="/calendar"
              className="px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-200 font-medium"
            >
              Calendar
            </Link>
            {user?.role === "moderator" || user?.role === "admin" ? (
              <Link
                href="/moderator"
                className="px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-200 font-medium"
              >
                Dashboard
              </Link>
            ) : null}
          </nav>

          {/* Right Section - Theme Toggle & Auth */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-sm font-bold shadow-md group-hover:shadow-lg transition-all">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-foreground">
                    {user.name.split(" ")[0]}
                  </span>
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="pb-3 border-b border-border">
                      <p className="text-sm font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full capitalize">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 font-medium hidden sm:inline"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <Link
              href="/"
              className="px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              href="/calendar"
              className="px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-200 font-medium"
            >
              Calendar
            </Link>
            {user?.role === "moderator" || user?.role === "admin" ? (
              <Link
                href="/moderator"
                className="px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-200 font-medium"
              >
                Dashboard
              </Link>
            ) : null}
            {!user && (
              <Link
                href="/login"
                className="px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 font-medium"
              >
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
