"use client";

import { useState, useEffect } from "react";
import QuizPieChart from "@/components/QuizPieChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

interface Answer {
  label: string;
  value: string;
}

interface QuizData {
  quiz_data: {
    responses: {
      [key: string]: {
        title: string;
        questions: Array<{
          question_id: string;
          question_text: string;
          question_type: string;
          answer: any;
        }>;
      };
    };
  };
}

export default function QuizResultsPage() {
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics-data")
      .then((response) => response.json())
      .then((data) => {
        setQuizData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
        <Skeleton className="w-full h-[400px] rounded-lg" />
      </div>
    );
  }

  if (quizData.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
        <p>No data available.</p>
      </div>
    );
  }

  const steps = Object.keys(quizData[0].quiz_data.responses);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
      <Accordion type="single" collapsible className="w-full">
        {steps.map((stepId) => (
          <AccordionItem key={stepId} value={stepId}>
            <AccordionTrigger>
              {quizData[0].quiz_data.responses[stepId].title}
            </AccordionTrigger>
            <AccordionContent>
              {quizData[0].quiz_data.responses[stepId].questions.map((question) => (
                <div key={question.question_id} className="mb-8">
                  <QuizPieChart
                    data={quizData}
                    stepId={stepId}
                    questionId={question.question_id}
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
