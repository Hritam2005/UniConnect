"use client"

import { useEffect, useState } from "react"

export default function LiveEventBadge({ event }) {
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (event.status !== "live") return null

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full bg-red-500 ${pulse ? "animate-pulse" : ""}`} />
      <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Live Now</span>
    </div>
  )
}
