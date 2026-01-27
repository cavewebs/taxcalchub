import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://taxcalcbase.com";

// Import data for dynamic routes - these will be resolved at build time
// We hardcode the slugs here to avoid import issues in sitemap generation
const countrySlugs = [
  "us",
  "uk",
  "canada",
  "australia",
  "germany",
  "france",
  "ireland",
  "netherlands",
  "spain",
  "italy",
  "india",
  "singapore",
];

const vatCountrySlugs = [
  "uk",
  "germany",
  "france",
  "italy",
  "spain",
  "netherlands",
  "belgium",
  "austria",
  "portugal",
  "ireland",
  "sweden",
  "denmark",
  "norway",
  "finland",
  "poland",
  "switzerland",
  "canada",
  "australia",
  "new-zealand",
  "japan",
  "south-korea",
  "india",
  "singapore",
  "south-africa",
  "brazil",
  "mexico",
];

const usStateSlugs = [
  "alabama", "alaska", "arizona", "arkansas", "california",
  "colorado", "connecticut", "delaware", "florida", "georgia",
  "hawaii", "idaho", "illinois", "indiana", "iowa",
  "kansas", "kentucky", "louisiana", "maine", "maryland",
  "massachusetts", "michigan", "minnesota", "mississippi", "missouri",
  "montana", "nebraska", "nevada", "new-hampshire", "new-jersey",
  "new-mexico", "new-york", "north-carolina", "north-dakota", "ohio",
  "oklahoma", "oregon", "pennsylvania", "rhode-island", "south-carolina",
  "south-dakota", "tennessee", "texas", "utah", "vermont",
  "virginia", "washington", "west-virginia", "wisconsin", "wyoming",
];

const freelanceRoleSlugs = [
  "web-developer",
  "graphic-designer",
  "copywriter",
  "data-analyst",
  "project-manager",
  "ux-designer",
  "mobile-developer",
  "devops-engineer",
  "marketing-consultant",
  "accountant",
  "video-editor",
  "photographer",
  "seo-specialist",
  "business-analyst",
  "software-architect",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/salary`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/salary/salary-after-tax`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/salary/take-home-pay`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/salary/salary-to-hourly`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/tax`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tax/vat-calculator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/tax/vat-rates`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/tax/sales-tax`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/freelance`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/freelance/freelance-rate-calculator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/freelance/day-rate-to-salary`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/freelance/hourly-to-annual`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const countryPages: MetadataRoute.Sitemap = countrySlugs.map((slug) => ({
    url: `${BASE_URL}/salary/salary-after-tax/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const vatCountryPages: MetadataRoute.Sitemap = vatCountrySlugs.map((slug) => ({
    url: `${BASE_URL}/tax/vat-rates/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const statePages: MetadataRoute.Sitemap = usStateSlugs.map((slug) => ({
    url: `${BASE_URL}/tax/sales-tax/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const rolePages: MetadataRoute.Sitemap = freelanceRoleSlugs.map((slug) => ({
    url: `${BASE_URL}/freelance/freelance-rate/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...countryPages,
    ...vatCountryPages,
    ...statePages,
    ...rolePages,
  ];
}
