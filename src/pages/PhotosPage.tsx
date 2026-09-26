import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AlbumCard } from '../components/common/AlbumCard';
import { Search, SlidersHorizontal, RotateCcw, Images } from 'lucide-react';

export const PhotosPage: React.FC = () => {
  const { albums, categories, openLightbox } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOrientation, setSelectedOrientation] = useState<string>('all');
  const [selectedResolution, setSelectedResolution] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'photos'>('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter & sort
  const filteredAlbums = useMemo(() => {
    return albums
      .filter((album) => {
        const matchesSearch =
          !search ||
          album.title.toLowerCase().includes(search.toLowerCase()) ||
          album.description.toLowerCase().includes(search.toLowerCase()) ||
          album.photographer.toLowerCase().includes(search.toLowerCase()) ||
          album.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

        const matchesCategory =
          selectedCategory === 'all' ||
          album.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchesOrientation =
          selectedOrientation === 'all' ||
          album.orientation === selectedOrientation;

        const matchesResolution =
          selectedResolution === 'all' ||
          album.resolution === selectedResolution;

        return matchesSearch && matchesCategory && matchesOrientation && matchesResolution;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.views - a.views;
        if (sortBy === 'recent') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        if (sortBy === 'photos') return b.photosCount - a.photosCount;
        return 0;
      });
  }, [albums, search, selectedCategory, selectedOrientation, selectedResolution, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAlbums.length / itemsPerPage) || 1;
  const paginatedAlbums = filteredAlbums.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedOrientation('all');
    setSelectedResolution('all');
    setSortBy('popular');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <Images className="w-4 h-4" />
            <span>Master Digital Negatives</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-white tracking-tight">
            Photo Albums & Fine Art Gallery
          </h1>
          <p className="mt-3 text-sm text-zinc-400 font-light leading-relaxed">
            Curated collections of contemporary adult monochrome, chiaroscuro portraiture, and architectural daylight studies.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#111116] border border-white/5 rounded-2xl p-5 mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search photo albums by title, photographer, or keyword..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#17171e] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Quick Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 whitespace-nowrap">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#17171e] border border-white/10 text-xs text-zinc-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#d4af37]"
              >
                <option value="popular">Most Popular</option>
                <option value="recent">Recently Added</option>
                <option value="photos">Most Photos</option>
              </select>
            </div>
          </div>

          {/* Filter Pills / Segments */}
          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-4 text-xs">
            {/* Category */}
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
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

            {/* Orientation */}
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Orientation:</span>
              <select
                value={selectedOrientation}
                onChange={(e) => {
                  setSelectedOrientation(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#17171e] border border-white/10 text-xs text-zinc-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#d4af37]"
              >
                <option value="all">All Orientations</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            {/* Resolution */}
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Resolution:</span>
              <select
                value={selectedResolution}
                onChange={(e) => {
                  setSelectedResolution(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#17171e] border border-white/10 text-xs text-zinc-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#d4af37]"
              >
                <option value="all">All Resolutions</option>
                <option value="4K">4K Master</option>
                <option value="Ultra HD">Ultra HD</option>
                <option value="High Res">High Res</option>
              </select>
            </div>

            {/* Reset */}
            {(search || selectedCategory !== 'all' || selectedOrientation !== 'all' || selectedResolution !== 'all') && (
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

        {/* Gallery Results Counter */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-6">
          <span>
            Showing <strong className="text-white">{filteredAlbums.length}</strong> photo albums
          </span>
          <span className="text-zinc-500">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* Albums Grid */}
        {paginatedAlbums.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedAlbums.map((album) => (
              <AlbumCard
                key={album.id}
                album={album}
                onOpenLightbox={(a) => openLightbox(a, 0)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#111116] border border-white/5 rounded-2xl p-8">
            <Images className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="font-editorial text-2xl text-white">No albums match your filters</h3>
            <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto">
              Try adjusting your search keywords or resetting active category filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 px-5 py-2.5 bg-[#d4af37] text-black font-semibold text-xs rounded-lg"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="px-4 py-2 rounded-lg border border-white/10 text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-lg text-xs font-mono transition-colors ${
                  currentPage === i + 1
                    ? 'bg-[#d4af37] text-black font-semibold'
                    : 'border border-white/10 hover:bg-white/5 text-zinc-400'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="px-4 py-2 rounded-lg border border-white/10 text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
