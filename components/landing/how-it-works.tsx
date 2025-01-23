import { Button } from "@/components/ui/button"
import Image from "next/image"

const steps = [
  {
    title: "Sign Up",
    description: "Create your free account to get started on your Bible study journey.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Choose Your Path",
    description: "Select from a variety of courses tailored to your interests and knowledge level.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Learn and Engage",
    description: "Study at your own pace, participate in discussions, and track your progress.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Grow Your Faith",
    description: "Apply what you've learned to deepen your understanding and strengthen your faith.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How Scriptura Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 relative">
                <Image
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <div className="absolute top-0 right-0 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg">Start Your Journey</Button>
        </div>
      </div>
    </section>
  )
}

