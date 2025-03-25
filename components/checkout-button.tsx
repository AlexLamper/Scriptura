"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import getStripe from "../utils/stripe";

interface CheckoutButtonProps {
  priceId?: string;
  customerId?: string;
  className?: string;
}

export default function CheckoutButton({
  priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
  customerId,
  className,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, customerId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { sessionId } = await response.json();
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({ sessionId });

      if (error) console.error("Stripe checkout error:", error);
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={loading} className={className}>
      {loading ? "Processing..." : "Subscribe Now - €9.99/month"}
    </Button>
  );
}
