"use client"

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Check } from "lucide-react"
import { useTranslation } from "../../app/i18n/client"
import { motion } from "framer-motion"

interface PricingProps {
  params: {
    lng: string
  }
}

export function Pricing({ params: { lng } }: PricingProps) {
  const { t } = useTranslation(lng, "pricing")

  const plans = [
    {
      name: t("basic_name"),
      price: t("basic_price"),
      features: t("basic_features", { returnObjects: true }) as string[],
      cta: t("basic_cta"),
      popular: false,
    },
    {
      name: t("premium_name"),
      price: t("premium_price"),
      features: t("premium_features", { returnObjects: true }) as string[],
      cta: t("premium_cta"),
      popular_label: t("premium_popular_label"),
      popular: true,
    },
    {
      name: t("institutional_name"),
      price: t("institutional_price"),
      features: t("institutional_features", { returnObjects: true }) as string[],
      cta: t("institutional_cta"),
      popular: false,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section className="py-24 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          {t("heading")}
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className={`${plan.popular ? "border-red-500 border-2" : ""} dark:bg-gray-800 dark:border-gray-700 h-full`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl dark:text-white">{plan.name}</CardTitle>
                  {plan.popular && (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {plan.popular_label}
                    </span>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold mb-4 dark:text-white">{plan.price}</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="text-green-500 mr-2" />
                        <span className="dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full dark:bg-red-500 dark:hover:bg-red-600 dark:text-white">{plan.cta}</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

