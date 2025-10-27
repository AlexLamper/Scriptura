// Dashboard component commented out - Study page is now the default
export default function ProgressOverview() {
  return null;
}

/*
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

const ProgressOverviewOld = () => {

    const COLORS = {
        green: "#798777",
        greenLight: "#9aaa98",
        greenDark: "#6a7a68",
        greenHover: "#6a7a68",
      }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),0_4px_16px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15),0_8px_24px_-4px_rgba(0,0,0,0.1)] transition-shadow duration-300 border-gray-200 dark:border-gray-700 dark:bg-[#23263a]">
        <CardHeader className="pb-2">
            <CardTitle className="text-sm font-['Inter'] font-medium text-gray-600 dark:text-gray-400">Courses Completed</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-baseline justify-between">
            <div className="text-3xl font-['Merriweather'] font-bold text-[#262626] dark:text-white">2</div>
            <div className="text-sm font-['Inter'] text-gray-600 dark:text-gray-400">of 6 courses</div>
            </div>
            <div className="h-2 mt-2 bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
                className="h-full"
                style={{ backgroundColor: COLORS.green, width: "33%" }}
            ></div>
            </div>
        </CardContent>
        </Card>

        <Card className="shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),0_4px_16px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15),0_8px_24px_-4px_rgba(0,0,0,0.1)] transition-shadow duration-300 border-gray-200 dark:border-gray-700 dark:bg-[#23263a]">
        <CardHeader className="pb-2">
            <CardTitle className="text-sm font-['Inter'] font-medium text-gray-600 dark:text-gray-400">Lessons Completed</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-baseline justify-between">
            <div className="text-3xl font-['Merriweather'] font-bold text-[#262626] dark:text-white">38</div>
            <div className="text-sm font-['Inter'] text-gray-600 dark:text-gray-400">of 218 lessons</div>
            </div>
            <div className="h-2 mt-2 bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
                className="h-full"
                style={{ backgroundColor: COLORS.green, width: "17%" }}
            ></div>
            </div>
        </CardContent>
        </Card>

        <Card className="shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),0_4px_16px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15),0_8px_24px_-4px_rgba(0,0,0,0.1)] transition-shadow duration-300 border-gray-200 dark:border-gray-700 dark:bg-[#23263a]">
        <CardHeader className="pb-2">
            <CardTitle className="text-sm font-['Inter'] font-medium text-gray-600 dark:text-gray-400">Quiz Score Average</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-baseline justify-between">
            <div className="text-3xl font-['Merriweather'] font-bold text-[#262626] dark:text-white">87%</div>
            <div className="text-sm font-['Inter']" style={{ color: COLORS.green }}>
                <span>+5% from last month</span>
            </div>
            </div>
            <div className="h-2 mt-2 bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
                className="h-full"
                style={{ backgroundColor: COLORS.green, width: "87%" }}
            ></div>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
*/