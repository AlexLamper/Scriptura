import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

const nextLessons = [
  {
    id: 1,
    title: "Introduction to Genesis",
    course: "Old Testament Survey",
    teacher: { name: "Dr. Sarah Johnson", image: "/placeholder.svg" },
    duration: "45 min",
  },
  {
    id: 2,
    title: "The Gospels: An Overview",
    course: "New Testament Studies",
    teacher: { name: "Pastor Michael Lee", image: "/placeholder.svg" },
    duration: "60 min",
  },
  {
    id: 3,
    title: "Understanding Biblical Hebrew",
    course: "Biblical Languages",
    teacher: { name: "Prof. David Cohen", image: "/placeholder.svg" },
    duration: "90 min",
  },
  {
    id: 4,
    title: "The Parables of Jesus",
    course: "Teachings of Christ",
    teacher: { name: "Rev. Emily Watson", image: "/placeholder.svg" },
    duration: "50 min",
  },
  {
    id: 5,
    title: "Christian Ethics in Modern Times",
    course: "Applied Theology",
    teacher: { name: "Dr. Thomas Wright", image: "/placeholder.svg" },
    duration: "75 min",
  },
]

export function NextLessons() {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My next Bible lessons</h2>
        <Button variant="link" className="text-red-500">
          View all lessons
        </Button>
      </div>
      <div className="space-y-6">
        {nextLessons.map((lesson) => (
          <div key={lesson.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-medium">{lesson.title}</h3>
                <p className="text-sm text-gray-500">{lesson.course}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={lesson.teacher.image} />
                <AvatarFallback>{lesson.teacher.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-500">{lesson.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

