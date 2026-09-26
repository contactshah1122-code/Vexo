import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scale, FileText, AlertCircle, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { revokeAge } = useApp();

  return (
    <footer className="w-full bg-[#070709] border-t border-white/5 pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="font-editorial text-2xl font-semibold tracking-wider text-white hover:text-[#d4af37] transition-colors"
            >
              VEXO
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              A curated digital salon for adult fine art portraiture, monochrome chiaroscuro, and cinematic visual discovery. Dedicated to ethical production, artist attribution, and consensual visual storytelling.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-zinc-400">
              <span className="font-semibold text-zinc-400">18+ RESTRICTED</span>
              <span>·</span>
              <span>RTA (RESTRICTED TO ADULTS)</span>
              <span>·</span>
              <span>ICRA LABELED</span>
            </div>
          </div>

          {/* Col 2: Discover */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Discover
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/photos" className="hover:text-white transition-colors">
                  Photo Albums
                </Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-white transition-colors">
                  Cinematic Videos
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link to="/trending" className="hover:text-white transition-colors">
                  Trending Releases
                </Link>
              </li>
              <li>
                <Link to="/recent" className="hover:text-white transition-colors">
                  Recently Added
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-white transition-colors">
                  Saved Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Compliance & Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Safety & Compliance
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/report" className="hover:text-white transition-colors flex items-center gap-1.5 text-[#d4af37]">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Report Content</span>
                </Link>
              </li>
              <li>
                <Link to="/takedown" className="hover:text-white transition-colors flex items-center gap-1.5 text-zinc-300">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Takedown / DMCA Notice</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service (18+)
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy & GDPR
                </Link>
              </li>
              <li>
                <button
                  onClick={revokeAge}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5 text-xs text-zinc-400"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Re-verify Age Gate</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Information
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About the Archive
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Press Inquiries
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Admin Console</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 18 U.S.C. 2257 Mandatory Statement Banner */}
        <div className="mt-8 p-4 rounded-xl bg-[#0d0d11] border border-white/5 text-xs text-zinc-400 leading-relaxed">
          <div className="flex items-center gap-2 mb-1.5 text-zinc-300 font-medium">
            <FileText className="w-4 h-4 text-[#d4af37]" />
            <span>18 U.S.C. § 2257 Record-Keeping Requirements Compliance Statement</span>
          </div>
          <p>
            All models, actors, actresses, and other persons depicted in visual media on this website were at least 18 years of age at the time the visual depictions were created. All visual records required pursuant to 18 U.S.C. § 2257 and 28 C.F.R. 75 are maintained by the respective authorized custodian of records. Any questions regarding records or compliance should be directed via our legal compliance portal.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} VEXO Visual Arts. All rights reserved. Strictly 18+.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-zinc-400 transition-colors">Terms</Link>
            <span>·</span>
            <Link to="/takedown" className="hover:text-zinc-400 transition-colors">DMCA</Link>
            <span>·</span>
            <Link to="/contact" className="hover:text-zinc-400 transition-colors">Inquiries</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
