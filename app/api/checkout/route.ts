import { NextRequest, NextResponse } from "next/server";
import stripe from "../../../lib/stripe";

export async function POST(req: NextRequest) {
  console.log("[Checkout API] Received request");
  
  try {
    const body = await req.json();
    console.log("[Checkout API] Request body:", body);
    
    const { priceId, customerId } = body;

    if (!priceId) {
      console.error("[Checkout API] Missing priceId in request");
      return NextResponse.json(
        { error: "Missing priceId" },
        { status: 400 }
      );
    }

    console.log("[Checkout API] Creating Stripe session with:", {
      priceId,
      customerId,
      origin: req.nextUrl.origin
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/canceled`,
      customer: customerId || undefined,
      allow_promotion_codes: true,
      billing_address_collection: "required",
    });

    console.log("[Checkout API] Stripe session created:", session.id);
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("[Checkout API] Error creating checkout session:", error);
    return NextResponse.json(
      { 
        error: "Error creating checkout session",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}