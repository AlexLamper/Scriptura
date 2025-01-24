import { Badge } from "@/components/ui/badge"
import { CourseCard } from "@/components/course-card"

type Course = {
  _id: string;
  title: string;
  category: string;
  progress: string;
  background: string;
  students: Array<{ name: string; image: string }>;
}

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps) {
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
          <CourseCard difficulty={""} tags={[]} description={"test description"} totalDuration={0} key={course._id} {...course} />
        ))}
      </div>
    </div>
  )
}
