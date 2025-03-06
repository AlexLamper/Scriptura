// import { BookOpen } from "lucide-react"
import { CourseGrid } from "../../../components/course-grid"
import { CourseRecommendation } from "../../../components/course-recommendation"
import { DashboardQuizzes } from "../../../components/dashboard-quizzes"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession()
  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="container mx-auto px-2 pb-8 pt-4">
        <h1 className="flex items-center text-3xl font-bold mb-8 text-gray-800 dark:text-white">
            {/* <BookOpen className="mr-2 text-red-500 dark:text-red-400" /> */}
            Dashboard
        </h1>
      <CourseGrid
        params={{
          lng: "",
        }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardQuizzes params={{
                    lng: ""
                }}          
            />
        </div>
        <CourseRecommendation
          params={{
            lng: "",
          }}
        />
      </div>
    </div>
  )
}

