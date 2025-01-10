"use client"

import React, { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from 'recharts'
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
  totalResponses: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C']

export default function QuizPieChart({ data, stepId, questionId, totalResponses }: QuizPieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>()

  const chartData = React.useMemo(() => {
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
      value,
      percentage: (value / totalResponses) * 100
    }))
  }, [data, stepId, questionId, totalResponses])

  const question = data[0]?.quiz_data.responses[stepId]?.questions.find(q => q.question_id === questionId)

  if (!question) {
    return <div>Question not found</div>
  }

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        {/* <text x={cx} y={cy} textAnchor="middle" fill={fill}>
          {payload.name}
        </text> */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Count ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
        <text 
          x={cx} 
          y={cy + outerRadius + 60} 
          textAnchor="middle" 
          fill={fill}
          fontSize="14"
          fontWeight="bold"
        >
          {payload.name}
        </text>
      </g>
    )
  }

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{question.question_text}</CardTitle>
        <CardDescription>Response distribution - Total Response: {totalResponses}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            ...Object.fromEntries(chartData.map((entry, index) => [
              entry.name,
              { label: entry.name, color: COLORS[index % COLORS.length] }
            ]))
          }}
          className="h-[450px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
