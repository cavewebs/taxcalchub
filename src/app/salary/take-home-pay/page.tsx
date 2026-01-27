import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdPlaceholder from "@/components/AdPlaceholder";
import FAQSection from "@/components/FAQSection";
import SiloLinks from "@/components/SiloLinks";
import TakeHomePayCalculator from "@/components/calculators/TakeHomePayCalculator";

export const metadata: Metadata = {
  title: "Take Home Pay Calculator \u2013 Calculate Your Net Paycheck",
  description:
    "Calculate your take-home pay after taxes and deductions. Break down your annual salary into weekly, bi-weekly, or monthly net pay for multiple countries.",
};

const faqs = [
  {
    question: "What is take-home pay?",
    answer:
      "Take-home pay is the amount of money you actually receive in your paycheck after all deductions have been applied to your gross salary. These deductions include income tax and social security contributions. Your take-home pay is also referred to as net pay and represents the funds available for your personal spending, saving, and investing.",
  },
  {
    question: "How does pay frequency affect my take-home pay?",
    answer:
      "Pay frequency determines how often you receive a paycheck and the amount of each payment, but it does not change your total annual take-home pay. If you are paid monthly, you receive 12 larger payments per year. If you are paid bi-weekly, you receive 26 smaller payments. Weekly pay results in 52 payments. The calculator divides your annual net pay by the appropriate number of pay periods to show your per-period take-home amount.",
  },
  {
    question: "Why is my take-home pay lower than expected?",
    answer:
      "Your take-home pay may be lower than expected due to progressive income tax rates, which increase as your earnings rise, and social security contributions that are deducted from your gross salary. Additionally, your personal allowance (the tax-free portion of your income) may be smaller than anticipated. Using this calculator with your exact salary and country will show you the precise breakdown of deductions.",
  },
  {
    question: "Can I increase my take-home pay?",
    answer:
      "While mandatory tax rates and social security contributions are fixed by law, there are strategies that may increase your take-home pay. These include contributing to tax-advantaged retirement accounts, claiming all eligible deductions and tax credits, salary sacrifice schemes for pensions or childcare, and ensuring your tax code is correct. Consult a qualified tax advisor for personalized guidance.",
  },
];

export default function TakeHomePayPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Salary", href: "/salary" },
            { label: "Take Home Pay" },
          ]}
        />

        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Take Home Pay Calculator
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Calculate your net paycheck based on your annual salary, preferred pay
          frequency, and country. See exactly how much you take home each pay
          period.
        </p>

        <div className="mt-8">
          <TakeHomePayCalculator />
        </div>

        <AdPlaceholder slot="below-calculator" className="mt-8" />

        <section className="mt-10 space-y-4 text-foreground leading-relaxed">
          <h2 className="text-2xl font-semibold">
            Understanding Your Take-Home Pay
          </h2>
          <p>
            Your take-home pay is the cornerstone of personal budgeting. It
            represents the actual amount deposited into your bank account each
            pay period after income tax and social security contributions have
            been deducted by your employer. While your gross salary is the
            headline figure in your employment contract, your net pay is what
            determines your day-to-day spending power, savings capacity, and
            financial flexibility.
          </p>
          <p>
            The amount deducted from each paycheck depends on two main factors:
            the income tax system in your country and the applicable social
            security contribution rate. Most countries use progressive tax
            brackets, which means the first portion of your income is taxed at a
            lower rate, with higher rates applied to income above specific
            thresholds. A personal allowance further reduces your taxable income
            by exempting a set amount from taxation entirely.
          </p>
          <p>
            Pay frequency plays an important role in how you experience your
            income, even though it does not change the annual total. Being paid
            weekly means receiving 52 smaller payments throughout the year,
            while monthly pay results in 12 larger deposits. Bi-weekly pay,
            common in North America, delivers 26 payments. Understanding how
            your annual salary translates into each individual paycheck helps
            you plan monthly bills, set savings goals, and maintain a realistic
            budget. This calculator provides a clear breakdown across all common
            pay frequencies so you can choose the view that matches your
            situation.
          </p>
        </section>

        <AdPlaceholder slot="mid-content" className="mt-8" />

        <FAQSection faqs={faqs} />

        <SiloLinks silo="salary" currentPath="/salary/take-home-pay" />
      </main>
      <SiteFooter />
    </>
  );
}
