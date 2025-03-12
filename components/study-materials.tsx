"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { BookOpen, CheckCircle, ListChecks } from "lucide-react"

interface BibleVerse {
  reference: string
  text: string
  translation: string
}

interface StudyMaterialsProps {
  quizTitle: string
  bibleVerses: BibleVerse[]
  summary?: string
  learningObjectives?: string[]
  onComplete: () => void
}

export function StudyMaterials({
  quizTitle,
  bibleVerses,
  summary,
  learningObjectives,
  onComplete,
}: StudyMaterialsProps) {
  const [activeTab, setActiveTab] = useState("verses")
  const [readVerses, setReadVerses] = useState<Record<string, boolean>>({})

  const handleMarkAsRead = (reference: string) => {
    setReadVerses((prev) => ({
      ...prev,
      [reference]: true,
    }))
  }

  const allVersesRead = bibleVerses.every((verse) => readVerses[verse.reference])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Study Materials: {quizTitle}</CardTitle>
        <CardDescription>
          Read through these Bible verses and materials before taking the quiz to improve your understanding.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="verses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Bible Verses
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2" disabled={!summary}>
              <CheckCircle className="h-4 w-4" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="objectives" className="flex items-center gap-2" disabled={!learningObjectives?.length}>
              <ListChecks className="h-4 w-4" />
              Learning Objectives
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verses" className="mt-4 space-y-6">
            {bibleVerses.map((verse, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border ${
                  readVerses[verse.reference]
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200"
                    : "bg-white dark:bg-gray-800"
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{verse.reference}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{verse.translation}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg leading-relaxed">{verse.text}</p>
                {!readVerses[verse.reference] && (
                  <Button variant="outline" className="mt-2" onClick={() => handleMarkAsRead(verse.reference)}>
                    Mark as Read
                  </Button>
                )}
                {readVerses[verse.reference] && (
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Marked as read</span>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="summary" className="mt-4">
            {summary && (
              <div className="p-6 rounded-lg border bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Key Points</h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300">{summary}</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="objectives" className="mt-4">
            {learningObjectives && learningObjectives.length > 0 && (
              <div className="p-6 rounded-lg border bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Learning Objectives</h3>
                <ul className="space-y-2">
                  {learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onComplete}>
          Skip Study
        </Button>
        <Button onClick={onComplete} disabled={!allVersesRead && bibleVerses.length > 0}>
          {allVersesRead ? "Continue to Quiz" : "Please read all verses first"}
        </Button>
      </CardFooter>
    </Card>
  )
}

