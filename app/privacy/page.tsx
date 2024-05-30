import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <section>
      <Header />
      <div className="container mx-auto px-4 py-8 mt-24 max-w-4xl mb-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-500">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Last updated: 17 May 2024
        </p>

        <div className="space-y-6">
          <p>
            Thank you for being part of Zylo (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;). We are committed to protecting your personal
            information and your right to privacy. If you have any questions or
            concerns about this privacy notice you can reach out to us.
          </p>
          <p>
            This notice explains how we collect, use, and share
            (&quot;process&quot;) your information when you:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Visit our websites at{" "}
              <a
                href="https://zylo-bio.vercel.app/"
                className="text-blue-600 hover:underline"
              >
                zylo-bio.vercel.app
              </a>{" "}
            </li>
            <li>Engage with us in sales, marketing, or events</li>
          </ul>
          <p>
            &quot;Website&quot; refers to any site of ours that links to this
            policy. &quot;Services&quot; include our Website and related
            services.
          </p>
          <p>
            This notice explains what information we collect, how we use it, and
            your rights. If you disagree with our policies, please stop using
            our Services. For questions, contact us at discord.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Privacy Rights</h2>
          <p>
            In some regions (like the EEA, UK, and Canada), you have rights
            under data protection laws, including:
          </p>
          <br />
          <ul className="list-disc list-inside space-y-2">
            <li>Requesting access and a copy of your personal information.</li>
            <li>Requesting rectification or erasure.</li>
            <li>Restricting the processing of your personal information.</li>
            <li>Data portability, if applicable.</li>
            <li>Objecting to the processing of your personal information.</li>
          </ul>
          <br />
          <p>
            To make a request, please contact us using the details provided. We
            will act upon any request in accordance with applicable laws. If you
            are in the EEA or UK and believe we are processing your data
            unlawfully, you can complain to your local data protection
            authority.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Age Limit</h2>
          <p>
            This webapp is not for use by individuals under 13. We do not
            knowingly collect personal information from children under 13. If
            you believe your child has provided personal information, please
            contact us for deletion.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Analytics</h3>
          <p>
            We use Plausible Analytics to understand visitor trends. Plausible
            is privacy-focused, self-hosted, and does not use cookies or store
            personal information. See their{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Data Policy
            </a>
            .
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            Information We Collect
          </h2>
          <p>
            We collect personal information you voluntarily provide when
            interacting with our services. This may include email addresses,
            Discord IDs, and payment information. We do not process sensitive
            information. Payment data is stored by Tebex (
            <a href="#" className="text-blue-600 hover:underline">
              privacy notice here
            </a>
            ).
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
          <p>
            You can refuse browser cookies, but this may affect website access.
            Our system will issue cookies unless browser settings are adjusted
            to refuse them.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Websites</h2>
          <p>
            We are not responsible for the privacy practices of linked
            third-party websites. Transactions and personal data shared with
            third parties are governed by their privacy policies.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Use of Information</h2>
          <p>We use collected information to:</p>
          <br />
          <ul className="list-disc list-inside space-y-2">
            <li>Present our website and its contents.</li>
            <li>Provide information on programs, services, or products.</li>
            <li>Process transactions and registrations.</li>
            <li>Improve services based on usage trends.</li>
            <li>Comply with legal obligations and enforce our rights.</li>
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">California Residents</h2>
          <p>
            California residents can request information about our data sharing
            practices under the &quot;Shine The Light&quot; law and request the
            removal of unwanted data. Contact us at discord for such requests.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            Updates to this Notice
          </h2>
          <p>
            We may update this notice periodically. The revised date will
            indicate changes. We will notify you of material changes via
            prominent notice or direct communication. Review this notice
            frequently to stay informed about our data protection practices.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>For questions or comments, reach out to us on discord.</p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            Data Review, Update, or Deletion
          </h2>
          <p>
            You can request access to, update, or delete your personal
            information by visiting{" "}
            <a
              href="/dashboard/settings"
              className="text-blue-600 hover:underline"
            >
              here
            </a>
            .
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Do-Not-Track Signals</h2>
          <p>
            We do not currently respond to Do-Not-Track signals as there is no
            standard yet. We will update our practices if a standard is adopted.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p>
            We use reasonable security measures to protect your personal
            information. However, no electronic transmission is entirely secure.
            You transmit personal information at your own risk and should access
            our services within a secure environment.
          </p>
        </div>
      </div>

      <Footer />
    </section>
  );
}
