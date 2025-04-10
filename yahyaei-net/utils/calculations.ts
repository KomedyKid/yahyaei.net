// calculations.ts
import { HL_CONVERSION, SL_CONVERSION } from './constants';

export interface SubjectScore {
  level: 'HL' | 'SL';
  score: number;      // IB score (1-7)
  required: boolean;  // Whether this subject is marked as required
}

/**
 * Calculates the overall Omani score using the official weighted method:
 *
 *   - The overall average of all subjects (required and non-required) is multiplied by 0.4.
 *   - The average of only the required subjects is multiplied by 0.6.
 *   - Then these two numbers are added.
 *
 * If no subjects are marked as required, the overall average is used for both portions.
 *
 * @param subjects Array of subjects with their IB score, level, and "required" flag.
 * @returns The weighted overall Omani score.
 */
export function calculateOmaniScore(subjects: SubjectScore[]): number {
  const totalSubjects = subjects.length;
  if (totalSubjects === 0) return 0;

  // Calculate overall average for all subjects.
  const overallTotal = subjects.reduce((sum, subject) => {
    const conversion = subject.level === 'HL' ? HL_CONVERSION[subject.score] : SL_CONVERSION[subject.score];
    return sum + conversion;
  }, 0);
  const overallAvg = overallTotal / totalSubjects;

  // Calculate average for required subjects.
  const requiredSubjects = subjects.filter(subject => subject.required);
  let requiredAvg: number;
  if (requiredSubjects.length > 0) {
    const requiredTotal = requiredSubjects.reduce((sum, subject) => {
      const conversion = subject.level === 'HL' ? HL_CONVERSION[subject.score] : SL_CONVERSION[subject.score];
      return sum + conversion;
    }, 0);
    requiredAvg = requiredTotal / requiredSubjects.length;
  } else {
    // If no subjects are marked as required, fallback to overall average.
    requiredAvg = overallAvg;
  }

  // Official weighted formula: overallAvg contributes 40% and requiredAvg contributes 60%.
  return overallAvg * 0.4 + requiredAvg * 0.6;
}



/**
 * Generate combinations with replacement.
 * E.g., combinationsWithReplacement([1,2,3], 2) returns:
 * [[1,1], [1,2], [1,3], [2,2], [2,3], [3,3]]
 */
function combinationsWithReplacement(arr: number[], n: number): number[][] {
  if (n === 0) return [[]];
  const result: number[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const subCombinations = combinationsWithReplacement(arr.slice(i), n - 1);
    for (const subComb of subCombinations) {
      result.push([arr[i], ...subComb]);
    }
  }
  return result;
}

/**
 * Generate all combinations (without replacement) of k indices 
 * from the range 0 to total-1.
 */
function combinationsOfIndices(total: number, k: number): number[][] {
  function helper(start: number, k: number, path: number[], res: number[][]) {
    if (k === 0) {
      res.push([...path]);
      return;
    }
    for (let i = start; i < total; i++) {
      path.push(i);
      helper(i + 1, k - 1, path, res);
      path.pop();
    }
  }
  const res: number[][] = [];
  helper(0, k, [], res);
  return res;
}

/**
 * Calculates the required IB grade combinations that yield a weighted average
 * meeting or exceeding the desired score.
 *
 * With the new weighting scheme:
 *   - The average for subjects marked as required (by the user) contributes 60%.
 *   - The average for the remaining subjects contributes 40%.
 *
 * For each combination of scores (for HL and SL subjects), we enumerate every way
 * to mark exactly `requiredCount` subjects as required (from the total subjects).
 * If for any such assignment the weighted average is at least the desired average,
 * we include that solution.
 *
 * @param hlCount Number of HL subjects.
 * @param slCount Number of SL subjects.
 * @param requiredCount Number of subjects (from the total) that are required.
 * @param desiredAvg The target weighted average score.
 * @returns An array of solution strings.
 */
export function calculateRequiredGrades(
  hlCount: number,
  slCount: number,
  requiredCount: number,
  desiredAvg: number
): string[] {
  const totalSubjects = hlCount + slCount;
  const hlCombos = hlCount > 0 ? combinationsWithReplacement([1, 2, 3, 4, 5, 6, 7], hlCount) : [[]];
  const slCombos = slCount > 0 ? combinationsWithReplacement([1, 2, 3, 4, 5, 6, 7], slCount) : [[]];

  const allSolutions: string[] = [];

  // For every possible combination of HL and SL scores...
  for (const hlCombo of hlCombos) {
    for (const slCombo of slCombos) {
      // Build the full IB score array (first HL subjects then SL subjects)
      const fullScores: number[] = [...hlCombo, ...slCombo];

      // Convert IB scores to numeric values using proper conversion,
      // where first hlCount entries use HL_CONVERSION, and the rest use SL_CONVERSION.
      const conversions: number[] = [];
      for (let i = 0; i < hlCombo.length; i++) {
        conversions.push(HL_CONVERSION[hlCombo[i]]);
      }
      for (let i = 0; i < slCombo.length; i++) {
        conversions.push(SL_CONVERSION[slCombo[i]]);
      }

      // For each way to choose "requiredCount" indices out of totalSubjects,
      // calculate the weighted average score.
      const indexCombos = combinationsOfIndices(totalSubjects, requiredCount);
      for (const idxCombo of indexCombos) {
        let requiredSum = 0;
        let nonRequiredSum = 0;
        const requiredScores: number[] = [];
        const nonRequiredScores: number[] = [];
        for (let idx = 0; idx < totalSubjects; idx++) {
          if (idxCombo.includes(idx)) {
            requiredSum += conversions[idx];
            requiredScores.push(fullScores[idx]);
          } else {
            nonRequiredSum += conversions[idx];
            nonRequiredScores.push(fullScores[idx]);
          }
        }
        const requiredAvg = requiredScores.length > 0 ? requiredSum / requiredScores.length : 0;
        const nonRequiredAvg =
          nonRequiredScores.length > 0 ? nonRequiredSum / nonRequiredScores.length : 0;
        let weightedAverage = 0;
        if (requiredScores.length > 0 && nonRequiredScores.length > 0) {
          weightedAverage = requiredAvg * 0.6 + nonRequiredAvg * 0.4;
        } else if (requiredScores.length > 0) {
          weightedAverage = requiredAvg;
        } else {
          weightedAverage = nonRequiredAvg;
        }

        if (weightedAverage >= desiredAvg) {
          const hlStr = hlCombo.join(',');
          const slStr = slCombo.join(',');
          const reqIndicesStr = idxCombo.join(',');
          const solutionStr = `HL: [${hlStr}] | SL: [${slStr}] | Required indices: [${reqIndicesStr}] => Weighted Avg: ${weightedAverage.toFixed(2)}`;
          allSolutions.push(solutionStr);
        }
      }
    }
  }

  return allSolutions.sort(
    (a, b) =>
      parseFloat(b.split('Weighted Avg: ')[1]) - parseFloat(a.split('Weighted Avg: ')[1])
  );
}
