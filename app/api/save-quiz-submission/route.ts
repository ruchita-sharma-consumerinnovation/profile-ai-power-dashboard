import { getDbClient } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const quizSubmission = await request.json()

    // Save the submission to the database
    const query = `
      INSERT INTO quiz_submissions (quiz_data)
      VALUES ($1)
      RETURNING id, uuid, created_at, updated_at;
    `
    const values = [JSON.stringify(quizSubmission)] // Assuming quiz data is an object

    const result = await getDbClient().query(query, values)

    // Return a success response with the saved data
    return NextResponse.json({
      message: 'Quiz submission saved successfully',
      data: result.rows[0]
    }, { status: 200 })
  } catch (error) {
    console.error('Error saving quiz submission:', error)
    return NextResponse.json({ message: 'Error saving quiz submission' }, { status: 500 })
  }
}
