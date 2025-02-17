"use client"

import { Button } from "../../../components/ui/button"
import Link from "next/link"
import { useTranslation } from "../../../app/i18n/client"
import { Footer } from "../../../components/Footer/client"

interface TermsOfServicePageProps {
  params: {
    lng: string
  }
}

export default function TermsOfServicePage({ params: { lng } }: TermsOfServicePageProps) {
  const { t } = useTranslation(lng, "terms-of-service")

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">{t("terms_of_service")}</h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">{t("acceptance_of_terms")}</h2>
            <p className="text-gray-600">{t("acceptance_description")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">{t("description_of_service")}</h2>
            <p className="text-gray-600">{t("service_description")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">{t("user_accounts")}</h2>
            <p className="text-gray-600">{t("user_accounts_description")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">{t("user_conduct")}</h2>
            <p className="text-gray-600">{t("conduct_description")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">{t("intellectual_property")}</h2>
            <p className="text-gray-600">{t("intellectual_property_description")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">{t("termination")}</h2>
            <p className="text-gray-600">{t("termination_description")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">{t("changes_to_terms")}</h2>
            <p className="text-gray-600">{t("changes_description")}</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">{t("contact_us")}</h2>
            <p className="text-gray-600">{t("contact_description")}</p>
          </section>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base font-semibold">
            <Link href={`/api/auth/signin`}>{t("sign_up")}</Link>
          </Button>
          <Button asChild size="lg" className="w-full sm:w-auto text-base font-semibold">
            <Link href={`/${lng}`}>{t("return_to_home")}</Link>
          </Button>
        </div>
      </main>

      <Footer lng={lng} />
    </div>
  )
}

