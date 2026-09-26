import React from 'react';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Privacy & Trust Architecture
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-white tracking-tight mt-2">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-zinc-400 font-mono">
            Last Updated & Audited: September 2026
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#121217] border border-[#d4af37]/20 flex items-start gap-4 text-xs text-zinc-300">
          <EyeOff className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Zero Adult Habit Profiling:</strong> VEXO does not track, profile, or sell sensitive browsing habits to third-party ad networks or data brokers. Your saved favorites and age confirmation are stored strictly inside your browser's local sandbox.
          </p>
        </div>

        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">1. Information We Collect (Data Minimization)</h2>
            <p>
              We practice strict data minimization. We do not require visitors to register an account or surrender personal identities to browse our public collections. When you interact with our platform:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-400">
              <li><strong>Local Preferences:</strong> Your saved favorites and age confirmation state are saved via browser <code>localStorage</code>. This data never leaves your client machine.</li>
              <li><strong>Contact & Reporting Data:</strong> If you file a DMCA takedown notice or content report, we collect your provided name, email address, and ticket justification solely to process the statutory request.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">2. Statutory 18 U.S.C. § 2257 Records</h2>
            <p>
              Under federal regulations, documentation proving that depicted adult models were 18 years of age or older is retained by our designated Custodian of Records. These sensitive records are stored in an encrypted, air-gapped system accessible solely to authorized compliance officers and legal counsel.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">3. Cookies & Storage Technologies</h2>
            <p>
              VEXO uses minimal functional cookies solely to maintain session security and prevent CSRF attacks. We do not embed behavioral advertising pixels (such as Meta Pixel or Google Ads Remarketing) on our adult platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium text-white">4. Your Rights (GDPR & CCPA/CPRA)</h2>
            <p>
              Depending on your location, you hold the right to request deletion of any contact inquiry or takedown ticket information submitted to us. For inquiries, contact <code className="text-[#d4af37]">privacy@nocturne-arts.example</code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
