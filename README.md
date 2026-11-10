# TaxCalcHub

TaxCalcHub is a static Next.js site of salary, VAT, sales-tax, and freelance calculators. The running app currently brands itself as TaxCalcBase. Calculations run in the browser. There is no login and no backend API.

The numbers in this repo are estimates. Several country models are simplified (see comments in `src/data/countries.ts`). Check rates against official sources before you rely on them. This is not tax, financial, or legal advice.

## Calculators

### Salary (`/salary`)

- **Salary after tax** (`/salary/salary-after-tax`, plus `/salary/salary-after-tax/[country]`). Net pay after income tax and social-security style deductions for a chosen country.
- **Take-home pay** (`/salary/take-home-pay`). The same tax model, split into weekly, bi-weekly, and monthly amounts.
- **Salary to hourly** (`/salary/salary-to-hourly`). Annual salary to hourly, daily, weekly, and monthly figures. Defaults: 40 hours/week, 52 weeks/year.

Countries in `src/data/countries.ts`:

| Country | What the data models |
| --- | --- |
| United States | 2025 federal brackets, single filer. No state income tax. |
| United Kingdom | 2025-26 income tax and National Insurance. |
| Canada | 2025 federal tax, CPP, and EI. No provincial tax. |
| Australia | 2024-25 / 2025-26 Stage 3 brackets. Medicare levy at a flat 2%; low-income exemption omitted. |
| Germany | 2025. The real progressive formula is replaced with average marginal rates per zone. |
| France | 2025 barème. Social contributions are simplified. |
| Ireland | 2025. Personal allowance is approximated from tax credits. |
| Netherlands | 2025 Box 1. Social insurance is baked into the tax brackets. |
| Spain | 2025 national IRPF. No regional IRPF. |
| Italy | 2025 IRPEF and INPS bands. |
| India | FY 2025-26 new regime. |
| Singapore | YA 2025/2026. |

### Tax (`/tax`)

- **VAT calculator** (`/tax/vat-calculator`). Add VAT to a net amount or extract VAT from a gross amount, at a rate you type in.
- **VAT rates by country** (`/tax/vat-rates`, plus `/tax/vat-rates/[country]`). Lookup pages for standard and reduced rates.
- **US sales tax** (`/tax/sales-tax`, plus `/tax/sales-tax/[state]`). State rate plus an optional average local rate.

VAT/GST countries in `src/data/vat-rates.ts` (26): United Kingdom, Germany, France, Italy, Spain, Netherlands, Belgium, Austria, Portugal, Ireland, Sweden, Denmark, Norway, Finland, Poland, Switzerland, Canada (GST 5% only; no provincial HST/PST), Australia, New Zealand, Japan, South Korea, India, Singapore, South Africa, Brazil, Mexico.

US sales-tax coverage in `src/data/us-states.ts`: all 50 states plus the District of Columbia. The file cites Tax Foundation data for 1 January 2026. Local amounts are statewide averages, not city-specific rates.

### Freelance (`/freelance`)

- **Freelance rate** (`/freelance/freelance-rate-calculator`, plus `/freelance/freelance-rate/[role]`). Hourly and day rates from a target annual income, billable hours/week, weeks/year, and overhead percent. Defaults: 30 billable hours, 48 weeks, 20% overhead. Day rate assumes an 8-hour day.
- **Day rate to salary** (`/freelance/day-rate-to-salary`). Contractor day rate to annual, monthly, and weekly equivalents. Defaults: 5 days/week, 48 weeks/year.
- **Hourly to annual** (`/freelance/hourly-to-annual`). Hourly wage to annual, monthly, weekly, and daily figures. Daily uses an 8-hour day.

Role pages in `src/data/freelance-roles.ts` use hardcoded USD averages: Web Developer, Graphic Designer, Copywriter, Data Analyst, Project Manager, UX Designer, Mobile Developer, DevOps Engineer, Marketing Consultant, Accountant, Video Editor, Photographer, SEO Specialist, Business Analyst, Software Architect.

## Rate data

| File | Contents |
| --- | --- |
| `src/data/countries.ts` | Income-tax brackets, personal allowance, social-security brackets |
| `src/data/vat-rates.ts` | Standard and reduced VAT/GST rates |
| `src/data/us-states.ts` | State, average local, and combined sales-tax rates |
| `src/data/freelance-roles.ts` | Benchmark hourly and day rates by role |

Math lives in `src/lib/calculators.ts`.

Rates here are not official publications. Confirm them with the tax authority for the country or state before you use a result. Nothing in this project is tax advice.

## Install, run, and build

Needs Node.js 20.9 or newer (Next.js 16). This repo ships a `package-lock.json`, so npm is enough.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
```

`next.config.ts` sets `output: "export"`, so the production build writes a static site to `out/`. Serve that folder with any static file server:

```bash
npx --yes serve out
```

`npm start` (`next start`) is listed in `package.json` but is meant for a Next.js Node server, not a static export. Use `npm run dev` while developing, and `npm run build` plus a static server for the export.

```bash
npm run lint
```

## Project structure

```
src/app/                      Pages (App Router), sitemap, privacy, terms
src/components/               Header, footer, shared UI
src/components/calculators/   Client-side calculator forms
src/data/                     Rate tables
src/lib/                      Tax, VAT, sales-tax, and rate helpers
public/                       Static files (robots.txt)
```

`next.config.ts` also sets `trailingSlash: true` and `images.unoptimized: true` for the static export.

## Contributing

Issues and pull requests are welcome.

- Put rate updates in the matching file under `src/data/`. Include a source and tax year in a comment, the way existing entries do.
- Put calculation changes in `src/lib/calculators.ts` and the calculator component that uses them.
- Keep the models honest: if a country still uses a simplified bracket, say so in the comment rather than presenting it as a full tax engine.
- Run `npm run lint` and `npm run build` before you open a PR.

## License

MIT. Copyright (c) 2026 Timchosen Uzua. See [LICENSE](LICENSE).
