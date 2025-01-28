import SurveyAnalysis from "@/components/quiz-correlation/SurveyAnalysis"

const analysisData = {
  analysis: {
    country: {
      question_text: "Select your country",
      answers: [
        {
          name: "Switzerland",
          total: 14,
          purchased: 7,
          purchaseRate: "50.00",
        },
        {
          name: "New Zealand",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "Canada",
          total: 2,
          purchased: 1,
          purchaseRate: "50.00",
        },
        {
          name: "Singapore",
          total: 2,
          purchased: 2,
          purchaseRate: "100.00",
        },
        {
          name: "Australia",
          total: 1,
          purchased: 0,
          purchaseRate: "0.00",
        },
        {
          name: "United Kingdom",
          total: 3,
          purchased: 1,
          purchaseRate: "33.33",
        },
        {
          name: "United Arab Emirates",
          total: 1,
          purchased: 0,
          purchaseRate: "0.00",
        },
      ],
    },
    age: {
      question_text: "What is your age?",
      answers: [
        {
          name: "25-35",
          total: 11,
          purchased: 8,
          purchaseRate: "72.73",
        },
        {
          name: "36-50",
          total: 10,
          purchased: 2,
          purchaseRate: "20.00",
        },
        {
          name: "Over 65",
          total: 1,
          purchased: 0,
          purchaseRate: "0.00",
        },
        {
          name: "51-65",
          total: 2,
          purchased: 2,
          purchaseRate: "100.00",
        },
      ],
    },
    aiReasons: {
      question_text: "Why do you want to buy the Great AI Power Crisis Report?",
      answers: [
        {
          name: "To generate substantial returns from early AI opportunities",
          total: 9,
          purchased: 8,
          purchaseRate: "88.89",
        },
        {
          name: "To build lasting wealth for my family's future",
          total: 9,
          purchased: 2,
          purchaseRate: "22.22",
        },
        {
          name: "To secure my financial future with proven AI investments",
          total: 16,
          purchased: 5,
          purchaseRate: "31.25",
        },
        {
          name: "To earn extra income through smart AI investments",
          total: 3,
          purchased: 2,
          purchaseRate: "66.67",
        },
        {
          name: "To achieve financial independence sooner",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "To make my money work harder for me",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "To create a reliable additional income stream",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "To retire comfortably ahead of schedule",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "To grow my wealth systematically and safely",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "To maximize my investment returns with expert guidance",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
      ],
    },
    challenges: {
      question_text: "What are your biggest challenges with AI investing?",
      answers: [
        {
          name: "Too much conflicting information",
          total: 10,
          purchased: 6,
          purchaseRate: "60.00",
        },
        {
          name: "Difficulty identifying legitimate opportunities",
          total: 6,
          purchased: 5,
          purchaseRate: "83.33",
        },
        {
          name: "Lack of expert guidance",
          total: 12,
          purchased: 4,
          purchaseRate: "33.33",
        },
        {
          name: "Need for a proven system",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
      ],
    },
    aiSigns: {
      question_text: "Which signs convince you AI will transform investing?",
      answers: [
        {
          name: "I see AI technology being adopted everywhere in daily life",
          total: 14,
          purchased: 5,
          purchaseRate: "35.71",
        },
        {
          name: "I notice major companies like Microsoft and Google betting big on AI",
          total: 5,
          purchased: 5,
          purchaseRate: "100.00",
        },
        {
          name: "I watch AI tools and services getting better at incredible speed",
          total: 5,
          purchased: 4,
          purchaseRate: "80.00",
        },
        {
          name: "I observe how AI is creating new jobs while replacing others",
          total: 5,
          purchased: 3,
          purchaseRate: "60.00",
        },
      ],
    },
    missedOpportunity: {
      question_text: "Which missed investment opportunity do you most regret?",
      answers: [
        {
          name: "Missing Bitcoin under CHF1,000",
          total: 3,
          purchased: 3,
          purchaseRate: "100.00",
        },
        {
          name: "Not buying Amazon in the 90s",
          total: 15,
          purchased: 6,
          purchaseRate: "40.00",
        },
        {
          name: "Missing Bitcoin under NZD2,000",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "Passing on Tesla pre-split",
          total: 2,
          purchased: 1,
          purchaseRate: "50.00",
        },
        {
          name: "Missing Bitcoin under AED4,000",
          total: 1,
          purchased: 0,
          purchaseRate: "0.00",
        },
        {
          name: "Missing Bitcoin under £1,000",
          total: 1,
          purchased: 0,
          purchaseRate: "0.00",
        },
        {
          name: "Avoiding Nvidia before AI boom",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
      ],
    },
    valueClarity: {
      question_text: "Which aspects of AI investing would you most value having clarity on?",
      answers: [
        {
          name: "How to evaluate different AI investment opportunities",
          total: 3,
          purchased: 2,
          purchaseRate: "66.67",
        },
        {
          name: "How to identify AI companies with strong potential",
          total: 12,
          purchased: 2,
          purchaseRate: "16.67",
        },
        {
          name: "Which AI companies have proven business models",
          total: 5,
          purchased: 4,
          purchaseRate: "80.00",
        },
        {
          name: "When to add AI investments to my existing portfolio",
          total: 7,
          purchased: 5,
          purchaseRate: "71.43",
        },
      ],
    },
    futureVision: {
      question_text: "Where do you see yourself in the AI revolution?",
      answers: [
        {
          name: "Making smart investment moves ahead of the crowd",
          total: 13,
          purchased: 5,
          purchaseRate: "38.46",
        },
        {
          name: "Growing my wealth by spotting AI opportunities early",
          total: 8,
          purchased: 5,
          purchaseRate: "62.50",
        },
        {
          name: "Following a proven system for AI investing success",
          total: 4,
          purchased: 4,
          purchaseRate: "100.00",
        },
        {
          name: "Building financial security through informed AI investments",
          total: 4,
          purchased: 3,
          purchaseRate: "75.00",
        },
      ],
    },
    incomeUse: {
      question_text: "What would you do with your additional investment income?",
      answers: [
        {
          name: "Travel more frequently",
          total: 8,
          purchased: 6,
          purchaseRate: "75.00",
        },
        {
          name: "Spend more time with family",
          total: 13,
          purchased: 4,
          purchaseRate: "30.77",
        },
        {
          name: "Achieve financial independence",
          total: 6,
          purchased: 4,
          purchaseRate: "66.67",
        },
        {
          name: "Start my own business",
          total: 3,
          purchased: 2,
          purchaseRate: "66.67",
        },
        {
          name: "Support charitable causes",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "Leave a legacy for my children",
          total: 2,
          purchased: 2,
          purchaseRate: "100.00",
        },
        {
          name: "Freedom to pursue any opportunity",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "Confidence in my financial future",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "Control over my career choices",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "Independence from financial stress",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
      ],
    },
    lifeChange: {
      question_text: "How would achieving your investment goals change your life?",
      answers: [
        {
          name: "Enhanced financial security",
          total: 19,
          purchased: 8,
          purchaseRate: "42.11",
        },
        {
          name: "Greater peace of mind",
          total: 3,
          purchased: 3,
          purchaseRate: "100.00",
        },
        {
          name: "More time freedom",
          total: 6,
          purchased: 4,
          purchaseRate: "66.67",
        },
        {
          name: "Better work-life balance",
          total: 4,
          purchased: 2,
          purchaseRate: "50.00",
        },
        {
          name: "Pay for children's education",
          total: 7,
          purchased: 1,
          purchaseRate: "14.29",
        },
        {
          name: "Retire years ahead of schedule",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "Buy my dream home",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "Invest in my health and wellness",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "Help parents retire comfortably",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "Pursue passions without money stress",
          total: 2,
          purchased: 1,
          purchaseRate: "50.00",
        },
      ],
    },
    targetGain: {
      question_text: "What's your target gain from AI investments in the next 12 months?",
      answers: [
        {
          name: "$50,000 - $250,000 in gains",
          total: 14,
          purchased: 5,
          purchaseRate: "35.71",
        },
        {
          name: "$2,000 - $10,000 in gains",
          total: 5,
          purchased: 4,
          purchaseRate: "80.00",
        },
        {
          name: "$10,000 - $50,000 in gains",
          total: 4,
          purchased: 2,
          purchaseRate: "50.00",
        },
        {
          name: "Over $250,000 in gains",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
      ],
    },
    investorQualities: {
      question_text: "As an investor, which of these qualities do you identify with most?",
      answers: [
        {
          name: "I do thorough research and look for systematic approaches that remove guesswork",
          total: 14,
          purchased: 5,
          purchaseRate: "35.71",
        },
        {
          name: "I'm quick to spot opportunities but want proven research to confirm my instincts",
          total: 7,
          purchased: 5,
          purchaseRate: "71.43",
        },
        {
          name: "I value expert insights but like to understand the reasoning behind recommendations",
          total: 5,
          purchased: 2,
          purchaseRate: "40.00",
        },
        {
          name: "I focus on protecting and growing wealth through well-researched opportunities",
          total: 3,
          purchased: 1,
          purchaseRate: "33.33",
        },
        {
          name: "I learn from past investment experiences and adapt my strategy based on what works",
          total: 3,
          purchased: 3,
          purchaseRate: "100.00",
        },
      ],
    },
    investingStrengths: {
      question_text: "Which of these investing strengths best describes you?",
      answers: [
        {
          name: "Seeing big tech changes before most people",
          total: 5,
          purchased: 4,
          purchaseRate: "80.00",
        },
        {
          name: "Following step-by-step plans that work",
          total: 9,
          purchased: 6,
          purchaseRate: "66.67",
        },
        {
          name: "Understanding what really moves markets",
          total: 3,
          purchased: 1,
          purchaseRate: "33.33",
        },
        {
          name: "Being smart about risks and rewards",
          total: 2,
          purchased: 2,
          purchaseRate: "100.00",
        },
        {
          name: "Taking action when you see solid proof",
          total: 11,
          purchased: 3,
          purchaseRate: "27.27",
        },
      ],
    },
    investingApproach: {
      question_text: "How would you describe your approach to investing?",
      answers: [
        {
          name: "I like to make smart moves based on what big investors are doing",
          total: 5,
          purchased: 4,
          purchaseRate: "80.00",
        },
        {
          name: "I look for special opportunities that have solid proof behind them",
          total: 15,
          purchased: 7,
          purchaseRate: "46.67",
        },
        {
          name: "I try to get in early when I see big market changes coming",
          total: 3,
          purchased: 2,
          purchaseRate: "66.67",
        },
        {
          name: "I prefer using proven systems instead of gut feelings",
          total: 4,
          purchased: 2,
          purchaseRate: "50.00",
        },
        {
          name: "I learn from missed opportunities to make better choices",
          total: 2,
          purchased: 1,
          purchaseRate: "50.00",
        },
      ],
    },
    stockExperience: {
      question_text: "What's your experience level with buying stocks?",
      answers: [
        {
          name: "I'm very experienced",
          total: 8,
          purchased: 2,
          purchaseRate: "25.00",
        },
        {
          name: "I'm completely new to this",
          total: 7,
          purchased: 4,
          purchaseRate: "57.14",
        },
        {
          name: "I've bought a few stocks before",
          total: 4,
          purchased: 3,
          purchaseRate: "75.00",
        },
        {
          name: "I buy stocks regularly",
          total: 5,
          purchased: 3,
          purchaseRate: "60.00",
        },
      ],
    },
    techStockExperience: {
      question_text: "Have you ever purchased technology stocks before?",
      answers: [
        {
          name: "No, this would be my first time",
          total: 3,
          purchased: 2,
          purchaseRate: "66.67",
        },
        {
          name: "Yes, I buy them often",
          total: 12,
          purchased: 4,
          purchaseRate: "33.33",
        },
        {
          name: "Yes, several tech stocks",
          total: 6,
          purchased: 5,
          purchaseRate: "83.33",
        },
        {
          name: "Yes, 1-2 tech stocks",
          total: 3,
          purchased: 1,
          purchaseRate: "33.33",
        },
      ],
    },
    largestInvestment: {
      question_text: "What's the most you've ever invested in a single stock?",
      answers: [
        {
          name: "Less than $500",
          total: 4,
          purchased: 2,
          purchaseRate: "50.00",
        },
        {
          name: "$2,500 - $10,000",
          total: 12,
          purchased: 5,
          purchaseRate: "41.67",
        },
        {
          name: "$500 - $2,500",
          total: 5,
          purchased: 4,
          purchaseRate: "80.00",
        },
        {
          name: "More than $10,000",
          total: 3,
          purchased: 1,
          purchaseRate: "33.33",
        },
      ],
    },
    aiInterest: {
      question_text: "Which best describes your interest in AI investing?",
      answers: [
        {
          name: "I'm ready to make a moderate investment",
          total: 5,
          purchased: 3,
          purchaseRate: "60.00",
        },
        {
          name: "I want to make AI a major part of my portfolio",
          total: 5,
          purchased: 4,
          purchaseRate: "80.00",
        },
        {
          name: "I want to test it with a small amount",
          total: 10,
          purchased: 3,
          purchaseRate: "30.00",
        },
        {
          name: "I want to go all-in on AI opportunities",
          total: 4,
          purchased: 2,
          purchaseRate: "50.00",
        },
      ],
    },
    timeline: {
      question_text: "How soon are you looking to start investing in AI stocks?",
      answers: [
        {
          name: "Within the next few weeks",
          total: 2,
          purchased: 2,
          purchaseRate: "100.00",
        },
        {
          name: "Within the next few months",
          total: 8,
          purchased: 6,
          purchaseRate: "75.00",
        },
        {
          name: "I want to start immediately",
          total: 6,
          purchased: 4,
          purchaseRate: "66.67",
        },
        {
          name: "I'm just researching for now",
          total: 8,
          purchased: 0,
          purchaseRate: "0.00",
        },
      ],
    },
    newsletterExperience: {
      question_text: "Have you ever subscribed to any investment newsletters or stock picking services?",
      answers: [
        {
          name: "Yes, one before",
          total: 12,
          purchased: 4,
          purchaseRate: "33.33",
        },
        {
          name: "Yes, a few different ones",
          total: 7,
          purchased: 4,
          purchaseRate: "57.14",
        },
        {
          name: "Yes, I use them regularly",
          total: 3,
          purchased: 3,
          purchaseRate: "100.00",
        },
        {
          name: "No, this would be my first",
          total: 2,
          purchased: 1,
          purchaseRate: "50.00",
        },
      ],
    },
    decisionMaking: {
      question_text: "When you find a good investment opportunity, how do you usually act?",
      answers: [
        {
          name: "I act right away on good opportunities",
          total: 2,
          purchased: 2,
          purchaseRate: "100.00",
        },
        {
          name: "I take a few days to decide",
          total: 8,
          purchased: 1,
          purchaseRate: "12.50",
        },
        {
          name: "I usually decide within 24 hours",
          total: 10,
          purchased: 6,
          purchaseRate: "60.00",
        },
        {
          name: "I need lots of time to think it over",
          total: 4,
          purchased: 3,
          purchaseRate: "75.00",
        },
      ],
    },
    income: {
      question_text: "Which range best describes your total household income per year? (Optional but recommended)",
      answers: [
        {
          name: "4",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "0",
          total: 2,
          purchased: 1,
          purchaseRate: "50.00",
        },
        {
          name: "3",
          total: 10,
          purchased: 2,
          purchaseRate: "20.00",
        },
        {
          name: "1",
          total: 7,
          purchased: 4,
          purchaseRate: "57.14",
        },
        {
          name: "2",
          total: 4,
          purchased: 4,
          purchaseRate: "100.00",
        },
      ],
    },
    netWorth: {
      question_text: "Which range best describes your total household net worth? (Optional but recommended)",
      answers: [
        {
          name: "2",
          total: 5,
          purchased: 3,
          purchaseRate: "60.00",
        },
        {
          name: "3",
          total: 9,
          purchased: 2,
          purchaseRate: "22.22",
        },
        {
          name: "1",
          total: 3,
          purchased: 3,
          purchaseRate: "100.00",
        },
        {
          name: "6",
          total: 1,
          purchased: 1,
          purchaseRate: "100.00",
        },
        {
          name: "0",
          total: 2,
          purchased: 2,
          purchaseRate: "100.00",
        },
        {
          name: "4",
          total: 2,
          purchased: 1,
          purchaseRate: "50.00",
        },
        {
          name: "5",
          total: 2,
          purchased: 0,
          purchaseRate: "0.00",
        },
      ],
    },
  },
}

export default function Home() {
  return (
    <main className="container mx-auto">
      <SurveyAnalysis analysisData={analysisData} />
    </main>
  )
}