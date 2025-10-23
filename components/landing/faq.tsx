"use client"

import { useTranslation } from "../../app/i18n/client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"
import Image from "next/image"

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
    <section id="faq" className="relative bg-white dark:bg-[#181b23] py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Image */}
            <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
              <div className="relative w-full sm:w-3/4 lg:w-4/5 h-64 sm:h-80 lg:h-[500px]">
                <Image
                  src="/en/images/faq.svg"
                  alt="FAQ illustration"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
                  quality={95}
                />
              </div>
            </div>
            {/* Right Column - Title, Subtitle & FAQ Content */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Title and Subtitle */}
              <div className="text-center lg:text-left space-y-6">
                <h2 className="font-['Merriweather'] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#262626] dark:text-white">
                  {t("faq_title")}
                </h2>
              </div>

              {/* FAQ Accordion */}
              <div>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index + 1}`}
                      className="border-b border-gray-200 dark:border-gray-700 pb-4"
                    >
                      <AccordionTrigger className="text-left font-['Inter'] text-lg font-medium text-[#262626] dark:text-white hover:no-underline py-4 px-0 border-none">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="font-['Inter'] text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 px-0">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
