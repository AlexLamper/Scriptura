import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const course = {
  id: "1",
  title: "Introduction to the Old Testament",
  description: "Explore the rich history and teachings of the Old Testament in this comprehensive course.",
  instructor: {
    name: "Dr. Sarah Johnson",
    image: "/placeholder.svg",
  },
  progress: 35,
  totalLessons: 20,
  completedLessons: 7,
  duration: "10 weeks",
  level: "Beginner",
}

const lessons = [
  { id: "1", title: "Introduction to Genesis", duration: "45 min" },
  { id: "2", title: "The Creation Story", duration: "60 min" },
  { id: "3", title: "Noah and the Flood", duration: "55 min" },
  { id: "4", title: "Abraham's Covenant", duration: "50 min" },
  { id: "5", title: "Joseph in Egypt", duration: "65 min" },
]

export default function CoursePage({ params }: { params: { courseId: string } }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/*Removed Header*/}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage src={course.instructor.image} alt={course.instructor.name} />
              <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{course.instructor.name}</p>
              <p className="text-sm text-gray-500">Instructor</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>Duration: {course.duration}</span>
            <span>Level: {course.level}</span>
            <span>
              Progress: {course.completedLessons}/{course.totalLessons} lessons
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {lessons.map((lesson) => (
                    <li key={lesson.id} className="flex justify-between items-center">
                      <Button variant="link" asChild>
                        <a href={`/courses/${params.courseId}/lessons/${lesson.id}`}>{lesson.title}</a>
                      </Button>
                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={course.progress} className="mb-2" />
                <p className="text-sm text-gray-600 mb-4">{course.progress}% complete</p>
                <Button className="w-full">Continue Course</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

