import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-zinc-500 hover:text-zinc-900 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold text-zinc-900">Contact Us</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-zinc-600">
          <p className="leading-relaxed">
            Have a question, need help, or want to reach us about your account?
            We&apos;re happy to hear from you. Use the right contact below and
            we&apos;ll get back to you as soon as we can.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">General &amp; Support</h2>
            <p className="leading-relaxed">
              For product questions, account help, billing, or anything else,
              email{' '}
              <a href="mailto:support@geniehive.in" className="text-zinc-900 underline hover:no-underline">support@geniehive.in</a>.
              We aim to respond within 1&ndash;2 business days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">Privacy &amp; Data Requests</h2>
            <p className="leading-relaxed">
              To access, correct, or delete your personal data, email{' '}
              <a href="mailto:privacy@geniehive.in" className="text-zinc-900 underline hover:no-underline">privacy@geniehive.in</a>.
              See our{' '}
              <Link href="/privacy" className="text-zinc-900 underline hover:no-underline">Privacy Policy</Link>{' '}
              for details on your rights.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">Grievances</h2>
            <p className="leading-relaxed">
              For complaints about how your personal data is handled, you may
              contact our Grievance Officer, Mohamed Anas, at{' '}
              <a href="mailto:grievance@geniehive.in" className="text-zinc-900 underline hover:no-underline">grievance@geniehive.in</a>.
              We acknowledge complaints within 48 hours.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">Legal</h2>
            <p className="leading-relaxed">
              For legal notices and matters relating to our{' '}
              <Link href="/terms" className="text-zinc-900 underline hover:no-underline">Terms &amp; Conditions</Link>,
              email{' '}
              <a href="mailto:legal@geniehive.in" className="text-zinc-900 underline hover:no-underline">legal@geniehive.in</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">Company Details</h2>
            <p className="leading-relaxed text-sm">
              Genie Hive Private Limited<br />
              CIN: U62011TN2026PTC189462<br />
              Registered office: No. 42, Mufti Ameerullah Sahib Street, 3rd Floor,
              B3, Tiruvallikkeni, Chennai 600005, Tamil Nadu, India
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
