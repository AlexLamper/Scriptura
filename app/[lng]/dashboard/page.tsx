import type React from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { WelcomeCard } from "../../../components/dashboard/WelcomeCard"
import { StudyBibleCard } from "../../../components/dashboard/StudyBibleCard"
import { DailyVerseCard } from "../../../components/dashboard/DailyVerseCard"
import { RecentNotesCard } from "../../../components/dashboard/RecentNotesCard"

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
    <div className="w-full pb-6 pt-0">
      <div className="mb-6">
        <WelcomeCard lng={lng} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 items-stretch">
        <div className="md:col-span-2">
          <StudyBibleCard lng={lng} />
        </div>
        
        <div className="md:col-span-1">
          <DailyVerseCard lng={lng} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 items-stretch">
        <div>
          <RecentNotesCard lng={lng} />
        </div>
      </div>
    </div>
  )
}



