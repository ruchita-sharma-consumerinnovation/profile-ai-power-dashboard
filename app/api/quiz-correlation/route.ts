import { getDbClient } from "@/lib/db";
import { NextResponse } from "next/server";

interface QuizRow {
  uuid: string; // UUID of the quiz submission
  quiz_data: any; // Replace `any` with the appropriate type if `quiz_data` has a defined structure
  amount_paid: number | null;
  country: string | null;
  currency: string | null;
}

interface FlatData {
  question_id: string;
  question_text: string;
  answer: string;
  purchased: boolean;
}

interface QuestionStats {
  [question_id: string]: {
    question_text: string;
    answers: Array<{
      name: string;
      total: number;
      purchased: number;
      purchaseRate: string;
    }>;
  };
}

interface PurchaseData {
  uuid: string;
  amount_paid: number | null;
  country: string | null;
  currency: string | null;
  final_converted_to_usd_amount: number | null;
}

const conversionRates: { [currency: string]: number } = {
  USD: 1,
  GBP: 1.3,
  CHF: 1.1,
  SGD: 0.75,
  CAD: 0.8,
  AUD: 0.65,
  NZD: 0.6,
  NOK: 0.11,
  AED: 0.27,
  JPY: 0.0074,
  EUR: 1.12,
};

export async function GET() {
  try {
    // Query to fetch UUID, quiz_data, amount_paid, country, and currency
    const query = `
      SELECT uuid, quiz_data, amount_paid, country, currency
      FROM quiz_submissions
    `;

    const results = await getDbClient().query<QuizRow>(query);

    // Analyze quiz data
    const analysis = analyzeQuizData(results.rows);

    // Prepare purchase data
    // const purchaseData: PurchaseData[] = results.rows.map((row) => {
    //   const final_converted_to_usd_amount =
    //     row.amount_paid && row.currency
    //       ? (row.amount_paid * (conversionRates[row.currency] || 1)).toFixed(2)
    //       : null;

    //   return {
    //     uuid: row.uuid,
    //     amount_paid: row.amount_paid,
    //     country: row.country,
    //     currency: row.currency,
    //     final_converted_to_usd_amount: final_converted_to_usd_amount
    //       ? parseFloat(final_converted_to_usd_amount)
    //       : null,
    //   };
    // });

    return NextResponse.json({ analysis }, { status: 200 });
  } catch (error) {
    console.error("Error analyzing quiz correlations:", error);
    return NextResponse.json(
      { message: "Error analyzing quiz correlations" },
      { status: 500 }
    );
  }
}

// Function to flatten and analyze quiz data
function analyzeQuizData(rows: QuizRow[]): QuestionStats {
  const flatData: FlatData[] = [];

  rows.forEach((row) => {
    const quizData = row.quiz_data;
    const purchased = row.amount_paid !== null;

    // Flatten quiz_data
    Object.values(quizData.responses).forEach((step: any) => {
      step.questions.forEach((question: any) => {
        if (Array.isArray(question.answer)) {
          question.answer.forEach((ans: any) => {
            flatData.push({
              question_id: question.question_id,
              question_text: question.question_text,
              answer: ans.label,
              purchased,
            });
          });
        } else {
          flatData.push({
            question_id: question.question_id,
            question_text: question.question_text,
            answer: question.answer.label,
            purchased,
          });
        }
      });
    });
  });

  // Perform analysis
  return groupAndAnalyze(flatData);
}

// Function to group and analyze data
function groupAndAnalyze(flatData: FlatData[]): QuestionStats {
  const stats: QuestionStats = {};

  flatData.forEach((response) => {
    const { question_id, question_text, answer, purchased } = response;

    if (!stats[question_id]) {
      stats[question_id] = { question_text, answers: [] };
    }

    const existingAnswer = stats[question_id].answers.find((ans) => ans.name === answer);

    if (!existingAnswer) {
      stats[question_id].answers.push({ name: answer, total: 0, purchased: 0, purchaseRate: "0.00" });
    }

    const answerObj = stats[question_id].answers.find((ans) => ans.name === answer)!;

    answerObj.total += 1;
    if (purchased) {
      answerObj.purchased += 1;
    }
  });

  // Calculate purchase rates
  Object.keys(stats).forEach((questionId) => {
    stats[questionId].answers.forEach((answerObj) => {
      answerObj.purchaseRate = ((answerObj.purchased / answerObj.total) * 100).toFixed(2);
    });
  });

  return stats;
}
