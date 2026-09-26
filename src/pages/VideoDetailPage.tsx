import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { VideoCard } from '../components/common/VideoCard';
import {
  ArrowLeft,
  Heart,
  Share2,
  ExternalLink,
  ShieldCheck,
  Star,
  Clock,
  Eye,
  Send,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { CommentItem } from '../types';

export const VideoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { videos, toggleFavorite, isFavorite, showToast } = useApp();

  const video = videos.find(v => v.id === id || v.slug === id);

  // Discussion comments
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c-1',
      author: 'Matthieu B. (Cinematographer)',
      content: 'The use of negative fill on the right cheek in the anamorphic sequence creates remarkable depth. Gorgeous color grading.',
      timestamp: '2 days ago',
      likes: 12,
    },
    {
      id: 'c-2',
      author: 'Seraphine V.',
      content: 'Exquisite control over key-to-fill ratio. The film texture feels authentically analog.',
      timestamp: '5 days ago',
      likes: 8,
    }
  ]);

  const [authorInput, setAuthorInput] = useState('');
  const [contentInput, setContentInput] = useState('');

  if (!video) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-8 text-center">
        <h1 className="font-editorial text-4xl text-white mb-4">Video Reel Not Found</h1>
        <p className="text-zinc-400 text-sm mb-6">The requested discovery reel does not exist or has been removed.</p>
        <Link to="/videos" className="px-6 py-2.5 bg-[#d4af37] text-black font-semibold text-xs rounded-lg">
          Back to Video Discovery
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(video.id);
  const relatedVideos = videos.filter(v => v.id !== video.id).slice(0, 3);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentInput.trim()) return;

    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      author: authorInput.trim() || 'Anonymous Patron',
      content: contentInput.trim(),
      timestamp: 'Just now',
      likes: 0,
    };

    setComments(prev => [newComment, ...prev]);
    setContentInput('');
    setAuthorInput('');
    showToast('Your perspective was added to the discussion', 'success');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast('Video link copied to clipboard', 'success');
    });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] pb-24">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Discovery</span>
          </button>

          <Link
            to={`/report?targetType=video&targetId=${video.id}&targetTitle=${encodeURIComponent(video.title)}`}
            className="text-xs text-zinc-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Report Video</span>
          </Link>
        </div>
      </div>

      {/* Main Video Player Canvas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
          <video
            src={video.videoUrl}
            poster={video.thumbnail}
            controls
            playsInline
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Video Info & Crew Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div>
              {/* Zero-Pill Metadata */}
              <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                <span className="text-[#d4af37] font-medium">{video.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {video.duration}
                </span>
                <span aria-hidden="true">·</span>
                <span>{video.publishedAt}</span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl text-white font-normal leading-tight">
                {video.title}
              </h1>

              <p className="mt-4 text-sm text-zinc-300 font-light leading-relaxed">
                {video.description}
              </p>
            </div>

            {/* Crew & Cast Specifications */}
            <div className="p-5 rounded-xl bg-[#111116] border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-zinc-500 uppercase tracking-wider text-[10px] block mb-1">Director & Camera</span>
                <span className="text-zinc-200 font-medium">{video.director}</span>
                {video.cinematographer && (
                  <span className="text-zinc-400 block mt-0.5">DoP: {video.cinematographer}</span>
                )}
              </div>
              <div>
                <span className="text-zinc-500 uppercase tracking-wider text-[10px] block mb-1">Verified Adult Cast (18+)</span>
                <span className="text-zinc-200">{video.cast.join(', ')}</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase tracking-wider text-[10px] block mb-1">Master Resolution</span>
                <span className="text-zinc-200 font-mono">{video.resolution} Cinema Quality</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase tracking-wider text-[10px] block mb-1">Licensing Protocol</span>
                <span className="text-zinc-300">{video.license}</span>
              </div>
            </div>

            {/* Discussion Comments */}
            <div className="pt-6 border-t border-white/5 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-xl text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#d4af37]" />
                  <span>Curator & Patron Discussion ({comments.length})</span>
                </h3>
              </div>

              {/* Form */}
              <form onSubmit={handleCommentSubmit} className="bg-[#121217] border border-white/10 rounded-xl p-4 space-y-3">
                <input
                  type="text"
                  placeholder="Your Name / Handle"
                  value={authorInput}
                  onChange={(e) => setAuthorInput(e.target.value)}
                  className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
                <textarea
                  rows={3}
                  placeholder="Share technical perspective, cinematography notes, or lighting observations..."
                  value={contentInput}
                  onChange={(e) => setContentInput(e.target.value)}
                  required
                  className="w-full bg-[#181820] border border-white/10 rounded-lg p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#d4af37] hover:bg-[#c49e29] text-black font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Reflection</span>
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-3">
                {comments.map((comm) => (
                  <div key={comm.id} className="p-4 rounded-xl bg-[#111116] border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-white">{comm.author}</span>
                      <span className="text-zinc-500 font-mono text-[11px]">{comm.timestamp}</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                      {comm.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Action & Metadata Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[#111116] border border-white/10 space-y-5">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-zinc-400" />
                  <strong className="text-white">{video.views.toLocaleString()}</strong> Views
                </span>
                <span className="flex items-center gap-1 text-amber-300">
                  <Star className="w-4 h-4 fill-current text-[#d4af37]" />
                  <strong>{video.rating.toFixed(2)}</strong> / 5.0
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => toggleFavorite(video.id, video.title)}
                  className={`w-full py-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    favorited
                      ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]'
                      : 'border-white/15 bg-white/5 hover:bg-white/10 text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorited ? 'fill-[#d4af37]' : ''}`} />
                  <span>{favorited ? 'Saved in Your Favorites' : 'Save to Favorites'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="w-full py-3 rounded-lg border border-white/10 bg-[#16161e] hover:bg-[#1f1f2a] text-zinc-300 hover:text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Discovery Link</span>
                </button>

                {video.externalUrl && (
                  <a
                    href={video.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-lg bg-[#d4af37] hover:bg-[#c49e29] text-black text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Visit External Archive Reel</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Regulatory Notice */}
              <div className="pt-4 border-t border-white/5 text-[11px] text-zinc-400 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>18 U.S.C. § 2257 Verified</span>
                </div>
                <p className="leading-relaxed">
                  Every participant in this video was 18 years of age or older at the time of creation. Records are maintained by the records custodian in compliance with applicable laws.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Videos */}
      {relatedVideos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/5">
          <h2 className="font-editorial text-2xl text-white font-normal mb-6">
            Recommended Cinematic Reels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedVideos.map(rel => (
              <VideoCard key={rel.id} video={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
