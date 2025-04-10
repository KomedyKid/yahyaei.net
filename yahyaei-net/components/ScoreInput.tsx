'use client';

import { useState, useEffect } from 'react';
import { HL_CONVERSION, SL_CONVERSION } from '../utils/constants';
import { calculateOmaniScore } from '../utils/calculations';

interface ScoreInputProps {
  hlCount: number;
  slCount: number;
  onCalculate: (score: number) => void;
}

// Define a type for each subject's state.
interface SubjectScore {
  score: number;
  required: boolean;
}

export function ScoreInput({ hlCount, slCount, onCalculate }: ScoreInputProps) {
  // Use arrays of objects to track score and 'required' status.
  const [hlScores, setHlScores] = useState<SubjectScore[]>([]);
  const [slScores, setSlScores] = useState<SubjectScore[]>([]);

  // Whenever hlCount changes, initialize HL subjects.
  useEffect(() => {
    setHlScores(Array.from({ length: hlCount }, () => ({ score: 7, required: false })));
  }, [hlCount]);

  // Whenever slCount changes, initialize SL subjects.
  useEffect(() => {
    setSlScores(Array.from({ length: slCount }, () => ({ score: 7, required: false })));
  }, [slCount]);

  // Handle score changes for HL/SL subjects.
  const handleScoreChange = (index: number, value: number, isHL: boolean) => {
    if (isHL) {
      const newScores = [...hlScores];
      newScores[index] = { ...newScores[index], score: value };
      setHlScores(newScores);
    } else {
      const newScores = [...slScores];
      newScores[index] = { ...newScores[index], score: value };
      setSlScores(newScores);
    }
  };

  // Handle checkbox changes to mark a subject as required or not.
  const handleRequiredChange = (index: number, isHL: boolean, value: boolean) => {
    if (isHL) {
      const newScores = [...hlScores];
      newScores[index] = { ...newScores[index], required: value };
      setHlScores(newScores);
    } else {
      const newScores = [...slScores];
      newScores[index] = { ...newScores[index], required: value };
      setSlScores(newScores);
    }
  };

  const calculateAverage = () => {
    const totalSubjects = hlCount + slCount;
    if (totalSubjects === 0) {
      alert('No subjects to calculate average from.');
      return;
    }

    // Combine HL and SL subjects with an added "level" property for calculation purposes.
    const allSubjects = [
      ...hlScores.map((subject) => ({ ...subject, level: 'HL' })),
      ...slScores.map((subject) => ({ ...subject, level: 'SL' }))
    ];

    // Use the new calculation function (which implements the 60/40 required weighting).
    const overallScore = calculateOmaniScore(allSubjects);
    onCalculate(overallScore);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">Enter IB Scores (1-7)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* HL Subject Inputs */}
        <div>
          {hlScores.map((subject, index) => (
            <div key={`hl-${index}`} className="mb-2 flex items-center space-x-4">
              <div>
                <label
                  htmlFor={`hl-${index}`}
                  className="block text-sm font-medium text-gray-300"
                >
                  HL Subject {index + 1}
                </label>
                <input
                  type="number"
                  id={`hl-${index}`}
                  value={subject.score}
                  onChange={(e) => handleScoreChange(index, Number(e.target.value), true)}
                  className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
                  min="1"
                  max="7"
                  placeholder="Enter score"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`hl-required-${index}`}
                  checked={subject.required}
                  onChange={(e) => handleRequiredChange(index, true, e.target.checked)}
                  className="mr-1"
                />
                <label htmlFor={`hl-required-${index}`} className="text-sm text-gray-300 flex items-center">
                  Required
                  <span
                    className="ml-1 cursor-help rounded-full border border-gray-500 px-1 text-xs"
                    title="A required subject is mandatory for your chosen program. Its score is counted in both the overall average (40%) and the required average (60%)."
                  >
                    ?
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
        {/* SL Subject Inputs */}
        <div>
          {slScores.map((subject, index) => (
            <div key={`sl-${index}`} className="mb-2 flex items-center space-x-4">
              <div>
                <label
                  htmlFor={`sl-${index}`}
                  className="block text-sm font-medium text-gray-300"
                >
                  SL Subject {index + 1}
                </label>
                <input
                  type="number"
                  id={`sl-${index}`}
                  value={subject.score}
                  onChange={(e) => handleScoreChange(index, Number(e.target.value), false)}
                  className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
                  min="1"
                  max="7"
                  placeholder="Enter score"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`sl-required-${index}`}
                  checked={subject.required}
                  onChange={(e) => handleRequiredChange(index, false, e.target.checked)}
                  className="mr-1"
                />
                <label htmlFor={`sl-required-${index}`} className="text-sm text-gray-300">
                  Required
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={calculateAverage}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Calculate Omani Score
      </button>
    </div>
  );
}
