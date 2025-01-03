import { getDbClient } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // Extract the `id` from the query parameters
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    // If no ID is provided, return an error response
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }

    // Query to get the quiz_data by ID
    const query = `
      SELECT quiz_data FROM quiz_submissions WHERE id = $1;
    `
    const values = [id]
    const result = await getDbClient().query(query, values)

    // If no result is found, return a 404 error
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Submission not found' }, { status: 404 })
    }

    // Return the quiz_data as JSON
    return NextResponse.json(result.rows[0].quiz_data, { status: 200 })
  } catch (error) {
    console.error('Error fetching quiz data:', error)
    return NextResponse.json({ message: 'Error fetching quiz data' }, { status: 500 })
  }
}
