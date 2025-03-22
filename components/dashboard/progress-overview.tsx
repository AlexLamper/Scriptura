import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

const ProgressOverview = () => {

    const COLORS = {
        blue: "#2563eb",
        blueLight: "#3b82f6",
        blueDark: "#1d4ed8",
        blueHover: "#1e40af",
      }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
        <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Courses Completed</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold">2</div>
            <div className="text-sm text-muted-foreground">of 6 courses</div>
            </div>
            <div className="h-2 mt-2 bg-muted rounded-full overflow-hidden">
            <div
                className="h-full rounded-full"
                style={{ backgroundColor: COLORS.blue, width: "33%" }}
            ></div>
            </div>
        </CardContent>
        </Card>

        <Card>
        <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lessons Completed</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold">38</div>
            <div className="text-sm text-muted-foreground">of 218 lessons</div>
            </div>
            <div className="h-2 mt-2 bg-muted rounded-full overflow-hidden">
            <div
                className="h-full rounded-full"
                style={{ backgroundColor: COLORS.blue, width: "17%" }}
            ></div>
            </div>
        </CardContent>
        </Card>

        <Card>
        <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quiz Score Average</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold">87%</div>
            <div className="text-sm" style={{ color: COLORS.blue }}>
                <span>+5% from last month</span>
            </div>
            </div>
            <div className="h-2 mt-2 bg-muted rounded-full overflow-hidden">
            <div
                className="h-full rounded-full"
                style={{ backgroundColor: COLORS.blue, width: "87%" }}
            ></div>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}

export default ProgressOverview