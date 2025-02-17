"use client";

import { Card, CardContent } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { useTranslation } from "../../app/i18n/client";

interface TestimonialsProps {
  params: {
    lng: string;
  };
}

export function Testimonials({ params: { lng } }: TestimonialsProps) {
  const { t } = useTranslation(lng, "testimonials");

  const testimonials = [
    {
      name: t("testimonial_1_name"),
      role: t("testimonial_1_role"),
      content: t("testimonial_1_content"),
      avatar: "/placeholder.svg",
    },
    {
      name: t("testimonial_2_name"),
      role: t("testimonial_2_role"),
      content: t("testimonial_2_content"),
      avatar: "/placeholder.svg",
    },
    {
      name: t("testimonial_3_name"),
      role: t("testimonial_3_role"),
      content: t("testimonial_3_content"),
      avatar: "/placeholder.svg",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t("heading")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
