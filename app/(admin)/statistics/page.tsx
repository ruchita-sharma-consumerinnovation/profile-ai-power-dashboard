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
      <h1 className="text-2xl font-bold mb-4">Funnel Statistics Dashboard</h1>
    </div>
  )
}

