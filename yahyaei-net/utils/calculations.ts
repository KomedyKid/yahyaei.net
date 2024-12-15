import { HL_CONVERSION, SL_CONVERSION } from './constants'

function combinationsWithReplacement(arr: number[], n: number): number[][] {
  if (n === 0) return [[]]
  const result: number[][] = []

  for (let i = 0; i < arr.length; i++) {
    const subCombinations = combinationsWithReplacement(arr.slice(i), n - 1)
    for (const subComb of subCombinations) {
      result.push([arr[i], ...subComb])
    }
  }

  return result
}

export function calculateRequiredGrades(hlCount: number, slCount: number, desiredAvg: number): string[] {
  const totalSubjects = hlCount + slCount
  const requiredSum = desiredAvg * totalSubjects

  const hlCombos = hlCount > 0 ? combinationsWithReplacement([1, 2, 3, 4, 5, 6, 7], hlCount) : [[]]
  const slCombos = slCount > 0 ? combinationsWithReplacement([1, 2, 3, 4, 5, 6, 7], slCount) : [[]]

  const allSolutions: string[] = []

  for (const hlCombo of hlCombos) {
    const hlTotal = hlCombo.reduce((sum, score) => sum + HL_CONVERSION[score], 0)
    for (const slCombo of slCombos) {
      const slTotal = slCombo.reduce((sum, score) => sum + SL_CONVERSION[score], 0)
      const totalScore = hlTotal + slTotal
      if (totalScore >= requiredSum) {
        const avgScore = totalScore / totalSubjects
        const hlStr = hlCount > 0 ? hlCombo.join(',') : 'None'
        const slStr = slCount > 0 ? slCombo.join(',') : 'None'
        allSolutions.push(`HL: ${hlStr} | SL: ${slStr} => Average: ${avgScore.toFixed(2)}`)
      }
    }
  }

  return allSolutions.length > 0
    ? allSolutions.sort((a, b) => parseFloat(b.split('Average: ')[1]) - parseFloat(a.split('Average: ')[1]))
    : ['It is not possible to achieve the desired average with any combination of IB scores (1-7).']
}

