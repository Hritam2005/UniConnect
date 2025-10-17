"use client"

import { useEffect, useState } from "react"

export default function EventCard({ event, isLive }) {
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(() => {
      setPulse((prev) => !prev)
    }, 1000)
    return () => clearInterval(interval)
  }, [isLive])

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const cardClassName = isLive
    ? `rounded-xl border overflow-hidden transition-all hover:shadow-lg border-red-500 bg-gradient-to-r from-red-50 to-orange-50 ${pulse ? "shadow-lg shadow-red-200" : "shadow-md"}`
    : "rounded-xl border overflow-hidden transition-all hover:shadow-lg border-border bg-card hover:border-primary/50"

  return (
    <div className={cardClassName}>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
              {isLive && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full animate-pulse">
                  <span className={`w-2 h-2 bg-white rounded-full ${pulse ? "animate-pulse" : ""}`}></span>
                  LIVE
                </span>
              )}
            </div>
            <p className="text-muted-foreground mb-4">{event.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-foreground">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-foreground">{event.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                {[...Array(Math.min(3, event.attendees || 0))].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{event.attendees || 0} attending</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              className={`px-4 py-2 rounded-lg hover:shadow-lg transition-all font-medium ${
                isLive ? "bg-red-500 text-white hover:bg-red-600" : "bg-gradient-to-r from-primary to-accent text-white"
              }`}
            >
              {isLive ? "Join Now" : "Register"}
            </button>
            <button className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
