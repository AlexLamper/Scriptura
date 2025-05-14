"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useToast } from "../../hooks/use-toast"
import { Loader2 } from "lucide-react"
import { useTranslation } from "../../app/i18n/client"

interface ProfileFormProps {
  initialName: string
  initialEmail: string
  initialBio: string
  lng: string
}

export function ProfileForm({ initialName, initialEmail, initialBio, lng }: ProfileFormProps) {
  const { t } = useTranslation(lng, "profile")
  const [name, setName] = useState(initialName || "")
  const [bio, setBio] = useState(initialBio || "")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  // Add this effect to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, bio }),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      toast({
        title: t("profile_updated"),
        description: t("profile_updated_success"),
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: t("error"),
        description: t("failed_update_profile_try_again"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">{t("display_name")}</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="dark:bg-[#18181a] dark:border-[#ffffff6f] mt-2"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          value={initialEmail}
          disabled
          className="dark:bg-[#18181a] dark:border-[#ffffff6f] mt-2 opacity-70"
        />
        <p className="text-sm text-muted-foreground mt-1">{t("email_cannot_change")}</p>
      </div>
      <div>
        <Label htmlFor="bio">{t("bio")}</Label>
        <textarea
          id="bio"
          className="w-full min-h-[100px] p-2 border rounded-md dark:bg-[#18181a] dark:border-[#ffffff6f] mt-2"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("saving")}
          </>
        ) : (
          t("save_changes")
        )}
      </Button>
    </form>
  )
}