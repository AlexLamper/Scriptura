"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import getStripe from "../lib/stripe-client";
import { useToast } from "../hooks/use-toast";

interface CheckoutButtonProps {
  priceId?: string;
  customerId?: string;
  className?: string;
}

export default function CheckoutButton({
  priceId,
  customerId,
  className,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    if (!priceId) {
      toast({
        title: "Configuration Error",
        description: "Missing price ID. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    console.log("[CheckoutButton] Starting checkout process");

    try {
      console.log("[CheckoutButton] Making API request with:", { priceId, customerId });
      
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId, customerId }),
      });

      console.log("[CheckoutButton] API response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("[CheckoutButton] API error:", errorData);
        throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("[CheckoutButton] API response data:", data);

      if (!data.sessionId) {
        throw new Error("No session ID returned from API");
      }

      const stripe = await getStripe();
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      console.log("[CheckoutButton] Redirecting to Stripe checkout");
      const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("[CheckoutButton] Error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={loading || !priceId} 
      className={className}
    >
      {loading ? "Processing..." : "Subscribe Now - €9.99/month"}
    </Button>
  );
}