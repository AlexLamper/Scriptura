import CheckoutButton from "../../../components/checkout-button";
import { BookOpen, CheckCircle, Shield, Sparkles } from "lucide-react";

const PRICE_ID = process.env.STRIPE_PRICE_ID;

if (!PRICE_ID) {
  console.error("[SubscribePage] Missing STRIPE_PRICE_ID environment variable");
}

export default function SubscribePage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 p-4 rounded-lg border">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Scriptura Pro
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
            Deepen your biblical knowledge with premium access
          </p>
        </header>

        <section className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 rounded-lg shadow-sm border dark:border-indigo-900/30 p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Monthly Subscription
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Full access to all premium features
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800 dark:text-white">
                €9.99
                <span className="text-xl font-normal text-gray-500 dark:text-gray-400">
                  /month
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Cancel anytime</p>
            </div>
          </div>

          <div className="border-t border-b border-gray-100 dark:border-gray-800 py-6 mb-8">
            <h3 className="font-semibold text-2xl mb-4 text-gray-800 dark:text-white">
              What&apos;s included:
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-800 dark:text-white">
                    Complete Course Library
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-base">
                    Access all current and future Bible courses
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-800 dark:text-white">
                    Advanced Study Tools
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-base">
                    Note-taking, bookmarking, and cross-referencing
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-800 dark:text-white">
                    Personalized Study Plans
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-base">
                    Custom learning paths based on your interests
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-800 dark:text-white">
                    Ad-Free Experience
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-base">
                    Enjoy uninterrupted study sessions
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
              <div className="flex items-center mb-2">
                <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                <h3 className="font-medium dark:text-white text-lg">40+ Courses</h3>
              </div>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Comprehensive biblical curriculum
              </p>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30">
              <div className="flex items-center mb-2">
                <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
                <h3 className="font-medium dark:text-white text-lg">Premium Content</h3>
              </div>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Exclusive resources and materials
              </p>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-pink-100 dark:border-pink-900/30">
              <div className="flex items-center mb-2">
                <Shield className="h-6 w-6 text-pink-600 dark:text-pink-400 mr-2" />
                <h3 className="font-medium dark:text-white text-lg">Secure Access</h3>
              </div>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Study on any device, anytime
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <CheckoutButton
              priceId={PRICE_ID}
              className="w-full md:w-auto text-xl py-6 px-8"
            />
          </div>
        </section>
      </div>
    </main>
  );
}