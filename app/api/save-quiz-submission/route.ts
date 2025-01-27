import { getDbClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const quizSubmission = await request.json();

    // Extract the final_score from the request body
    const finalScore = quizSubmission.meta.final_score;

    // Extract UTM parameters
    const utmSource = quizSubmission.meta.utm_source || null;
    const utmAdid = quizSubmission.meta.utm_adid || null;
    const utmCampaign = quizSubmission.meta.utm_campaign || null;
    const utmAdset = quizSubmission.meta.utm_adset || null;

    // Remove UTM parameters from the meta object
    delete quizSubmission.meta.utm_source;
    delete quizSubmission.meta.utm_adid;
    delete quizSubmission.meta.utm_campaign;
    delete quizSubmission.meta.utm_adset;

    // Save the submission to the database
    const query = `
      INSERT INTO quiz_submissions (quiz_data, final_score, utm_source, utm_adid, utm_campaign, utm_adset)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, uuid, created_at, updated_at;
    `;
    const values = [
      JSON.stringify(quizSubmission),
      finalScore,
      utmSource,
      utmAdid,
      utmCampaign,
      utmAdset,
    ];

    const result = await getDbClient().query(query, values);

    // Return a success response with the saved data
    return NextResponse.json(
      {
        message: "Quiz submission saved successfully",
        data: result.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving quiz submission:", error);
    return NextResponse.json(
      { message: "Error saving quiz submission" },
      { status: 500 }
    );
  }
}
