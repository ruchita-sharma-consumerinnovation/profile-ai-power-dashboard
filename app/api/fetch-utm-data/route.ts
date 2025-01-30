import { getDbClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Query to get the list of submissions (uuid, amount_paid, country, currency)
    const query = `
      SELECT uuid, amount_paid, country, currency, utm_source, utm_adid, utm_campaign, utm_adset
      FROM quiz_submissions
      ORDER BY created_at DESC;
    `;
    const submissionsResult = await getDbClient().query(query);

    // Return the requested data as JSON
    return NextResponse.json({ submissions: submissionsResult.rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz submissions:", error);
    return NextResponse.json(
      { message: "Error fetching quiz submissions" },
      { status: 500 }
    );
  }
}
