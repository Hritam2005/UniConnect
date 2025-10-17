export async function POST(request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return Response.json({ error: "Email and password are required" }, { status: 400 })
  }

  // Mock user database
  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "student@uni.edu",
      password: "password123",
      role: "student",
      registeredEvents: [1, 3, 4],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "moderator@uni.edu",
      password: "password123",
      role: "moderator",
      managedEvents: [1, 2, 3],
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@uni.edu",
      password: "password123",
      role: "admin",
      managedEvents: [1, 2, 3, 4, 5, 6],
    },
  ]

  const user = mockUsers.find((u) => u.email === email && u.password === password)

  if (!user) {
    return Response.json({ error: "Invalid email or password" }, { status: 401 })
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user
  return Response.json({
    ...userWithoutPassword,
    token: "mock-jwt-token-" + Date.now(),
  })
}
