// import { NextRequest, NextResponse } from 'next/server';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2025-01-27.acacia',
//   typescript: true,
// });

// export async function POST(req: NextRequest) {
//   const body = await req.text();
//   const sig = req.headers.get('stripe-signature')!;
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
//   } catch (err) {
//     console.error('Webhook signature verification failed.', err);
//     return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'checkout.session.completed':
//       const session = event.data.object as Stripe.Checkout.Session;
//       // Fulfill the purchase, e.g., update database, send email, etc.
//       console.log(`Payment for session ${session.id} was successful.`);
//       break;
//     // Handle other event types as needed
//     default:
//       console.warn(`Unhandled event type: ${event.type}`);
//   }

//   return new NextResponse('Event received', { status: 200 });
// }

// export const config = {
//   api: {
//     bodyParser: false, // Disables body parsing to handle raw body for Stripe signature verification
//   },
// };
