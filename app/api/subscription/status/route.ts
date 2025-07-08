import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../lib/authOptions"
import connectMongoDB from "../../../../lib/mongodb"
import User from "../../../../models/User"
import stripe from "../../../../lib/stripe"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    // Get the current user from the session
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    // Connect to MongoDB
    await connectMongoDB()

    // Find the user
    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // If user has a stripeCustomerId, check their subscription status directly with Stripe
    if (user.stripeCustomerId) {
      console.log(`[Subscription Status] Checking subscription status for customer: ${user.stripeCustomerId}`)

      // Get all subscriptions for this customer
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: "active",
        limit: 1,
      })

      const hasActiveSubscription = subscriptions.data.length > 0

      console.log(`[Subscription Status] Customer has active subscription: ${hasActiveSubscription}`)

      // If subscription status doesn't match what's in our database, update it
      if (hasActiveSubscription !== user.subscribed) {
        console.log(
          `[Subscription Status] Updating subscription status from ${user.subscribed} to ${hasActiveSubscription}`,
        )

        // If there's an active subscription, store its ID
        let stripeSubscriptionId = user.stripeSubscriptionId
        if (hasActiveSubscription && subscriptions.data[0]) {
          stripeSubscriptionId = subscriptions.data[0].id
        }

        // Update the user record
        user.subscribed = hasActiveSubscription
        user.stripeSubscriptionId = stripeSubscriptionId
        await user.save()

        console.log(`[Subscription Status] Updated user ${user._id} subscription status to ${hasActiveSubscription}`)
      }

      return NextResponse.json({
        subscribed: user.subscribed,
        stripeCustomerId: user.stripeCustomerId,
        stripeSubscriptionId: user.stripeSubscriptionId,
      })
    }

    // If no stripeCustomerId, they're definitely not subscribed
    return NextResponse.json({
      subscribed: false,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
    })
  } catch (error) {
    console.error("Error checking subscription status:", error)
    return NextResponse.json(
      {
        error: "Error checking subscription status",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

// POST endpoint to manually sync subscription status
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
  try {
    // Get the current user from the session
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    // Connect to MongoDB
    await connectMongoDB()

    // Find the user
    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // If user has no stripeCustomerId, they can't be subscribed
    if (!user.stripeCustomerId) {
      return NextResponse.json({
        message: "User has no Stripe customer ID",
        subscribed: false,
      })
    }

    // Get all subscriptions for this customer
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      limit: 100,
    })

    // Check if there's any active subscription
    const activeSubscription = subscriptions.data.find((sub) => sub.status === "active")

    // Update user subscription status
    user.subscribed = !!activeSubscription
    if (activeSubscription) {
      user.stripeSubscriptionId = activeSubscription.id
    }

    await user.save()

    return NextResponse.json({
      message: "Subscription status synced successfully",
      subscribed: user.subscribed,
      stripeSubscriptionId: user.stripeSubscriptionId,
    })
  } catch (error) {
    console.error("Error syncing subscription status:", error)
    return NextResponse.json(
      {
        error: "Error syncing subscription status",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
