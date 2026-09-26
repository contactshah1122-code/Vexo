import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AlbumCard } from '../components/common/AlbumCard';
import { VideoCard } from '../components/common/VideoCard';
import { Heart, Trash2, Download, ArrowRight, Images, Film } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { favorites, albums, videos, clearFavorites, exportFavorites, openLightbox } = useApp();

  const favoriteAlbums = albums.filter(a => favorites.includes(a.id));
  const favoriteVideos = videos.filter(v => favorites.includes(v.id));

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
              <Heart className="w-4 h-4 fill-[#d4af37]" />
              <span>Personal Curation</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl font-light text-white tracking-tight">
              Saved Favorites
            </h1>
            <p className="mt-3 text-sm text-zinc-400 font-light leading-relaxed">
              Your privately saved visual collections and video reels. Stored securely on your device.
            </p>
          </div>

          {favorites.length > 0 && (
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={exportFavorites}
                className="px-4 py-2 bg-[#17171f] hover:bg-[#20202b] text-zinc-300 hover:text-white text-xs font-medium rounded-lg border border-white/10 flex items-center gap-2 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Export JSON</span>
              </button>
              <button
                onClick={clearFavorites}
                className="px-4 py-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-medium rounded-lg border border-rose-500/20 flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="text-center py-24 bg-[#111116] border border-white/5 rounded-2xl p-8 max-w-xl mx-auto">
            <Heart className="w-12 h-12 text-zinc-600 mx-auto mb-4 stroke-[1.5]" />
            <h3 className="font-editorial text-2xl text-white">Your collection is empty</h3>
            <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto leading-relaxed">
              Click the heart icon on any photo album or video discovery reel to curate your personal archive.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                to="/photos"
                className="px-5 py-2.5 bg-[#d4af37] text-black font-semibold text-xs rounded-lg flex items-center gap-2"
              >
                <span>Browse Photos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/videos"
                className="px-5 py-2.5 bg-[#17171f] hover:bg-[#20202b] text-white text-xs font-medium rounded-lg border border-white/10"
              >
                Browse Videos
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {favoriteAlbums.length > 0 && (
              <div>
                <h2 className="font-editorial text-2xl text-white mb-6 flex items-center gap-2">
                  <Images className="w-5 h-5 text-[#d4af37]" />
                  <span>Saved Photo Albums ({favoriteAlbums.length})</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteAlbums.map(album => (
                    <AlbumCard
                      key={album.id}
                      album={album}
                      onOpenLightbox={(a) => openLightbox(a, 0)}
                    />
                  ))}
                </div>
              </div>
            )}

            {favoriteVideos.length > 0 && (
              <div>
                <h2 className="font-editorial text-2xl text-white mb-6 flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#d4af37]" />
                  <span>Saved Video Discovery Reels ({favoriteVideos.length})</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteVideos.map(video => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
