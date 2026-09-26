import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { VideoCard } from '../components/common/VideoCard';
import { Film, Search, RotateCcw } from 'lucide-react';

export const VideosPage: React.FC = () => {
  const { videos, categories } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedResolution, setSelectedResolution] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'recent'>('popular');

  const filteredVideos = useMemo(() => {
    return videos
      .filter((video) => {
        const matchesSearch =
          !search ||
          video.title.toLowerCase().includes(search.toLowerCase()) ||
          video.description.toLowerCase().includes(search.toLowerCase()) ||
          video.director.toLowerCase().includes(search.toLowerCase()) ||
          video.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

        const matchesCategory =
          selectedCategory === 'all' ||
          video.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchesResolution =
          selectedResolution === 'all' ||
          video.resolution === selectedResolution;

        return matchesSearch && matchesCategory && matchesResolution;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.views - a.views;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'recent') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        return 0;
      });
  }, [videos, search, selectedCategory, selectedResolution, sortBy]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedResolution('all');
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <Film className="w-4 h-4" />
            <span>Motion & Cinematography</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-white tracking-tight">
            Cinematic Video Discovery
          </h1>
          <p className="mt-3 text-sm text-zinc-400 font-light leading-relaxed">
            Curated auteur video reels, high-frame-rate studio captures, and lighting masterclasses featuring fully consensual adult performers.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-[#111116] border border-white/5 rounded-2xl p-5 mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search videos by title, director, or lighting style..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#17171e] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 whitespace-nowrap">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#17171e] border border-white/10 text-xs text-zinc-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#d4af37]"
              >
                <option value="popular">Most Viewed</option>
                <option value="rating">Highest Rated</option>
                <option value="recent">Recently Added</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#17171e] border border-white/10 text-xs text-zinc-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#d4af37]"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Quality:</span>
              <select
                value={selectedResolution}
                onChange={(e) => setSelectedResolution(e.target.value)}
                className="bg-[#17171e] border border-white/10 text-xs text-zinc-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#d4af37]"
              >
                <option value="all">All Resolutions</option>
                <option value="4K">4K Ultra HD</option>
                <option value="Cinema 2K">Cinema 2K</option>
                <option value="1080p">1080p Full HD</option>
              </select>
            </div>

            {(search || selectedCategory !== 'all' || selectedResolution !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="ml-auto flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-6">
          <span>
            Showing <strong className="text-white">{filteredVideos.length}</strong> cinematic reels
          </span>
        </div>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#111116] border border-white/5 rounded-2xl p-8">
            <Film className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="font-editorial text-2xl text-white">No video reels found</h3>
            <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto">
              Try adjusting your query or resetting category selection.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 px-5 py-2.5 bg-[#d4af37] text-black font-semibold text-xs rounded-lg"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
