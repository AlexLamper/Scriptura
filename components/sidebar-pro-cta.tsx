"use client"

import { Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SidebarProCTA() {
  const router = useRouter()

  return (
    <div className="mt-auto px-3 pb-4">
      <div
        onClick={() => router.push("/subscribe")}
        className="bg-[#798777]/8 dark:bg-[#798777]/12 shadow-sm border border-[#798777]/20 dark:border-[#798777]/30 overflow-hidden transition-colors duration-300 p-3 cursor-pointer flex items-center justify-between hover:bg-[#798777]/12 dark:hover:bg-[#798777]/16"
      >
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-[#798777] dark:text-[#9aaa98]" />
          <span className="font-medium text-gray-800 dark:text-gray-200">Try Scriptura Pro Now!</span>
        </div>
      </div>
    </div>
  )
}

