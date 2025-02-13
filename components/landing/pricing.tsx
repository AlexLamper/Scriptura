import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Basic",
    price: "Free",
    features: ["Access to basic courses", "Community forum participation", "Personal study tracker"],
    cta: "Sign Up",
    popular: false,
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
    popular: false,
  },
]

export function Pricing() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={plan.popular ? "border-red-500 border-2" : ""}>
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                {plan.popular && (
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Most Popular
                  </span>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold mb-4">{plan.price}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{plan.cta}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

