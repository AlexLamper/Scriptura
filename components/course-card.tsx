import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Bookmark } from "lucide-react"

interface CourseCardProps {
  title: string
  category: string
  progress: string
  background: string
  students: Array<{ name: string; image: string } | { more: number }>
}

export function CourseCard({ title, category, progress, background, students }: CourseCardProps) {
  return (
    <div className={`${background} rounded-xl p-6 relative`}>
      <Badge variant="secondary" className="mb-2">
        {category}
      </Badge>
      <Bookmark className="absolute top-4 right-4" />
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {students.map((student, index) =>
            "more" in student ? (
              <div key={index} className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-xs">
                +{student.more}
              </div>
            ) : (
              <Avatar key={index} className="w-8 h-8 border-2 border-white">
                <AvatarImage src={student.image} />
                <AvatarFallback>{student.name[0]}</AvatarFallback>
              </Avatar>
            ),
          )}
        </div>
        <div className="text-sm">
          <span>Progress</span>
          <p className="font-medium">{progress} lessons</p>
        </div>
        <Button>Continue</Button>
      </div>
    </div>
  )
}

