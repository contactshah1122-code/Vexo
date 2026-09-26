import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserReport } from '../types';

export const ReportPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { submitReport, albums, videos } = useApp();

  const preTargetType = (searchParams.get('targetType') as 'album' | 'video' | 'general') || 'general';
  const preTargetId = searchParams.get('targetId') || '';
  const preTargetTitle = searchParams.get('targetTitle') || '';

  const [targetType, setTargetType] = useState<'album' | 'video' | 'general'>(preTargetType);
  const [targetId, setTargetId] = useState(preTargetId);
  const [targetTitle, setTargetTitle] = useState(preTargetTitle);
  const [reason, setReason] = useState<UserReport['reason']>('inaccurate_metadata');
  const [description, setDescription] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [ticketGenerated, setTicketGenerated] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !reporterEmail.trim()) return;

    let computedTitle = targetTitle;
    if (!computedTitle) {
      if (targetType === 'album') {
        const found = albums.find(a => a.id === targetId);
        if (found) computedTitle = found.title;
      } else if (targetType === 'video') {
        const found = videos.find(v => v.id === targetId);
        if (found) computedTitle = found.title;
      }
    }

    const ticketId = submitReport({
      targetType,
      targetId: targetId || 'general-concern',
      targetTitle: computedTitle || 'General Platform Notice',
      reason,
      description,
      reporterEmail,
    });

    setTicketGenerated(ticketId);
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
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-rose-400 font-semibold mb-2">
            <AlertCircle className="w-4 h-4" />
            <span>Community Oversight & Compliance</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-light text-white tracking-tight">
            Report Content or Metadata Concern
          </h1>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
            We act swiftly to investigate any reported inaccuracy, potential copyright dispute, or safety concern.
          </p>
        </div>

        {ticketGenerated ? (
          <div className="p-8 rounded-2xl bg-[#111116] border border-emerald-500/20 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="font-editorial text-2xl text-white">Report Registered Successfully</h2>
            <div className="p-3 bg-[#181820] rounded-xl border border-white/10 font-mono text-sm text-[#d4af37]">
              Tracking Reference: {ticketGenerated}
            </div>
            <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
              Our compliance moderators have been alerted. You will receive an email update at <strong className="text-white">{reporterEmail}</strong> as this investigation progresses.
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
                View in Admin Console
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#111116] border border-white/5 space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                Target Media Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['album', 'video', 'general'] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTargetType(t)}
                    className={`py-2 px-3 text-xs rounded-lg border text-center transition-colors capitalize ${
                      targetType === t
                        ? 'border-[#d4af37] bg-[#d4af37]/10 text-white font-semibold'
                        : 'border-white/10 text-zinc-400 hover:text-white bg-[#17171e]'
                    }`}
                  >
                    {t === 'general' ? 'General Issue' : `${t} Work`}
                  </button>
                ))}
              </div>
            </div>

            {targetType !== 'general' && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                  {targetType === 'album' ? 'Album ID / Title' : 'Video ID / Title'}
                </label>
                <input
                  type="text"
                  value={targetTitle || targetId}
                  onChange={(e) => {
                    setTargetTitle(e.target.value);
                    setTargetId(e.target.value);
                  }}
                  placeholder="e.g. Ombre et Lumière"
                  className="w-full bg-[#17171e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                Primary Reason for Report
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as any)}
                className="w-full bg-[#17171e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="underage_concern">Suspicion of Underage Performer (Immediate Priority)</option>
                <option value="non_consensual">Non-Consensual / Unauthorized Depiction</option>
                <option value="copyright">Copyright Infringement / Missing Attribution</option>
                <option value="inaccurate_metadata">Inaccurate Camera / Model / Technical Metadata</option>
                <option value="broken_media">Broken Playback / Corrupted Stream</option>
                <option value="other">Other Violation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                Detailed Observation
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain precisely where in the video or album the issue occurs..."
                className="w-full bg-[#17171e] border border-white/10 rounded-xl p-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                Your Contact Email
              </label>
              <input
                type="email"
                required
                value={reporterEmail}
                onChange={(e) => setReporterEmail(e.target.value)}
                placeholder="moderation@yourorganization.org"
                className="w-full bg-[#17171e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs rounded-xl transition-colors shadow-lg shadow-rose-500/10 flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Submit Formal Community Report</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
