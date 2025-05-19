import stripe from "../stripe"
import User from "../../models/User"
import connectMongoDB from "../../libs/mongodb"

/**
 * Checks if a user has an active subscription by querying Stripe directly
 * @param userId The MongoDB user ID
 * @returns Boolean indicating if the user has an active subscription
 */
export async function checkUserSubscription(userId: string): Promise<boolean> {
  try {
    // Connect to MongoDB
    await connectMongoDB()

    // Find the user
    const user = await User.findById(userId)

    if (!user || !user.stripeCustomerId) {
      return false
    }

    // Query Stripe for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: "active",
      limit: 1,
    })

    // If there's at least one active subscription, the user is subscribed
    const isSubscribed = subscriptions.data.length > 0

    // If the database status doesn't match the Stripe status, update it
    if (user.subscribed !== isSubscribed) {
      user.subscribed = isSubscribed

      // If subscribed, store the subscription ID
      if (isSubscribed && subscriptions.data[0]) {
        user.stripeSubscriptionId = subscriptions.data[0].id
      } else {
        user.stripeSubscriptionId = null
      }

      await user.save()
    }

    return isSubscribed
  } catch (error) {
    console.error("Error checking user subscription:", error)
    return false
  }
}

/**
 * Syncs a user's subscription status with Stripe
 * @param userId The MongoDB user ID
 * @returns Updated user object with subscription status
 */
export async function syncUserSubscription(userId: string) {
  try {
    // Connect to MongoDB
    await connectMongoDB()

    // Find the user
    const user = await User.findById(userId)

    if (!user) {
      throw new Error("User not found")
    }

    // If user has no Stripe customer ID, they can't be subscribed
    if (!user.stripeCustomerId) {
      user.subscribed = false
      user.stripeSubscriptionId = null
      await user.save()
      return user
    }

    // Query Stripe for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      limit: 100,
    })

    // Find any active subscription
    const activeSubscription = subscriptions.data.find((sub) => sub.status === "active")

    // Update user subscription status
    user.subscribed = !!activeSubscription
    if (activeSubscription) {
      user.stripeSubscriptionId = activeSubscription.id
    } else {
      user.stripeSubscriptionId = null
    }

    await user.save()
    return user
  } catch (error) {
    console.error("Error syncing user subscription:", error)
    throw error
  }
}
