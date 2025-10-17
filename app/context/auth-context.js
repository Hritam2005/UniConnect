"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("uni_connect_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Mock authentication - in production, this would call an API
    const mockUsers = [
      { id: 1, email: "student@uni.edu", password: "password123", name: "John Doe", role: "student" },
      { id: 2, email: "moderator@uni.edu", password: "password123", name: "Jane Smith", role: "moderator" },
      { id: 3, email: "admin@uni.edu", password: "password123", name: "Admin User", role: "admin" },
    ]

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("uni_connect_user", JSON.stringify(userWithoutPassword))
      return { success: true, user: userWithoutPassword }
    }
    return { success: false, error: "Invalid email or password" }
  }

  const signup = (email, password, name) => {
    // Mock signup - in production, this would call an API
    const newUser = {
      id: Math.random(),
      email,
      name,
      role: "student",
    }
    setUser(newUser)
    localStorage.setItem("uni_connect_user", JSON.stringify(newUser))
    return { success: true, user: newUser }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("uni_connect_user")
  }

  return <AuthContext.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
