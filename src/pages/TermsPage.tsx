import React from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Legal & Operational Agreement
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-white tracking-tight mt-2">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs text-zinc-400 font-mono">
            Applicable to all visitors and patrons · Effective September 2026
          </p>
        </div>

        <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-4 text-xs text-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Mandatory Age Restriction:</strong> You must be at least 18 years of age (or the legal age of majority in your location) to enter or view content on this service. Falsifying your age is a direct violation of these Terms.
          </p>
        </div>

        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">1. Lawful & Consensual Visual Arts Guarantee</h2>
            <p>
              All materials hosted or curated on VEXO involve consenting adults who entered into signed agreements before cameras rolled. We maintain a zero-tolerance policy against:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-400">
              <li>Depictions of any individual under 18 years of age.</li>
              <li>Non-consensual imagery, hidden camera recordings, or unauthorized media.</li>
              <li>Defamation, harassment, or doxxing of performers or crew members.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">2. Intellectual Property & Copyright Protection</h2>
            <p>
              All photographic prints, digital negatives, and video files are the intellectual property of VEXO and the affiliated creators. Visitors are granted a limited, personal, non-exclusive license to view media on the website. You may not scrape, pirate, bulk download, or re-broadcast any visual works without express written consent.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">3. Takedown & Depicted Model Rights</h2>
            <p>
              In accordance with our creator charter and statutory DMCA procedures, any performer depicted on our platform may request immediate review or expedited removal of their imagery via our dedicated portal.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">4. Disclaimer of Warranty & Limitation of Liability</h2>
            <p>
              The platform is provided on an "as is" and "as available" basis. VEXO disclaims all representations or warranties of any kind regarding completeness, accuracy, or suitability.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
