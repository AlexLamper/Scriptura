import { Badge } from "../components/ui/badge"
import { CourseCard } from "../components/course-card"

const courses = [
  {
    id: 1,
    title: "Introduction to the Old Testament",
    category: "Old Testament",
    progress: "5/20",
    background: "bg-[#FFD700]",
    students: [
      { name: "Student 1", image: "/placeholder.svg" },
      { name: "Student 2", image: "/placeholder.svg" },
      { name: "Student 3", image: "/placeholder.svg" },
      { more: 120 },
    ],
  },
  {
    id: 2,
    title: "New Testament Studies",
    category: "New Testament",
    progress: "12/50",
    background: "bg-[#E6E6FA]",
    students: [
      { name: "Student 1", image: "/placeholder.svg" },
      { name: "Student 2", image: "/placeholder.svg" },
      { name: "Student 3", image: "/placeholder.svg" },
      { more: 80 },
    ],
  },
  {
    id: 3,
    title: "Biblical Leadership Principles",
    category: "Christian Living",
    progress: "18/22",
    background: "bg-[#ADD8E6]",
    students: [
      { name: "Student 1", image: "/placeholder.svg" },
      { name: "Student 2", image: "/placeholder.svg" },
      { name: "Student 3", image: "/placeholder.svg" },
      { more: 24 },
    ],
  },
]

export function CourseGrid() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">My Bible Courses</h2>
      <div className="flex gap-4 mb-6">
        <Badge variant="secondary" className="bg-black text-white hover:bg-black/90">
          All courses
        </Badge>
        <Badge variant="outline">Old Testament</Badge>
        <Badge variant="outline">New Testament</Badge>
        <Badge variant="outline">Christian Living</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  )
}

