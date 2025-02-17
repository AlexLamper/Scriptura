"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { useTranslation } from "../../app/i18n/client";

interface FAQProps {
  params: {
    lng: string;
  };
}

export function FAQ({ params: { lng } }: FAQProps) {
  const { t } = useTranslation(lng, "faq");

  const faqs = t("items", { returnObjects: true }) as { question: string; answer: string }[];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t("faq_title")}</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}