import { getDbClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Query to get the list of submissions (only id, created_at, and final_score)
    const query = `
      SELECT id, created_at, final_score FROM quiz_submissions
      ORDER BY created_at DESC;
    `;
    const submissionsResult = await getDbClient().query(query);

    // Query to get the total number of submissions
    const countQuery = "SELECT COUNT(*) FROM quiz_submissions";
    const countResult = await getDbClient().query(countQuery);

    // Calculate the average final_score from the retrieved submissions
    const totalScore = submissionsResult.rows.reduce((sum, submission) => sum + (submission.final_score || 0), 0);
    const averageScore = submissionsResult.rows.length > 0 ? totalScore / submissionsResult.rows.length : 0;

    // Prepare the response data
    const responseData = {
      submissions: submissionsResult.rows,
      totalSubmissions: parseInt(countResult.rows[0].count),
      averageScore: averageScore,
    };

    // Return the list, total submission count, and average score as JSON
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz submissions:", error);
    return NextResponse.json(
      { message: "Error fetching quiz submissions" },
      { status: 500 }
    );
  }
}
