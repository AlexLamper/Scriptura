import CheckoutButton from "../../../components/checkout-button"
import { CheckCircle } from "lucide-react"

const PRICE_ID = process.env.STRIPE_PRICE_ID

if (!PRICE_ID) {
  console.error("[SubscribePage] Missing STRIPE_PRICE_ID environment variable")
}

export default function SubscribePage() {
  return (
    <main className="h-screen overflow-hidden bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-0 py-0 h-full flex flex-col">
        {/* Header Section */}
        <header className="text-center py-6 px-4 flex-shrink-0">
          <h1 className="text-4xl font-['Merriweather'] font-bold text-gray-800 dark:text-white mb-2">Scriptura Pro</h1>
          <p className="text-lg font-['Inter'] text-gray-600 dark:text-gray-500">
            Everything you need for deeper biblical study
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 py-6 lg:px-12 flex-1 overflow-hidden mx-auto text-center">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-3 overflow-y-auto pr-4 mx-auto text-center">

          {/* Sidebar - Pricing & CTA */}
          <div className="flex flex-col justify-center mx-auto text-center">
            <div className="p-6 lg:p-0">
              <div className="mb-6 text-center">
                <div className="text-5xl font-['Merriweather'] font-bold text-gray-800 dark:text-white mb-1">€9.99</div>
                <div className="text-gray-600 dark:text-gray-500 font-['Inter'] text-xs">/month, billed monthly</div>
              </div>

              <CheckoutButton priceId={PRICE_ID} className="w-full px-8 py-3 text-base font-semibold h-auto whitespace-normal" />

              <div className="space-y-2 mt-4">
                <div className="flex items-center text-xs font-['Inter'] text-gray-600 dark:text-gray-500">
                  <CheckCircle className="h-3 w-3 mr-2 text-[#798777] dark:text-[#9aaa98] flex-shrink-0" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center text-xs font-['Inter'] text-gray-600 dark:text-gray-500">
                  <CheckCircle className="h-3 w-3 mr-2 text-[#798777] dark:text-[#9aaa98] flex-shrink-0" />
                  <span>No commitment</span>
                </div>
                <div className="flex items-center text-xs font-['Inter'] text-gray-600 dark:text-gray-500">
                  <CheckCircle className="h-3 w-3 mr-2 text-[#798777] dark:text-[#9aaa98] flex-shrink-0" />
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  )
}
