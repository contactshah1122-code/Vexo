import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, LogOut, ArrowRight, Lock } from 'lucide-react';

export const AgeGateModal: React.FC = () => {
  const { ageVerified, confirmAge } = useApp();

  if (ageVerified) return null;

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#09090b]/95 backdrop-blur-xl"
    >
      <div className="relative w-full max-w-xl p-8 sm:p-10 bg-[#121215] border border-white/10 rounded-2xl shadow-2xl text-center">
        {/* Emblem */}
        <div className="mx-auto w-14 h-14 rounded-full bg-[#1c1c22] border border-[#d4af37]/30 flex items-center justify-center mb-6 shadow-inner">
          <ShieldCheck className="w-7 h-7 text-[#d4af37]" />
        </div>

        {/* Title */}
        <h1
          id="age-gate-title"
          className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-white mb-3"
        >
          Age Verification Required
        </h1>

        {/* Editorial Subtitle */}
        <p className="text-xs uppercase tracking-widest text-[#d4af37] font-medium mb-6">
          Adult Visual Arts & Discovery Archive · 18+ Only
        </p>

        {/* Advisory Prose */}
        <div className="text-sm text-zinc-300 space-y-3 leading-relaxed mb-8 text-left bg-[#0c0c0f] p-5 rounded-xl border border-white/5">
          <p>
            Welcome to <strong className="text-white">VEXO</strong>. This website features curated fine art photography, editorial albums, and cinematic discovery reels intended exclusively for mature audiences aged <span className="text-[#d4af37] font-semibold">18 years or older</span> (or the legal age of majority in your jurisdiction).
          </p>
          <div className="flex items-start gap-2.5 pt-2 border-t border-white/5 text-xs text-zinc-400">
            <Lock className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
            <span>
              <strong>Ethical & Legal Compliance:</strong> All content is lawful, consensual, and appropriately licensed. All depicted models are confirmed adults aged 18+ with verified photo identification and 18 U.S.C. § 2257 record keeping compliance.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mb-6">
          <button
            onClick={confirmAge}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#d4af37] hover:bg-[#c49e29] text-black font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/10"
          >
            <span>I Am 18 or Older — Enter</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleExit}
            className="w-full sm:w-auto px-6 py-3.5 bg-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-200 border border-white/10 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Under 18 — Exit Site</span>
          </button>
        </div>

        {/* Disclaimer / Regulatory footer note */}
        <p className="text-[11px] text-zinc-400 leading-normal">
          By entering, you confirm you are at least 18 years old and consent to viewing adult artistic material in accordance with local legislation.
        </p>
      </div>
    </div>
  );
};
