import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlbumCard } from '../components/common/AlbumCard';
import { VideoCard } from '../components/common/VideoCard';
import { Clock, Images, Film } from 'lucide-react';

export const RecentPage: React.FC = () => {
  const { albums, videos, openLightbox } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'photos' | 'videos'>('all');

  // Sort chronological descending
  const recentAlbums = [...albums].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const recentVideos = [...videos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <Clock className="w-4 h-4" />
            <span>Chronological Feed</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-white tracking-tight">
            Recently Added
          </h1>
          <p className="mt-3 text-sm text-zinc-400 font-light leading-relaxed">
            Latest additions to the archive, freshly cataloged and verified under 18 U.S.C. § 2257 records.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1 bg-[#14141a] rounded-lg border border-white/5 w-fit mb-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'all'
                ? 'bg-[#d4af37] text-black font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All New Additions ({recentAlbums.length + recentVideos.length})
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'photos'
                ? 'bg-[#d4af37] text-black font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Images className="w-3.5 h-3.5" />
            <span>Recent Photos ({recentAlbums.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'videos'
                ? 'bg-[#d4af37] text-black font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Recent Videos ({recentVideos.length})</span>
          </button>
        </div>

        {/* Content */}
        {(activeTab === 'all' || activeTab === 'photos') && (
          <div className="mb-14">
            <h2 className="font-editorial text-2xl text-white font-normal mb-6 flex items-center gap-2">
              <Images className="w-5 h-5 text-[#d4af37]" />
              <span>Recently Cataloged Photo Albums</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentAlbums.map(album => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  onOpenLightbox={(a) => openLightbox(a, 0)}
                />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'videos') && (
          <div>
            <h2 className="font-editorial text-2xl text-white font-normal mb-6 flex items-center gap-2">
              <Film className="w-5 h-5 text-[#d4af37]" />
              <span>Recently Premiered Video Discovery Reels</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
