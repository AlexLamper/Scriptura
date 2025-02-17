"use client";

import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Check } from "lucide-react";
import { useTranslation } from "../../app/i18n/client";

interface PricingProps {
  params: {
    lng: string;
  };
}

export function Pricing({ params: { lng } }: PricingProps) {
  const { t } = useTranslation(lng, "pricing");

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
  ];  

  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t("heading")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={plan.popular ? "border-red-500 border-2" : ""}>
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                {plan.popular && (
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {plan.popular_label}
                  </span>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold mb-4">{plan.price}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{plan.cta}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
