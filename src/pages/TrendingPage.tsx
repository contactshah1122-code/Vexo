import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlbumCard } from '../components/common/AlbumCard';
import { VideoCard } from '../components/common/VideoCard';
import { TrendingUp, Flame, Images, Film } from 'lucide-react';

export const TrendingPage: React.FC = () => {
  const { albums, videos, openLightbox } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'photos' | 'videos'>('all');

  const trendingAlbums = albums
    .filter(a => a.isTrending || a.views > 30000)
    .sort((a, b) => b.views - a.views);

  const trendingVideos = videos
    .filter(v => v.isTrending || v.views > 35000)
    .sort((a, b) => b.views - a.views);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>High Engagement & Critical Acclaim</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-white tracking-tight">
            Trending Releases
          </h1>
          <p className="mt-3 text-sm text-zinc-400 font-light leading-relaxed">
            The most inspected photographic plates and watched cinematography showreels this season across the VEXO digital salon.
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
            All Trending ({trendingAlbums.length + trendingVideos.length})
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
            <span>Trending Photos ({trendingAlbums.length})</span>
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
            <span>Trending Videos ({trendingVideos.length})</span>
          </button>
        </div>

        {/* Grid Sections */}
        {(activeTab === 'all' || activeTab === 'photos') && (
          <div className="mb-14">
            <h2 className="font-editorial text-2xl text-white font-normal mb-6 flex items-center gap-2">
              <Images className="w-5 h-5 text-[#d4af37]" />
              <span>Trending Photo Albums</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingAlbums.map(album => (
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
              <span>Trending Cinematic Videos</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
