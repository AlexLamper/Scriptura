"use client"

import { useState } from "react"
import { useTranslation } from "../../app/i18n/client"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useToast } from "../../hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"

interface SubscriptionStatusProps {
  userId: string
  lng: string
  subscribed?: boolean
  stripeSubscriptionId?: string
}

export function SubscriptionStatus({ lng, subscribed = false }: SubscriptionStatusProps) {
  const { t } = useTranslation(lng, "profile")
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [cancelDate, setCancelDate] = useState<Date | null>(null)
  const [isSubscribed] = useState(subscribed)

  const handleCancelSubscription = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to cancel subscription")
      }

      // Set the cancellation date
      if (data.cancelDate) {
        setCancelDate(new Date(data.cancelDate))
      }

      toast({
        title: t("subscription_cancel_success"),
        description: t("subscription_cancel_details"),
        variant: "default",
      })

      // Close the dialog
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error canceling subscription:", error)
      toast({
        title: t("subscription_cancel_error"),
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card className="dark:bg-[#292b2f] dark:border-none">
        <CardHeader>
          <CardTitle>{t("subscription_status")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              {isSubscribed ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">{t("subscribed")}</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-400">{t("not_subscribed")}</span>
                </>
              )}
            </div>

            {cancelDate && (
              <div className="flex items-start mt-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-200 dark:border-amber-800">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    {t("subscription_ending")}
                    <span className="font-medium">
                      {" "}
                      {cancelDate.toLocaleDateString(lng === "nl" ? "nl-NL" : "en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">{t("subscription_renew_info")}</p>
                </div>
              </div>
            )}

            <div className="pt-2">
              {isSubscribed ? (
                <Button
                  variant="outline"
                  className="w-full border-red-500 text-red-500 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950/30"
                  onClick={() => setIsDialogOpen(true)}
                >
                  {t("cancel_subscription")}
                </Button>
              ) : (
                <Button className="w-full" onClick={() => (window.location.href = `/${lng}/subscribe`)}>
                  {t("subscribe_now")}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("confirm_cancellation")}</DialogTitle>
            <DialogDescription>{t("cancellation_description")}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">{t("cancellation_details")}</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                {t("cancellation_point_1")}
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                {t("cancellation_point_2")}
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                {t("cancellation_point_3")}
              </li>
            </ul>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              {t("keep_subscription")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelSubscription}
              disabled={isLoading}
              className="mt-2 sm:mt-0"
            >
              {isLoading ? t("cancelling") : t("confirm_cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
