"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { BookOpen } from "lucide-react"

interface DailyBibleVerseProps {
  lng: string // 'en', 'nl', etc.
}

interface Verse {
  reference: string
  text: string
  translation: string
}

export default function DailyBibleVerse({ lng }: DailyBibleVerseProps) {
  const [verse, setVerse] = useState<Verse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setVerse(null)
    setLoading(true)
    setError(null)
    // Always fetch a random KJV verse, regardless of language
    const fetchVerse = async () => {
      try {
        const url = `https://bible-api.com/?random=verse&translation=kjv`
        console.debug("Fetching daily verse from:", url)
        const res = await fetch(url)
        if (!res.ok) {
          let errorText = await res.text()
          console.error("API response not ok:", res.status, errorText)
          throw new Error(`Failed to fetch verse (status: ${res.status}): ${errorText}`)
        }
        const data = await res.json()
        console.debug("API response data:", data)
        setVerse({
          reference: `${data.reference}`,
          text: data.text,
          translation: "King James Version"
        })
      } catch (err: any) {
        console.error("Error fetching daily verse:", err)
        setError(err.message || "Unknown error")
      } finally {
        setLoading(false)
      }
    }
    fetchVerse()
  }, [lng])

  return (
    <Card className="mb-8 border border-border dark:border-[#91969e52] bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center mb-2">
          <BookOpen className="text-indigo-600 dark:text-indigo-400 mr-2" />
          <h2 className="text-xl font-bold">Daily Bible Verse</h2>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {verse && (
          <div>
            <p className="text-lg font-semibold mb-1">{verse.reference} <span className="text-xs text-gray-500">({verse.translation})</span></p>
            <p className="text-gray-800 dark:text-gray-200">{verse.text}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 