import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-zinc-500 hover:text-zinc-900 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold text-zinc-900">Refund &amp; Cancellation Policy</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-zinc-600">
          <p className="text-sm text-zinc-500">Last updated: 22 July 2026</p>

          <p className="leading-relaxed">
            This policy explains how refunds and cancellations work for paid
            features on Genie Hive. It forms part of our{' '}
            <Link href="/terms" className="text-zinc-900 underline hover:no-underline">Terms &amp; Conditions</Link>.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">1. Wallet Top-Ups &amp; Credits</h2>
            <p className="leading-relaxed">
              Credits added to your wallet are non-refundable once consumed. If
              credits remain unused and you believe you were charged in error,
              write to us within 7 days of the transaction and we will review
              the request in good faith.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">2. Subscription Plans</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Subscriptions renew automatically at the end of each billing cycle.</li>
              <li>You can cancel any time from your account settings. Cancellation stops future renewals; access continues until the end of the paid period.</li>
              <li>We do not provide pro-rata refunds for partially used billing periods.</li>
              <li>If a renewal is charged after a cancellation you completed before the renewal date, we will refund the renewal in full.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">3. Failed Generations &amp; Service Errors</h2>
            <p className="leading-relaxed">
              If credits are deducted for a generation that fails entirely due to
              a fault on our side, the corresponding credits are auto-refunded
              to your wallet. If this does not happen, contact support with the
              job id and we will restore the credits.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">4. Duplicate or Erroneous Charges</h2>
            <p className="leading-relaxed">
              If you notice a duplicate charge or a payment that did not credit
              your account, email us within 7 days at{' '}
              <a href="mailto:support@geniehive.in" className="text-zinc-900 underline hover:no-underline">support@geniehive.in</a>{' '}
              with the Razorpay payment id. Confirmed duplicates are refunded to
              the original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">5. How to Request a Refund</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Email <a href="mailto:support@geniehive.in" className="text-zinc-900 underline hover:no-underline">support@geniehive.in</a> from the email address on your account.</li>
              <li>Include the Razorpay payment id, transaction date, and a short description of the issue.</li>
              <li>We will acknowledge your request within 2 business days and share a decision within 7 business days.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">6. Refund Method &amp; Timelines</h2>
            <p className="leading-relaxed">
              Approved refunds are processed to the original payment method via
              Razorpay. Funds typically reflect within 5â€“10 business days,
              depending on your bank or card issuer.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">7. Non-Refundable Items</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Credits already consumed on successful generations.</li>
              <li>Charges older than 30 days, unless required by law.</li>
              <li>Fees for third-party services you were routed to.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">8. Chargebacks</h2>
            <p className="leading-relaxed">
              Please contact us before initiating a chargeback â€” we can usually
              resolve issues faster directly. Accounts with unresolved
              chargebacks may be suspended pending investigation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">9. Contact</h2>
            <p className="leading-relaxed">
              Questions about this policy? Email{' '}
              <a href="mailto:support@geniehive.in" className="text-zinc-900 underline hover:no-underline">support@geniehive.in</a>{' '}
              or see our <Link href="/contact" className="text-zinc-900 underline hover:no-underline">Contact page</Link>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

