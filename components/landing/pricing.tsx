"use client"

import Link from "next/link"
import { useTranslation } from "../../app/i18n/client"
import { Button } from "../../components/ui/button"
import { Check, ArrowRight } from "lucide-react"

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
        t("basic.features.0"),
        t("basic.features.1"),
        t("basic.features.2"),
        t("basic.features.3"),
      ],
      buttonText: t("basic.buttonText"),
      buttonVariant: "outline" as const,
      popular: false,
      href: "/api/auth/signin"
    },
    {
      name: t("premium.name"),
      price: t("premium.price"),
      priceSubtext: t("premium.priceSubtext"),
      description: t("premium.description"),
      features: [
        t("premium.features.0"),
        t("premium.features.1"),
        t("premium.features.2"),
        t("premium.features.3"),
        t("premium.features.4"),
      ],
      buttonText: t("premium.buttonText"),
      buttonVariant: "default" as const,
      popular: true,
      href: "/api/auth/signin"
    },
    {
      name: t("institutional.name"),
      price: t("institutional.price"),
      priceSubtext: "",
      description: t("institutional.description"),
      features: [
        t("institutional.features.0"),
        t("institutional.features.1"),
        t("institutional.features.2"),
        t("institutional.features.3"),
        t("institutional.features.4"),
      ],
      buttonText: t("institutional.buttonText"),
      buttonVariant: "outline" as const,
      popular: false,
      href: "/contact"
    },
  ]

  return (
    <section id="pricing" className="relative bg-white dark:bg-[#181b23] py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-7xl mx-auto">
          {/* Title and Subtitle */}
          <div className="space-y-6 mb-16">
            <h2 className="font-['Merriweather'] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#262626] dark:text-white">
              {t("title")}
            </h2>
            <p className="font-['Inter'] text-lg sm:text-xl font-normal text-gray-900 dark:text-blue-200 leading-relaxed max-w-4xl mx-auto">
              {t("description")}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 bg-gray-50 dark:bg-[#23263a] shadow-lg dark:shadow-gray-900/20 ${
                  plan.popular ? "border-2 border-[#798777] dark:border-[#9aaa98]" : ""
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-[#798777] text-white font-['Inter'] text-sm font-medium">
                    {t("popular_badge")}
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="font-['Inter'] text-xl font-semibold text-[#262626] dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="font-['Merriweather'] text-4xl font-bold text-[#262626] dark:text-white">
                      {plan.price}
                    </span>
                    {plan.priceSubtext && (
                      <span className="font-['Inter'] text-lg text-gray-600 dark:text-gray-300">
                        {plan.priceSubtext}
                      </span>
                    )}
                  </div>
                  <p className="font-['Inter'] text-gray-600 dark:text-gray-300">
                    {plan.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[#798777] dark:text-[#9aaa98] mt-0.5 flex-shrink-0" />
                      <span className="font-['Inter'] text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href={plan.href} className="block w-full">
                  {plan.buttonVariant === "default" ? (
                    <Button 
                      size="lg" 
                      className="w-full px-6 py-4 bg-[#798777] hover:bg-[#6a7a68] text-white font-['Inter'] font-normal text-lg rounded-none"
                    >
                      {plan.buttonText}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  ) : (
                    <Button 
                      size="lg" 
                      variant="ghost" 
                      className="w-full px-6 py-4 text-[#262626] dark:text-gray-300 hover:text-[#262626] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-['Inter'] font-normal text-lg rounded-none border border-[#262626] dark:border-gray-300"
                    >
                      {plan.buttonText}
                    </Button>
                  )}
                </Link>
              </div>
            ))}
          </div>   
        </div>
      </div>
    </section>
  )
}