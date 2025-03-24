import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import CheckoutButton from "../../../components/checkout-button"

export default function SubscribePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Premium Subscription</CardTitle>
          <CardDescription>Get access to all premium features with our monthly subscription.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Price</span>
              <span className="font-medium">€9.99/month</span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4 text-green-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Feature 1: Premium Content Access</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4 text-green-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Feature 2: Priority Support</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4 text-green-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Feature 3: Advanced Analytics</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <CheckoutButton priceId="price_1R6CRIGkd9Br8GXYcZSWTg1p" />
        </CardFooter>
      </Card>
    </div>
  )
}

