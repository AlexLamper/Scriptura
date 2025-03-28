import { NextRequest, NextResponse } from "next/server";
import stripe from "../../../lib/stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

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

    // Validate that we're using the correct mode (test/live) price ID
    const priceIdMode = priceId.startsWith('price_test_') ? 'test' : 'live';
    const apiKeyMode = process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_') ? 'test' : 'live';
    
    console.log("[Checkout API] Mode validation:", {
      priceIdMode,
      apiKeyMode,
      match: priceIdMode === apiKeyMode
    });

    if (priceIdMode !== apiKeyMode) {
      console.error("[Checkout API] Mode mismatch between price ID and API key");
      return NextResponse.json(
        { 
          error: "Configuration error",
          details: "Stripe API key and price ID must both be in the same mode (test or live)"
        },
        { status: 400 }
      );
    }

    console.log("[Checkout API] Creating Stripe session with:", {
      priceId,
      customerId,
      origin: req.nextUrl.origin
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "ideal", "bancontact", "p24", "sepa_debit"],
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
    
    const response = NextResponse.json({ sessionId: session.id });
    // Add CORS headers to the response
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    return response;
  } catch (error) {
    console.error("[Checkout API] Error creating checkout session:", error);
    const response = NextResponse.json(
      { 
        error: "Error creating checkout session",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
    
    // Add CORS headers to error response
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    return response;
  }
}