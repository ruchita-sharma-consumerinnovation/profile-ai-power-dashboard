"use client";

import { useEffect, useState } from "react";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

interface PurchaseData {
  uuid: string;
  amount_paid: number;
  country: string;
  currency: string;
}

interface TotalPricePerCurrency {
  [currency: string]: number;
}

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

// Define available currencies with their corresponding currency codes
const availableCurrencies: { [countryCode: string]: string } = {
  US: "USD",
  GB: "GBP",
  CH: "CHF",
  SG: "SGD",
  CA: "CAD",
  AU: "AUD",
  NZ: "NZD",
  NO: "NOK",
  AE: "AED",
  JP: "JPY",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
};

// Conversion rates (example, should be updated with actual data or fetched from API)
const conversionRates: { [currency: string]: number } = {
  USD: 1,
  GBP: 1.3, // 1 GBP = 1.30 USD
  CHF: 1.1, // 1 CHF = 1.10 USD
  SGD: 0.75, // 1 SGD = 0.75 USD
  CAD: 0.8, // 1 CAD = 0.80 USD
  AUD: 0.65, // 1 AUD = 0.65 USD
  NZD: 0.6, // 1 NZD = 0.60 USD
  NOK: 0.11, // 1 NOK = 0.11 USD
  AED: 0.27, // 1 AED = 0.27 USD
  JPY: 0.0074, // 1 JPY = 0.0074 USD
  EUR: 1.12, // 1 EUR = 1.12 USD
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PurchaseDataPage = () => {
  const [purchaseData, setPurchaseData] = useState<PurchaseData[]>([]);
  const [totalPricePerCurrency, setTotalPricePerCurrency] =
    useState<TotalPricePerCurrency>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const [result, setResult] = useState(null);
  const [percentageDisplayData, setPercentageDisplayData] = useState(null);
  const [utmSourcesPercent, setUtmSourcesPercent] = useState(null);

  useEffect(() => {
    if (result != null) {
      const step5Visitors = visitorData[0]?.step5_visitors || 0; // Assuming only one record of visitor data
      const totalPurchasersPecentage =
        (result.total_amount_more_than_zero / step5Visitors) * 100;
      const updatedUTMSources = result.utm_sources.map((utm) => {
        const percentage =
          (utm.total_amount_more_than_zero / step5Visitors) * 100;
        return {
          ...utm, // Spread existing data
          percentage, // Add the calculated percentage
        };
      });
      setPercentageDisplayData(totalPurchasersPecentage);
      setUtmSourcesPercent(updatedUTMSources);
      console.log(updatedUTMSources);
    }
  }, [result, visitorData]);

  useEffect(() => {
    const fetchPurchaseData = async () => {
      try {
        const response = await fetch("/api/fetch-purchase-data");

        if (!response.ok) {
          throw new Error("Failed to fetch purchase data");
        }

        const data = await response.json();
        const submissions = data.submissions; // Assuming the response is structured as { submissions: [...] }

        setPurchaseData(submissions);

        // Calculate total price per currency in USD
        const totalPerCurrency: TotalPricePerCurrency = submissions.reduce(
          (acc: any, submission: any) => {
            if (submission.currency && submission.amount_paid) {
              // Convert the amount to USD based on the currency
              const conversionRate = conversionRates[submission.currency] || 1;
              const amountInUSD = submission.amount_paid * conversionRate;
              acc[submission.currency] =
                (acc[submission.currency] || 0) + amountInUSD;
            }
            return acc;
          },
          {}
        );

        // Filter submissions where amount_paid is not null and greater than 0
        const nonNullAmounts = data.submissions.filter(
          (submission) =>
            submission.amount_paid !== null &&
            parseFloat(submission.amount_paid) > 0
        );

        // Group by utm_source
        const groupedBySource = {};
        nonNullAmounts.forEach((submission) => {
          const source = submission.utm_source || "unknown";
          if (!groupedBySource[source]) {
            groupedBySource[source] = [];
          }
          groupedBySource[source].push(submission);
        });

        // Format the output
        const finalResult = {
          total_amount_more_than_zero: nonNullAmounts.length,
          utm_sources: Object.entries(groupedBySource).map(
            ([name, submissions]) => ({
              name,
              total_amount_more_than_zero: submissions.length,
            })
          ),
        };

        setResult(finalResult);

        setTotalPricePerCurrency(totalPerCurrency); // Store the calculated totals per currency
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching purchase data."
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchVisitorData = async () => {
      try {
        const response = await fetch("/api/statistics-data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const visitorData = await response.json();
        setVisitorData(visitorData);
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

    fetchVisitorData();
    fetchPurchaseData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Purchase Statistics Dashboard</h1>

      {purchaseData.length === 0 ? (
        <p>No purchase data available</p>
      ) : (
        <>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Amount Paid</th>
                <th className="px-4 py-2 border">Country</th>
                <th className="px-4 py-2 border">Currency</th>
              </tr>
            </thead>
            <tbody>
              {purchaseData
                .filter(
                  (data) =>
                    data.amount_paid !== null &&
                    parseFloat(data.amount_paid) > 0
                )
                .map((filteredData) => (
                  <tr key={filteredData.uuid}>
                    <td className="px-4 py-2 border">
                      {filteredData.amount_paid}
                    </td>
                    <td className="px-4 py-2 border">{filteredData.country}</td>
                    <td className="px-4 py-2 border">
                      {filteredData.currency}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <Card className="w-full max-w-3xl mt-8">
            <CardHeader>
              <CardTitle>Total Purchases By Currency (in USD)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  rate: {
                    label: "Purchase amount",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={Object.entries(totalPricePerCurrency).map(
                      ([currency, rate]) => ({
                        currency,
                        rate,
                      })
                    )}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="currency" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="rate"
                      fill="var(--color-rate)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold mt-6">
            Percentage of users purchasing against the users who completed the
            quiz
          </h2>
          {percentageDisplayData !== null ? (
            <p>
              {percentageDisplayData}% of users who completed the quiz have made
              a purchase
            </p>
          ) : (
            <p>Data is insufficient to calculate the percentage</p>
          )}
          {utmSourcesPercent != null ? (
            <Card className="w-full max-w-lg mt-8">
              <CardHeader>
                <CardTitle>
                  Purchase Percentage By Source Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    percentage: {
                      label: "Percentage",
                    },
                    total_amount_more_than_zero: {
                      label: "Total Amount > 0",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={utmSourcesPercent}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                      >
                        {utmSourcesPercent.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            valueFormatter={(value, name) => {
                              if (name === "percentage") return `${value}%`;
                              return value.toString();
                            }}
                          />
                        }
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                  {utmSourcesPercent.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                      <div
                        className="mr-2 h-3 w-3"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span>{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <p>No data available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default PurchaseDataPage;
