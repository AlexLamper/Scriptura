import type React from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { WelcomeCard } from "../../../components/dashboard/WelcomeCard"
import { DailyVerseCard } from "../../../components/dashboard/DailyVerseCard"
import { RecentNotesCard } from "../../../components/dashboard/RecentNotesCard"
// import { SummaryCard } from "../../../components/dashboard/SummaryCard"
// import { HomeworkCompletionRatesCard } from "../../../components/dashboard/HomeworkCompletionRatesCard"
// import { AssignmentsCard } from "../../../components/dashboard/AssignmentsCard"
import { CoursesCard } from "../../../components/dashboard/CoursesCard"
// import { BarChart } from "../../../components/dashboard/BarChart"
// import { FileText, ClipboardList, BookOpen } from "lucide-react"

interface DashboardPageProps {
  params: Promise<{ lng: string }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const session = await getServerSession()
  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }

  const { lng } = await params

  return (
    <div className="container lg:px-0 pb-2 pt-0">
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <WelcomeCard lng={lng} />
        <DailyVerseCard lng={lng} />
        
        {/* Summary Cards */}
        {/* <div className="lg:col-span-3 grid gap-6 md:grid-cols-3">
          <SummaryCard
            icon={<FileText className="h-6 w-6 text-gray-500" />}
            value="20/25"
            description="Courses completed"
          />
          <SummaryCard
            icon={<ClipboardList className="h-6 w-6 text-gray-500" />}
            value="42/46"
            description="Quizzes completed"
          />
          <SummaryCard
            icon={<BookOpen className="h-6 w-6 text-gray-500" />}
            value="24/28"
            description="Study materials completed"
          />
        </div> */}

        {/* Featured Courses */}
        <CoursesCard lng={lng} />
        
        {/* Right sidebar */}
        <div className="space-y-6">
          <RecentNotesCard lng={lng} />
          {/* <HomeworkCompletionRatesCard BarChart={BarChart} />
          <AssignmentsCard /> */}
        </div>
      </div>
    </div>
  )
}



