"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Submission {
  id: number;
  created_at: string;
}

interface DashboardData {
  submissions: Submission[];
  totalSubmissions: number;
  averageScore: number;
}

interface Answer {
  label: string;
  value: string;
}

interface Question {
  answer: Answer | Answer[];
  question_id: string;
  question_text: string;
  question_type: string;
}

interface Step {
  title: string;
  questions: Question[];
}

interface Responses {
  [key: string]: Step; // Dynamic key for steps like step1, step2, etc.
}

interface Meta {
  final_score: number;
  selected_country: string;
  selected_currency: string;
}

interface QuizData {
  meta: Meta;
  responses: Responses;
  timestamp: string;
  quiz_version: string;
}

interface QuizResponse {
  id: number;
  uuid: string;
  quiz_data: QuizData;
  final_score: number;
  created_at: string;
  updated_at: string;
  amount_paid: string;
  country: string;
  currency: string;
  utm_source: string | null;
  utm_adid: string | null;
  utm_campaign: string | null;
  utm_adset: string | null;
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [quizResponse, setQuizResponse] = useState<QuizResponse | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/dashboard-data");
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  const fetchQuizResponse = async (id: number) => {
    try {
      const response = await fetch(`/api/quiz-responses?id=${id}`);
      const data = await response.json();
      console.log("Fetched quiz response:", data); // Debugging log

      if (!data || !data.quiz_data) {
        console.warn("Invalid quiz response format:", data);
        return;
      }

      setQuizResponse(data);
      setSelectedSubmission(id);
      setIsDialogOpen(true); // Open the dialog when data is fetched
    } catch (error) {
      console.error("Error fetching quiz response:", error);
    }
  };

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Submissions Dashboard</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Submissions Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Total Submissions: {dashboardData.totalSubmissions}
          </p>
          <p className="text-lg mb-4">
            Average Score: {dashboardData.averageScore}
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dashboardData.submissions.map((submission) => (
              <Card
                key={submission.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle>Submission ID: {submission.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">
                    Created: {new Date(submission.created_at).toLocaleString()}
                  </p>
                  <Button onClick={() => fetchQuizResponse(submission.id)}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Submission Details (ID: {selectedSubmission})
            </DialogTitle>
          </DialogHeader>
          {quizResponse?.quiz_data && (
            <div className="mt-4">
              <div className="mb-4">
                <p>
                  <strong>Timestamp:</strong>{" "}
                  {new Date(quizResponse.quiz_data.timestamp).toLocaleString()}
                </p>
                <p>
                  <strong>Country:</strong>{" "}
                  {quizResponse.quiz_data.meta.selected_country}
                </p>
                <p>
                  <strong>Currency:</strong>{" "}
                  {quizResponse.quiz_data.meta.selected_currency}
                </p>
                <p>
                  <strong>Final Score:</strong>{" "}
                  {quizResponse.quiz_data.meta.final_score}
                </p>
              </div>

              {quizResponse.quiz_data.responses && (
                <div className="space-y-4">
                  {Object.entries(quizResponse.quiz_data.responses).map(
                    ([stepKey, step]) => (
                      <Card key={stepKey}>
                        <CardHeader>
                          <CardTitle>{step.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {step.questions.map((question) => (
                            <div key={question.question_id} className="mb-4">
                              <h4 className="font-semibold mb-2">
                                {question.question_text}
                              </h4>
                              {Array.isArray(question.answer) ? (
                                <ul className="list-disc pl-5">
                                  {question.answer.map((ans, i) => (
                                    <li key={`${question.question_id}-${i}`}>
                                      {ans.label}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p>
                                  {question.answer?.label ||
                                    "No Answer Provided"}
                                </p>
                              )}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}