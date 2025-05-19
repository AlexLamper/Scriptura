import { type NextRequest, NextResponse } from "next/server"
import stripe from "../../../lib/stripe"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/authOptions"
import connectMongoDB from "../../../libs/mongodb"
import User from "../../../models/User"

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json()

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })
    }

    // Get the current user from the session
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    // Retrieve the Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)

    if (checkoutSession.mode !== "subscription") {
      return NextResponse.json({ error: "Not a subscription checkout session" }, { status: 400 })
    }

    // Get the subscription ID from the checkout session
    const subscriptionId = checkoutSession.subscription as string

    if (!subscriptionId) {
      return NextResponse.json({ error: "No subscription found in checkout session" }, { status: 400 })
    }

    // Retrieve the subscription to check its status
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    if (subscription.status !== "active") {
      return NextResponse.json({ error: "Subscription is not active" }, { status: 400 })
    }

    // Connect to MongoDB
    await connectMongoDB()

    // Update the user's subscription status
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        subscribed: true,
        stripeCustomerId: checkoutSession.customer as string,
        stripeSubscriptionId: subscriptionId,
      },
      { new: true },
    )

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      subscribed: true,
    })
  } catch (error) {
    console.error("Error verifying subscription:", error)
    return NextResponse.json(
      {
        error: "Error verifying subscription",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
