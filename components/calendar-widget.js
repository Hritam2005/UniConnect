"use client"

import { useState } from "react"

export default function CalendarWidget({ events }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const eventDates = events.map((e) => new Date(e.date).getDate())

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = []

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 sticky top-24 md:top-20">
      <h3 className="text-lg font-bold text-foreground mb-4">Event Calendar</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-semibold text-foreground text-sm md:text-base">{monthName}</span>
          <button onClick={handleNextMonth} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
              {day}
            </div>
          ))}

          {days.map((day, index) => (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center rounded-lg text-xs md:text-sm font-medium transition-all ${
                day === null
                  ? "text-transparent"
                  : eventDates.includes(day)
                    ? "bg-gradient-to-br from-primary to-accent text-white font-bold shadow-lg"
                    : "text-foreground hover:bg-muted"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3">Upcoming Events</p>
          <div className="space-y-2">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="text-xs p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
              >
                <p className="font-semibold text-foreground truncate">{event.title}</p>
                <p className="text-muted-foreground text-xs">{new Date(event.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
