"use client"

import type React from "react"

import { Button } from "../components/ui/button"

interface StudyMaterialsProps {
  quizTitle: string
  bibleVerses: { reference: string; text: string; translation: string }[]
  summary?: string
  learningObjectives?: string[]
  onComplete: () => void
}

export const StudyMaterials: React.FC<StudyMaterialsProps> = ({
  quizTitle,
  bibleVerses,
  summary,
  learningObjectives,
  onComplete,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">{quizTitle} - Study Materials</h2>

      {learningObjectives && learningObjectives.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Learning Objectives:</h3>
          <ul className="list-disc pl-5">
            {learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
      )}

      {summary && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}

      {bibleVerses && bibleVerses.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Key Bible Verses:</h3>
          <div className="space-y-4">
            {bibleVerses.map((verse, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">
                  {verse.reference} ({verse.translation})
                </p>
                <p>{verse.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button onClick={onComplete}>Mark Study as Complete</Button>
    </div>
  )
}
