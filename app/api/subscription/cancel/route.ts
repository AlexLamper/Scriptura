import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../lib/authOptions"
import connectMongoDB from "../../../../lib/mongodb"
import User from "../../../../models/User"
import stripe from "../../../../lib/stripe"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
  try {
    // Get the current user from the session
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    await connectMongoDB()

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if the user is subscribed and has a subscription ID
    if (!user.subscribed || !user.stripeSubscriptionId) {
      return NextResponse.json({ error: "No active subscription found" }, { status: 400 })
    }

    // Cancel the subscription at period end (this allows the user to continue using the subscription until the end of the current billing period)
    const subscription = await stripe.subscriptions.update(user.stripeSubscriptionId, {
      cancel_at_period_end: true,
    })

    // Get the cancellation date
    const currentPeriodEnd = new Date(subscription.current_period_end * 1000)

    return NextResponse.json({
      success: true,
      message: "Subscription will be canceled at the end of the billing period",
      cancelDate: currentPeriodEnd,
    })
  } catch (error) {
    console.error("Error canceling subscription:", error)
    return NextResponse.json(
      {
        error: "Error canceling subscription",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
