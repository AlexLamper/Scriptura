"use client"

import { useTranslation } from "../../app/i18n/client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"
import { motion } from "framer-motion"

interface FAQSectionProps {
  params: {
    lng: string
  }
}

export function FAQSection({ params: { lng } }: FAQSectionProps) {
  const { t } = useTranslation(lng, "faq")
  const faqs = t("items", { returnObjects: true }) as {
    question: string
    answer: string
  }[]

  return (
    <section id="faq" className="py-24 bg-white dark:bg-gradient-to-b dark:from-[#181b23] dark:to-[#23263a]">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-blue-100 drop-shadow dark:drop-shadow-xl">{t("faq_title")}</h2>
          <p className="text-xl text-gray-600 dark:text-blue-200 dark:drop-shadow">
            {t("faq_subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="bg-gray-50 dark:bg-[#23263a] rounded-lg px-6 border border-gray-200 dark:border-gray-700/40 dark:shadow-lg dark:shadow-gray-600/10"
              >
                <AccordionTrigger className="text-left dark:text-blue-100">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-blue-200">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
