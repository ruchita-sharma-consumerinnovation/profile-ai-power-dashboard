"use client"; // Add this line at the top of the file to mark it as a client-side component

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type VisitorData = {
  id: number;
  initial_visitors: number;
  step1_visitors: number;
  step2_visitors: number;
  step3_visitors: number;
  step4_visitors: number;
  step5_visitors: number;
  created_at: string;
  updated_at: string;
};

export default function StatisticsPage() {
  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/statistics-data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setVisitorData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateCompletionPercentage = (
    initial: number,
    step5: number
  ): string => {
    if (initial === 0) return "0%";
    return ((step5 / initial) * 100).toFixed(2) + "%";
  };

  const chartData =
    visitorData.length > 0
      ? [
          { name: "Initial", visitors: visitorData[0].initial_visitors },
          { name: "Step 1", visitors: visitorData[0].step1_visitors },
          { name: "Step 2", visitors: visitorData[0].step2_visitors },
          { name: "Step 3", visitors: visitorData[0].step3_visitors },
          { name: "Step 4", visitors: visitorData[0].step4_visitors },
          { name: "Step 5", visitors: visitorData[0].step5_visitors },
        ]
      : [];

  if (loading) {
    return <div>Loading visitor data...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Visitor Funnel Statistics</h1>

      {visitorData && visitorData.length > 0 ? (
        <div>
          <Accordion type="multiple">
            {visitorData.map((data) => (
              <AccordionItem key={data.id} value={`visitor-${data.id}`}>
                <AccordionTrigger>
                  <Card className="mb-4">
                    <CardHeader>
                      <CardTitle>Visitor Data - ID: {data.id}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <strong>Initial Visitors:</strong>{" "}
                          {data.initial_visitors}
                        </div>
                        <div>
                          <strong>Step 1 Visitors:</strong>{" "}
                          {data.step1_visitors}
                        </div>
                        <div>
                          <strong>Step 2 Visitors:</strong>{" "}
                          {data.step2_visitors}
                        </div>
                        <div>
                          <strong>Step 3 Visitors:</strong>{" "}
                          {data.step3_visitors}
                        </div>
                        <div>
                          <strong>Step 4 Visitors:</strong>{" "}
                          {data.step4_visitors}
                        </div>
                        <div>
                          <strong>Step 5 Visitors:</strong>{" "}
                          {data.step5_visitors}
                        </div>
                        <div>
                          <strong>Submission Time:</strong>{" "}
                          {new Date(data.updated_at).toLocaleString()}
                        </div>
                        <div>
                          <strong>Completion Percentage:</strong>{" "}
                          {calculateCompletionPercentage(
                            data.initial_visitors,
                            data.step5_visitors
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    More detailed statistics for this visitor will be shown
                    here.
                  </p>
                  <div></div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <CardTitle>Visitor Progress Through Steps</CardTitle>
              <CardDescription>
                Number of visitors at each step of the process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  visitors: {
                    label: "Visitors",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px]"
              >
                {chartData.length > 0 ? (
                  <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" type="category" />
                    <YAxis type="number" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="visitors"
                      fill="var(--color-visitors)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                ) : (
                  <p>No chart data available.</p>
                )}
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p>No visitor data available.</p>
      )}
    </div>
  );
}
