import { getDbClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Query to get the list of submissions (only id and created_at)
    const query = `
      SELECT id, created_at FROM quiz_submissions
      ORDER BY created_at DESC;
    `;
    const submissionsResult = await getDbClient().query(query);

    // Query to get the total number of submissions
    const countQuery = "SELECT COUNT(*) FROM quiz_submissions";
    const countResult = await getDbClient().query(countQuery);

    // Prepare the response data
    const responseData = {
      submissions: submissionsResult.rows,
      totalSubmissions: parseInt(countResult.rows[0].count),
    };

    // Return the list and total submission count as JSON
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz submissions:", error);
    return NextResponse.json(
      { message: "Error fetching quiz submissions" },
      { status: 500 }
    );
  }
}
