import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  // This is a mock authentication.
  // In a real application, you would validate against a database or external service.
  if (username === 'admin' && password === 'password') {
    return NextResponse.json({ message: 'Login successful' })
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }
}

