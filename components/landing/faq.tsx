"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"
import { useTranslation } from "../../app/i18n/client"
import { motion } from "framer-motion"

interface FAQSectionProps {
  params: {
    lng: string
  }
}

export default function FaqSection({ params: { lng } }: FAQSectionProps) {
  const { t } = useTranslation(lng, "faq")

  const faqs = t("items", { returnObjects: true }) as { question: string; answer: string }[]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl dark:text-white">{t("faq_title")}</h2>
        </motion.div>

        <motion.div
          className="mx-auto max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem value={`item-${index}`} className="dark:border-gray-700">
                  <AccordionTrigger className="text-left dark:text-white">{faq.question}</AccordionTrigger>
                  <AccordionContent className="dark:text-gray-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

