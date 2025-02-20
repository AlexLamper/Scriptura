import { type NextRequest, NextResponse } from "next/server"
// import Stripe from "stripe"

// Comment out the Stripe initialization
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2023-10-16" as "2025-01-27.acacia",
// });


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const session_id = searchParams.get("session_id")

  if (!session_id) {
    return NextResponse.json({ error: "Invalid session_id" }, { status: 400 })
  }

  try {
    // const session = await stripe.checkout.sessions.retrieve(session_id, {
    //   expand: ["customer"],
    // })
    // return NextResponse.json(session)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

