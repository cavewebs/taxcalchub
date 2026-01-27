import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CalculatorCard from "@/components/CalculatorCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import FAQSection from "@/components/FAQSection";
import SiloLinks from "@/components/SiloLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import DayRateToSalaryCalculator from "@/components/calculators/DayRateToSalaryCalculator";

export const metadata: Metadata = {
  title: "Day Rate to Salary Calculator – Convert Your Day Rate",
  description:
    "Convert a freelance or contractor day rate into an equivalent annual salary. Compare contract earnings with permanent employment to make informed career decisions.",
};

const faqs = [
  {
    question: "How do I convert a day rate to an annual salary?",
    answer:
      "Multiply your day rate by the number of working days per week, then multiply by the number of working weeks per year. For example, a $500 day rate working 5 days per week for 48 weeks gives an annual equivalent of $120,000. The remaining 4 weeks account for holidays and time between contracts.",
  },
  {
    question: "Why use 48 weeks instead of 52?",
    answer:
      "Contractors and freelancers typically do not receive paid holidays or vacation. Using 48 weeks accounts for roughly 4 weeks of unpaid time off, including holidays, sick days, and gaps between contracts. If you consistently work year-round, you can adjust to 50 or 52 weeks for a more aggressive estimate.",
  },
  {
    question: "Is a day rate better than a salary?",
    answer:
      "Day rates often appear higher than equivalent salaries because contractors must cover their own benefits, retirement contributions, insurance, and taxes. A general guideline is that a contractor day rate needs to be 20 to 40 percent higher than the salaried equivalent to match total compensation. Always compare the full package, not just the headline number.",
  },
  {
    question: "What is the standard number of working days in a year?",
    answer:
      "A typical working year has 260 weekdays (52 weeks times 5 days). After subtracting public holidays and vacation, salaried employees usually work around 230 to 240 days. Freelancers working 48 weeks at 5 days per week work 240 days, which aligns well with employed equivalents.",
  },
];

export default function DayRateToSalaryPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Freelance", href: "/freelance" },
            { label: "Day Rate to Salary" },
          ]}
        />

        <h1 className="text-3xl font-bold text-foreground mb-6">
          Day Rate to Salary Calculator
        </h1>

        <CalculatorCard>
          <DayRateToSalaryCalculator />
        </CalculatorCard>

        <AdPlaceholder slot="below-calculator" className="mt-8" />

        <article className="prose mt-8 max-w-none">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Day Rate vs. Salary: Understanding the Comparison
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Comparing a contractor day rate to a permanent salary is not as
            straightforward as multiplying by the number of working days.
            Salaried employees receive benefits that contractors must fund
            themselves, including health insurance, pension contributions, paid
            leave, and employer-side payroll taxes. A meaningful comparison
            requires looking at total compensation, not just gross pay.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When evaluating a contract role against a permanent position, start
            by converting the day rate to an annual figure using realistic
            assumptions. Most contractors take at least four weeks of unpaid
            time per year for holidays, illness, and gaps between engagements.
            Using 48 working weeks provides a conservative estimate that
            reflects actual earning potential.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Next, consider the value of employee benefits you would need to
            replace. Health insurance alone can cost several thousand dollars
            per year. Add retirement contributions, professional liability
            insurance, accounting fees, and equipment costs. These expenses
            typically add 20 to 40 percent to the baseline salary you need to
            match through your day rate.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Finally, factor in the non-financial differences. Contracting
            offers flexibility, variety, and potentially higher earnings, but
            comes with income uncertainty and the need to manage your own
            business. Permanent employment offers stability, career
            progression, and team belonging. The right choice depends on your
            personal priorities and risk tolerance.
          </p>
        </article>

        <AdPlaceholder slot="mid-content" className="mt-8" />

        <FAQSection faqs={faqs} />

        <SiloLinks silo="freelance" currentPath="/freelance/day-rate-to-salary" />
      </main>
      <SiteFooter />
    </>
  );
}
