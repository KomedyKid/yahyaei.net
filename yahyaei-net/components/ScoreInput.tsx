'use client';

import { useState } from 'react';
import { HL_CONVERSION, SL_CONVERSION } from '../utils/constants';

interface ScoreInputProps {
  hlCount: number;
  slCount: number;
  onCalculate: (score: number) => void;
}

export function ScoreInput({ hlCount, slCount, onCalculate }: ScoreInputProps) {
  const [hlScores, setHlScores] = useState<number[]>(Array(hlCount).fill(0));
  const [slScores, setSlScores] = useState<number[]>(Array(slCount).fill(0));

  const handleScoreChange = (index: number, value: number, isHL: boolean) => {
    if (isHL) {
      const newScores = [...hlScores];
      newScores[index] = value;
      setHlScores(newScores);
    } else {
      const newScores = [...slScores];
      newScores[index] = value;
      setSlScores(newScores);
    }
  };

  const calculateAverage = () => {
    const totalSubjects = hlCount + slCount;
    if (totalSubjects === 0) {
      alert('No subjects to calculate average from.');
      return;
    }

    const hlTotal = hlScores.reduce((sum, score) => sum + HL_CONVERSION[score], 0);
    const slTotal = slScores.reduce((sum, score) => sum + SL_CONVERSION[score], 0);
    const totalScore = hlTotal + slTotal;
    const avgScore = totalScore / totalSubjects;

    onCalculate(avgScore);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">Enter IB Scores (1-7)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          {Array.from({ length: hlCount }).map((_, index) => (
            <div key={`hl-${index}`} className="mb-2">
              <label
                htmlFor={`hl-${index}`}
                className="block text-sm font-medium text-gray-300"
              >
                HL Subject {index + 1}
              </label>
              <input
                type="number"
                id={`hl-${index}`}
                value={hlScores[index] || ''}
                onChange={(e) => handleScoreChange(index, Number(e.target.value), true)}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
                min="1"
                max="7"
                placeholder="Enter score"
              />
            </div>
          ))}
        </div>
        <div>
          {Array.from({ length: slCount }).map((_, index) => (
            <div key={`sl-${index}`} className="mb-2">
              <label
                htmlFor={`sl-${index}`}
                className="block text-sm font-medium text-gray-300"
              >
                SL Subject {index + 1}
              </label>
              <input
                type="number"
                id={`sl-${index}`}
                value={slScores[index] || ''}
                onChange={(e) => handleScoreChange(index, Number(e.target.value), false)}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
                min="1"
                max="7"
                placeholder="Enter score"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={calculateAverage}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Calculate Current Average
      </button>
    </div>
  );
}
