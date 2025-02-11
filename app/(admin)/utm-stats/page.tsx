// @ts-nocheck

"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { conversionRates } from "@/utils/conversion-rates";

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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const UTMPageData = () => {
  const [selectedFilters, setSelectedFilters] = useState<
    { utmField: string; value: string }[]
  >([]);
  const [purchaseData, setPurchaseData] = useState<PurchaseData[]>([]);
  const [totalPricePerCurrency, setTotalPricePerCurrency] =
    useState<TotalPricePerCurrency>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const [result, setResult] = useState(null);
  const [percentageDisplayData, setPercentageDisplayData] = useState(null);
  const [utmSourcesPercent, setUtmSourcesPercent] = useState(null);
  const [utmAdIdPercent, setUtmAdIdPercent] = useState(null);
  const [utmCampaignPercent, setUtmCampaignPercent] = useState(null);
  const [utmAdsetPercent, setUtmAdsetPercent] = useState(null);

  const utmFields = ["utm_source", "utm_adid", "utm_campaign", "utm_adset"];

  const toggleFilter = (utmField: string) => {
    setSelectedFilters((prev) => {
      const exists = prev.find((filter) => filter.utmField === utmField);
      return exists
        ? prev.filter((filter) => filter.utmField !== utmField) // Remove if unchecked
        : [...prev, { utmField, value: "" }]; // Add if checked, default value empty
    });
  };

  const handleInputChange = (utmField: string, inputValue: string) => {
    setSelectedFilters((prev) =>
      prev.map((filter) =>
        filter.utmField === utmField ? { ...filter, value: inputValue } : filter
      )
    );
  };

  // Helper function to calculate percentage, ensuring it doesn't exceed 100%
  const calculatePercentage = (
    totalAmount: number,
    step5Visitors: number
  ): number => {
    if (step5Visitors === 0) return 0; // Avoid division by zero
    const percentage = (totalAmount / step5Visitors) * 100;
    return Math.min(percentage, 100); // Ensure percentage doesn't exceed 100
  };

  useEffect(() => {
    if (purchaseData.length > 0 && selectedFilters.length > 0) {
      const step5Visitors = visitorData[0]?.step5_visitors || 0;
      const groupedUTMs: Record<string, Record<string, PurchaseData[]>> = {};

      selectedFilters.forEach(({ utmField }) => {
        groupedUTMs[utmField] = {};
      });

      purchaseData.forEach((purchase) => {
        selectedFilters.forEach(({ utmField, value }) => {
          const utmValue = purchase[utmField] || "unknown";
          if (value && utmValue !== value) return;

          if (!groupedUTMs[utmField][utmValue]) {
            groupedUTMs[utmField][utmValue] = [];
          }
          groupedUTMs[utmField][utmValue].push(purchase);
        });
      });

      const formattedResults: Record<
        string,
        {
          name: string;
          total_amount_more_than_zero: number;
          percentage: number;
          total_purchase_amount: number; // Add this field
        }[]
      > = {};

      selectedFilters.forEach(({ utmField }) => {
        formattedResults[utmField] = Object.entries(groupedUTMs[utmField]).map(
          ([name, purchases]) => {
            const totalPurchaseAmount = purchases.reduce(
              (acc, purchase) => acc + (purchase.amount_paid || 0),
              0
            );
            return {
              name,
              total_amount_more_than_zero: purchases.length,
              percentage: calculatePercentage(purchases.length, step5Visitors),
              total_purchase_amount: totalPurchaseAmount,
            };
          }
        );
      });

      setUtmSourcesPercent(formattedResults);
    }
  }, [selectedFilters, purchaseData, visitorData]);

  useEffect(() => {
    if (result != null && visitorData.length > 0) {
      const step5Visitors = visitorData[0]?.step5_visitors || 0;
      const totalPurchasersPercentage = calculatePercentage(
        result.total_amount_more_than_zero,
        step5Visitors
      ); // Use the helper function

      const updatedUTMSources = Array.isArray(result.utm_sources)
        ? result.utm_sources.map((utm) => ({
            ...utm,
            percentage: calculatePercentage(
              utm.total_amount_more_than_zero,
              step5Visitors
            ), // Use the helper function
          }))
        : [];

      const updatedUTMAdIds = Array.isArray(result.utm_adid)
        ? result.utm_adid.map((utm) => ({
            ...utm,
            percentage: calculatePercentage(
              utm.total_amount_more_than_zero,
              step5Visitors
            ), // Use the helper function
          }))
        : [];

      const updatedUTMCampaigns = Array.isArray(result.utm_campaign)
        ? result.utm_campaign.map((utm) => ({
            ...utm,
            percentage: calculatePercentage(
              utm.total_amount_more_than_zero,
              step5Visitors
            ), // Use the helper function
          }))
        : [];

      const updatedUTMAdsets = Array.isArray(result.utm_adset)
        ? result.utm_adset.map((utm) => ({
            ...utm,
            percentage: calculatePercentage(
              utm.total_amount_more_than_zero,
              step5Visitors
            ), // Use the helper function
          }))
        : [];

      setPercentageDisplayData(totalPurchasersPercentage);
      setUtmSourcesPercent(updatedUTMSources);
      setUtmAdIdPercent(updatedUTMAdIds);
      setUtmCampaignPercent(updatedUTMCampaigns);
      setUtmAdsetPercent(updatedUTMAdsets);
    }
  }, [result, visitorData]);

  useEffect(() => {
    const fetchPurchaseData = async () => {
      try {
        const response = await fetch("/api/fetch-utm-data");

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

          const currency = submission.currency;
          const amount = parseFloat(submission.amount_paid);
          const rate = conversionRates[currency] || 1; // Default to 1 if currency is missing

          groupedBySource[source].push({
            ...submission,
            converted_to_usd_amount: parseFloat((amount * rate).toFixed(2)), // Convert and round to 2 decimal places
          });
        });

        console.log(groupedBySource);

        // Group by utm_adid
        const groupedByAdid = {};
        nonNullAmounts.forEach((submission) => {
          const adid = submission.utm_adid || "unknown";
          if (!groupedByAdid[adid]) {
            groupedByAdid[adid] = [];
          }
          groupedByAdid[adid].push(submission);
        });

        // Group by utm_campaign
        const groupedByCampaign = {};
        nonNullAmounts.forEach((submission) => {
          const campaign = submission.utm_campaign || "unknown";
          if (!groupedByCampaign[campaign]) {
            groupedByCampaign[campaign] = [];
          }
          groupedByCampaign[campaign].push(submission);
        });

        // Group by utm_campaign
        const groupedByAdset = {};
        nonNullAmounts.forEach((submission) => {
          const adset = submission.utm_adset || "unknown";
          if (!groupedByAdset[adset]) {
            groupedByAdset[adset] = [];
          }
          groupedByAdset[adset].push(submission);
        });

        const finalResult = {
          total_amount_more_than_zero: nonNullAmounts.length,
          utm_sources: Object.entries(groupedBySource).map(
            ([name, submissions]) => ({
              name,
              total_amount_more_than_zero: submissions.length,
            })
          ),
          grouped_by_adid: Object.entries(groupedByAdid).map(
            ([name, submissions]) => ({
              name,
              total_amount_more_than_zero: submissions.length,
            })
          ),
          grouped_by_campaign: Object.entries(groupedByCampaign).map(
            ([name, submissions]) => ({
              name,
              total_amount_more_than_zero: submissions.length,
            })
          ),
          grouped_by_adset: Object.entries(groupedByAdset).map(
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
      <h1 className="text-2xl font-bold mb-6">UTM Statistics Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Select UTM Filters</h2>
        {utmFields.map((utm) => {
          const selectedFilter = selectedFilters.find(
            (filter) => filter.utmField === utm
          );
          return (
            <div key={utm} className="flex items-center space-x-2 mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={!!selectedFilter}
                  onChange={() => toggleFilter(utm)}
                  className="mr-2"
                />
                {utm.replace("utm_", "").toUpperCase()}
              </label>
              {selectedFilter && (
                <input
                  type="text"
                  placeholder="Enter value"
                  value={selectedFilter.value}
                  onChange={(e) => handleInputChange(utm, e.target.value)}
                  className="border px-2 py-1 text-sm"
                />
              )}
            </div>
          );
        })}
      </div>

      {selectedFilters.length === 0 ? (
        <p>Select at least one filter to display data.</p>
      ) : (
        Object.entries(
          utmSourcesPercent,
          utmAdIdPercent,
          utmCampaignPercent,
          utmAdsetPercent
        ).map(([utmField, data]) => (
          <Card key={utmField} className="w-full max-w-lg mt-8">
            <CardHeader>
              <CardTitle>
                Purchase Percentage By{" "}
                {utmField.replace("utm_", "").toUpperCase()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  percentage: { label: "Percentage" },
                  total_amount_more_than_zero: { label: "Total Purchases" },
                }}
                className="h-[300px]"
              >
                
                {Array.isArray(data) && data.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            valueFormatter={(value, entry) =>
                              `${
                                entry.payload.name
                              }: ${value}% | Total Purchases: $${entry.payload.total_purchase_amount.toFixed(
                                2
                              )}`
                            }
                          />
                        }
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p>No data available</p>
                )}
              </ChartContainer>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                      <div
                        className="mr-2 h-3 w-3"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span>{entry.name}</span>
                    </div>
                  ))
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default UTMPageData;
