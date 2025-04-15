"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Check } from 'lucide-react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LessonCompletionProps {
  courseId: string;
  lessonIndex: number;
  lng: string;
  hasNextLesson: boolean;
  nextLessonId: string;
}

export default function LessonCompletion({
  courseId,
  lessonIndex,
  lng,
  hasNextLesson,
  nextLessonId,
}: LessonCompletionProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkCompletion = async () => {
      if (!session) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user-progress?courseId=${courseId}`);
        if (response.ok) {
          const data = await response.json();
          setIsCompleted(data.completedLessons?.includes(lessonIndex) || false);
        }
      } catch (error) {
        console.error("Error checking lesson completion:", error);
      } finally {
        setLoading(false);
      }
    };

    // Update last accessed lesson
    const updateAccess = async () => {
      if (!session) return;

      try {
        await fetch("/api/user-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId,
            lessonIndex,
            completed: false,
          }),
        });
      } catch (error) {
        console.error("Error updating last accessed lesson:", error);
      }
    };

    checkCompletion();
    updateAccess();
  }, [courseId, lessonIndex, session]);

  const markAsCompleted = async () => {
    if (!session) return;

    try {
      setLoading(true);
      const response = await fetch("/api/user-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          lessonIndex,
          completed: true,
        }),
      });

      if (response.ok) {
        setIsCompleted(true);
        
        // Navigate to next lesson if available
        if (hasNextLesson) {
          router.push(`/${lng}/courses/${courseId}/lessons/${nextLessonId}`);
        }
      }
    } catch (error) {
      console.error("Error marking lesson as completed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={markAsCompleted}
      disabled={loading || isCompleted}
      className="w-full mt-4"
      variant={isCompleted ? "outline" : "default"}
    >
      {loading ? (
        "Loading..."
      ) : isCompleted ? (
        <>
          <Check className="mr-2 h-4 w-4" /> Completed
        </>
      ) : (
        "Mark as Completed"
      )}
    </Button>
  );
}
