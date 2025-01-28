"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Answer {
  name: string
  total: number
  purchased: number
  purchaseRate: string
}

interface SurveyChartProps {
  questionText: string
  answers: Answer[]
}

export default function SurveyChart({ questionText, answers }: SurveyChartProps) {
  const totalResponses = answers.reduce((sum, item) => sum + item.total, 0)
  const totalPurchased = answers.reduce((sum, item) => sum + item.purchased, 0)
  const overallPurchaseRate = ((totalPurchased / totalResponses) * 100).toFixed(2)

  return (
    <Card className="w-full max-w-3xl mb-8">
      <CardHeader>
        <CardTitle>{questionText}</CardTitle>
        <CardDescription>Total responses vs Purchases</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            total: {
              label: "Total Responses",
              color: "hsl(var(--chart-1))",
            },
            purchased: {
              label: "Purchased",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={answers} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="total" fill="var(--color-total)" name="Total Responses" />
              <Bar dataKey="purchased" fill="var(--color-purchased)" name="Purchased" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Overall: {totalPurchased} out of {totalResponses} respondents ({overallPurchaseRate}%) made a purchase.
        </p>
      </CardContent>
    </Card>
  )
}

