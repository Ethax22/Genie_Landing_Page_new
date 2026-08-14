import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TEAM } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Team & Company Info',
  description: 'Meet the founding team behind Genie Hive Private Limited (GenieHive) and view our company registration and DPIIT recognition details.',
  alternates: { canonical: '/team' },
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-zinc-500 hover:text-zinc-900 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold text-zinc-900">Team &amp; Company</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-zinc-600">
          <p className="leading-relaxed">
            GenieHive is built and operated by <strong>{TEAM.legalName}</strong>,
            a company incorporated in {TEAM.incorporated}. Below is our founding
            team and official company registration information.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-4">Founding Team</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {TEAM.members.map((member) => (
                <div
                  key={member.name}
                  className="rounded-lg border border-zinc-200 p-4"
                >
                  <p className="font-semibold text-zinc-900">{member.name}</p>
                  <p className="text-sm text-zinc-500 mb-2">{member.role}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-900 underline hover:no-underline"
                  >
                    LinkedIn
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">Company Registration</h2>
            <p className="leading-relaxed text-sm">
              Legal name: {TEAM.legalName}<br />
              CIN: {TEAM.cin}<br />
              DPIIT recognition number: {TEAM.dpiit}<br />
              Incorporated: {TEAM.incorporated}
            </p>
            <p className="leading-relaxed mt-4">
              For company registration and legal correspondence, see our{' '}
              <Link href="/contact" className="text-zinc-900 underline hover:no-underline">Contact page</Link>.
              You can also find us on{' '}
              <a
                href="https://www.linkedin.com/company/genie-hive/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-900 underline hover:no-underline"
              >
                LinkedIn
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
