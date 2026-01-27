import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CalculatorCard from "@/components/CalculatorCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import FAQSection from "@/components/FAQSection";
import SiloLinks from "@/components/SiloLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import FreelanceRateCalculator from "@/components/calculators/FreelanceRateCalculator";
import { freelanceRoles } from "@/data/freelance-roles";
import { formatCurrency } from "@/lib/formatting";

interface RolePageProps {
  params: Promise<{ role: string }>;
}

export function generateStaticParams() {
  return freelanceRoles.map((role) => ({
    role: role.slug,
  }));
}

export async function generateMetadata({ params }: RolePageProps): Promise<Metadata> {
  const { role: roleSlug } = await params;
  const role = freelanceRoles.find((r) => r.slug === roleSlug);
  if (!role) {
    return { title: "Role Not Found" };
  }

  return {
    title: `${role.name} Freelance Rate – Average Rates & Calculator`,
    description: `Discover average freelance rates for ${role.name} professionals. Use our calculator to find your ideal ${role.name} hourly and day rate based on your income goals.`,
  };
}

export default async function RolePage({ params }: RolePageProps) {
  const { role: roleSlug } = await params;
  const role = freelanceRoles.find((r) => r.slug === roleSlug);

  if (!role) {
    notFound();
  }

  const otherRoles = freelanceRoles.filter((r) => r.slug !== roleSlug);
  const estimatedAnnual = role.avgHourlyRate * 30 * 48;

  const faqs = [
    {
      question: `What is the average hourly rate for a freelance ${role.name}?`,
      answer: `The average freelance ${role.name} charges around ${formatCurrency(role.avgHourlyRate)} per hour. Rates vary based on experience, location, specialization, and project complexity. Junior professionals may charge less while highly experienced specialists can charge significantly more.`,
    },
    {
      question: `What day rate should a ${role.name} charge?`,
      answer: `A typical day rate for a freelance ${role.name} is around ${formatCurrency(role.avgDayRate)} for an 8-hour day. Day rates are common for on-site work and longer engagements. Your actual rate should reflect your experience level, the value you deliver, and local market conditions.`,
    },
    {
      question: `How much can a freelance ${role.name} earn per year?`,
      answer: `A freelance ${role.name} charging ${formatCurrency(role.avgHourlyRate)} per hour and billing 30 hours per week for 48 weeks can expect annual revenue of approximately ${formatCurrency(estimatedAnnual, "$", 0)}. Actual earnings depend on utilization rate, overhead costs, and the ability to maintain a consistent pipeline of client work.`,
    },
    {
      question: `How do I increase my rates as a ${role.name}?`,
      answer: `Build a strong portfolio showcasing measurable results, develop a specialization or niche expertise, collect testimonials from satisfied clients, and invest in skills that are in high demand. Raising rates gradually with new clients while honoring existing agreements is a sustainable approach. Many freelancers increase rates by 10 to 15 percent annually as they gain experience.`,
    },
  ];

  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Freelance", href: "/freelance" },
            { label: "Freelance Rates", href: "/freelance" },
            { label: role.name },
          ]}
        />

        <h1 className="text-3xl font-bold text-foreground mb-4">
          {role.name} Freelance Rates
        </h1>
        <p className="text-lg text-muted-foreground mb-8">{role.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-3">
          <div className="rounded-xl border border-card-border bg-card p-5 text-center">
            <p className="text-sm text-muted-foreground mb-1">Avg Hourly Rate</p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(role.avgHourlyRate)}
            </p>
          </div>
          <div className="rounded-xl border border-card-border bg-card p-5 text-center">
            <p className="text-sm text-muted-foreground mb-1">Avg Day Rate</p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(role.avgDayRate)}
            </p>
          </div>
          <div className="rounded-xl border border-card-border bg-card p-5 text-center col-span-2 sm:col-span-1">
            <p className="text-sm text-muted-foreground mb-1">Est. Annual Revenue</p>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(estimatedAnnual, "$", 0)}
            </p>
          </div>
        </div>

        <CalculatorCard>
          <FreelanceRateCalculator
            defaultAnnualIncome={Math.round(estimatedAnnual * 0.8)}
          />
        </CalculatorCard>

        <AdPlaceholder slot="below-calculator" className="mt-8" />

        <article className="prose mt-8 max-w-none">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Setting Your {role.name} Freelance Rate
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            As a freelance {role.name}, your rate should reflect both the
            market average and the unique value you bring to clients. The
            average hourly rate of {formatCurrency(role.avgHourlyRate)} serves
            as a useful benchmark, but your actual rate may be higher or lower
            depending on factors like geographic location, years of experience,
            industry specialization, and the complexity of the projects you
            take on.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When pricing your services, consider the full picture of your
            costs. Beyond your desired take-home pay, account for
            self-employment taxes, health insurance, retirement savings,
            software and tools, professional development, and time spent on
            non-billable activities like marketing and administration. These
            overhead costs typically add 20 to 30 percent to the income you
            need to generate.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Use the calculator above to experiment with different scenarios.
            Adjusting the billable hours, weeks per year, and overhead
            percentage helps you understand how each variable affects your
            required rate. This data-driven approach takes the guesswork out
            of pricing and ensures your freelance business is financially
            sustainable.
          </p>
        </article>

        <AdPlaceholder slot="mid-content" className="mt-8" />

        <FAQSection faqs={faqs} />

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Explore Other Freelance Roles
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otherRoles.map((r) => (
              <Link
                key={r.slug}
                href={`/freelance/freelance-rate/${r.slug}`}
                className="flex items-center justify-between rounded-lg border border-card-border bg-card px-4 py-3 hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">{r.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(r.avgHourlyRate)}/hr
                </span>
              </Link>
            ))}
          </div>
        </section>

        <SiloLinks silo="freelance" currentPath={`/freelance/freelance-rate/${roleSlug}`} />
      </main>
      <SiteFooter />
    </>
  );
}
