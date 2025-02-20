// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-01-27.acacia",
// });

// export async function POST(req: Request) {
//   try {
//     await req.json();

//     // Create Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "Premium Plan",
//             },
//             unit_amount: 999, // $9.99 in cents
//             recurring: {
//               interval: "month",
//             },
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "subscription",
//       success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${req.headers.get("origin")}/pricing`,
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (err: unknown) {
//     return NextResponse.json({ error: (err as Error).message }, { status: 500 });
//   }
// }
