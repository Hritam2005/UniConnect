"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import EventTabs from "@/components/event-tabs"
import CalendarWidget from "@/components/calendar-widget"
import LiveEventNotification from "@/components/live-event-notification"

export default function Home() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [liveEvent, setLiveEvent] = useState(null)

  useEffect(() => {
    fetchEvents()
    const interval = setInterval(fetchEvents, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events")
      const data = await response.json()
      setEvents(data)

      const live = data.find((e) => e.status === "live")
      setLiveEvent(live)
    } catch (error) {
      console.error("Failed to fetch events:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Header />

      {liveEvent && <LiveEventNotification event={liveEvent} />}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EventTabs events={events} loading={loading} />
          </div>
          <div className="lg:col-span-1">
            <CalendarWidget events={events} />
          </div>
        </div>
      </div>
    </main>
  )
}
