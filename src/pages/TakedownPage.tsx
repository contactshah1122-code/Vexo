import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, CheckCircle2, ShieldCheck, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TakedownRequest } from '../types';

export const TakedownPage: React.FC = () => {
  const { submitTakedown } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [claimantRole, setClaimantRole] = useState<TakedownRequest['claimantRole']>('model_depicted');
  const [mediaUrlOrId, setMediaUrlOrId] = useState('');
  const [justification, setJustification] = useState('');
  const [swornStatementAccepted, setSwornStatementAccepted] = useState(false);
  const [ticketReference, setTicketReference] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !mediaUrlOrId || !justification || !swornStatementAccepted) return;

    const ref = submitTakedown({
      fullName,
      email,
      claimantRole,
      mediaUrlOrId,
      justification,
      swornStatementAccepted,
    });

    setTicketReference(ref);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <Scale className="w-4 h-4" />
            <span>Statutory Compliance & DMCA Portal</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-white tracking-tight">
            Expedited Takedown & Rights Request
          </h1>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            In compliance with the Digital Millennium Copyright Act (17 U.S.C. § 512) and our Performer Consent Guarantee, any depicted performer or authorized copyright owner may petition for expedited removal.
          </p>
        </div>

        {ticketReference ? (
          <div className="p-8 rounded-2xl bg-[#111116] border border-emerald-500/20 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="font-editorial text-2xl text-white">Notice Filed Successfully</h2>
            <div className="p-3 bg-[#181820] rounded-xl border border-white/10 font-mono text-sm text-[#d4af37]">
              Legal Ticket: {ticketReference}
            </div>
            <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
              Our designated legal compliance agent has received your sworn declaration. Per internal guidelines, performer-initiated removal requests are quarantined within 6 to 12 hours pending identity confirmation.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <Link
                to="/"
                className="px-5 py-2.5 bg-[#d4af37] text-black font-semibold text-xs rounded-lg"
              >
                Back to Homepage
              </Link>
              <Link
                to="/admin"
                className="px-5 py-2.5 bg-[#17171e] text-zinc-300 hover:text-white text-xs rounded-lg border border-white/10"
              >
                Inspect in Admin Console
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#111116] border border-white/5 space-y-5">
            <div className="p-4 rounded-xl bg-[#15151e] border border-white/5 text-xs text-zinc-400 space-y-1">
              <span className="font-semibold text-zinc-200 block">Notice to Performers:</span>
              <p className="leading-relaxed text-[11px]">
                If you are a performer depicted in any plate or reel wishing to withdraw consent or exercise privacy rights, your request is treated with top priority.
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                Claimant Full Legal Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="First and Last Legal Name"
                className="w-full bg-[#17171e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                Claimant Capacity / Role
              </label>
              <select
                value={claimantRole}
                onChange={(e) => setClaimantRole(e.target.value as any)}
                className="w-full bg-[#17171e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="model_depicted">I am the individual / model depicted in the media</option>
                <option value="copyright_owner">I am the registered copyright owner / photographer / director</option>
                <option value="authorized_agent">I am an authorized legal agent / attorney</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                Your Contact Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="legal@claimant.com"
                className="w-full bg-[#17171e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                Media URL or Internal Catalog ID
              </label>
              <input
                type="text"
                required
                value={mediaUrlOrId}
                onChange={(e) => setMediaUrlOrId(e.target.value)}
                placeholder="e.g. /photos/album-1 or album title"
                className="w-full bg-[#17171e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                Detailed Legal Justification & Proof of Standing
              </label>
              <textarea
                rows={4}
                required
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Describe the copyrighted work or personal depiction, and specify the grounds for removal..."
                className="w-full bg-[#17171e] border border-white/10 rounded-xl p-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] resize-none"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-3 text-xs text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={swornStatementAccepted}
                  onChange={(e) => setSwornStatementAccepted(e.target.checked)}
                  className="mt-1 rounded bg-[#17171e] border-white/20 text-[#d4af37] focus:ring-0"
                />
                <span className="leading-relaxed">
                  I state under penalty of perjury that I have a good-faith belief that use of the material is not authorized by the copyright owner, its agent, or the depicted individual, and that the information provided herein is accurate.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!swornStatementAccepted}
              className="w-full py-3.5 bg-[#d4af37] hover:bg-[#c49e29] disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-xs rounded-xl transition-colors shadow-lg shadow-[#d4af37]/10 flex items-center justify-center gap-2"
            >
              <Scale className="w-4 h-4" />
              <span>Transmit Formal DMCA Takedown Notice</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
