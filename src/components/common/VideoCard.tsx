import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Heart, Eye, Clock, ShieldCheck, Star } from 'lucide-react';
import { VideoEntry } from '../../types';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from './ImageWithFallback';

interface VideoCardProps {
  video: VideoEntry;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { openVideoPlayer, toggleFavorite, isFavorite } = useApp();
  const favorited = isFavorite(video.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(video.id, video.title);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openVideoPlayer(video);
  };

  return (
    <article className="group relative flex flex-col bg-[#111115] border border-white/5 hover:border-white/15 rounded-xl overflow-hidden transition-all duration-300">
      {/* Media Box */}
      <div className="relative aspect-video w-full overflow-hidden bg-black block cursor-pointer" onClick={handlePlayClick}>
        <ImageWithFallback
          src={video.thumbnail}
          alt={video.title}
          fallbackTitle={video.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>18+ Verified</span>
          </div>

          <button
            onClick={handleFavoriteClick}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            className="pointer-events-auto p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 transition-transform active:scale-95"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'text-[#d4af37] fill-[#d4af37]' : 'text-white'}`} />
          </button>
        </div>

        {/* Center Play Glyph */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-black/60 group-hover:bg-[#d4af37] text-white group-hover:text-black flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-2xl backdrop-blur-sm border border-white/20 group-hover:border-transparent">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] font-mono text-white bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
          <Clock className="w-3 h-3 text-zinc-400" />
          <span>{video.duration}</span>
        </div>
      </div>

      {/* Content Meta Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2 truncate">
            <span className="text-[#d4af37] font-medium">{video.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">Dir. {video.director}</span>
          </div>

          {/* Title */}
          <h3 className="font-editorial text-lg sm:text-xl font-medium text-white group-hover:text-[#d4af37] transition-colors line-clamp-1">
            <Link to={`/videos/${video.id}`}>{video.title}</Link>
          </h3>

          <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        </div>

        {/* Footer Metrics Row */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {video.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-amber-300/90">
              <Star className="w-3 h-3 fill-current text-[#d4af37]" />
              {video.rating.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-zinc-400">{video.resolution}</span>
            <span>·</span>
            <Link
              to={`/videos/${video.id}`}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Details →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
