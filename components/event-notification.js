"use client"

import { useEffect, useState } from "react"

export default function EventNotification({ event, onClose }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-lg p-4 max-w-sm animate-in slide-in-from-bottom-4 z-50">
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 rounded-full bg-white mt-2 animate-pulse" />
        <div className="flex-1">
          <h3 className="font-bold text-sm">{event.title}</h3>
          <p className="text-xs opacity-90">Event is now live! Join us at {event.location}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            onClose?.()
          }}
          className="text-white hover:opacity-80 text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  )
}
