import { getDbClient } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const { quiz_uuid, amount, country, currency } = await request.json();

    // Validate the inputs
    if (!quiz_uuid || amount === undefined || !country || !currency) {
      return NextResponse.json({ message: 'uuid, amount_paid, country, and currency are required' }, { status: 400 });
    }

    // Update the amount_paid, country, and currency in the database for the given uuid
    const query = `
      UPDATE quiz_submissions
      SET amount_paid = $1, country = $2, currency = $3, updated_at = NOW()
      WHERE uuid = $4
      RETURNING id, uuid, amount_paid, country, currency, updated_at;
    `;
    const values = [amount, country, currency, quiz_uuid];

    const result = await getDbClient().query(query, values);

    // Check if the update was successful
    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'No quiz submission found with the provided uuid' }, { status: 404 });
    }

    // Return a success response with the updated data
    return NextResponse.json({
      message: 'Quiz submission updated successfully',
      data: result.rows[0]
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating quiz submission:', error);
    return NextResponse.json({ message: 'Error updating quiz submission' }, { status: 500 });
  }
}
