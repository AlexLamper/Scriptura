"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"
import { useTranslation } from "../../app/i18n/client"

interface FAQSectionProps {
  params: {
    lng: string
  }
}

export default function FaqSection({ params: { lng } }: FAQSectionProps) {
  const { t } = useTranslation(lng, "faq")

  const faqs = t("items", { returnObjects: true }) as { question: string; answer: string }[]

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl dark:text-white">{t("faq_title")}</h2>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="dark:border-gray-700">
                <AccordionTrigger className="text-left dark:text-white">{faq.question}</AccordionTrigger>
                <AccordionContent className="dark:text-gray-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

