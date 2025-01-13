import { getDbClient } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const quizSubmission = await request.json()

    // Extract the final_score from the request body
    const finalScore = quizSubmission.meta.final_score

    // Save the submission to the database
    const query = `
      INSERT INTO quiz_submissions (quiz_data, final_score)
      VALUES ($1, $2)
      RETURNING id, uuid, created_at, updated_at;
    `
    const values = [JSON.stringify(quizSubmission), finalScore] // Save both quiz data and final_score

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
