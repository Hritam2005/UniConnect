"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import ModeratorDashboard from "@/components/moderator-dashboard"

export default function ModeratorPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events")
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error("Failed to fetch events:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Header />
      <ModeratorDashboard events={events} loading={loading} onRefresh={fetchEvents} />
    </main>
  )
}
