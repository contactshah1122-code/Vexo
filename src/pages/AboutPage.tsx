import React from 'react';
import { ShieldCheck, Award, Users, Scale, Camera } from 'lucide-react';
import { heroImg, noirCoutureImg } from '../data/mockData';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Ethical Charter & Platform Philosophy</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-light text-white tracking-tight">
            About VEXO
          </h1>
          <p className="text-base text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            A digital sanctuary dedicated to the artistry of contemporary adult photography, fine art boudoir, monochrome chiaroscuro, and auteur cinematography.
          </p>
        </div>

        {/* Dual Image Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
            <img
              src={noirCoutureImg}
              alt="Monochrome Studio"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-xs font-mono text-white">
              Studio Chiaroscuro · 35mm Tri-X
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
            <img
              src={heroImg}
              alt="Direction & Lighting"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-xs font-mono text-white">
              Digital Master Negative · Hasselblad X2D
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="space-y-8">
          <h2 className="font-editorial text-3xl text-white font-normal text-center">
            Our Unwavering Principles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#111116] border border-white/5 space-y-3">
              <Scale className="w-6 h-6 text-[#d4af37]" />
              <h3 className="font-medium text-base text-white">100% Consensual & Verified</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Every adult model depicted is confirmed 18 years of age or older via government photographic identification prior to call time. We enforce zero tolerance for non-consensual content.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111116] border border-white/5 space-y-3">
              <Award className="w-6 h-6 text-[#d4af37]" />
              <h3 className="font-medium text-base text-white">Fair Artist Attribution</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                We believe visual artists, cinematographers, and performers deserve unmitigated attribution, EXIF transparency, and verified copyright protection on every release.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111116] border border-white/5 space-y-3">
              <Camera className="w-6 h-6 text-[#d4af37]" />
              <h3 className="font-medium text-base text-white">Optical Excellence</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                No low-resolution compressed captures. We showcase master 4K negatives, medium format files, and calibrated anamorphic lenses calibrated for high-fidelity viewing.
              </p>
            </div>
          </div>
        </div>

        {/* 18 U.S.C. 2257 Record-Keeping Notice */}
        <div className="p-8 rounded-2xl bg-[#13131a] border border-white/10 space-y-4 text-xs text-zinc-300 leading-relaxed">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>Statutory Compliance: 18 U.S.C. § 2257</span>
          </h3>
          <p>
            All visual depictions of actual or simulated adult content displayed on VEXO comply with the provisions of federal law 18 U.S.C. § 2257 and 28 C.F.R. 75. Complete age verification records, including proof of age and consent forms for each depicted performer, are kept on file by the authorized custodian of records.
          </p>
          <p className="text-zinc-500 font-mono text-[11px]">
            Designated Custodian of Records: VEXO Archival Group, Compliance Office, 100 Studio Way, Suite 400.
          </p>
        </div>
      </div>
    </div>
  );
};
