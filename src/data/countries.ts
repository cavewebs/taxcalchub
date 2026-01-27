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
  /** Income tax brackets in local currency */
  taxBrackets: TaxBracket[];
}

export const countries: Country[] = [
  {
    // 2026 US federal tax brackets (single filer) — standard deduction $16,100
    // FICA: Social Security 6.2% on first $176,100 + Medicare 1.45% uncapped
    // + Additional Medicare 0.9% above $200,000
    slug: "us",
    name: "United States",
    currency: "USD",
    currencySymbol: "$",
    personalAllowance: 16100,
    socialSecurityLabel: "FICA (Social Security & Medicare)",
    socialSecurityBrackets: [
      { min: 0, max: 176100, rate: 0.0765 },
      { min: 176100, max: 200000, rate: 0.0145 },
      { min: 200000, max: null, rate: 0.0235 },
    ],
    taxBrackets: [
      { min: 0, max: 12400, rate: 0.10 },
      { min: 12400, max: 50400, rate: 0.12 },
      { min: 50400, max: 105700, rate: 0.22 },
      { min: 105700, max: 201775, rate: 0.24 },
      { min: 201775, max: 256225, rate: 0.32 },
      { min: 256225, max: 640600, rate: 0.35 },
      { min: 640600, max: null, rate: 0.37 },
    ],
  },
  {
    // 2025-26 UK — personal allowance £12,570 (frozen until 2028)
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
      { min: 37700, max: 125140, rate: 0.40 },
      { min: 125140, max: null, rate: 0.45 },
    ],
  },
  {
    // 2026 Canada federal — lowest rate 14%, BPA $16,452
    // CPP1: 5.95% on earnings $3,500–$74,600
    // CPP2: 4.00% on earnings $74,600–$85,000
    // EI: 1.63% on earnings $0–$68,900
    // Simplified into combined brackets
    slug: "canada",
    name: "Canada",
    currency: "CAD",
    currencySymbol: "$",
    personalAllowance: 16452,
    socialSecurityLabel: "CPP & EI Contributions",
    socialSecurityBrackets: [
      { min: 0, max: 3500, rate: 0.0163 },
      { min: 3500, max: 68900, rate: 0.0758 },
      { min: 68900, max: 74600, rate: 0.0595 },
      { min: 74600, max: 85000, rate: 0.04 },
    ],
    taxBrackets: [
      { min: 0, max: 58523, rate: 0.14 },
      { min: 58523, max: 117045, rate: 0.205 },
      { min: 117045, max: 181440, rate: 0.26 },
      { min: 181440, max: 258482, rate: 0.29 },
      { min: 258482, max: null, rate: 0.33 },
    ],
  },
  {
    // 2025-26 Australia — Stage 3 tax cuts, tax-free threshold $18,200
    // Medicare levy 2% on all income (low-income exemption ignored for simplicity)
    slug: "australia",
    name: "Australia",
    currency: "AUD",
    currencySymbol: "$",
    personalAllowance: 18200,
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
    // 2026 Germany — Grundfreibetrag €12,348
    // Employee social insurance: health 7.3% + avg supplement 1.45% +
    //   pension 9.3% + unemployment 1.3% + care 1.7% (with child) = ~21.05%
    // Capped at Beitragsbemessungsgrenze: health/care €69,750, pension €101,400
    slug: "germany",
    name: "Germany",
    currency: "EUR",
    currencySymbol: "\u20AC",
    personalAllowance: 12348,
    socialSecurityLabel: "Sozialversicherung (Social Insurance)",
    socialSecurityBrackets: [
      { min: 0, max: 69750, rate: 0.2105 },
      { min: 69750, max: 101400, rate: 0.106 },
    ],
    taxBrackets: [
      { min: 0, max: 12348, rate: 0.0 },
      { min: 12348, max: 17799, rate: 0.14 },
      { min: 17799, max: 69878, rate: 0.2397 },
      { min: 69878, max: 277825, rate: 0.42 },
      { min: 277825, max: null, rate: 0.45 },
    ],
  },
  {
    // 2025/2026 France — barème for 2025 income (declared 2026)
    // Employee contributions: CSG 9.2% + CRDS 0.5% (on 98.25% of gross) +
    //   old-age 6.9% capped + 0.4% uncapped + pension ~4.01% capped
    // Simplified: ~22% up to annual ceiling €48,060, ~10.5% above
    slug: "france",
    name: "France",
    currency: "EUR",
    currencySymbol: "\u20AC",
    personalAllowance: 11497,
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
    // 2025/2026 Ireland — standard rate band €44,000 (single)
    // Personal tax credit €2,000 + PAYE credit €2,000 = effective allowance ~€18,750
    // PRSI: 4.2% on all earnings above €352/week (≈€18,304/year)
    // USC: 0.5% up to €12,012, 2% to €28,700, 3% to €70,044, 8% above
    slug: "ireland",
    name: "Ireland",
    currency: "EUR",
    currencySymbol: "\u20AC",
    personalAllowance: 18750,
    socialSecurityLabel: "PRSI & USC",
    socialSecurityBrackets: [
      { min: 0, max: 12012, rate: 0.005 },
      { min: 12012, max: 18304, rate: 0.02 },
      { min: 18304, max: 28700, rate: 0.062 },
      { min: 28700, max: 70044, rate: 0.072 },
      { min: 70044, max: null, rate: 0.122 },
    ],
    taxBrackets: [
      { min: 0, max: 44000, rate: 0.20 },
      { min: 44000, max: null, rate: 0.40 },
    ],
  },
  {
    // 2026 Netherlands Box 1 — combined income tax + social insurance in brackets
    // Social insurance (27.65%) is baked into the first bracket rate
    // No separate personal allowance (tax credits applied instead)
    // Since SS is included in the tax brackets, SS brackets are zero
    slug: "netherlands",
    name: "Netherlands",
    currency: "EUR",
    currencySymbol: "\u20AC",
    personalAllowance: 0,
    socialSecurityLabel: "Sociale Verzekeringen (Social Insurance)",
    socialSecurityBrackets: [],
    taxBrackets: [
      { min: 0, max: 38883, rate: 0.3575 },
      { min: 38883, max: 78426, rate: 0.3756 },
      { min: 78426, max: null, rate: 0.495 },
    ],
  },
  {
    // 2025/2026 Spain — IRPF national brackets unchanged
    // Personal allowance €5,550
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
    // 2026 Italy — IRPEF 3 brackets, 2nd bracket reduced 35% -> 33%
    // No-tax area for employees ≈ €8,500
    // INPS employee: 9.19% up to €55,448, 10.19% above (up to €120,607)
    slug: "italy",
    name: "Italy",
    currency: "EUR",
    currencySymbol: "\u20AC",
    personalAllowance: 8500,
    socialSecurityLabel: "INPS (Contributi Previdenziali)",
    socialSecurityBrackets: [
      { min: 0, max: 55448, rate: 0.0919 },
      { min: 55448, max: 120607, rate: 0.1019 },
    ],
    taxBrackets: [
      { min: 0, max: 28000, rate: 0.23 },
      { min: 28000, max: 50000, rate: 0.33 },
      { min: 50000, max: null, rate: 0.43 },
    ],
  },
  {
    // FY 2025-26 India new tax regime — basic exemption ₹4,00,000
    // Standard deduction ₹75,000 built into personalAllowance
    // EPF: 12% on basic salary (simplified as 12% up to ₹15,000/month = ₹180,000/year cap)
    slug: "india",
    name: "India",
    currency: "INR",
    currencySymbol: "\u20B9",
    personalAllowance: 475000,
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
    // 2025/2026 Singapore — YA 2026 rates unchanged
    // CPF employee 20% on OW up to $8,000/month ($96,000/year)
    // Total annual cap $102,000 including AW
    slug: "singapore",
    name: "Singapore",
    currency: "SGD",
    currencySymbol: "$",
    personalAllowance: 20000,
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
