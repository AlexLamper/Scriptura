import { NextResponse, type NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/authOptions"
import connectMongoDB from "../../../lib/mongodb"
import User from "../../../models/User"
import DailyBibleProgress from "../../../models/DailyBibleProgress"
import { dailyBibleTasks } from "../../../lib/dailyBibleTasks"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectMongoDB()
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    let progress = await DailyBibleProgress.findOne({ user: user._id })
    if (!progress) {
      progress = new DailyBibleProgress({ user: user._id })
      await progress.save()
    }

    const today = new Date()
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const completedToday = progress.lastCompletedAt && progress.lastCompletedAt >= startOfToday
    const dayNumber = completedToday ? progress.currentDay - 1 : progress.currentDay
    const task = dailyBibleTasks.find((t) => t.day === dayNumber)

    return NextResponse.json({ task: task || null, completed: completedToday })
  } catch (error) {
    console.error("Error fetching daily task:", error)
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 })
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectMongoDB()
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    let progress = await DailyBibleProgress.findOne({ user: user._id })
    if (!progress) {
      progress = new DailyBibleProgress({ user: user._id })
    }

    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const alreadyDone = progress.lastCompletedAt && progress.lastCompletedAt >= startOfToday
    if (!alreadyDone) {
      progress.lastCompletedAt = now
      progress.currentDay += 1
      await progress.save()
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating progress:", error)
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 })
  }
}