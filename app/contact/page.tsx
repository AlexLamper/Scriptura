"use client";

import { Header } from "../../components/landing/navbar";
import { Footer } from "../../components/landing/footer";
import { useTranslation } from "../i18n/client";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Mail } from "lucide-react";

export default function ContactPage() {
  const { t } = useTranslation("contact");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert(t("success_message"));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t("title")}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 text-center">{t("description")}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>{t("get_in_touch")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("name")}</label>
                    <Input id="name" placeholder={t("name")} required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("email")}</label>
                    <Input id="email" type="email" placeholder={t("email")} required />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("message")}</label>
                    <Textarea id="message" placeholder={t("message")} className="min-h-[150px]" required />
                  </div>
                  <Button type="submit" className="w-full">{t("send")}</Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("contact_info")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-brand mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{t("email")}</h3>
                      <p className="text-gray-600 dark:text-gray-400">devlamper06@gmail.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
