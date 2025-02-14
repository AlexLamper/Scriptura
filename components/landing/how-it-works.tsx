"use client";

import { Button } from "../../components/ui/button";
import Image from "next/image";
import { useTranslation } from "../../app/i18n/client";

interface HowItWorksProps {
  params: {
    lng: string;
  };
}

export function HowItWorks({ params: { lng } }: HowItWorksProps) {
  const { t } = useTranslation(lng, "how-it-works");

  const steps = [
    {
      title: t("step_1_title"),
      description: t("step_1_description"),
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      title: t("step_2_title"),
      description: t("step_2_description"),
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      title: t("step_3_title"),
      description: t("step_3_description"),
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      title: t("step_4_title"),
      description: t("step_4_description"),
      image: "/placeholder.svg?height=200&width=200",
    },
  ];

  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t("heading")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 relative">
                <Image
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <div className="absolute top-0 right-0 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg">{t("cta")}</Button>
        </div>
      </div>
    </section>
  );
}
