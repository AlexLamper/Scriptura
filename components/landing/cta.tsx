"use client";

import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useTranslation } from "../../app/i18n/client";

interface CTAProps {
  params: {
    lng: string;
  };
}

export function CTA({ params: { lng } }: CTAProps) {
  const { t } = useTranslation(lng, "cta");

  return (
    <section className="py-24 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">{t("ready_to_start")}</h2>
        <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">{t("join_scriptura")}</p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg font-semibold tracking-wide bg-gray-900 dark:border-[#ffffff94] text-white dark:bg-[#1118279d] dark:hover:text-white dark:hover:bg-[#ffffff34]"
          >
            <Link href={`/api/auth/signin`}>{t("sign_up")}</Link>
          </Button>
      </div>
    </section>
  );
}
