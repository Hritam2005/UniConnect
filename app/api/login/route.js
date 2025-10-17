let nextId = 4; // Start from the next ID after the mock users

export async function POST(request) {
  const { email, password, role } = await request.json();

  if (!email || !password || !role) {
    return Response.json({ error: "Email, password, and role are required" }, { status: 400 });
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

  // Check if user exists based on email, password, and role
  const user = mockUsers.find((u) => u.email === email && u.password === password && u.role === role);

  if (!user) {
    return Response.json({ error: "Invalid email, password, or role" }, { status: 401 });
  }

  // If user is valid, create a new user ID if necessary
  if (!user.id) {
    user.id = nextId++;
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user
  return Response.json({
    ...userWithoutPassword,
    token: "mock-jwt-token-" + Date.now(),
  })
}
