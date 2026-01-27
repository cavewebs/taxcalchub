import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CalculatorCard from "@/components/CalculatorCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import FAQSection from "@/components/FAQSection";
import SiloLinks from "@/components/SiloLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import FreelanceRateCalculator from "@/components/calculators/FreelanceRateCalculator";

export const metadata: Metadata = {
  title: "Freelance Rate Calculator – Find Your Ideal Hourly Rate",
  description:
    "Calculate the hourly and day rate you need to charge as a freelancer. Factor in overhead, billable hours, and time off to set a rate that meets your income goals.",
};

const faqs = [
  {
    question: "How do I calculate my freelance hourly rate?",
    answer:
      "Start with your desired annual income, then add your estimated business overhead costs such as software, insurance, and taxes. Divide the total by the number of billable hours you realistically expect to work each year. Most freelancers bill between 20 and 30 hours per week after accounting for admin, marketing, and business development time.",
  },
  {
    question: "What overhead percentage should I use?",
    answer:
      "A common starting point is 20 to 30 percent. This covers expenses like health insurance, retirement contributions, self-employment taxes, software subscriptions, office space, and professional development. If you work from home with minimal expenses, 15 percent may be appropriate. Service businesses with significant tooling costs may need 35 percent or more.",
  },
  {
    question: "Why are billable hours lower than total working hours?",
    answer:
      "Not every working hour generates revenue. Freelancers spend time on invoicing, client communication, proposals, marketing, bookkeeping, and professional learning. Industry data suggests that freelancers typically bill 60 to 70 percent of their total working hours, which is why 30 billable hours per week is a realistic default for a full-time freelancer.",
  },
  {
    question: "Should I charge hourly or a day rate?",
    answer:
      "Both approaches have merits. Hourly rates offer flexibility for variable-scope projects and are common for ongoing retainer work. Day rates simplify pricing for on-site work and longer engagements. Many freelancers quote day rates for project work to reduce scope-creep discussions, while using hourly rates for advisory and support work.",
  },
];

export default function FreelanceRateCalculatorPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Freelance", href: "/freelance" },
            { label: "Freelance Rate Calculator" },
          ]}
        />

        <h1 className="text-3xl font-bold text-foreground mb-6">
          Freelance Rate Calculator
        </h1>

        <CalculatorCard>
          <FreelanceRateCalculator />
        </CalculatorCard>

        <AdPlaceholder slot="below-calculator" className="mt-8" />

        <article className="prose mt-8 max-w-none">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            How to Calculate Your Freelance Rate
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Setting the right freelance rate is one of the most important
            financial decisions you will make as an independent professional. A
            rate that is too low leaves money on the table and signals
            inexperience; a rate that is too high can price you out of
            opportunities. The goal is to find a number that covers all of your
            costs, pays you a fair salary, and leaves room for growth.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Begin by identifying your target annual income -- the amount you
            want to take home after all business expenses are paid. Next,
            estimate your overhead as a percentage of that income. Overhead
            includes self-employment taxes, health insurance, retirement
            savings, software tools, equipment depreciation, and any other
            recurring business costs. A figure between 20 and 30 percent is
            typical for most service-based freelancers.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Once you have a total revenue target, divide it by the number of
            billable hours you expect to work in a year. Remember that not
            every hour at your desk is billable. Administrative tasks, client
            acquisition, bookkeeping, and professional development all consume
            time that you cannot invoice. Most full-time freelancers find that
            25 to 30 billable hours per week is realistic.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Finally, consider external factors such as market rates for your
            skill set, the complexity of the work, and the value you deliver
            to clients. Your rate should reflect not only your costs but also
            your experience, the results you produce, and the demand for your
            services. Revisit your pricing at least once a year to keep pace
            with inflation and skill growth.
          </p>
        </article>

        <AdPlaceholder slot="mid-content" className="mt-8" />

        <FAQSection faqs={faqs} />

        <SiloLinks silo="freelance" currentPath="/freelance/freelance-rate-calculator" />
      </main>
      <SiteFooter />
    </>
  );
}
