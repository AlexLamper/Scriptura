import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark } from "lucide-react"

interface CourseCardProps {
  title: string
  description: string
  category: string
  progress: string
  totalLessons: number
  totalDuration: number
  background: string
  students: Array<{ name: string; image: string } | { more: number }>
}

export function CourseCard({
  title,
  description,
  category,
  totalLessons,
  totalDuration,
  background,
  students = []
}: CourseCardProps) {
  const calculateProgress = (completedLessons: number, totalLessons: number) => {
    return Math.min((completedLessons / totalLessons) * 100, 100).toFixed(0);
  };

  const completedLessons = students.length; // Assuming `students` array size indicates completed lessons

  return (
    <div className={`${background} bg-white rounded-xl shadow-lg p-6 relative transition-transform transform hover:scale-105`}>
      <Badge variant="secondary" className="mb-2 text-xs uppercase font-semibold tracking-wide">
        {category}
      </Badge>
      <Bookmark className="absolute top-4 right-4 text-gray-500 hover:text-primary-500 transition-colors" />
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-700 mb-4">{description}</p>

      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {students.map((student, index) => {
            if ("more" in student) {
              return (
                <div key={index} className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
                  +{student.more}
                </div>
              );
            } else {
              return (
                <Avatar key={index} className="w-8 h-8 border-2 border-white">
                  <AvatarImage src={student.image} />
                  <AvatarFallback>{student.name[0]}</AvatarFallback>
                </Avatar>
              );
            }
          })}
        </div>

        <div className="text-sm text-gray-600">
          <span className="font-medium">Progress</span>
          <p className="font-semibold text-gray-900">{calculateProgress(completedLessons, totalLessons)}% ({completedLessons}/{totalLessons} lessons)</p>
          <span className="block mt-2">Total Duration: {totalDuration} minutes</span>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button>Continue</Button>
      </div>
    </div>
  );
}
