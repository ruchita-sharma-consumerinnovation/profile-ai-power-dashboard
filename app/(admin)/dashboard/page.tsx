'use client'

import { useState, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Submission {
  id: number
  created_at: string
}

interface DashboardData {
  submissions: Submission[]
  totalSubmissions: number
}

interface QuizResponse {
  timestamp: string
  quiz_version: string
  meta: {
    selected_country: string
    selected_currency: string
    final_score: number
  }
  responses: {
    [key: string]: {
      title: string
      questions: {
        question_id: string
        question_text: string
        question_type: string
        answer: {
          value: string
          label: string
        } | {
          value: string
          label: string
        }[]
      }[]
    }
  }
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [quizResponse, setQuizResponse] = useState<QuizResponse | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard-data')
        const data = await response.json()
        setDashboardData(data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }
    fetchDashboardData()
  }, [])

  const fetchQuizResponse = async (id: number) => {
    try {
      const response = await fetch(`/api/quiz-responses?id=${id}`);
      const data = await response.json()
      setQuizResponse(data) 
      setSelectedSubmission(id)
    } catch (error) {
      console.error('Error fetching quiz response:', error)
    }
  }

  if (!dashboardData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Submissions Dashboard</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Submissions Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">Total Submissions: {dashboardData.totalSubmissions}</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dashboardData.submissions.map((submission) => (
              <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Submission ID: {submission.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">Created: {new Date(submission.created_at).toLocaleString()}</p>
                  <Button onClick={() => fetchQuizResponse(submission.id)}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedSubmission && quizResponse && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Submission Details (ID: {selectedSubmission})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p><strong>Timestamp:</strong> {new Date(quizResponse.timestamp).toLocaleString()}</p>
              <p><strong>Country:</strong> {quizResponse.meta.selected_country}</p>
              <p><strong>Currency:</strong> {quizResponse.meta.selected_currency}</p>
              <p><strong>Final Score:</strong> {quizResponse.meta.final_score}</p>
            </div>


            <Accordion type="single" collapsible className="w-full">
              {Object.entries(quizResponse.responses).map(([stepKey, step]) => (
                <AccordionItem key={stepKey} value={stepKey}>
                  <AccordionTrigger>{step.title}</AccordionTrigger>
                  <AccordionContent>
                    {step.questions.map((question) => (
                      <Card key={question.question_id} className="mb-4">
                        <CardHeader>
                          <CardTitle className="text-lg">{question.question_text}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {Array.isArray(question.answer) ? (
                            <ul className="list-disc pl-5">
                              {question.answer.map((ans, i) => (
                                <li key={i}>{ans.label}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>{question.answer.label}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

