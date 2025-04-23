"use client"

import type React from "react"
import { BookOpen, CheckCircle, Target, FileText, ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { motion } from "framer-motion"

interface StudyMaterialsProps {
  quizTitle: string
  bibleVerses: { reference: string; text: string; translation: string }[]
  summary?: string
  learningObjectives?: string[]
  onComplete: () => void
  onBack: () => void
}

export const StudyMaterials: React.FC<StudyMaterialsProps> = ({
  quizTitle,
  bibleVerses,
  summary,
  learningObjectives,
  onComplete,
  onBack,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto py-8"
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" onClick={onBack} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {quizTitle} - Study Materials
          </h2>
        </div>
        <Button
          onClick={onComplete}
          className="bg-[#0f172a] hover:bg-[#1e293b] dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark Study as Complete
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left column - Learning Objectives */}
        {learningObjectives && learningObjectives.length > 0 && (
          <Card className="h-fit border border-gray-100 dark:border-[#91969e52] bg-white dark:bg-[#2a2b2f] shadow-sm">
            <CardHeader className="bg-[#f8fafc] dark:bg-[#1f2937]">
              <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                <Target className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e9ebfa] text-sm font-medium text-[#0f172a] dark:bg-blue-900/30 dark:text-blue-400">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Middle column - Summary */}
        {summary && (
          <Card className="h-fit border border-gray-100 dark:border-[#91969e52] bg-white dark:bg-[#2a2b2f] shadow-sm">
            <CardHeader className="bg-[#f8fafc] dark:bg-[#1f2937]">
              <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                <FileText className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">{summary}</p>
            </CardContent>
          </Card>
        )}

        {/* Right column - Bible Verses */}
        {bibleVerses && bibleVerses.length > 0 && (
          <Card className="h-fit lg:col-span-full border border-gray-100 dark:border-[#91969e52] bg-white dark:bg-[#2a2b2f] shadow-sm">
            <CardHeader className="bg-[#f8fafc] dark:bg-[#1f2937]">
              <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                <BookOpen className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
                Key Bible Verses
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {bibleVerses.map((verse, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-[#91969e52] dark:bg-[#1f2937]"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">{verse.reference}</h4>
                      <Badge
                        variant="outline"
                        className="bg-[#e9ebfa] text-[#0f172a] dark:bg-blue-900/30 dark:text-blue-400 border border-black/10 dark:border-[#b6b6b63d]"
                      >
                        {verse.translation}
                      </Badge>
                    </div>
                    <p className="italic text-gray-600 dark:text-gray-300">&quot;{verse.text}&quot;</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  )
}
