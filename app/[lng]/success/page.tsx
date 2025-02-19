"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"

export default function SuccessPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/check-session-status?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "complete") {
            setStatus("success")
          } else {
            setStatus("error")
          }
        })
        .catch(() => setStatus("error"))
    }
  }, [sessionId])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{status === "success" ? "Payment Successful!" : "Payment Error"}</CardTitle>
          <CardDescription>
            {status === "success"
              ? "Thank you for subscribing to our Premium plan."
              : "There was an error processing your payment."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === "success" && <p>Your Premium subscription is now active. Enjoy all the benefits!</p>}
          {status === "error" && <p>Please try again or contact support if the problem persists.</p>}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => (window.location.href = "/")}>
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

