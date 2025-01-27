import { getDbClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dbClient = getDbClient();

    // Query to get the list of visitor data
    const visitorDataQuery = `
      SELECT * FROM visitor_data ORDER BY id DESC LIMIT 1
    `;
    const visitorDataResult = await dbClient.query(visitorDataQuery);

    return NextResponse.json(visitorDataResult.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching visitor data:", error);
    return NextResponse.json(
      { message: "Error fetching visitor data" },
      { status: 500 }
    );
  }
}

