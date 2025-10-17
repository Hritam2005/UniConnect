"use client"

import { useState } from "react"
import EventForm from "./event-form"

export default function ModeratorDashboard({ events, loading, onRefresh }) {
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  const handleCreateEvent = async (formData) => {
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setShowForm(false)
        onRefresh()
      }
    } catch (error) {
      console.error("Failed to create event:", error)
    }
  }

  const handleUpdateStatus = (eventId, newStatus) => {
    console.log(`Updating event ${eventId} to ${newStatus}`)
    onRefresh()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Moderator Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage and schedule college events</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all font-medium"
          >
            {showForm ? "Cancel" : "+ Create Event"}
          </button>
        </div>

        {showForm && <EventForm onSubmit={handleCreateEvent} onCancel={() => setShowForm(false)} />}
      </div>

      <div className="grid gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Event Management</h2>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-muted rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Event Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Location</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4 text-foreground font-medium">{event.title}</td>
                      <td className="py-4 px-4 text-muted-foreground">{new Date(event.date).toLocaleDateString()}</td>
                      <td className="py-4 px-4 text-muted-foreground">{event.location}</td>
                      <td className="py-4 px-4">
                        <select
                          value={event.status}
                          onChange={(e) => handleUpdateStatus(event.id, e.target.value)}
                          className="px-3 py-1 rounded-lg border border-border bg-background text-foreground text-sm"
                        >
                          <option value="upcoming">Upcoming</option>
                          <option value="live">Live</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="py-4 px-4">
                        <button className="px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
