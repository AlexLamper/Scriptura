import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"

const plans = [
  {
    name: "Basic",
    price: "Free",
    features: ["Access to basic courses", "Personal study tracker"],
    cta: "Sign Up",
  },
  {
    name: "Premium",
    price: "$9.99/month",
    features: [
      "All Basic features",
      "Advanced courses and resources",
      "Live webinars with theologians",
      "Ad-free experience",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Institutional",
    price: "Custom",
    features: ["All Premium features", "Custom course creation", "Dedicated support", "Analytics and reporting"],
    cta: "Contact Us",
  },
]

export default function PricingPlans() {
//   const handleSubscribe = async (planName: string) => {
//     if (planName === "Premium") {
//       const response = await fetch("/api/create-checkout-session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ plan: "premium" }),
//       })

//       const session = await response.json()
//       window.location.href = session.url
//     }
//   }

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary" : ""}`}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.price}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                // onClick={() => handleSubscribe(plan.name)}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </CardFooter>
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl">
                Most Popular
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

