"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Book, Users, Lightbulb, Compass } from "lucide-react";
import { useTranslation } from "../../app/i18n/client";

interface FeaturesProps {
  params: {
    lng: string;
  };
}

export function Features({ params: { lng } }: FeaturesProps) {
  const { t } = useTranslation(lng, "features");

  const features = [
    {
      title: t("feature_1_title"),
      description: t("feature_1_description"),
      icon: Book,
    },
    {
      title: t("feature_2_title"),
      description: t("feature_2_description"),
      icon: Users,
    },
    {
      title: t("feature_3_title"),
      description: t("feature_3_description"),
      icon: Lightbulb,
    },
    {
      title: t("feature_4_title"),
      description: t("feature_4_description"),
      icon: Compass,
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t("heading")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-4 text-red-500" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
