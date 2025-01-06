import { getDbClient } from '@/lib/db'
import { NextResponse } from 'next/server'
import { Client } from 'pg'

export async function GET(request: Request) {
  try {
    // Query to get the list of submissions (id, quiz_data, created_at)
    const query = `
      SELECT id, quiz_data, created_at FROM quiz_submissions
      ORDER BY created_at DESC;
    `
    const result = await getDbClient().query(query)

    // Prepare the response data
    const responseData = result.rows

    // Return the list of submissions as JSON
    return NextResponse.json(responseData, { status: 200 })
  } catch (error) {
    console.error('Error fetching quiz submissions:', error)
    return NextResponse.json({ message: 'Error fetching quiz submissions' }, { status: 500 })
  }
}
