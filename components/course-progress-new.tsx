// "use client"

// import { useEffect, useState, useCallback } from "react"
// import { Progress } from "./ui/progress"
// import { Button } from "./ui/button"
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"
// import { BookOpen, CheckCircle2 } from "lucide-react"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

// interface CourseProgressProps {
//   courseId: string
//   lng: string
// }

// export default function CourseProgress({ courseId, lng }: CourseProgressProps) {
//   const [isCompleted, setIsCompleted] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const { status } = useSession()
//   const router = useRouter()

//   // Create a memoized fetch function to avoid recreating it on every render
//   const fetchProgressData = useCallback(async () => {
//     if (status !== "authenticated" || !courseId) {
//       setLoading(false)
//       return
//     }

//     setLoading(true)
//     console.log("Fetching progress data for course:", courseId)

//     try {
//       // Fetch user progress
//       const progressResponse = await fetch(`/api/user-progress?courseId=${courseId}`)
//       if (progressResponse.ok) {
//         const progressData = await progressResponse.json()
//         setIsCompleted(progressData.completed || false)
//         console.log(`Course completion status: ${progressData.completed || false}`)
//       } else {
//         console.error("Failed to fetch progress data:", await progressResponse.text())
//         setIsCompleted(false)
//       }
//     } catch (error) {
//       console.error("Error fetching progress data:", error)
//       setIsCompleted(false)
//     } finally {
//       setLoading(false)
//     }
//   }, [courseId, status])

//   useEffect(() => {
//     fetchProgressData()
//   }, [fetchProgressData])

//   const handleStartCourse = () => {
//     router.push(`/${lng}/courses/${courseId}`)
//   }

//   if (loading) {
//     return (
//       <div className="space-y-3">
//         <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//         <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//       </div>
//     )
//   }

//   // Show course completion status
//   const progressPercentage = isCompleted ? 100 : 0

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between mb-2">
//         <div className="flex items-center gap-2">
//           <BookOpen className="h-4 w-4 text-gray-600 dark:text-gray-400" />
//           <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Course Progress</span>
//         </div>
//         <div className="flex items-center gap-1">
//           {isCompleted ? (
//             <CheckCircle2 className="h-4 w-4 text-green-500" />
//           ) : null}
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
//                   {progressPercentage}%
//                 </span>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{isCompleted ? "Course completed" : "Course not started"}</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </div>

//       <Progress value={progressPercentage} className="h-2" />

//       <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
//         <span>
//           {progressPercentage === 0
//             ? "Not started"
//             : progressPercentage === 100
//               ? "Completed"
//               : "In progress"}
//         </span>
//       </div>

//       <Button
//         onClick={handleStartCourse}
//         className={`w-full mb-3 ${isCompleted ? "bg-green-600 hover:bg-green-700" : ""}`}
//       >
//         {isCompleted ? "Review Course" : "Start Course"}
//       </Button>
//     </div>
//   )
// }
