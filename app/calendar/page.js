"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import CalendarWidget from "@/components/calendar-widget"

export default function CalendarPage() {
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

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Event Calendar</h1>
          <p className="text-muted-foreground">View all upcoming events and important dates</p>
        </div>

        {loading ? (
          <div className="h-96 bg-muted rounded-xl animate-pulse"></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CalendarWidget events={events} />
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {events
                  .filter((e) => new Date(e.date) > new Date())
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .slice(0, 5)
                  .map((event) => (
                    <div
                      key={event.id}
                      className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                    >
                      <p className="font-semibold text-sm text-foreground truncate">{event.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(event.date).toLocaleDateString()}</p>
                      <p className="text-xs text-primary mt-1">{event.location}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
