"use client"

import { useState } from "react"
import EventCard from "./event-card"

export default function EventTabs({ events, loading }) {
  const [activeTab, setActiveTab] = useState("upcoming")

  const now = new Date()

  const categorizedEvents = {
    upcoming: events.filter((e) => new Date(e.date) > now && e.status !== "live"),
    live: events.filter((e) => e.status === "live"),
    previous: events.filter((e) => new Date(e.date) < now || e.status === "completed"),
  }

  const tabs = [
    { id: "upcoming", label: "Upcoming Events", count: categorizedEvents.upcoming.length },
    { id: "live", label: "Live Now", count: categorizedEvents.live.length },
    { id: "previous", label: "Previous Events", count: categorizedEvents.previous.length },
  ]

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-muted rounded-lg animate-pulse"></div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-border overflow-x-auto pb-2 md:pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 md:px-4 py-3 font-medium whitespace-nowrap transition-all relative text-sm md:text-base ${
              activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            <span className="ml-2 text-xs md:text-sm bg-muted px-2 py-1 rounded-full">{tab.count}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-t-full"></div>
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1">
        {categorizedEvents[activeTab].length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {activeTab === "upcoming" && "No upcoming events scheduled"}
              {activeTab === "live" && "No live events at the moment"}
              {activeTab === "previous" && "No previous events"}
            </p>
          </div>
        ) : (
          categorizedEvents[activeTab].map((event) => (
            <EventCard key={event.id} event={event} isLive={activeTab === "live"} />
          ))
        )}
      </div>
    </div>
  )
}
