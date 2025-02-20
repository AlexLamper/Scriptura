"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session_id) {
      const fetchSession = async () => {
        try {
          const res = await fetch(`/api/checkout-session?session_id=${session_id}`);
          const data = await res.json();
          if (res.ok) {
            setSession(data);
          } else {
            setError(data.error);
          }
        } catch (err) {
          console.error(err);
          setError("An error occurred while fetching the session.");
        } finally {
          setLoading(false);
        }
      };

      fetchSession();
    }
  }, [session_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Payment Successful!</h1>
      {session && (
        <div>
          <p>Thank you, {session.customer_details.name}!</p>
          <p>Your subscription to the Premium Plan is now active.</p>
          <p>A confirmation email has been sent to {session.customer_details.email}.</p>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
