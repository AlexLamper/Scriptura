import { Crown } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

interface PremiumCourseLockProps {
  lng: string
}

export function PremiumCourseLock({ lng }: PremiumCourseLockProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#2a2b2f] p-8 rounded-lg max-w-md w-full text-center">
        <div className="mb-4 bg-amber-100 dark:bg-amber-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
          <Crown className="h-8 w-8 text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Premium Content</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This course is available exclusively for premium subscribers. Upgrade your account to access this and other
          premium courses.
        </p>
        <div className="flex flex-col gap-3">
          <Link href={`/${lng}/pricing`}>
            <Button className="w-full">Upgrade to Premium</Button>
          </Link>
          <Link href={`/${lng}/courses`}>
            <Button variant="outline" className="w-full">
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
