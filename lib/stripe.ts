import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required STRIPE_SECRET_KEY environment variable");
}

console.log("[Stripe Config] Initializing with API version 2023-10-16");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
  telemetry: false,
});

console.log("[Stripe Config] Mode:", process.env.STRIPE_SECRET_KEY?.startsWith('sk_') ? 'test' : 'live');

export default stripe;