"use client"

import React, { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

interface QuizResponse {
  quiz_data: {
    responses: {
      [key: string]: {
        questions: Array<{
          question_id: string
          question_text: string
          question_type: string
          answer: any
        }>
      }
    }
  }
}

interface QuizPieChartProps {
  data: QuizResponse[]
  stepId: string
  questionId: string
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C']

export default function QuizPieChart({ data, stepId, questionId }: QuizPieChartProps) {
  const chartData = useMemo(() => {
    const answerCounts: { [key: string]: number } = {}
    let totalResponses = 0

    data.forEach(response => {
      const question = response.quiz_data.responses[stepId]?.questions.find(q => q.question_id === questionId)
      if (question) {
        totalResponses++
        if (Array.isArray(question.answer)) {
          question.answer.forEach(ans => {
            answerCounts[ans.label] = (answerCounts[ans.label] || 0) + 1
          })
        } else if (typeof question.answer === 'object') {
          answerCounts[question.answer.label] = (answerCounts[question.answer.label] || 0) + 1
        }
      }
    })

    return Object.entries(answerCounts).map(([name, value]) => ({
      name,
      value: (value / totalResponses) * 100
    }))
  }, [data, stepId, questionId])

  const question = data[0]?.quiz_data.responses[stepId]?.questions.find(q => q.question_id === questionId)

  if (!question) {
    return <div>Question not found</div>
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{question.question_text}</CardTitle>
        <CardDescription>Response distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            ...Object.fromEntries(chartData.map((entry, index) => [
              entry.name,
              { label: entry.name, color: COLORS[index % COLORS.length] }
            ]))
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend 
                layout="vertical" 
                align="right" 
                verticalAlign="middle"
                wrapperStyle={{ fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
