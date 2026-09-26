import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AlbumCard } from '../components/common/AlbumCard';
import { VideoCard } from '../components/common/VideoCard';
import { Search, SlidersHorizontal, RotateCcw, Images, Film } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const { albums, videos, openLightbox } = useApp();

  const [query, setQuery] = useState(initialQuery);
  const [filterType, setFilterType] = useState<'all' | 'photos' | 'videos'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'views' | 'date'>('relevance');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const matchedAlbums = useMemo(() => {
    if (!query.trim()) return albums;
    const q = query.toLowerCase();
    return albums.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.photographer.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [albums, query]);

  const matchedVideos = useMemo(() => {
    if (!query.trim()) return videos;
    const q = query.toLowerCase();
    return videos.filter(
      v =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.director.toLowerCase().includes(q) ||
        v.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [videos, query]);

  const totalResults =
    (filterType === 'all' || filterType === 'photos' ? matchedAlbums.length : 0) +
    (filterType === 'all' || filterType === 'videos' ? matchedVideos.length : 0);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Input Box */}
        <div className="max-w-3xl mx-auto mb-12">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search albums, videos, photographers, or aesthetic styles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#14141a] border border-white/10 rounded-2xl pl-12 pr-32 py-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] shadow-xl"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2 bg-[#d4af37] hover:bg-[#c49e29] text-black font-semibold text-xs rounded-xl transition-colors"
            >
              Search
            </button>
          </form>

          {/* Quick Tag Suggestion Chips */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-500 flex-wrap">
            <span>Popular Suggestions:</span>
            {['Monochrome', 'Chiaroscuro', 'Parisian', 'Rain', 'Natural Light', 'Masterclass'].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setQuery(tag);
                  setSearchParams({ q: tag });
                }}
                className="hover:text-[#d4af37] transition-colors underline underline-offset-4"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Filter & Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/5 mb-8">
          <div className="flex items-center gap-2 p-1 bg-[#14141a] rounded-lg border border-white/5">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterType === 'all'
                  ? 'bg-[#d4af37] text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Results
            </button>
            <button
              onClick={() => setFilterType('photos')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                filterType === 'photos'
                  ? 'bg-[#d4af37] text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Images className="w-3.5 h-3.5" />
              <span>Albums ({matchedAlbums.length})</span>
            </button>
            <button
              onClick={() => setFilterType('videos')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                filterType === 'videos'
                  ? 'bg-[#d4af37] text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Videos ({matchedVideos.length})</span>
            </button>
          </div>

          <div className="text-xs text-zinc-400">
            Found <strong className="text-white">{totalResults}</strong> records for query{' '}
            <span className="text-[#d4af37]">"{query || 'all archive'}"</span>
          </div>
        </div>

        {/* Results */}
        {totalResults === 0 ? (
          <div className="text-center py-24 bg-[#111116] border border-white/5 rounded-2xl p-8 max-w-xl mx-auto">
            <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="font-editorial text-2xl text-white">No results found</h3>
            <p className="text-xs text-zinc-400 mt-2">
              We couldn't find any albums or video reels matching "{query}". Try checking your spelling or searching for broader terms like "Monochrome" or "Natural".
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {(filterType === 'all' || filterType === 'photos') && matchedAlbums.length > 0 && (
              <div>
                <h2 className="font-editorial text-2xl text-white mb-6 flex items-center gap-2">
                  <Images className="w-5 h-5 text-[#d4af37]" />
                  <span>Photo Albums ({matchedAlbums.length})</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchedAlbums.map(album => (
                    <AlbumCard
                      key={album.id}
                      album={album}
                      onOpenLightbox={(a) => openLightbox(a, 0)}
                    />
                  ))}
                </div>
              </div>
            )}

            {(filterType === 'all' || filterType === 'videos') && matchedVideos.length > 0 && (
              <div>
                <h2 className="font-editorial text-2xl text-white mb-6 flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#d4af37]" />
                  <span>Cinematic Video Discovery ({matchedVideos.length})</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchedVideos.map(video => (
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
