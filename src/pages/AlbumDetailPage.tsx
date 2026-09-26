import React, { useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AlbumCard } from '../components/common/AlbumCard';
import {
  ArrowLeft,
  Heart,
  Share2,
  Download,
  ShieldCheck,
  Camera,
  Maximize2,
  AlertCircle,
  Calendar,
  Eye,
  Layers,
  Sparkles
} from 'lucide-react';

export const AlbumDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { albums, openLightbox, toggleFavorite, isFavorite, showToast } = useApp();

  const album = albums.find(a => a.id === id || a.slug === id);

  // If a photo query param is provided (e.g. ?photo=2), trigger lightbox automatically
  useEffect(() => {
    const photoParam = searchParams.get('photo');
    if (photoParam && album) {
      const idx = parseInt(photoParam, 10) - 1;
      if (idx >= 0 && idx < album.photos.length) {
        openLightbox(album, idx);
      }
    }
  }, [searchParams, album, openLightbox]);

  if (!album) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-8 text-center">
        <h1 className="font-editorial text-4xl text-white mb-4">Album Not Found</h1>
        <p className="text-zinc-400 text-sm mb-6">The requested collection does not exist or has been archived.</p>
        <Link to="/photos" className="px-6 py-2.5 bg-[#d4af37] text-black font-semibold text-xs rounded-lg">
          Back to Photo Gallery
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(album.id);
  const relatedAlbums = albums.filter(a => a.id !== album.id && a.category === album.category).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast('Album link copied to clipboard', 'success');
    });
  };

  const handleDownloadSpecs = () => {
    const specs = {
      title: album.title,
      photographer: album.photographer,
      modelReleaseRecord: album.modelReleaseId,
      statutoryCompliance: "18 U.S.C. 2257 Record Kept at Custodian of Records",
      format: album.resolution,
      photosCount: album.photosCount,
      exifSummary: album.photos.map(p => ({
        plate: p.title,
        camera: p.camera,
        lens: p.lens,
        aperture: p.aperture,
        shutter: p.shutterSpeed,
        iso: p.iso
      }))
    };
    const blob = new Blob([JSON.stringify(specs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nocturne_spec_${album.slug}.json`;
    a.click();
    showToast('Downloaded technical album manifest', 'info');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] pb-24">
      {/* Top Breadcrumb Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Galleries</span>
          </button>

          <div className="flex items-center gap-2">
            <Link
              to={`/report?targetType=album&targetId=${album.id}&targetTitle=${encodeURIComponent(album.title)}`}
              className="text-xs text-zinc-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Report Media</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Album Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Cover Display */}
          <div className="lg:col-span-7">
            <div
              onClick={() => openLightbox(album, 0)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer bg-black border border-white/10 shadow-2xl"
            >
              <img
                src={album.coverImage}
                alt={album.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Click to view Fullscreen Lightbox</span>
                </span>
                <span className="bg-[#d4af37] text-black font-semibold px-3 py-1.5 rounded-lg shadow-lg">
                  {album.photosCount} High-Res Plates
                </span>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                <span className="text-[#d4af37] font-medium">{album.category}</span>
                <span aria-hidden="true">·</span>
                <span>By {album.photographer}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{album.publishedAt}</span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl text-white font-normal leading-tight">
                {album.title}
              </h1>

              <p className="mt-4 text-sm text-zinc-300 font-light leading-relaxed">
                {album.description}
              </p>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openLightbox(album, 0)}
                className="px-6 py-3 bg-[#d4af37] hover:bg-[#c49e29] text-black font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-[#d4af37]/10"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Open Lightbox</span>
              </button>

              <button
                onClick={() => toggleFavorite(album.id, album.title)}
                className={`p-3 rounded-lg border transition-colors ${
                  favorited
                    ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]'
                    : 'border-white/10 hover:border-white/20 text-zinc-300 hover:text-white bg-[#14141a]'
                }`}
                title={favorited ? 'Saved to favorites' : 'Add to favorites'}
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-[#d4af37]' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-lg border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white bg-[#14141a] transition-colors"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={handleDownloadSpecs}
                className="p-3 rounded-lg border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white bg-[#14141a] transition-colors"
                title="Download technical manifest JSON"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Verified 18+ & Compliance Box */}
            <div className="p-4 rounded-xl bg-[#111116] border border-white/5 space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Depicted Adults</span>
                <span className="text-zinc-200 font-medium">{album.modelNames.join(', ')}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-zinc-500 uppercase tracking-wider text-[10px]">18 U.S.C. § 2257 Release</span>
                <span className="text-[#d4af37] font-mono">{album.modelReleaseId}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Master Negative</span>
                <span className="text-zinc-200 font-mono">{album.resolution} Ultra HD</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Audience Verification</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Consensual Adult Certified
                </span>
              </div>
            </div>

            {/* Tags - Zero-Pill Text List */}
            <div className="pt-2">
              <span className="text-[11px] text-zinc-500 uppercase tracking-wider block mb-2">Thematic Tags</span>
              <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                {album.tags.map((tag, idx) => (
                  <span key={tag} className="hover:text-white">
                    #{tag}{idx < album.tags.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plates Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Complete Plates Catalog
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-white font-normal mt-1">
              Photographic Plates ({album.photos.length})
            </h2>
          </div>
          <span className="text-xs text-zinc-500">
            Click any plate for high-resolution inspection
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {album.photos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(album, idx)}
              className="group relative bg-[#111116] border border-white/5 hover:border-white/20 rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-mono text-zinc-300">Plate {idx + 1}</span>
                  <span className="text-[#d4af37] text-[11px] font-mono">{photo.aperture} · {photo.shutterSpeed}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-sm text-zinc-200 group-hover:text-white truncate">
                  {photo.title}
                </h3>
                {photo.caption && (
                  <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>
                )}
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>{photo.camera}</span>
                  <span>{photo.lens}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Albums */}
      {relatedAlbums.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/5">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              More in this Category
            </span>
            <h2 className="font-editorial text-2xl text-white font-normal mt-1">
              Related Collections
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedAlbums.map(rel => (
              <AlbumCard key={rel.id} album={rel} onOpenLightbox={(a) => openLightbox(a, 0)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
