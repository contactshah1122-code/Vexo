import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AlbumCard } from '../components/common/AlbumCard';
import { VideoCard } from '../components/common/VideoCard';
import { ArrowLeft, Images, Film, Layers } from 'lucide-react';

export const CategoryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { categories, albums, videos, openLightbox } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'photos' | 'videos'>('all');

  const category = categories.find(c => c.slug === slug || c.id === slug);

  if (!category) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-8 text-center">
        <h1 className="font-editorial text-4xl text-white mb-4">Category Not Found</h1>
        <p className="text-zinc-400 text-sm mb-6">The specified aesthetic collection could not be located.</p>
        <Link to="/categories" className="px-6 py-2.5 bg-[#d4af37] text-black font-semibold text-xs rounded-lg">
          Browse All Categories
        </Link>
      </div>
    );
  }

  const categoryAlbums = albums.filter(
    a => a.category.toLowerCase() === category.name.toLowerCase()
  );
  const categoryVideos = videos.filter(
    v => v.category.toLowerCase() === category.name.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] pb-24">
      {/* Category Banner Hero */}
      <div className="relative min-h-[40vh] flex items-end border-b border-white/5 overflow-hidden">
        <img
          src={category.thumbnail}
          alt={category.name}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </Link>

          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <Layers className="w-4 h-4" />
            <span>Aesthetic Taxonomy</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-white tracking-tight">
            {category.name}
          </h1>

          <p className="mt-3 text-sm text-zinc-300 font-light max-w-2xl leading-relaxed">
            {category.description}
          </p>

          {/* Counts */}
          <div className="mt-4 flex items-center gap-4 text-xs text-zinc-400">
            <span>{categoryAlbums.length} Photo Albums</span>
            <span>·</span>
            <span>{categoryVideos.length} Cinematic Reels</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 p-1 bg-[#14141a] rounded-lg border border-white/5 w-fit mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'all'
                ? 'bg-[#d4af37] text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Media ({categoryAlbums.length + categoryVideos.length})
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'photos'
                ? 'bg-[#d4af37] text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Images className="w-3.5 h-3.5" />
            <span>Photo Albums ({categoryAlbums.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'videos'
                ? 'bg-[#d4af37] text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Cinematic Videos ({categoryVideos.length})</span>
          </button>
        </div>

        {/* Content sections */}
        {(activeTab === 'all' || activeTab === 'photos') && (
          <div className="mb-14">
            <h2 className="font-editorial text-2xl text-white font-normal mb-6 flex items-center gap-2">
              <Images className="w-5 h-5 text-[#d4af37]" />
              <span>Photo Albums in {category.name}</span>
            </h2>

            {categoryAlbums.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryAlbums.map(album => (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    onOpenLightbox={(a) => openLightbox(a, 0)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 py-6">No photo albums currently filed in this category.</p>
            )}
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'videos') && (
          <div>
            <h2 className="font-editorial text-2xl text-white font-normal mb-6 flex items-center gap-2">
              <Film className="w-5 h-5 text-[#d4af37]" />
              <span>Cinematic Reels in {category.name}</span>
            </h2>

            {categoryVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryVideos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 py-6">No videos currently filed in this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
