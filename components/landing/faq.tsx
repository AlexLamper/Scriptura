import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Scriptura?",
    answer:
      "Scriptura is an online platform designed to help individuals and groups study the Bible more effectively. It offers courses, resources, and a community for deepening your understanding of Scripture.",
  },
  {
    question: "Is Scriptura suitable for beginners?",
    answer:
      "Scriptura caters to all levels of biblical knowledge, from beginners to advanced students. We offer introductory courses and resources specifically designed for those new to Bible study.",
  },
  {
    question: "Can I use Scriptura with my church or small group?",
    answer:
      "Yes, Scriptura is great for group study. We offer features that allow you to create and manage study groups, share insights, and track progress together.",
  },
  {
    question: "What translations of the Bible are available on Scriptura?",
    answer:
      "Scriptura provides access to multiple popular translations, including NIV, ESV, KJV, NKJV, and more. Users can compare translations side-by-side for deeper study.",
  },
  {
    question: "How often is new content added to Scriptura?",
    answer:
      "We regularly update our content library with new courses, articles, and resources. Premium members get access to exclusive new content on a weekly basis.",
  },
]

export function FAQ() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
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
  )
}

