import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, Shield, Menu, X, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites, albums, videos } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Suggestions for search drawer
  const filteredSuggestions = searchQuery.trim().length > 1
    ? [
        ...albums.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3).map(a => ({ type: 'Photo Album', title: a.title, url: `/photos/${a.id}` })),
        ...videos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3).map(v => ({ type: 'Video', title: v.title, url: `/videos/${v.id}` })),
      ]
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: 'Photos', href: '/photos' },
    { label: 'Videos', href: '/videos' },
    { label: 'Categories', href: '/categories' },
    { label: 'Trending', href: '/trending' },
    { label: 'Recent', href: '/recent' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#09090b]/90 backdrop-blur-md border-b border-white/5 transition-all">
        {/* Strict 3-zone Top Bar Contract */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/"
            className="font-editorial text-2xl sm:text-3xl font-semibold tracking-wider text-white hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0"
          >
            VEXO
          </Link>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative py-1 transition-colors hover:text-white whitespace-nowrap ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-400'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4af37] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(prev => !prev)}
              aria-label="Open search modal"
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favorites Icon */}
            <Link
              to="/favorites"
              aria-label="Saved favorites"
              className="relative p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-[#d4af37] fill-[#d4af37]' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#d4af37] text-black font-bold text-[10px] rounded-full flex items-center justify-center leading-none">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Admin Console Entry */}
            <Link
              to="/admin"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#d4af37]/40 bg-[#121215] text-xs font-medium text-zinc-300 hover:text-white transition-colors whitespace-nowrap"
            >
              <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Admin</span>
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Expandable Live Search Drawer */}
        {isSearchOpen && (
          <div className="border-t border-white/5 bg-[#0f0f13] px-4 py-4 sm:py-6 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search albums, videos, photographers, or aesthetic styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-[#18181f] border border-white/10 rounded-xl pl-12 pr-24 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 px-4 py-1.5 bg-[#d4af37] hover:bg-[#c49e29] text-black font-semibold text-xs rounded-lg transition-colors"
                >
                  Search
                </button>
              </form>

              {/* Suggestions */}
              {filteredSuggestions.length > 0 && (
                <div className="mt-3 bg-[#14141a] rounded-xl border border-white/5 divide-y divide-white/5 overflow-hidden">
                  {filteredSuggestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigate(item.url);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-white/5 flex items-center justify-between text-xs transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">{item.type}</span>
                        <span className="text-zinc-400">·</span>
                        <span className="text-zinc-200 font-medium">{item.title}</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Popular Keywords */}
              <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500 flex-wrap">
                <span>Trending Searches:</span>
                {['Noir', 'Chiaroscuro', '35mm Film', 'Parisian', 'Neon', 'Cinematic'].map(kw => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => {
                      setSearchQuery(kw);
                      setIsSearchOpen(false);
                      navigate(`/search?q=${encodeURIComponent(kw)}`);
                    }}
                    className="hover:text-[#d4af37] transition-colors underline underline-offset-4"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#09090b] px-4 py-6 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 px-3 rounded-lg ${
                    location.pathname === item.href
                      ? 'bg-white/10 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium py-2 px-3 rounded-lg text-zinc-400 hover:text-white flex items-center justify-between"
              >
                <span>Saved Favorites</span>
                <span className="text-xs text-[#d4af37] font-semibold">{favorites.length}</span>
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium py-2 px-3 rounded-lg text-zinc-400 hover:text-white flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-[#d4af37]" />
                <span>Admin Console</span>
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
