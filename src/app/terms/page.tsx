import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-zinc-500 hover:text-zinc-900 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold text-zinc-900">Terms &amp; Conditions</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-zinc-600">
          <p className="text-sm text-zinc-500">Last updated: 22 July 2026</p>

          <p className="leading-relaxed">
            These Terms &amp; Conditions ("Terms") govern your access to and use of
            the Genie Hive platform, website, and related services (collectively,
            the "Service") operated by Genie Hive ("Genie Hive", "we", "us", or
            "our"). By creating an account or using the Service, you agree to be
            bound by these Terms. If you do not agree, do not use the Service.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">1. Eligibility</h2>
            <p className="leading-relaxed">
              You must be at least 18 years old and capable of entering a binding
              contract under the Indian Contract Act, 1872 to use the Service. By
              using the Service you represent that you meet these requirements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">2. Description of Service</h2>
            <p className="leading-relaxed">
              Genie Hive provides an AI content creation platform that
              helps users generate, edit, and publish videos, scripts, images,
              voiceovers, and related media. Features, credits, and quotas may
              change from time to time. We reserve the right to modify, suspend,
              or discontinue any part of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">3. Accounts &amp; Security</h2>
            <p className="leading-relaxed">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activity under your account. Notify
              us immediately at{' '}
              <a href="mailto:support@geniehive.in" className="text-zinc-900 underline hover:no-underline">support@geniehive.in</a>{' '}
              if you suspect unauthorised access.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">4. Payments, Credits &amp; Subscriptions</h2>
            <p className="leading-relaxed mb-4">
              Paid features are billed through Razorpay. By making a payment you
              authorise us and our payment processor to charge the applicable
              amount in Indian Rupees, inclusive of taxes where applicable.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Credits or wallet balances are non-transferable between accounts.</li>
              <li>Subscription plans renew automatically at the end of each billing cycle unless cancelled beforehand.</li>
              <li>You can cancel a subscription any time from your account settings; access continues until the end of the paid period.</li>
              <li>Prices, plan features, and quotas may change with prior notice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">5. Refunds &amp; Cancellations</h2>
            <p className="leading-relaxed">
              Refunds and cancellations are handled under our separate{' '}
              <Link href="/refund" className="text-zinc-900 underline hover:no-underline">Refund &amp; Cancellation Policy</Link>,
              which forms part of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">6. Your Content &amp; Licence</h2>
            <p className="leading-relaxed">
              You retain ownership of the content you upload, generate, or export
              through the Service ("User Content"). You grant Genie Hive a
              worldwide, royalty-free, non-exclusive licence to host, store,
              process, transmit, and display User Content solely to operate,
              secure, and improve the Service. You are responsible for ensuring
              you have the necessary rights to any material you upload.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">7. Acceptable Use</h2>
            <p className="leading-relaxed mb-4">You agree not to use the Service to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Generate or distribute content that is unlawful, defamatory, obscene, hateful, or infringing;</li>
              <li>Impersonate any person or misrepresent your affiliation;</li>
              <li>Attempt to reverse-engineer, scrape, or resell the Service;</li>
              <li>Circumvent usage limits, rate limits, or security controls;</li>
              <li>Upload malware or interfere with the operation of the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">8. AI-Generated Output</h2>
            <p className="leading-relaxed">
              AI outputs are generated using third-party models. Output may be
              inaccurate, incomplete, or repeat similar results across users. You
              are responsible for reviewing generated content before using it
              commercially. Genie Hive does not warrant that outputs are original,
              non-infringing, or fit for any specific purpose.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">9. Third-Party Services</h2>
            <p className="leading-relaxed">
              The Service integrates with third-party providers (including
              Razorpay, cloud storage, and AI model vendors). Your use of those
              services is subject to their own terms and policies. We are not
              responsible for their acts or omissions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">10. Suspension &amp; Termination</h2>
            <p className="leading-relaxed">
              We may suspend or terminate your account if you breach these Terms,
              misuse the Service, or if required by law. You may close your
              account at any time by contacting support.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">11. Disclaimers</h2>
            <p className="leading-relaxed">
              The Service is provided on an "as is" and "as available" basis
              without warranties of any kind, express or implied, to the maximum
              extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">12. Limitation of Liability</h2>
            <p className="leading-relaxed">
              To the extent permitted by law, Genie Hive shall not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages, or any loss of profits, revenue, data, or goodwill arising
              out of your use of the Service. Our total aggregate liability shall
              not exceed the amount you paid to us in the three (3) months
              preceding the event giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">13. Indemnity</h2>
            <p className="leading-relaxed">
              You agree to indemnify and hold Genie Hive harmless from claims
              arising out of your User Content, your breach of these Terms, or
              your violation of any law or third-party right.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">14. Governing Law &amp; Jurisdiction</h2>
            <p className="leading-relaxed">
              These Terms are governed by the laws of India. Subject to
              applicable law, the courts at Chennai, Tamil Nadu shall have
              exclusive jurisdiction over any disputes arising out of or in
              connection with these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">15. Changes to these Terms</h2>
            <p className="leading-relaxed">
              We may update these Terms from time to time. Material changes will
              be notified via email or in-app notice. Continued use of the
              Service after changes take effect constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">16. Contact</h2>
            <p className="leading-relaxed">
              Questions about these Terms? Email{' '}
              <a href="mailto:legal@geniehive.in" className="text-zinc-900 underline hover:no-underline">legal@geniehive.in</a>{' '}
              or visit our{' '}
              <Link href="/contact" className="text-zinc-900 underline hover:no-underline">Contact page</Link>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

