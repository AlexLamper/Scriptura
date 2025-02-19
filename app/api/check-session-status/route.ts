import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_id } = req.query;

  if (typeof session_id !== "string") {
    return res.status(400).json({ error: "Invalid session_id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["customer"],
    });
    res.status(200).json(session);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
}
