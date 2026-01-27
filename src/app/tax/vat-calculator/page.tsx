import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CalculatorCard from "@/components/CalculatorCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import FAQSection from "@/components/FAQSection";
import SiloLinks from "@/components/SiloLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import VATCalculator from "@/components/calculators/VATCalculator";

export const metadata: Metadata = {
  title: "VAT Calculator \u2013 Add or Remove VAT Instantly",
  description:
    "Free VAT calculator to quickly add or remove VAT from any amount. Supports all VAT rates for businesses, freelancers, and consumers worldwide.",
};

const faqs = [
  {
    question: "What is VAT and how is it calculated?",
    answer:
      "VAT (Value Added Tax) is a consumption tax added to goods and services at each stage of production or distribution. To add VAT, multiply the net amount by the VAT rate and add it to the original price. To remove VAT from a gross amount, divide by 1 plus the VAT rate expressed as a decimal.",
  },
  {
    question: "What is the difference between adding and removing VAT?",
    answer:
      "Adding VAT calculates the tax on top of a net (tax-exclusive) price to get the gross (tax-inclusive) price. Removing VAT works in reverse: it extracts the VAT component from a gross price to reveal the original net amount. Use 'Add VAT' when pricing goods and 'Remove VAT' when you need to determine the pre-tax cost.",
  },
  {
    question: "Which countries use VAT?",
    answer:
      "More than 170 countries worldwide use some form of VAT or GST (Goods and Services Tax). All European Union member states charge VAT, as do the United Kingdom, Australia, Canada, India, Japan, and many others. The United States is a notable exception, relying on sales tax instead of VAT.",
  },
  {
    question: "Can I use this calculator for GST?",
    answer:
      "Yes. GST (Goods and Services Tax) is functionally equivalent to VAT. Simply enter the GST rate for your country and the calculator will compute the correct net, tax, and gross amounts in exactly the same way.",
  },
];

export default function VATCalculatorPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tax", href: "/tax" },
            { label: "VAT Calculator" },
          ]}
        />

        <h1 className="mb-6 text-3xl font-bold text-foreground">
          VAT Calculator
        </h1>

        <CalculatorCard>
          <VATCalculator />
        </CalculatorCard>

        <AdPlaceholder slot="below-calculator" className="mt-8" />

        <section className="mt-8 space-y-4 text-foreground leading-relaxed">
          <h2 className="text-2xl font-semibold">
            How VAT Works and Who Needs to Calculate It
          </h2>
          <p>
            Value Added Tax is one of the most common forms of consumption tax
            used around the world. Unlike income tax, which is levied on
            earnings, VAT is charged on the sale of goods and services. Businesses
            registered for VAT collect the tax on behalf of the government and
            remit it periodically, while consumers pay the tax as part of the
            final purchase price.
          </p>
          <p>
            Whether you are a business owner pricing your products, a freelancer
            invoicing a client, or a consumer trying to understand the true cost
            of a purchase, knowing how to calculate VAT is essential. Businesses
            must add the correct VAT rate to their invoices and can usually
            reclaim VAT paid on their own purchases. Consumers benefit from
            understanding how much tax is embedded in the prices they pay,
            especially when shopping across borders with different rates.
          </p>
          <p>
            VAT rates vary significantly from country to country. Most countries
            set a standard rate that applies to the majority of goods and
            services, along with one or more reduced rates for essentials such as
            food, medicine, or children&apos;s clothing. Some items may be
            zero-rated or exempt altogether. Using this calculator, you can
            quickly determine the net price, the VAT component, and the gross
            total for any rate, making it easier to prepare invoices, verify
            receipts, or compare prices internationally.
          </p>
        </section>

        <AdPlaceholder slot="mid-content" className="mt-8" />

        <FAQSection faqs={faqs} />

        <SiloLinks silo="tax" currentPath="/tax/vat-calculator" />
      </main>
      <SiteFooter />
    </>
  );
}
