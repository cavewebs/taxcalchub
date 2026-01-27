export interface TaxBracket {
  /** Minimum income for this bracket (inclusive) */
  min: number;
  /** Maximum income for this bracket (inclusive), null for the top bracket */
  max: number | null;
  /** Marginal tax rate as a decimal (e.g. 0.20 = 20%) */
  rate: number;
}

export interface Country {
  slug: string;
  name: string;
  currency: string;
  currencySymbol: string;
  /** Personal allowance / tax-free threshold in local currency */
  personalAllowance: number;
  /** Country-specific label for the social security deduction */
  socialSecurityLabel: string;
  /** Social security brackets — same structure as income tax brackets */
  socialSecurityBrackets: TaxBracket[];
  /** Income tax brackets applied to TAXABLE income (after personalAllowance) */
  taxBrackets: TaxBracket[];
}

export const countries: Country[] = [
  {
    // 2025 US federal tax brackets (single filer)
    // Standard deduction $15,750 (OBBB Act, signed July 2025)
    // FICA: Social Security 6.2% on first $176,100 + Medicare 1.45% uncapped
    // + Additional Medicare 0.9% above $200,000
    // Brackets are on TAXABLE income (after standard deduction)
    slug: "us",
    name: "United States",
    currency: "USD",
    currencySymbol: "$",
    personalAllowance: 15750,
    socialSecurityLabel: "FICA (Social Security & Medicare)",
    socialSecurityBrackets: [
      { min: 0, max: 176100, rate: 0.0765 },
      { min: 176100, max: 200000, rate: 0.0145 },
      { min: 200000, max: null, rate: 0.0235 },
    ],
    taxBrackets: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 626350, rate: 0.35 },
      { min: 626350, max: null, rate: 0.37 },
    ],
  },
  {
    // 2025-26 UK — personal allowance £12,570 (frozen until 2028)
    // Source: gov.uk/income-tax-rates
    // Bands on total income: PA up to £12,570, Basic £12,571-£50,270,
    //   Higher £50,271-£125,140, Additional over £125,140
    // Brackets here are on TAXABLE income (after PA):
    //   Basic: 0-37,700 (= 50,270 - 12,570)
    //   Higher: 37,700-112,570 (= 125,140 - 12,570)
    //   Additional: over 112,570
    // NI: 8% between PT (£12,570) and UEL (£50,270), 2% above UEL
    slug: "uk",
    name: "United Kingdom",
    currency: "GBP",
    currencySymbol: "\u00A3",
    personalAllowance: 12570,
    socialSecurityLabel: "National Insurance",
    socialSecurityBrackets: [
      { min: 0, max: 12570, rate: 0.0 },
      { min: 12570, max: 50270, rate: 0.08 },
      { min: 50270, max: null, rate: 0.02 },
    ],
    taxBrackets: [
      { min: 0, max: 37700, rate: 0.20 },
      { min: 37700, max: 112570, rate: 0.40 },
      { min: 112570, max: null, rate: 0.45 },
    ],
  },
  {
    // 2025 Canada federal — BPA $16,129 (indexed for 2025)
    // Source: canada.ca/en/revenue-agency
    // Effective 2025 lowest rate: 14.5% (14% from July 1, blended)
    // Brackets are on TAXABLE income (after BPA)
    // CPP1: 5.95% on earnings $3,500–$71,300 (2025)
    // CPP2: 4.00% on earnings $71,300–$81,200
    // EI: 1.64% on earnings $0–$65,700
    slug: "canada",
    name: "Canada",
    currency: "CAD",
    currencySymbol: "$",
    personalAllowance: 16129,
    socialSecurityLabel: "CPP & EI Contributions",
    socialSecurityBrackets: [
      { min: 0, max: 3500, rate: 0.0164 },
      { min: 3500, max: 65700, rate: 0.0759 },
      { min: 65700, max: 71300, rate: 0.0595 },
      { min: 71300, max: 81200, rate: 0.04 },
    ],
    taxBrackets: [
      { min: 0, max: 57375, rate: 0.145 },
      { min: 57375, max: 114750, rate: 0.205 },
      { min: 114750, max: 177882, rate: 0.26 },
      { min: 177882, max: 253414, rate: 0.29 },
      { min: 253414, max: null, rate: 0.33 },
    ],
  },
  {
    // 2024-25 / 2025-26 Australia — Stage 3 tax cuts
    // Source: ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents
    // Brackets are on TOTAL income (0% band acts as tax-free threshold)
    // personalAllowance = 0 because the 0% bracket handles the tax-free threshold
    // Medicare levy 2% on all income (low-income exemption ignored for simplicity)
    slug: "australia",
    name: "Australia",
    currency: "AUD",
    currencySymbol: "$",
    personalAllowance: 0,
    socialSecurityLabel: "Medicare Levy",
    socialSecurityBrackets: [
      { min: 0, max: null, rate: 0.02 },
    ],
    taxBrackets: [
      { min: 0, max: 18200, rate: 0.0 },
      { min: 18200, max: 45000, rate: 0.16 },
      { min: 45000, max: 135000, rate: 0.30 },
      { min: 135000, max: 190000, rate: 0.37 },
      { min: 190000, max: null, rate: 0.45 },
    ],
  },
  {
    // 2025 Germany — Grundfreibetrag €12,096
    // Source: taxsummaries.pwc.com/germany
    // Germany uses a progressive formula (not flat steps) in zones 2 & 3.
    // Simplified to average marginal rates per zone.
    // Brackets are on TOTAL income (0% band acts as Grundfreibetrag)
    // personalAllowance = 0 because the 0% bracket handles the tax-free threshold
    // Employee social insurance: health ~8.75% + pension 9.3% + unemployment 1.3%
    //   + care 1.7% = ~21.05%. Capped at BBG: health/care €69,300, pension €96,600
    slug: "germany",
    name: "Germany",
    currency: "EUR",
    currencySymbol: "\u20AC",
    personalAllowance: 0,
    socialSecurityLabel: "Sozialversicherung (Social Insurance)",
    socialSecurityBrackets: [
      { min: 0, max: 69300, rate: 0.2105 },
      { min: 69300, max: 96600, rate: 0.106 },
    ],
    taxBrackets: [
      { min: 0, max: 12096, rate: 0.0 },
      { min: 12096, max: 17005, rate: 0.14 },
      { min: 17005, max: 68480, rate: 0.2397 },
      { min: 68480, max: 277825, rate: 0.42 },
      { min: 277825, max: null, rate: 0.45 },
    ],
  },
  {
    // 2025 France — barème for 2024 income (declared 2025)
    // Source: service-public.gouv.fr
    // Brackets are per part of quotient familial, on TOTAL income
    // personalAllowance = 0 because the 0% bracket handles the threshold
    // Employee contributions: CSG 9.2% + CRDS 0.5% (on 98.25% of gross) +
    //   old-age 6.9% capped + 0.4% uncapped + pension ~4.01% capped
    // Simplified: ~22% up to annual ceiling €48,060, ~10.5% above
    slug: "france",
    name: "France",
    currency: "EUR",
    currencySymbol: "\u20AC",
    personalAllowance: 0,
    socialSecurityLabel: "Cotisations Sociales (Social Contributions)",
    socialSecurityBrackets: [
      { min: 0, max: 48060, rate: 0.22 },
      { min: 48060, max: null, rate: 0.105 },
    ],
    taxBrackets: [
      { min: 0, max: 11497, rate: 0.0 },
      { min: 11497, max: 29315, rate: 0.11 },
      { min: 29315, max: 83823, rate: 0.30 },
      { min: 83823, max: 180294, rate: 0.41 },
      { min: 180294, max: null, rate: 0.45 },
    ],
  },
  {
    // 2025 Ireland — standard rate band €44,000 (single)
    // Source: revenue.ie
    // Personal tax credit €2,000 + PAYE credit €2,000 = effective allowance ~€20,000
    // Brackets are on TOTAL income, credits reduce the tax owed
    // personalAllowance approximated from combined credits
    // PRSI: 4.2% on all earnings above €352/week (≈€18,304/year)
    // USC 2025: 0.5% up to €12,012, 2% to €27,382, 3% to €70,044, 8% above
    slug: "ireland",
    name: "Ireland",
    currency: "EUR",
    currencySymbol: "\u20AC",
    personalAllowance: 20000,
    socialSecurityLabel: "PRSI & USC",
    socialSecurityBrackets: [
      { min: 0, max: 12012, rate: 0.005 },
      { min: 12012, max: 18304, rate: 0.02 },
      { min: 18304, max: 27382, rate: 0.062 },
      { min: 27382, max: 70044, rate: 0.072 },
      { min: 70044, max: null, rate: 0.122 },
    ],
    taxBrackets: [
      { min: 0, max: 44000, rate: 0.20 },
      { min: 44000, max: null, rate: 0.40 },
    ],
  },
  {
    // 2025 Netherlands Box 1 — combined income tax + social insurance in brackets
    // Source: belastingdienst.nl
    // Social insurance (27.65%) is baked into the first bracket rate
    // No separate personal allowance (tax credits applied instead)
    // Since SS is included in the tax brackets, SS brackets are empty
    slug: "netherlands",
    name: "Netherlands",
    currency: "EUR",
    currencySymbol: "\u20AC",
    personalAllowance: 0,
    socialSecurityLabel: "Sociale Verzekeringen (Social Insurance)",
    socialSecurityBrackets: [],
    taxBrackets: [
      { min: 0, max: 38441, rate: 0.3582 },
      { min: 38441, max: 76817, rate: 0.3748 },
      { min: 76817, max: null, rate: 0.495 },
    ],
  },
  {
    // 2025 Spain — IRPF national brackets
    // Source: taxsummaries.pwc.com/spain
    // Personal minimum allowance €5,550
    // Brackets are on TAXABLE income (after personal minimum)
    // Employee SS: 6.48% on earnings up to max base €4,909.50/month (€58,914/year)
    slug: "spain",
    name: "Spain",
    currency: "EUR",
    currencySymbol: "\u20AC",
    personalAllowance: 5550,
    socialSecurityLabel: "Seguridad Social (Social Security)",
    socialSecurityBrackets: [
      { min: 0, max: 58914, rate: 0.0648 },
    ],
    taxBrackets: [
      { min: 0, max: 12450, rate: 0.19 },
      { min: 12450, max: 20200, rate: 0.24 },
      { min: 20200, max: 35200, rate: 0.30 },
      { min: 35200, max: 60000, rate: 0.37 },
      { min: 60000, max: 300000, rate: 0.45 },
      { min: 300000, max: null, rate: 0.47 },
    ],
  },
  {
    // 2025 Italy — IRPEF 3 brackets (structural from 2024 Budget Law)
    // Source: taxsummaries.pwc.com/italy
    // No-tax area for employees handled via credits, not a direct PA
    // Brackets are on TOTAL income
    // personalAllowance = 0 (credits handle the no-tax area)
    // INPS employee: 9.19% up to €55,448, 10.19% above (up to €120,607)
    slug: "italy",
    name: "Italy",
    currency: "EUR",
    currencySymbol: "\u20AC",
    personalAllowance: 0,
    socialSecurityLabel: "INPS (Contributi Previdenziali)",
    socialSecurityBrackets: [
      { min: 0, max: 55448, rate: 0.0919 },
      { min: 55448, max: 120607, rate: 0.1019 },
    ],
    taxBrackets: [
      { min: 0, max: 28000, rate: 0.23 },
      { min: 28000, max: 50000, rate: 0.35 },
      { min: 50000, max: null, rate: 0.43 },
    ],
  },
  {
    // FY 2025-26 India new tax regime
    // Source: incometax.gov.in
    // Basic exemption ₹4,00,000 is built into the 0% slab
    // Standard deduction ₹75,000 for salaried — modeled as personalAllowance
    // Brackets are on TOTAL income (0% band handles basic exemption)
    // EPF: 12% on basic salary (simplified as 12% up to ₹15,000/month = ₹180,000/year cap)
    slug: "india",
    name: "India",
    currency: "INR",
    currencySymbol: "\u20B9",
    personalAllowance: 75000,
    socialSecurityLabel: "EPF (Employee Provident Fund)",
    socialSecurityBrackets: [
      { min: 0, max: 180000, rate: 0.12 },
    ],
    taxBrackets: [
      { min: 0, max: 400000, rate: 0.0 },
      { min: 400000, max: 800000, rate: 0.05 },
      { min: 800000, max: 1200000, rate: 0.10 },
      { min: 1200000, max: 1600000, rate: 0.15 },
      { min: 1600000, max: 2000000, rate: 0.20 },
      { min: 2000000, max: 2400000, rate: 0.25 },
      { min: 2400000, max: null, rate: 0.30 },
    ],
  },
  {
    // 2025/2026 Singapore — YA 2025/2026 rates (from YA 2024 onwards)
    // Source: iras.gov.sg
    // Brackets are on chargeable income (after reliefs/deductions)
    // The 0% band up to $20,000 acts as the tax-free threshold
    // personalAllowance = 0 because the 0% bracket handles the threshold
    // CPF employee 20% on OW up to $6,800/month ($81,600/year)
    // Total annual cap $102,000 including AW
    slug: "singapore",
    name: "Singapore",
    currency: "SGD",
    currencySymbol: "$",
    personalAllowance: 0,
    socialSecurityLabel: "CPF (Central Provident Fund)",
    socialSecurityBrackets: [
      { min: 0, max: 102000, rate: 0.20 },
    ],
    taxBrackets: [
      { min: 0, max: 20000, rate: 0.0 },
      { min: 20000, max: 30000, rate: 0.02 },
      { min: 30000, max: 40000, rate: 0.035 },
      { min: 40000, max: 80000, rate: 0.07 },
      { min: 80000, max: 120000, rate: 0.115 },
      { min: 120000, max: 160000, rate: 0.15 },
      { min: 160000, max: 200000, rate: 0.18 },
      { min: 200000, max: 240000, rate: 0.19 },
      { min: 240000, max: 280000, rate: 0.195 },
      { min: 280000, max: 320000, rate: 0.20 },
      { min: 320000, max: 500000, rate: 0.22 },
      { min: 500000, max: 1000000, rate: 0.23 },
      { min: 1000000, max: null, rate: 0.24 },
    ],
  },
];
