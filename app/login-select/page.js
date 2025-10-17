"use client"

import Link from "next/link"
import Header from "@/components/header"

export default function LoginSelectPage() {
  const roles = [
    {
      id: "student",
      title: "Student Login",
      description: "Access events, register for activities, and stay updated",
      icon: "👨‍🎓",
      color: "from-blue-500 to-cyan-500",
      href: "/login/student",
    },
    {
      id: "moderator",
      title: "Moderator Login",
      description: "Manage events, approve registrations, and moderate content",
      icon: "👨‍💼",
      color: "from-purple-500 to-pink-500",
      href: "/login/moderator",
    },
    {
      id: "admin",
      title: "Admin Login",
      description: "Full platform control, user management, and analytics",
      icon: "👨‍💻",
      color: "from-orange-500 to-red-500",
      href: "/login/admin",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Welcome to Uni Connect</h1>
            <p className="text-lg text-muted-foreground">Select your role to continue</p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {roles.map((role) => (
              <Link key={role.id} href={role.href}>
                <div className="h-full bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {role.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{role.title}</h2>
                  <p className="text-muted-foreground mb-6">{role.description}</p>
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    Continue
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Demo Credentials */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Demo Credentials</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">Student</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">student@uni.edu</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">password123</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <p className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">Moderator</p>
                <p className="text-xs text-purple-700 dark:text-purple-300">moderator@uni.edu</p>
                <p className="text-xs text-purple-700 dark:text-purple-300">password123</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <p className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-2">Admin</p>
                <p className="text-xs text-orange-700 dark:text-orange-300">admin@uni.edu</p>
                <p className="text-xs text-orange-700 dark:text-orange-300">password123</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-semibold">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
