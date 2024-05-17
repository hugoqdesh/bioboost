import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="container mx-auto px-4 py-8 mt-24 max-w-4xl mb-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-500">
          Purchase Policy
        </h1>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Last updated: 17 May 2024
        </p>

        <div className="space-y-6">
          <p>
            By completing a purchase on bioBoost and using BioBoost you agree to
            the terms and conditions stated below.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">TOS Compliance</h2>
          <p>
            The user will comply with BioBoost Terms of Service, which can be
            found at our{" "}
            <Link href="/tos" className="text-blue-500">
              {" "}
              Terms of Service notice.
            </Link>
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Recovery Agreement</h2>
          <p>
            In the event of a blacklist or ban from BioBoost services, the user
            agrees to forfeit any and all claims to funds used to purchase any
            BioBoost related product or service. The user also agrees to forfeit
            the services and/or items purchased entirely and permanently in the
            event of a ban from BioBoost services.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">
            Chargeback Agreement and Refund Policy
          </h3>
          <p>
            The user will acknowledge that any and all purchased products and
            services are nonrefundable. In the event of filing for or initiating
            a Chargeback on any BioBoost purchase, the user will be permanently
            banned and blacklisted from any and all BioBoost core and related
            services.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Support Policy</h3>
          <p>
            If the user has purchased a custom product that is not exactly what
            was initially requested when paid for, and are dissatisfied as a
            result of this, they must contact us at X. This must be done within
            48 hours of the disbursement of the service or product. The user
            agrees to a 7 day timeframe for remediation of the issue.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
