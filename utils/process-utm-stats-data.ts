interface Submission {
    uuid: string
    amount_paid: string | null
    country: string | null
    currency: string | null
    utm_source: string | null
    utm_adid: string | null
    utm_campaign: string | null
    utm_adset: string | null
  }
  
  interface ApiResponse {
    submissions: Submission[]
    step5_visitors: number
    initial_visitors: number
  }
  
  interface ChartData {
    name: string
    purchases: number
    percentage: number
  }
  
  function countPurchasesAndPercentages(submissions: Submission[], utmField: keyof Submission): ChartData[] {
    const counts: { [key: string]: number } = {}
    let total = 0
  
    submissions.forEach((submission) => {
      if (submission.amount_paid !== null) {
        const utmValue = submission[utmField] as string
        counts[utmValue] = (counts[utmValue] || 0) + 1
        total++
      }
    })
  
    return Object.entries(counts).map(([name, purchases]) => ({
      name,
      purchases,
      percentage: (purchases / total) * 100,
    }))
  }
  
  export function processUtmStatsData(data: ApiResponse) {
    const totalPurchases = data.submissions.filter((s) => s.amount_paid !== null).length
    const conversionRate = (totalPurchases / data.step5_visitors) * 100
  
    return {
      utmSourceData: countPurchasesAndPercentages(data.submissions, "utm_source"),
      utmAdidData: countPurchasesAndPercentages(data.submissions, "utm_adid"),
      utmCampaignData: countPurchasesAndPercentages(data.submissions, "utm_campaign"),
      utmAdsetData: countPurchasesAndPercentages(data.submissions, "utm_adset"),
      totalPurchases,
      conversionRate,
      quizCompletions: data.step5_visitors,
      initialVisitors: data.initial_visitors,
    }
  }
  
  