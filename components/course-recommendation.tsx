import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function CourseRecommendation() {
  return (
    <div className="bg-gray-900 text-white rounded-xl p-6">
      <Badge className="bg-[#FFD700] text-black mb-4">Biblical Studies</Badge>
      <h3 className="text-xl font-bold mb-4">Discovering the Psalms: Passion, Promise, and Praise</h3>
      <p className="text-gray-400 mb-4">Popular among students</p>
      <div className="flex items-center gap-2 mb-6">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <Avatar key={i} className="w-8 h-8 border-2 border-gray-900">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U{i}</AvatarFallback>
            </Avatar>
          ))}
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-xs">+100</div>
        </div>
      </div>
      <Button className="w-full bg-red-500 hover:bg-red-600">Enroll Now</Button>
    </div>
  )
}

