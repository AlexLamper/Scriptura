import type React from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { WelcomeCard } from "../../../components/dashboard/WelcomeCard"
import { StudyBibleCard } from "../../../components/dashboard/StudyBibleCard"
import { DailyVerseCard } from "../../../components/dashboard/DailyVerseCard"
import { RecentNotesCard } from "../../../components/dashboard/RecentNotesCard"
import { CoursesCard } from "../../../components/dashboard/CoursesCard"

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
    <div className="w-full pb-2 pt-0">
      {/* Welcome Section - Full Width */}
      <div className="mb-2">
        <WelcomeCard lng={lng} />
      </div>

      {/* Study Bible and Daily Verse - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2 items-stretch">
        {/* Study Bible Section - Takes 2/3 width */}
        <div className="md:col-span-2">
          <StudyBibleCard lng={lng} />
        </div>
        
        {/* Daily Bible Verse - Takes 1/3 width */}
        <div className="md:col-span-1">
          <DailyVerseCard lng={lng} />
        </div>
      </div>

      {/* Bible Studies and Recent Notes - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-stretch">
        {/* Bible Studies - Takes 2/3 width */}
        <div className="md:col-span-2">
          <CoursesCard lng={lng} />
        </div>
        
        {/* Recent Notes - Takes 1/3 width */}
        <div className="md:col-span-1">
          <RecentNotesCard lng={lng} />
        </div>
      </div>
    </div>
  )
}



