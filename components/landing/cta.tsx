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
    <section className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{t("ready_to_start")}</h2>
        <p className="mb-8 text-xl">{t("join_scriptura")}</p>
        <Button asChild size="lg" className="text-lg border border-white font-semibold tracking-wide hover:bg-opacity-90 bg-white text-gray-900 dark:border-[#ffffff94] dark:text-white dark:bg-[#ffffff34] dark:hover:bg-opacity-90 hover:text-white">
          <Link href="/api/auth/signin">{t("sign_up_now")}</Link>
        </Button>
      </div>
    </section>
  );
}
