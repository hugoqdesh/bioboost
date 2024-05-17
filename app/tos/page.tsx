import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="container mx-auto px-4 py-8 mt-24 max-w-4xl mb-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-500">
          Term of Service
        </h1>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Last updated: 17 May 2024
        </p>

        <div className="space-y-6">
          <p>
            These terms of service (the &quot;Terms&quot;) apply to BioBoost. By
            using BioBoost, you agree to be bound by these Terms and any
            additional terms that may be provided by BioBoost. If you do not
            agree to these Terms, you may not use BioBoost.
          </p>

          <p>
            BioBoost is a link for bio service for social platforms. By using
            BioBoost, you agree to be bound by these Terms, including provisions
            related to scamming, third-party purchases, content policies, and
            exploitation.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Age Restriction</h2>
          <p>
            BioBoost is not intended for use by individuals under the age of 13.
            By using BioBoost, you represent and warrant that you are at least
            13 years of age. If you are under 13 years of age, you are not
            permitted to use BioBoost.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            Intellectual property rights
          </h2>
          <p>
            BioBoost content and software associated with the webapp is
            protected by copyright and other intellectual property laws. You may
            not use any of these materials for any commercial purpose without
            the express written consent of BioBoost.
          </p>
          <br />
          <p>
            Provided that you are eligible to use the webapp, you are granted a
            limited license to access and use the webapp and to download or
            print a copy of any portion of the Content to which you have
            properly gained access solely for your personal, non-commercial use.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">User representations</h3>
          <p>
            By using the webapp, you represent and warrant that: (1) you have
            the legal capacity and you agree to comply with these Terms of Use;
            (2) you are not a minor in the jurisdiction in which you reside; (3)
            you will not access the webapp through automated or non-human means,
            whether through a bot, script or otherwise; (4) you will not use the
            webapp for any illegal or unauthorized purpose; and (5) your use of
            the webapp will not violate any applicable law or regulation.
          </p>
          <br />
          <p>
            If you provide any information that is untrue, inaccurate, not
            current, or incomplete, BioBoost has the right to suspend or
            terminate your account and refuse any and all current or future use
            of the webapp (or any portion thereof).
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
