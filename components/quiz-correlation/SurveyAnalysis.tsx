import SurveyChart from "@/components/quiz-correlation/SurveyChart"

interface AnalysisData {
  analysis: {
    [key: string]: {
      question_text: string
      answers: Array<{
        name: string
        total: number
        purchased: number
        purchaseRate: string
      }>
    }
  }
}

interface SurveyAnalysisProps {
  analysisData: AnalysisData
}

export default function SurveyAnalysis({ analysisData }: SurveyAnalysisProps) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Survey Analysis</h1>
      {Object.entries(analysisData.analysis).map(([key, data]) => (
        <SurveyChart key={key} questionText={data.question_text} answers={data.answers} />
      ))}
    </div>
  )
}

