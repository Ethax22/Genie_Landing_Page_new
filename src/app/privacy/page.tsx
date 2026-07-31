import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-zinc-500 hover:text-zinc-900 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold text-zinc-900">Privacy Policy</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-zinc-600">
          <p className="text-sm text-zinc-500">Last updated: 30 July 2026</p>

          <p className="leading-relaxed">
            This Privacy Policy explains how <strong>Genie Hive Private Limited</strong>{' '}
            (CIN U62011TN2026PTC189462) ("Genie Hive", "we", "us", "our")
            collects, uses, shares, and protects your personal data when you join
            our waitlist or use our website, applications, and related services
            (the "Service"). We comply with applicable Indian data-protection
            laws, including the Information Technology Act, 2000 and the Digital
            Personal Data Protection Act, 2023 (DPDP Act).
          </p>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">1. Information We Collect</h2>
            <p className="leading-relaxed mb-4">We collect the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Waitlist data:</strong> the name and email address you submit to join our waitlist or request early access.</li>
              <li><strong>Account data:</strong> name, email address, password, profile picture.</li>
              <li><strong>Content data:</strong> scripts, projects, uploaded media, brand voice inputs, and generated outputs.</li>
              <li><strong>Payment data:</strong> billing details are collected and processed by our payment partners (Razorpay, and in future Cashfree Payments); we receive only transaction identifiers and status. We do not store your full card number or UPI credentials.</li>
              <li><strong>Usage data:</strong> pages viewed, features used, credits consumed, device and browser information, IP address, and timestamps.</li>
              <li><strong>Communications:</strong> support requests, feedback, and correspondence with us.</li>
              <li><strong>Third-party sign-in data:</strong> if you log in via Google or connect YouTube/Instagram, we receive profile fields and tokens you approve in that provider's consent screen.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide, operate, and improve the Service.</li>
              <li>To process payments, credits, subscriptions, and refunds.</li>
              <li>To personalise features and remember your preferences.</li>
              <li>To send transactional emails and (with consent) product updates.</li>
              <li>To detect, prevent, and investigate fraud, abuse, and security incidents.</li>
              <li>To comply with legal obligations and enforce our{' '}
                <Link href="/terms" className="text-zinc-900 underline hover:no-underline">Terms &amp; Conditions</Link>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">3. Legal Basis</h2>
            <p className="leading-relaxed">
              We process personal data based on your consent, our contract with
              you, our legitimate interests in operating the Service, and where
              required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">4. Sharing &amp; Processors</h2>
            <p className="leading-relaxed mb-4">
              We do not sell your personal data. We share it only with the
              following categories of processors, under contractual safeguards:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Cloud infrastructure:</strong> Microsoft Azure (India and other regions).</li>
              <li><strong>Payments:</strong> Razorpay Software Pvt. Ltd. (and, in future, Cashfree Payments).</li>
              <li><strong>AI model providers:</strong> established cloud AI vendors (such as Microsoft Azure OpenAI, Anthropic, and Google) used to power generation features. A current list of our sub-processors is available on request at <a href="mailto:privacy@geniehive.in" className="text-zinc-900 underline hover:no-underline">privacy@geniehive.in</a>.</li>
              <li><strong>Publishing integrations:</strong> YouTube and Meta (Instagram) &mdash; only when you connect and authorise these accounts. These integrations are being enabled progressively and require your explicit authorisation before any data is shared.</li>
              <li><strong>Analytics &amp; support tools:</strong> used to improve the product and respond to enquiries.</li>
              <li><strong>Law enforcement or regulators:</strong> when required by valid legal process.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">5. International Transfers</h2>
            <p className="leading-relaxed">
              Some of our processors operate servers outside India. Where data
              is transferred internationally, we rely on appropriate contractual
              and technical safeguards.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">6. Data Retention</h2>
            <p className="leading-relaxed">
              We retain your account and content data for as long as your
              account is active. Payment records are retained as required by
              tax and accounting law (typically up to 8 years). When you delete
              your account, we delete or anonymise your personal data within a
              reasonable period, except where retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">7. Security</h2>
            <p className="leading-relaxed">
              We apply industry-standard measures, including encryption in
              transit (TLS) and at rest, access controls, secret rotation, and
              audit logging. No system is perfectly secure &mdash; please use a strong
              password and enable multi-factor authentication where available.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">8. Your Rights</h2>
            <p className="leading-relaxed mb-4">Subject to applicable law, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access, correct, or update your personal data.</li>
              <li>Request deletion of your account and associated data.</li>
              <li>Withdraw consent for optional processing (e.g., marketing emails).</li>
              <li>Port your data or request a copy of it.</li>
              <li>Complain to a data-protection authority.</li>
            </ul>
            <p className="leading-relaxed mt-4">
              To exercise these rights, email{' '}
              <a href="mailto:privacy@geniehive.in" className="text-zinc-900 underline hover:no-underline">privacy@geniehive.in</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">9. Cookies</h2>
            <p className="leading-relaxed">
              We use cookies and similar technologies to keep you signed in,
              remember preferences, and measure feature usage. You can control
              cookies through your browser settings; disabling them may affect
              functionality.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">10. Children</h2>
            <p className="leading-relaxed">
              The Service is not intended for children under 18. We do not
              knowingly collect data from minors. If you believe a minor has
              provided us with personal data, contact us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">11. Changes</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. Material
              changes will be notified via email or in-app notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">12. Grievance Officer</h2>
            <p className="leading-relaxed">
              In line with the Information Technology Rules, 2011 and the DPDP
              Act, 2023, you may address any complaint about the processing of
              your personal data to our Grievance Officer:
            </p>
            <p className="leading-relaxed mt-3 text-sm">
              Mohamed Anas<br />
              Genie Hive Private Limited<br />
              No. 42, Mufti Ameerullah Sahib Street, 3rd Floor, B3,
              Tiruvallikkeni, Chennai 600005, Tamil Nadu, India<br />
              Email:{' '}
              <a href="mailto:grievance@geniehive.in" className="text-zinc-900 underline hover:no-underline">grievance@geniehive.in</a>
            </p>
            <p className="leading-relaxed mt-3">
              We will acknowledge complaints within 48 hours and endeavour to
              resolve them within one month.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

