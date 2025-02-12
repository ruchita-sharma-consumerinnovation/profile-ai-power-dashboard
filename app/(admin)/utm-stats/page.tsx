"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { processUtmStatsData } from "@/utils/process-utm-stats-data"
import DistributionTable from "@/components/utm-stats/distribution-table"

const UTMPurchaseAnalysis: React.FC = () => {
  const [utmData, setUtmData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fetch-utm-data")
        const data = await response.json()
        setUtmData(data)
      } catch (error) {
        console.error("Error fetching UTM data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <p>Loading data...</p>
  }

  if (!utmData) {
    return <p>Error loading data</p>
  }

  const {
    utmSourceData,
    utmAdidData,
    utmCampaignData,
    utmAdsetData,
    totalPurchases,
    conversionRate,
    quizCompletions,
    initialVisitors,
  } = processUtmStatsData(utmData)

  const renderChart = (data: any[], title: string) => {
    return (
      <Card className="w-full p-4">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="purchases">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#8884d8"/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">UTM Purchase Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalPurchases}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{conversionRate.toFixed(2)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quiz Completions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{quizCompletions}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Initial Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{initialVisitors}</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="utm_source" className="w-full">
        <TabsList>
          <TabsTrigger value="utm_source">UTM Source</TabsTrigger>
          <TabsTrigger value="utm_adid">UTM Ad ID</TabsTrigger>
          <TabsTrigger value="utm_campaign">UTM Campaign</TabsTrigger>
          <TabsTrigger value="utm_adset">UTM Ad Set</TabsTrigger>
        </TabsList>
        <TabsContent value="utm_source">
          {renderChart(utmSourceData, "Purchases by UTM Source")}
          <DistributionTable data={utmSourceData} title="UTM Source" />
        </TabsContent>
        <TabsContent value="utm_adid">
          {renderChart(utmAdidData, "Purchases by UTM Ad ID")}
          <DistributionTable data={utmAdidData} title="UTM Ad ID" />
        </TabsContent>
        <TabsContent value="utm_campaign">
          {renderChart(utmCampaignData, "Purchases by UTM Campaign")}
          <DistributionTable data={utmCampaignData} title="UTM Campaign" />
        </TabsContent>
        <TabsContent value="utm_adset">
          {renderChart(utmAdsetData, "Purchases by UTM Ad Set")}
          <DistributionTable data={utmAdsetData} title="UTM Ad Set" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default UTMPurchaseAnalysis
