import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdPlaceholder from "@/components/AdPlaceholder";
import FAQSection from "@/components/FAQSection";
import SiloLinks from "@/components/SiloLinks";
import SalaryToHourlyCalculator from "@/components/calculators/SalaryToHourlyCalculator";

export const metadata: Metadata = {
  title: "Salary to Hourly Converter \u2013 Calculate Your Hourly Rate",
  description:
    "Convert your annual salary to an hourly rate, daily rate, weekly pay, and monthly pay. Understand the true value of your time with our free salary to hourly converter.",
};

const faqs = [
  {
    question: "How do I convert my annual salary to an hourly rate?",
    answer:
      "To convert an annual salary to an hourly rate, divide your total annual salary by the number of working hours in a year. The standard calculation uses 40 hours per week multiplied by 52 weeks, giving 2,080 working hours per year. For example, a $50,000 annual salary equals approximately $24.04 per hour. You can adjust the hours per week and weeks per year in the calculator above to match your actual working schedule.",
  },
  {
    question: "What is a good hourly rate for my salary?",
    answer:
      "Whether an hourly rate is considered good depends on your industry, location, experience level, and cost of living. The calculator above helps you understand what your current salary translates to on an hourly basis. You can then compare this rate against industry benchmarks, freelance rates, or hourly positions to evaluate whether your compensation is competitive for your role and region.",
  },
  {
    question: "Should I include vacation weeks in the calculation?",
    answer:
      "It depends on what you want to measure. Using 52 weeks per year gives you your nominal hourly rate based on your total salary spread across the entire year. If you want to know your effective hourly rate for the weeks you actually work, reduce the weeks per year by your vacation and holiday weeks. For example, if you have 4 weeks of paid vacation, using 48 weeks will give you a higher hourly rate that reflects your actual working time.",
  },
  {
    question: "How is the daily rate calculated?",
    answer:
      "The daily rate is calculated by multiplying your hourly rate by the number of hours you work per day. The calculator assumes a standard five-day work week, so it divides your weekly hours by five to determine daily hours. For a typical 40-hour week, this means 8 hours per day. Your daily rate is simply your hourly rate multiplied by 8 in this standard scenario.",
  },
];

export default function SalaryToHourlyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Salary", href: "/salary" },
            { label: "Salary to Hourly" },
          ]}
        />

        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Salary to Hourly Converter
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Convert your annual salary into an hourly rate, daily rate, weekly pay,
          and monthly pay. Adjust working hours and weeks to match your schedule.
        </p>

        <div className="mt-8">
          <SalaryToHourlyCalculator />
        </div>

        <AdPlaceholder slot="below-calculator" className="mt-8" />

        <section className="mt-10 space-y-4 text-foreground leading-relaxed">
          <h2 className="text-2xl font-semibold">
            Converting Your Salary to an Hourly Rate
          </h2>
          <p>
            Understanding your hourly rate is valuable whether you are a
            salaried employee, considering a job change, or evaluating freelance
            opportunities. Your annual salary represents a lump sum, but
            breaking it down into smaller increments reveals the true value of
            each hour you spend working. This perspective is especially useful
            when comparing salaried positions with hourly or contract roles,
            where compensation is quoted per hour or per day.
          </p>
          <p>
            The standard conversion assumes a 40-hour work week across 52 weeks
            of the year, resulting in 2,080 total working hours. However, your
            actual situation may differ. If you work fewer hours per week, your
            effective hourly rate increases for the same annual salary. Similarly,
            if you take unpaid leave or work fewer than 52 weeks, adjusting the
            weeks-per-year figure gives a more accurate reflection of what you
            earn for each hour on the job.
          </p>
          <p>
            Beyond hourly comparisons, knowing your daily, weekly, and monthly
            rates helps with budgeting, negotiating raises, and evaluating side
            income opportunities. If your hourly rate falls below what similar
            roles offer on a freelance or contract basis, that insight can inform
            career decisions. Conversely, a strong hourly equivalent may confirm
            that your salaried position, with its benefits and stability, offers
            excellent overall value. Use this converter to gain a complete
            picture of your compensation at every time scale.
          </p>
        </section>

        <AdPlaceholder slot="mid-content" className="mt-8" />

        <FAQSection faqs={faqs} />

        <SiloLinks silo="salary" currentPath="/salary/salary-to-hourly" />
      </main>
      <SiteFooter />
    </>
  );
}
