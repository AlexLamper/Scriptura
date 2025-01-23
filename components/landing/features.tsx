import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Users, Lightbulb, Compass } from "lucide-react"

const features = [
  {
    title: "In-depth Bible Study",
    description: "Access comprehensive courses and resources for all levels of biblical knowledge.",
    icon: Book,
  },
  {
    title: "Community Engagement",
    description: "Connect with fellow believers, join study groups, and participate in discussions.",
    icon: Users,
  },
  {
    title: "Interactive Learning",
    description: "Engage with multimedia content, quizzes, and practical applications of Scripture.",
    icon: Lightbulb,
  },
  {
    title: "Personalized Journey",
    description: "Track your progress and receive tailored recommendations for your spiritual growth.",
    icon: Compass,
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Scriptura?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-4 text-red-500" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

