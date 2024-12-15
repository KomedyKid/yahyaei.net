interface ResultDisplayProps {
    averageScore: number | null
  }
  
  export function ResultDisplay({ averageScore }: ResultDisplayProps) {
    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Result</h2>
        {averageScore !== null ? (
          <p className="text-xl font-bold text-blue-600">
            Average Proposed Score: {averageScore.toFixed(2)}
          </p>
        ) : (
          <p className="text-gray-500">Calculate your average score to see the result.</p>
        )}
      </div>
    )
  }
  
  