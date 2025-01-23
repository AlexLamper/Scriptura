import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Bible Study Leader",
    content:
      "Scriptura has revolutionized the way I lead Bible studies. The resources and community support are invaluable!",
    avatar: "/placeholder.svg",
  },
  {
    name: "Michael Lee",
    role: "New Believer",
    content:
      "As someone new to faith, Scriptura has been an incredible tool for learning and growing. I feel more connected to God every day.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Rachel Thompson",
    role: "Theology Student",
    content:
      "The depth of content on Scriptura is impressive. It's been a great supplement to my formal theological studies.",
    avatar: "/placeholder.svg",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

