import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Bible Journey?</h2>
        <p className="mb-8 text-xl">Join Scriptura today and deepen your understanding of God&apos;s Word.</p>
        <Button asChild size="lg" className="text-lg">
          <Link href="/register">Sign Up Now</Link>
        </Button>
      </div>
    </section>
  )
}

