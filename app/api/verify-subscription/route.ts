import { type NextRequest, NextResponse } from "next/server"
import stripe from "../../../lib/stripe"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/authOptions"
import connectMongoDB from "../../../lib/mongodb"
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

    console.log(`[Verify Subscription] Verifying session ${sessionId} for user ${session.user.email}`)

    // Retrieve the Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)

    // Connect to MongoDB
    await connectMongoDB()

    // Find the user
    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update the user's Stripe customer ID if it's in the checkout session
    if (checkoutSession.customer) {
      user.stripeCustomerId = checkoutSession.customer as string
    }

    // If this is a subscription checkout
    if (checkoutSession.mode === "subscription" && checkoutSession.subscription) {
      console.log(`[Verify Subscription] Found subscription: ${checkoutSession.subscription}`)

      // Get the subscription details
      const subscriptionId = checkoutSession.subscription as string
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)

      // Update the user's subscription status
      user.subscribed = subscription.status === "active" || subscription.status === "trialing"
      user.stripeSubscriptionId = subscriptionId

      console.log(`[Verify Subscription] Setting subscription status to: ${user.subscribed}`)
    } else {
      console.log(`[Verify Subscription] Not a subscription checkout or no subscription found`)

      // If the user has a Stripe customer ID, check for active subscriptions
      if (user.stripeCustomerId) {
        const subscriptions = await stripe.subscriptions.list({
          customer: user.stripeCustomerId,
          status: "active",
          limit: 1,
        })

        if (subscriptions.data.length > 0) {
          user.subscribed = true
          user.stripeSubscriptionId = subscriptions.data[0].id
          console.log(`[Verify Subscription] Found active subscription: ${user.stripeSubscriptionId}`)
        }
      }
    }

    // Save the updated user
    await user.save()

    console.log(`[Verify Subscription] Updated user ${user._id}, subscribed: ${user.subscribed}`)

    return NextResponse.json({
      success: true,
      subscribed: user.subscribed,
      stripeCustomerId: user.stripeCustomerId,
      stripeSubscriptionId: user.stripeSubscriptionId,
    })
  } catch (error) {
    console.error("[Verify Subscription] Error verifying subscription:", error)
    return NextResponse.json(
      {
        error: "Error verifying subscription",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
