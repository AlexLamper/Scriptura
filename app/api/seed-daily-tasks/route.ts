import { NextResponse } from "next/server"
import connectMongoDB from "../../../libs/mongodb"
import DailyBibleTask from "../../../models/DailyBibleTask"
import { dailyBibleTasks } from "../../../lib/dailyBibleTasks"
import User from "../../../models/User"
import { getServerSession } from "next-auth"

export async function POST() {
  try {
    const session = await getServerSession()
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    await connectMongoDB()
    const user = await User.findOne({ email: session.user.email })
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 })
    }

    await DailyBibleTask.deleteMany({})
    await DailyBibleTask.insertMany(dailyBibleTasks)

    return NextResponse.json({ message: `Seeded ${dailyBibleTasks.length} tasks` })
  } catch (error) {
    console.error("Error seeding tasks:", error)
    return NextResponse.json({ error: "Failed to seed tasks" }, { status: 500 })
  }
}