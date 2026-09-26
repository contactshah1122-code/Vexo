import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AlbumCard } from '../components/common/AlbumCard';
import { VideoCard } from '../components/common/VideoCard';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Camera,
  Film,
  Compass,
  Lock,
  Layers
} from 'lucide-react';
import { heroImg } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { albums, videos, categories, openLightbox, openVideoPlayer } = useApp();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Featured album
  const spotlightAlbum = albums.find(a => a.isFeatured) || albums[0];
  const featuredVideos = videos.slice(0, 3);

  // Filtered albums for recent section
  const filteredAlbums = activeCategoryFilter === 'all'
    ? albums.slice(0, 6)
    : albums.filter(a => a.category.toLowerCase().includes(activeCategoryFilter.toLowerCase())).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5]">
      {/* 1. Split Hero Section */}
      <section className="relative min-h-[85vh] flex items-center border-b border-white/5 overflow-hidden">
        {/* Cinematic Backdrop with Measured Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Nocturne Fine Art Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-60 scale-105 transform animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="max-w-3xl space-y-6">
            {/* Regulatory Trust Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-medium text-zinc-300 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>Consensual & Lawfully Licensed 18+ Fine Art Visual Media</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.08] [text-wrap:balance]">
              Shadows, light, and the intimacy of form.
            </h1>

            {/* Prose */}
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl">
              An uncompromising digital salon showcasing contemporary monochrome chiaroscuro, cinematic editorial narratives, and auteur showreels. Featuring fully documented adult artists.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/photos"
                className="px-7 py-3.5 bg-[#d4af37] hover:bg-[#c49e29] text-black font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/10"
              >
                <span>Discover Photo Albums</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/videos"
                className="px-6 py-3.5 bg-[#14141a]/80 hover:bg-[#1c1c24] text-white border border-white/15 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 backdrop-blur-md"
              >
                <Film className="w-4 h-4 text-[#d4af37]" />
                <span>Cinematic Video Discovery</span>
              </Link>
            </div>

            {/* Micro Trust Metadata Row - Zero-Pill */}
            <div className="pt-4 flex items-center gap-4 text-xs text-zinc-400">
              <span>Leica & Hasselblad Masters</span>
              <span aria-hidden="true">·</span>
              <span>18 U.S.C. § 2257 Records Kept</span>
              <span aria-hidden="true">·</span>
              <span>4K Ultra HD</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Regulatory & Ethical Charter Strip */}
      <section className="border-b border-white/5 bg-[#0d0d11] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-zinc-400">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-zinc-200">100% Consensual & 18+</p>
                <p className="text-[11px] text-zinc-500">All models verified with photo government ID</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Camera className="w-5 h-5 text-[#d4af37] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-zinc-200">Full EXIF & Attribution</p>
                <p className="text-[11px] text-zinc-500">Camera settings, optics & artist royalties</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#d4af37] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-zinc-200">Privacy & Data Security</p>
                <p className="text-[11px] text-zinc-500">No habit tracking, private local storage</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-[#d4af37] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-zinc-200">Master 4K Visual Resolution</p>
                <p className="text-[11px] text-zinc-500">Uncompressed digital negatives & cinema color</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Curator's Spotlight Album Showcase */}
      {spotlightAlbum && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Curator's Spotlight
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl text-white font-normal mt-1">
                Featured Work of the Month
              </h2>
            </div>
            <Link
              to={`/photos/${spotlightAlbum.id}`}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>View Album Spec</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#101014] border border-white/5 rounded-2xl p-6 sm:p-8">
            <div className="lg:col-span-7 relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer" onClick={() => openLightbox(spotlightAlbum, 0)}>
              <img
                src={spotlightAlbum.coverImage}
                alt={spotlightAlbum.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10">
                  {spotlightAlbum.photosCount} Plates · 4K Digital Negative
                </span>
                <span className="px-3 py-1 bg-[#d4af37] text-black font-semibold rounded">
                  Click to Expand Lightbox
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="text-[#d4af37] font-medium">{spotlightAlbum.category}</span>
                <span aria-hidden="true">·</span>
                <span>By {spotlightAlbum.photographer}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-light text-white leading-tight">
                {spotlightAlbum.title}
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {spotlightAlbum.description}
              </p>

              <div className="p-4 rounded-xl bg-[#09090b] border border-white/5 space-y-2 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Models Depicted:</span>
                  <span className="text-zinc-200 font-medium">{spotlightAlbum.modelNames.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Verified 18+ Record:</span>
                  <span className="text-[#d4af37] font-mono">{spotlightAlbum.modelReleaseId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Aspect & Format:</span>
                  <span className="text-zinc-200 uppercase">{spotlightAlbum.orientation} · {spotlightAlbum.resolution}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => openLightbox(spotlightAlbum, 0)}
                  className="px-6 py-3 bg-[#d4af37] hover:bg-[#c49e29] text-black font-semibold text-xs rounded-lg transition-colors flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Launch High-Res Lightbox</span>
                </button>
                <Link
                  to={`/photos/${spotlightAlbum.id}`}
                  className="px-5 py-3 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs rounded-lg transition-colors"
                >
                  Album Details
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Recent Photo Albums with Segmented Category Filter */}
      <section className="py-16 bg-[#0c0c0f] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Curated Collections
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl text-white font-normal mt-1">
                Recent Photo Albums
              </h2>
            </div>

            {/* Segmented Filter Control */}
            <div className="flex items-center gap-1.5 p-1 bg-[#16161d] rounded-lg border border-white/5 overflow-x-auto max-w-full">
              {[
                { id: 'all', label: 'All Disciplines' },
                { id: 'noir', label: 'Noir & Mono' },
                { id: 'cinematic', label: 'Cinematic' },
                { id: 'neon', label: 'Ambient Neon' },
                { id: 'golden', label: 'Golden Hour' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveCategoryFilter(f.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                    activeCategoryFilter === f.id
                      ? 'bg-[#d4af37] text-black shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlbums.map((album) => (
              <AlbumCard
                key={album.id}
                album={album}
                onOpenLightbox={(a) => openLightbox(a, 0)}
              />
            ))}
          </div>

          {/* View More Link */}
          <div className="mt-12 text-center">
            <Link
              to="/photos"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-white/10 hover:border-[#d4af37] text-sm text-zinc-300 hover:text-white transition-colors bg-[#111115]"
            >
              <span>Explore All {albums.length} Photo Albums</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Cinematic Video Discovery Strip */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/5">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Motion & Light
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-white font-normal mt-1">
              Cinematic Discovery Reels
            </h2>
          </div>
          <Link
            to="/videos"
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>All Videos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* 6. Curated Category Directory */}
      <section className="py-16 bg-[#0c0c0f] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Taxonomy & Themes
            </span>
            <h2 className="font-editorial text-3xl text-white font-normal mt-1">
              Browse by Aesthetic Category
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Explore specialized lighting paradigms, medium formats, and narrative styles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/categories/${cat.slug}`}
                className="group relative h-64 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all flex flex-col justify-end p-6"
              >
                <img
                  src={cat.thumbnail}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                <div className="relative z-10 space-y-2">
                  <div className="text-xs text-[#d4af37] font-medium flex items-center gap-2">
                    <span>{cat.albumsCount} Albums</span>
                    <span aria-hidden="true">·</span>
                    <span>{cat.videosCount} Videos</span>
                  </div>
                  <h3 className="font-editorial text-2xl text-white group-hover:text-[#d4af37] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Safety, Compliance & 2257 Notice Box */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121216] border border-white/10 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Ethical Production Standards & 18+ Guarantee</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-4xl text-white font-normal">
              A transparent, artist-first visual media repository.
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              VEXO operates in strict adherence to all applicable state, federal, and international regulations. Every visual asset in our catalog originates from consensual, contracted productions with adult talent verified through government-issued identification prior to shooting.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs">
              <Link
                to="/takedown"
                className="text-[#d4af37] hover:underline flex items-center gap-1 font-medium"
              >
                <span>File a Takedown Notice</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="text-zinc-600">·</span>
              <Link
                to="/report"
                className="text-zinc-400 hover:text-white hover:underline"
              >
                Report Questionable Content
              </Link>
              <span className="text-zinc-600">·</span>
              <Link
                to="/terms"
                className="text-zinc-400 hover:text-white hover:underline"
              >
                Review Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
