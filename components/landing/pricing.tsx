"use client"

import { useTranslation } from "../../app/i18n/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Check, X } from "lucide-react"
import { motion } from "framer-motion"

interface PricingSectionProps {
  params: {
    lng: string
  }
}

export function PricingSection({ params: { lng } }: PricingSectionProps) {
  const { t } = useTranslation(lng, "pricing")

  const plans = [
    {
      name: t("basic.name"),
      price: t("basic.price"),
      priceSubtext: "",
      description: t("basic.description"),
      features: [
        { text: t("basic.features.0"), included: true },
        { text: t("basic.features.1"), included: true },
        { text: t("basic.features.2"), included: true },
        { text: t("basic.features.3"), included: false },
      ],
      buttonText: t("basic.buttonText"),
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: t("premium.name"),
      price: t("premium.price"),
      priceSubtext: t("premium.priceSubtext"),
      description: t("premium.description"),
      features: [
        { text: t("premium.features.0"), included: true },
        { text: t("premium.features.1"), included: true },
        { text: t("premium.features.2"), included: true },
        { text: t("premium.features.3"), included: true },
      ],
      buttonText: t("premium.buttonText"),
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: t("institutional.name"),
      price: t("institutional.price"),
      priceSubtext: "",
      description: t("institutional.description"),
      features: [
        { text: t("institutional.features.0"), included: true },
        { text: t("institutional.features.1"), included: true },
        { text: t("institutional.features.2"), included: true },
        { text: t("institutional.features.3"), included: true },
      ],
      buttonText: t("institutional.buttonText"),
      buttonVariant: "outline" as const,
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 pb-0 dark:bg-gradient-to-b dark:from-[#181b23] dark:to-[#23263a] bg-[#f6f7ff]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-blue-100 drop-shadow dark:drop-shadow-xl">{t("title")}</h2>
          <p className="text-xl text-gray-600 dark:text-blue-200 dark:drop-shadow">{t("description")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`$
                plan.popular ? "border-blue-500 shadow-lg relative dark:border-blue-400 dark:shadow-blue-900/20" : "border-gray-200 dark:border-gray-700/40 dark:shadow-lg dark:shadow-blue-900/10"
              } dark:bg-[#23263a]`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-400 dark:text-white">{t("popular_badge")}</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl dark:text-blue-100">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-gray-900 dark:text-blue-100 mt-4">
                  {plan.price}
                  {plan.priceSubtext && (
                    <span className="text-lg font-normal text-gray-500 dark:text-blue-300">{plan.priceSubtext}</span>
                  )}
                </div>
                <CardDescription className="dark:text-blue-200">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 dark:text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 dark:text-red-400" />
                      )}
                      <span
                        className={
                          feature.included ? "text-gray-600 dark:text-blue-200" : "text-gray-500 dark:text-blue-400/70"
                        }
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  className={`w-full mt-8 $
                    plan.buttonVariant === "default" ? "bg-blue-500 hover:bg-blue-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-400 dark:text-white dark:hover:from-blue-700 dark:hover:to-blue-500 dark:shadow-lg" : "bg-transparent dark:bg-[#181b23] dark:text-blue-200 dark:border-blue-700 dark:hover:bg-[#23263a] dark:hover:border-blue-400 dark:shadow-md"
                  }`}
                  variant={plan.buttonVariant}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* CTA merged below, no section break, same background */}
      <div className="container mx-auto px-6 lg:px-8 text-center pt-20 pb-20">
        <motion.div
          className="max-w-2xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-100 drop-shadow dark:drop-shadow-xl">{t("title")}</h2>
          <p className="text-gray-600 dark:text-blue-200 dark:drop-shadow">{t("cta_subtitle")}</p>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-400 dark:text-white dark:hover:from-blue-700 dark:hover:to-blue-500 dark:shadow-lg">
            {t("cta_buttonText")}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
