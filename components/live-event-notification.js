"use client"

import { useState, useEffect } from "react"

export default function LiveEventNotification({ event }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 8000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-20 right-4 z-40 slide-in">
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-2xl p-4 max-w-sm border border-red-400">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white/20">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm">Live Event Starting!</h3>
            <p className="text-sm text-white/90 mt-1">{event.title}</p>
            <p className="text-xs text-white/70 mt-1">{event.location}</p>
          </div>
          <button onClick={() => setIsVisible(false)} className="text-white/70 hover:text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
