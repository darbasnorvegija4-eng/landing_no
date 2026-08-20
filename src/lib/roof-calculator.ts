export type RoofCalculation = {
  newRoof: number;
  renewal: number;
  difference: number;
  savingsPercent: number;
};

export function calculateRoofComparison(
  sqm: number,
  newRoofPerSqm: number,
  renewalPerSqm: number,
): RoofCalculation {
  const newRoof = sqm * newRoofPerSqm;
  const renewal = sqm * renewalPerSqm;
  const difference = Math.max(newRoof - renewal, 0);

  return {
    newRoof,
    renewal,
    difference,
    savingsPercent: newRoof > 0 ? Math.round((difference / newRoof) * 100) : 0,
  };
}
