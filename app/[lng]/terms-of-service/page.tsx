import { Button } from "../../../components/ui/button"
import Link from "next/link"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using Scriptura, you agree to be bound by these Terms of Service. If you do not agree to
            these terms, please do not use our service.
          </p>

          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p className="mb-4">
            Scriptura is an online platform for Bible study and community engagement. We provide access to biblical
            content, courses, and community features.
          </p>

          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your account and password. You agree to accept
            responsibility for all activities that occur under your account.
          </p>

          <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
          <p className="mb-4">
            You agree to use Scriptura only for lawful purposes and in a way that does not infringe the rights of,
            restrict or inhibit anyone else&apos;s use and enjoyment of the platform.
          </p>

          <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
          <p className="mb-4">
            The content on Scriptura, including text, graphics, logos, and software, is the property of Scriptura or its
            content suppliers and is protected by copyright laws.
          </p>

          <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
          <p className="mb-4">
            We reserve the right to terminate or suspend access to our service immediately, without prior notice or
            liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify or replace these Terms at any time. It is your responsibility to check the
            Terms periodically for changes.
          </p>

          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at support@scriptura.com.
          </p>
        </div>
        <div className="text-center">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

