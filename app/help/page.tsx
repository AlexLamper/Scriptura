"use client";

import { Header } from "../../components/landing/navbar";
import { Footer } from "../../components/landing/footer";
import { useTranslation } from "../i18n/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";

export default function HelpPage() {
  const { t } = useTranslation("help");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t("title")}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 text-center">{t("description")}</p>
          
          <div className="bg-white dark:bg-card rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{t("faq_title")}</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t("faq_1_question")}</AccordionTrigger>
                <AccordionContent>{t("faq_1_answer")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>{t("faq_2_question")}</AccordionTrigger>
                <AccordionContent>{t("faq_2_answer")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>{t("faq_3_question")}</AccordionTrigger>
                <AccordionContent>{t("faq_3_answer")}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
