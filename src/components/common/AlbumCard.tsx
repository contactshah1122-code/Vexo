import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Images, ShieldCheck } from 'lucide-react';
import { PhotoAlbum } from '../../types';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from './ImageWithFallback';

interface AlbumCardProps {
  album: PhotoAlbum;
  onOpenLightbox?: (album: PhotoAlbum) => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ album, onOpenLightbox }) => {
  const { toggleFavorite, isFavorite } = useApp();
  const favorited = isFavorite(album.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(album.id, album.title);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    if (onOpenLightbox) {
      e.preventDefault();
      e.stopPropagation();
      onOpenLightbox(album);
    }
  };

  return (
    <article className="group relative flex flex-col bg-[#111115] border border-white/5 hover:border-white/15 rounded-xl overflow-hidden transition-all duration-300">
      {/* Media Box */}
      <Link to={`/photos/${album.id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-black block">
        <ImageWithFallback
          src={album.coverImage}
          alt={album.title}
          fallbackTitle={album.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges / Actions */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {/* Subtle unboxed verified tag */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>18+ Verified</span>
          </div>

          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            className="pointer-events-auto p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 transition-transform active:scale-95"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'text-[#d4af37] fill-[#d4af37]' : 'text-white'}`} />
          </button>
        </div>

        {/* Bottom Quick Look Overlay */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleQuickView}
            className="px-3 py-1.5 bg-[#d4af37] hover:bg-[#c49e29] text-black font-semibold text-xs rounded-md shadow-lg transition-transform hover:scale-105"
          >
            Quick View
          </button>
        </div>
      </Link>

      {/* Content Meta Area - Zero-Pill Discipline */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata Row: Category · Photos Count · Photographer */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2 truncate">
            <span className="text-[#d4af37] font-medium">{album.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Images className="w-3 h-3 text-zinc-500" />
              {album.photosCount} Photos
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{album.photographer}</span>
          </div>

          {/* Title */}
          <h3 className="font-editorial text-lg sm:text-xl font-medium text-white group-hover:text-[#d4af37] transition-colors line-clamp-1">
            <Link to={`/photos/${album.id}`}>{album.title}</Link>
          </h3>

          {/* Description snippet */}
          <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {album.description}
          </p>
        </div>

        {/* Footer Metrics Row */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {album.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-zinc-500" />
              {album.likes.toLocaleString()}
            </span>
          </div>

          <span className="font-mono text-zinc-400">
            {album.resolution}
          </span>
        </div>
      </div>
    </article>
  );
};
