// import { BookOpen } from "lucide-react"
import { CourseGrid } from "../../../components/course-grid"
import { CourseRecommendation } from "../../../components/course-recommendation"
import { DashboardQuizzes } from "../../../components/dashboard-quizzes"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import WelcomeDashboard from "../../../components/dashboard/welcome-dashboard"
import WhereToStart from "../../../components/where-to-start"
import DailyBibleVerse from "../../../components/daily-bible-verse"

export default async function DashboardPage() {
  const session = await getServerSession()
  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="container lg:px-2 pb-8 pt-4">
      <WelcomeDashboard params={{
        lng: ""
      }} />

      <DailyBibleVerse lng="" />

      <CourseGrid
        params={{
          lng: "",
        }}
      />
      <div className="my-8">
        <hr className="dark:border-[#91969e52]" />
      </div>
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
      <div className="my-8"></div>
      <hr className="dark:border-[#91969e52]" />
      <WhereToStart params={{
        lng: "",
      }}
       />
    </div>
  )
}

