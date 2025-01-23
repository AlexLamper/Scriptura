import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Scriptura</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-600 hover:text-gray-900">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-gray-900">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-600 hover:text-gray-900">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-600 hover:text-gray-900">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Twitter />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Youtube />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} Scriptura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

