import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
          Discover the Bible with <span className="text-red-500">Scriptura</span>
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Dive deep into Scripture, connect with a community of believers, and grow your faith through interactive Bible
          study.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Button asChild size="lg" className="text-lg">
            <Link href="/api/auth/signin">Sign In</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg">
            <Link href="/api/auth/signin">Sign Up</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

