'use client';

import { useState } from 'react';
import { ScoreInput } from '../../components/ScoreInput';
import { ResultDisplay } from '../../components/ResultDisplay';
import { DesiredScoreCalculator } from '../../components/DesiredScoreCalculator';
import { Navbar } from '../../components/Navbar';

export default function Home() {
  const [hlCount, setHlCount] = useState(3);
  const [slCount, setSlCount] = useState(3);
  const [averageScore, setAverageScore] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">
          IB to Omani Score Converter
        </h1>
        <div className="bg-gray-800 shadow-lg rounded-lg p-8">
          <div className="flex flex-wrap justify-between mb-6 gap-6">
            {/* HL Input */}
            <div className="w-full sm:w-auto">
              <label htmlFor="hl-count" className="block text-sm font-medium text-gray-300 mb-2">
                Number of HL subjects:
              </label>
              <input
                type="number"
                id="hl-count"
                value={hlCount}
                onChange={(e) => setHlCount(Number(e.target.value))}
                className="block w-full rounded-md bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
                min="0"
                max="10"
                placeholder="Enter HL count"
              />
            </div>

            {/* SL Input */}
            <div className="w-full sm:w-auto">
              <label htmlFor="sl-count" className="block text-sm font-medium text-gray-300 mb-2">
                Number of SL subjects:
              </label>
              <input
                type="number"
                id="sl-count"
                value={slCount}
                onChange={(e) => setSlCount(Number(e.target.value))}
                className="block w-full rounded-md bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
                min="0"
                max="10"
                placeholder="Enter SL count"
              />
            </div>
          </div>

          {/* Components */}
          <ScoreInput
            hlCount={hlCount}
            slCount={slCount}
            onCalculate={setAverageScore}
          />
          <ResultDisplay averageScore={averageScore} />
          <DesiredScoreCalculator hlCount={hlCount} slCount={slCount} />
        </div>
      </div>
    </div>
  );
}
