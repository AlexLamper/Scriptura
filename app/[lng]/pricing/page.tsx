"use client";

import PricingPlans from "../../../components/PricingPlans"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-900 dark:text-white">Pricing Plans</h1>
        <p className="text-xl text-center mb-12 text-gray-600 dark:text-gray-300">
          Choose the perfect plan for your learning journey
        </p>
        <PricingPlans />
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-left">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Can I switch plans later?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing
                cycle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Is there a free trial?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We offer a 7-day free trial for our Premium plan. You can cancel anytime during the trial period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We accept all major credit cards, including Visa, MasterCard, American Express, and Discover.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

