"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../ui/textarea"
import { MapPin, Phone } from "lucide-react"
import { useTranslation } from "../../app/i18n/client"

interface ContactSectionProps {
  params: {
    lng: string
  }
}

export default function ContactSection({ params: { lng } }: ContactSectionProps) {
  const { t } = useTranslation(lng, "contact")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-16 md:py-24 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#111828] dark:text-white md:text-3xl">{t("heading")}</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{t("subheading")}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111828] text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">{t("location_title")}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("location_address")}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111828] text-white">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">{t("contact_title")}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("contact_email")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">{t("form_title")}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder={t("name_placeholder")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder={t("email_placeholder")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder={t("message_placeholder")}
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#111828] hover:bg-[#1c2538]">
                {t("submit_button")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

