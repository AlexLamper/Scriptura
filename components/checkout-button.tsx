"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import getStripe from "../lib/stripe-client";

interface CheckoutButtonProps {
  priceId: string;
  customerId?: string;
  className?: string;
}

export default function CheckoutButton({
  priceId,
  customerId,
  className,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId, customerId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { sessionId } = await response.json();
      
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error:", error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={loading} 
      className={className}
    >
      {loading ? "Processing..." : "Subscribe Now - €9.99/month"}
    </Button>
  );
}