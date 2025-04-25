import CheckoutButton from "../../../components/checkout-button"
import { BookOpen, CheckCircle, Clock, CreditCard, Lock, Shield, Sparkles } from "lucide-react"

const PRICE_ID = process.env.STRIPE_PRICE_ID

if (!PRICE_ID) {
  console.error("[SubscribePage] Missing STRIPE_PRICE_ID environment variable")
}

export default function SubscribePage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Unlock the full Scriptura experience</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 max-w-xl mx-auto">
            Join thousands of believers who have deepened their biblical understanding with Scriptura Pro
          </p>
        </header>

        {/* Main Content Section */}
        <div className="space-y-8">
          {/* Pricing Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-5 border rounded-lg bg-gray-50 dark:bg-gray-900">
            <div>
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-800 dark:text-white">€9.99</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                <span>Cancel anytime, no questions asked</span>
              </div>
            </div>
            <CheckoutButton priceId={PRICE_ID} className="w-full sm:w-auto px-6 py-3 text-base font-medium" />
          </div>

          {/* Why Subscribe Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Why subscribers love Scriptura Pro
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex p-4 border rounded-lg">
                <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">Complete Library Access</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Unlock all 40+ courses and exclusive study materials
                  </p>
                </div>
              </div>

              <div className="flex p-4 border rounded-lg">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">Advanced Study Tools</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Note-taking, bookmarking, and cross-referencing features
                  </p>
                </div>
              </div>

              <div className="flex p-4 border rounded-lg">
                <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">Personalized Learning</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Custom study plans tailored to your interests
                  </p>
                </div>
              </div>

              <div className="flex p-4 border rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">Ad-Free Experience</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Focus on your studies without interruptions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What You'll Get Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Everything included in your subscription
            </h2>

            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-800 dark:text-white">40+ Premium Courses</span> - Comprehensive
                  biblical curriculum covering Old and New Testament
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-800 dark:text-white">Exclusive Study Materials</span> - Access
                  to commentaries, historical contexts, and scholarly insights
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-800 dark:text-white">Progress Tracking</span> - Monitor your
                  learning journey with detailed statistics
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-800 dark:text-white">Community Access</span> - Join discussions
                  with fellow believers and biblical scholars
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-800 dark:text-white">Offline Mode</span> - Download lessons to
                  study without internet connection
                </span>
              </li>
            </ul>
          </div>

          {/* Testimonial Section */}
          <div className="p-5 border rounded-lg italic text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900">
            <p>
              &quot;Scriptura Pro has transformed my Bible study routine. The in-depth courses and study tools have helped me
              understand Scripture in ways I never thought possible.&quot;
            </p>
            <p className="mt-2 font-medium text-gray-800 dark:text-white">— Sarah K., Subscribed for 8 months</p>
          </div>

          {/* Final CTA Section */}
          <div className="text-center space-y-4 py-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Start your spiritual journey today</h2>
            <CheckoutButton priceId={PRICE_ID} className="px-8 py-3 text-base font-medium" />
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-3">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>2-minute setup</span>
              </div>
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-1" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-1" />
                <span>All major cards accepted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
