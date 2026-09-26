import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Images, Film } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] bg-[#09090b] text-[#f4f4f5] flex items-center justify-center py-20 px-4">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#14141a] border border-white/10 flex items-center justify-center mx-auto shadow-2xl">
          <Compass className="w-8 h-8 text-[#d4af37]" />
        </div>

        <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block">
          404 · Frame Not Found
        </span>

        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-white tracking-tight">
          This plate is unexposed.
        </h1>

        <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-md mx-auto">
          The archive coordinates you requested do not point to an active photographic collection or video discovery reel.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#d4af37] hover:bg-[#c49e29] text-black font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>Return to Salon Entry</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/photos"
            className="w-full sm:w-auto px-6 py-3 bg-[#15151d] hover:bg-[#1f1f2a] text-zinc-200 text-xs font-medium rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <Images className="w-4 h-4 text-[#d4af37]" />
            <span>Browse Photos</span>
          </Link>
          <Link
            to="/videos"
            className="w-full sm:w-auto px-6 py-3 bg-[#15151d] hover:bg-[#1f1f2a] text-zinc-200 text-xs font-medium rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <Film className="w-4 h-4 text-[#d4af37]" />
            <span>Browse Videos</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
