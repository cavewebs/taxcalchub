export interface FreelanceRole {
  slug: string;
  name: string;
  /** Average hourly rate in USD */
  avgHourlyRate: number;
  /** Average day rate in USD (based on 8-hour day) */
  avgDayRate: number;
  /** Short description of the role */
  description: string;
}

export const freelanceRoles: FreelanceRole[] = [
  {
    slug: "web-developer",
    name: "Web Developer",
    avgHourlyRate: 75,
    avgDayRate: 600,
    description:
      "Builds and maintains websites and web applications using modern frameworks and technologies.",
  },
  {
    slug: "graphic-designer",
    name: "Graphic Designer",
    avgHourlyRate: 55,
    avgDayRate: 440,
    description:
      "Creates visual content including logos, branding, marketing materials, and digital assets.",
  },
  {
    slug: "copywriter",
    name: "Copywriter",
    avgHourlyRate: 50,
    avgDayRate: 400,
    description:
      "Writes compelling marketing copy, blog posts, website content, and advertising materials.",
  },
  {
    slug: "data-analyst",
    name: "Data Analyst",
    avgHourlyRate: 65,
    avgDayRate: 520,
    description:
      "Analyzes datasets to extract insights, build reports, and support data-driven decision making.",
  },
  {
    slug: "project-manager",
    name: "Project Manager",
    avgHourlyRate: 70,
    avgDayRate: 560,
    description:
      "Plans, coordinates, and oversees projects to ensure they are delivered on time and within budget.",
  },
  {
    slug: "ux-designer",
    name: "UX Designer",
    avgHourlyRate: 75,
    avgDayRate: 600,
    description:
      "Designs user experiences through research, wireframing, prototyping, and usability testing.",
  },
  {
    slug: "mobile-developer",
    name: "Mobile Developer",
    avgHourlyRate: 85,
    avgDayRate: 680,
    description:
      "Develops native and cross-platform mobile applications for iOS and Android devices.",
  },
  {
    slug: "devops-engineer",
    name: "DevOps Engineer",
    avgHourlyRate: 95,
    avgDayRate: 760,
    description:
      "Manages cloud infrastructure, CI/CD pipelines, and deployment automation for software teams.",
  },
  {
    slug: "marketing-consultant",
    name: "Marketing Consultant",
    avgHourlyRate: 65,
    avgDayRate: 520,
    description:
      "Develops and executes marketing strategies including digital campaigns, brand positioning, and market analysis.",
  },
  {
    slug: "accountant",
    name: "Accountant",
    avgHourlyRate: 55,
    avgDayRate: 440,
    description:
      "Provides bookkeeping, tax preparation, financial reporting, and advisory services for businesses.",
  },
  {
    slug: "video-editor",
    name: "Video Editor",
    avgHourlyRate: 50,
    avgDayRate: 400,
    description:
      "Edits and produces video content for marketing, social media, corporate communications, and entertainment.",
  },
  {
    slug: "photographer",
    name: "Photographer",
    avgHourlyRate: 60,
    avgDayRate: 480,
    description:
      "Captures and edits professional photography for events, products, portraits, and commercial use.",
  },
  {
    slug: "seo-specialist",
    name: "SEO Specialist",
    avgHourlyRate: 60,
    avgDayRate: 480,
    description:
      "Optimizes websites for search engine rankings through technical SEO, content strategy, and link building.",
  },
  {
    slug: "business-analyst",
    name: "Business Analyst",
    avgHourlyRate: 70,
    avgDayRate: 560,
    description:
      "Bridges the gap between business needs and technology solutions through requirements gathering and process analysis.",
  },
  {
    slug: "software-architect",
    name: "Software Architect",
    avgHourlyRate: 120,
    avgDayRate: 960,
    description:
      "Designs high-level software structures, selects technologies, and defines architectural patterns for complex systems.",
  },
];
