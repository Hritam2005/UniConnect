export async function GET() {
  const events = [
    {
      id: 1,
      title: "Annual Tech Summit 2024",
      description:
        "Join us for the biggest tech conference of the year featuring keynote speakers from leading tech companies.",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      location: "Main Auditorium",
      attendees: 245,
      status: "upcoming",
    },
    {
      id: 2,
      title: "Live Coding Workshop",
      description: "Real-time coding session with industry experts. Learn best practices and advanced techniques.",
      date: new Date().toISOString(),
      location: "Lab 101",
      attendees: 89,
      status: "live",
    },
    {
      id: 3,
      title: "AI & Machine Learning Seminar",
      description: "Explore the latest advancements in AI and ML with hands-on demonstrations.",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      location: "Conference Hall B",
      attendees: 156,
      status: "upcoming",
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      description: "Intensive bootcamp covering modern web development frameworks and tools.",
      date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      location: "Computer Lab",
      attendees: 78,
      status: "upcoming",
    },
    {
      id: 5,
      title: "Spring Fest 2024",
      description: "Annual college festival with music, food, and entertainment.",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      location: "Campus Grounds",
      attendees: 1200,
      status: "completed",
    },
    {
      id: 6,
      title: "Startup Pitch Competition",
      description: "Showcase your innovative ideas and compete for funding opportunities.",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      location: "Innovation Hub",
      attendees: 340,
      status: "completed",
    },
  ]

  return Response.json(events)
}

export async function POST(request) {
  const body = await request.json()

  const newEvent = {
    id: Math.random(),
    ...body,
    status: "upcoming",
  }

  return Response.json(newEvent, { status: 201 })
}
