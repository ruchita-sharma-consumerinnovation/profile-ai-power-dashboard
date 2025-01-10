import { getDbClient } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const visitorDataSubmission = await request.json()

    // Extract the 'state' from the request
    const { state } = visitorDataSubmission

    // Validate that the 'state' is a valid value
    const validStates = ['initial', 'step1', 'step2', 'step3', 'step4', 'step5']
    if (!validStates.includes(state)) {
      return NextResponse.json({
        message: 'Invalid state value. Valid values are initial, step1, step2, step3, step4, step5.',
      }, { status: 400 })
    }

    // Map the state to its corresponding column in the database
    const columnToUpdate = `${state}_visitors`

    // Query to fetch the latest record from the table
    const fetchQuery = 'SELECT id FROM visitor_data ORDER BY id DESC LIMIT 1'
    const result = await getDbClient().query(fetchQuery)

    // If no record exists in the table, initialize the table with default values
    if (result.rows.length === 0) {
      return NextResponse.json({
        message: 'No record found. Please ensure there is at least one record.',
      }, { status: 404 })
    }

    const recordId = result.rows[0].id

    // Query to increment the relevant column based on the state
    const updateQuery = `
      UPDATE visitor_data
      SET ${columnToUpdate} = ${columnToUpdate} + 1,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *;
    `

    // Execute the update query
    const updateResult = await getDbClient().query(updateQuery, [recordId])

    // Return a success response with the updated data
    return NextResponse.json({
      message: `Successfully incremented ${columnToUpdate}`,
      data: updateResult.rows[0] // Returning the updated record
    }, { status: 200 })
    
  } catch (error) {
    console.error('Error updating visitor data:', error)
    return NextResponse.json({
      message: 'Error updating visitor data'
    }, { status: 500 })
  }
}