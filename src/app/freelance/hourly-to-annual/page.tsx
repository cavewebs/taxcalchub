import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CalculatorCard from "@/components/CalculatorCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import FAQSection from "@/components/FAQSection";
import SiloLinks from "@/components/SiloLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import HourlyToAnnualCalculator from "@/components/calculators/HourlyToAnnualCalculator";

export const metadata: Metadata = {
  title: "Hourly to Annual Salary Calculator – Convert Your Hourly Rate",
  description:
    "Convert an hourly wage to an annual salary with monthly, weekly, and daily breakdowns. Understand exactly what your hourly pay is worth over a full year.",
};

const faqs = [
  {
    question: "How do I convert an hourly rate to an annual salary?",
    answer:
      "Multiply your hourly rate by the number of hours you work per week, then multiply by the number of weeks you work per year. For example, $25 per hour times 40 hours per week times 52 weeks equals $52,000 per year. If you take unpaid time off, reduce the weeks accordingly.",
  },
  {
    question: "Should I use 52 or 50 weeks in the calculation?",
    answer:
      "Use 52 weeks if you receive paid time off or want to know the maximum possible annual earnings. Use 50 or 48 weeks if you are a freelancer or contractor who does not receive paid leave. The difference matters -- at $30 per hour and 40 hours per week, 52 weeks yields $62,400 while 48 weeks yields $57,600.",
  },
  {
    question: "Does this include overtime pay?",
    answer:
      "This calculator uses a flat hourly rate without overtime premiums. If you regularly work overtime at a higher rate (such as 1.5 times your base rate), you can run the calculator once with your base hours and once with your overtime hours at the premium rate, then add the results together.",
  },
  {
    question: "How does hourly pay compare to a salaried position?",
    answer:
      "Hourly workers are paid for every hour worked and typically receive overtime for hours beyond 40 per week. Salaried employees receive a fixed annual amount regardless of hours worked. Hourly positions offer predictable per-hour compensation, while salaried roles may include benefits like health insurance, paid leave, and retirement matching that increase total compensation beyond the base salary.",
  },
];

export default function HourlyToAnnualPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Freelance", href: "/freelance" },
            { label: "Hourly to Annual" },
          ]}
        />

        <h1 className="text-3xl font-bold text-foreground mb-6">
          Hourly to Annual Salary Calculator
        </h1>

        <CalculatorCard>
          <HourlyToAnnualCalculator />
        </CalculatorCard>

        <AdPlaceholder slot="below-calculator" className="mt-8" />

        <article className="prose mt-8 max-w-none">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Understanding Hourly vs. Annual Pay
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Knowing the annual equivalent of your hourly rate is essential for
            budgeting, comparing job offers, and evaluating your earning
            potential. While an hourly rate tells you what you earn for each
            hour of work, an annual figure reveals the bigger picture of your
            financial position over a full year.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The conversion is straightforward in principle: multiply your
            hourly rate by the number of hours you work each week, then by the
            number of weeks you work per year. However, the assumptions you
            choose for weekly hours and annual weeks have a significant impact
            on the result. A standard full-time schedule of 40 hours over 52
            weeks gives the maximum annual figure, but few workers actually
            work every single week.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For employed workers with paid time off, 52 weeks is appropriate
            because you receive your hourly rate even during vacation. For
            freelancers, contractors, or hourly workers without paid leave,
            reducing the weeks to 48 or 50 gives a more accurate picture of
            actual annual earnings. Similarly, if your weekly hours fluctuate,
            use your average rather than your maximum.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Beyond the raw math, consider how benefits affect total
            compensation. Employer-provided health insurance, retirement
            contributions, and paid leave add significant value to salaried
            positions. When comparing an hourly role to a salaried offer, add
            the dollar value of benefits to the salary before making your
            decision. This gives you a fair apples-to-apples comparison of
            what each opportunity is truly worth.
          </p>
        </article>

        <AdPlaceholder slot="mid-content" className="mt-8" />

        <FAQSection faqs={faqs} />

        <SiloLinks silo="freelance" currentPath="/freelance/hourly-to-annual" />
      </main>
      <SiteFooter />
    </>
  );
}
