import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ExternalLink,
  ShieldCheck,
  Heart,
  Share2,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const VideoPlayerModal: React.FC = () => {
  const { activeVideo, closeVideoPlayer, toggleFavorite, isFavorite, showToast } = useApp();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('00:00');

  useEffect(() => {
    if (activeVideo && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [activeVideo]);

  if (!activeVideo) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((cur / dur) * 100);

    const mins = Math.floor(cur / 60);
    const secs = Math.floor(cur % 60);
    setCurrentTime(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const val = parseFloat(e.target.value);
    const dur = videoRef.current.duration || 1;
    videoRef.current.currentTime = (val / 100) * dur;
    setProgress(val);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/videos/${activeVideo.id}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast('Video URL copied to clipboard', 'success');
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Video Discovery Player"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl"
    >
      <div className="relative w-full max-w-5xl bg-[#101014] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#14141a]">
          <div className="flex items-center gap-2">
            <span className="font-editorial text-lg text-white font-medium truncate max-w-sm sm:max-w-xl">
              {activeVideo.title}
            </span>
          </div>
          <button
            onClick={closeVideoPlayer}
            aria-label="Close video player"
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative bg-black aspect-video w-full flex items-center justify-center overflow-hidden group">
          <video
            ref={videoRef}
            src={activeVideo.videoUrl}
            poster={activeVideo.thumbnail}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            playsInline
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Centered big play button when paused */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute p-5 rounded-full bg-black/70 border border-white/20 text-[#d4af37] hover:scale-110 transition-transform shadow-2xl"
            >
              <Play className="w-8 h-8 fill-current ml-1" />
            </button>
          )}

          {/* Custom In-Player Controls */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col gap-2 transition-opacity duration-200">
            {/* Scrubber slider */}
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
            />

            <div className="flex items-center justify-between text-xs text-zinc-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="hover:text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono text-zinc-400">
                  {currentTime} / {activeVideo.duration}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-zinc-400 font-mono">
                  {activeVideo.resolution}
                </span>
                <button
                  onClick={toggleFullscreen}
                  className="hover:text-white transition-colors"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Metadata & Creator Info Bar */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs bg-[#101014]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <span>{activeVideo.category}</span>
                <span>·</span>
                <span>Directed by {activeVideo.director}</span>
                <span>·</span>
                <span>{activeVideo.views.toLocaleString()} views</span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl">
                {activeVideo.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleFavorite(activeVideo.id, activeVideo.title)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 hover:border-[#d4af37] text-zinc-300 hover:text-white bg-[#17171d] transition-colors"
              >
                <Heart className={`w-4 h-4 ${isFavorite(activeVideo.id) ? 'text-[#d4af37] fill-[#d4af37]' : ''}`} />
                <span>{isFavorite(activeVideo.id) ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-lg border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white bg-[#17171d] transition-colors"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {activeVideo.externalUrl && (
                <a
                  href={activeVideo.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#d4af37] hover:bg-[#c49e29] text-black font-semibold transition-colors"
                >
                  <span>Source Reel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-zinc-400">
            <div>
              <span className="text-zinc-500 uppercase text-[10px] block">License & Rights</span>
              <span className="text-zinc-300">{activeVideo.license}</span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase text-[10px] block">Adult Verification Status</span>
              <span className="text-[#d4af37] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Consensual 18+ Certified Production
              </span>
            </div>
            <div className="flex items-center justify-start sm:justify-end gap-3 pt-2 sm:pt-0">
              <Link
                to={`/videos/${activeVideo.id}`}
                onClick={closeVideoPlayer}
                className="text-zinc-300 hover:text-white underline underline-offset-4"
              >
                View Full Discussion & Details →
              </Link>
              <Link
                to={`/report?targetType=video&targetId=${activeVideo.id}`}
                onClick={closeVideoPlayer}
                className="text-zinc-500 hover:text-rose-400 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                <span>Report</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
