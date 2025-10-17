export async function GET() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@university.edu",
      role: "student",
      registeredEvents: [1, 3, 4],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@university.edu",
      role: "moderator",
      managedEvents: [1, 2, 3],
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@university.edu",
      role: "admin",
      managedEvents: [1, 2, 3, 4, 5, 6],
    },
  ]

  return Response.json(users)
}
