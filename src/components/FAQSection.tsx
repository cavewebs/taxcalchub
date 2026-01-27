interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-semibold text-foreground">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-border rounded-lg border border-border">
        {faqs.map((faq, index) => (
          <details key={index} className="group">
            <summary className="cursor-pointer px-4 py-3 text-foreground font-medium hover:bg-muted transition-colors">
              {faq.question}
            </summary>
            <div className="px-4 pb-4 pt-1 text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
