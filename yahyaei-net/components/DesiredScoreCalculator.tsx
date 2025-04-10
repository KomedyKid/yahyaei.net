'use client'

import { useState } from 'react'
import { calculateRequiredGrades } from '../utils/calculations'

interface DesiredScoreCalculatorProps {
  hlCount: number
  slCount: number
}

export function DesiredScoreCalculator({ hlCount, slCount }: DesiredScoreCalculatorProps) {
  const [desiredScore, setDesiredScore] = useState<number | ''>('')
  const [requiredCount, setRequiredCount] = useState<number | ''>('') // New state for number of required subjects
  const [solutions, setSolutions] = useState<string[]>([])

  const handleCalculate = () => {
    if (desiredScore === '' || Number(desiredScore) <= 0) {
      alert('Please enter a valid desired average score greater than 0.')
      return
    }

    const totalSubjects = hlCount + slCount
    if (
      requiredCount === '' ||
      Number(requiredCount) < 0 ||
      Number(requiredCount) > totalSubjects
    ) {
      alert(`Please enter a valid number of required subjects (0 - ${totalSubjects}).`)
      return
    }

    const result = calculateRequiredGrades(hlCount, slCount, Number(requiredCount), Number(desiredScore))
    setSolutions(result)
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Calculate Required IB Grades</h2>
      <div className="flex flex-col md:flex-row items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center">
          <label htmlFor="desired-score" className="block text-sm font-medium text-gray-300 mr-2">
            Desired Average Score:
          </label>
          <input
            type="number"
            id="desired-score"
            value={desiredScore}
            onChange={(e) =>
              setDesiredScore(e.target.value === '' ? '' : Number(e.target.value))
            }
            className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
            step="0.01"
            min="0"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="required-count" className="block text-sm font-medium text-gray-300 mr-2">
            Number of Required Subjects:
          </label>
          <input
            type="number"
            id="required-count"
            value={requiredCount}
            onChange={(e) =>
              setRequiredCount(e.target.value === '' ? '' : Number(e.target.value))
            }
            className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
            min="0"
            max={hlCount + slCount}
            placeholder="Enter required subject count"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Calculate
        </button>
      </div>
      {solutions.length > 0 && (
        <div className="mt-1 w-full rounded-md bg-gray-800 border border-gray-600 text-gray-100 shadow-sm p-2">
          <h3 className="font-medium mb-2">Possible Solutions:</h3>
          {solutions.map((solution, index) => (
            <p key={index} className="mb-1">{solution}</p>
          ))}
        </div>
      )}
    </div>
  )
}
