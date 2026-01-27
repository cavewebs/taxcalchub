export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export function calculateTaxFromBrackets(
  income: number,
  brackets: TaxBracket[],
  personalAllowance: number = 0
): number {
  const taxableIncome = Math.max(0, income - personalAllowance);
  let totalTax = 0;

  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break;
    const taxableInBracket =
      Math.min(taxableIncome, bracket.max) - bracket.min;
    totalTax += taxableInBracket * bracket.rate;
  }

  return totalTax;
}

export function calculateSocialSecurity(
  income: number,
  brackets: TaxBracket[]
): number {
  let total = 0;

  for (const bracket of brackets) {
    if (income <= bracket.min) break;
    const taxableInBracket =
      Math.min(income, bracket.max) - bracket.min;
    total += taxableInBracket * bracket.rate;
  }

  return total;
}

export function getMarginalRate(
  income: number,
  brackets: TaxBracket[],
  personalAllowance: number = 0
): number {
  const taxableIncome = Math.max(0, income - personalAllowance);
  let marginalRate = 0;

  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break;
    marginalRate = bracket.rate;
  }

  return marginalRate * 100;
}

export function calculateVAT(
  amount: number,
  rate: number,
  inclusive: boolean
): { net: number; vat: number; gross: number } {
  if (inclusive) {
    const net = amount / (1 + rate / 100);
    const vat = amount - net;
    return { net, vat, gross: amount };
  }
  const vat = amount * (rate / 100);
  return { net: amount, vat, gross: amount + vat };
}

export function salaryToHourly(
  annualSalary: number,
  hoursPerWeek: number = 40,
  weeksPerYear: number = 52
): number {
  return annualSalary / (hoursPerWeek * weeksPerYear);
}

export function hourlyToAnnual(
  hourlyRate: number,
  hoursPerWeek: number = 40,
  weeksPerYear: number = 52
): number {
  return hourlyRate * hoursPerWeek * weeksPerYear;
}

export function dayRateToAnnual(
  dayRate: number,
  daysPerWeek: number = 5,
  weeksPerYear: number = 48
): number {
  return dayRate * daysPerWeek * weeksPerYear;
}

export function annualToDayRate(
  annualSalary: number,
  daysPerWeek: number = 5,
  weeksPerYear: number = 48
): number {
  return annualSalary / (daysPerWeek * weeksPerYear);
}

export function calculateFreelanceRate(
  desiredAnnualIncome: number,
  billableHoursPerWeek: number = 30,
  weeksPerYear: number = 48,
  overheadPercent: number = 20
): { hourlyRate: number; dayRate: number; monthlyRevenue: number } {
  const totalNeeded = desiredAnnualIncome * (1 + overheadPercent / 100);
  const hourlyRate = totalNeeded / (billableHoursPerWeek * weeksPerYear);
  const dayRate = hourlyRate * 8;
  const monthlyRevenue = totalNeeded / 12;
  return { hourlyRate, dayRate, monthlyRevenue };
}

export function calculateSalesTax(
  amount: number,
  stateRate: number,
  localRate: number = 0
): { subtotal: number; stateTax: number; localTax: number; total: number } {
  const stateTax = amount * (stateRate / 100);
  const localTax = amount * (localRate / 100);
  return {
    subtotal: amount,
    stateTax,
    localTax,
    total: amount + stateTax + localTax,
  };
}
