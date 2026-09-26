import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  Share2,
  Download,
  Camera,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const Lightbox: React.FC = () => {
  const { lightboxState, closeLightbox, setPhotoIndex, showToast } = useApp();
  const { isOpen, album, photoIndex } = lightboxState;

  const [scale, setScale] = useState<number>(1);
  const [showExif, setShowExif] = useState<boolean>(false);

  // Reset zoom on photo change
  useEffect(() => {
    setScale(1);
  }, [photoIndex, isOpen]);

  const currentPhoto = album && album.photos && album.photos[photoIndex]
    ? album.photos[photoIndex]
    : null;

  const handleNext = useCallback(() => {
    if (!album) return;
    setPhotoIndex((photoIndex + 1) % album.photos.length);
  }, [album, photoIndex, setPhotoIndex]);

  const handlePrev = useCallback(() => {
    if (!album) return;
    setPhotoIndex((photoIndex - 1 + album.photos.length) % album.photos.length);
  }, [album, photoIndex, setPhotoIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'i' || e.key === 'I') setShowExif(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLightbox, handleNext, handlePrev]);

  if (!isOpen || !album || !currentPhoto) return null;

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.3, 0.7));
  const handleResetZoom = () => setScale(1);

  const handleShare = () => {
    const url = `${window.location.origin}/photos/${album.id}?photo=${photoIndex + 1}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast('Photo share link copied to clipboard', 'success');
    }).catch(() => {
      showToast('URL: ' + url, 'info');
    });
  };

  const handleDownload = () => {
    showToast(`Downloading high-resolution master (${currentPhoto.width}x${currentPhoto.height})...`, 'info');
    const a = document.createElement('a');
    a.href = currentPhoto.url;
    a.download = `nocturne_${album.slug}_${photoIndex + 1}.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="High-resolution image viewer"
      className="fixed inset-0 z-50 flex flex-col bg-black/98 text-white select-none overflow-hidden"
    >
      {/* Top Bar Controls */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-black/60 border-b border-white/10 z-20 backdrop-blur-md">
        {/* Title & Counter */}
        <div className="flex items-center gap-3">
          <div className="text-left">
            <h2 className="text-sm font-medium text-white truncate max-w-xs sm:max-w-md">
              {currentPhoto.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span>{album.title}</span>
              <span>·</span>
              <span className="text-[#d4af37]">
                {photoIndex + 1} of {album.photos.length}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom */}
          <button
            onClick={handleZoomOut}
            aria-label="Zoom out"
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            aria-label="Reset zoom"
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomIn}
            aria-label="Zoom in"
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-white/10 mx-1 hidden sm:block" />

          {/* EXIF Toggle */}
          <button
            onClick={() => setShowExif(prev => !prev)}
            aria-label="Toggle technical EXIF details"
            className={`p-2 rounded-lg transition-colors ${
              showExif ? 'bg-[#d4af37] text-black' : 'text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            aria-label="Share photo"
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            aria-label="Download original photo"
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-white/10 mx-1" />

          {/* Close */}
          <button
            onClick={closeLightbox}
            aria-label="Close viewer"
            className="p-2 text-zinc-400 hover:text-rose-400 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden p-4 sm:p-8">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous photo"
          className="absolute left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white hover:text-[#d4af37] transition-all transform hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Center Image with scale */}
        <div
          className="relative max-w-full max-h-full transition-transform duration-200 ease-out flex items-center justify-center"
          style={{ transform: `scale(${scale})` }}
        >
          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            referrerPolicy="no-referrer"
            className="max-h-[75vh] max-w-[85vw] object-contain rounded-sm shadow-2xl pointer-events-auto"
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next photo"
          className="absolute right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white hover:text-[#d4af37] transition-all transform hover:scale-105"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* EXIF & Metadata Sidebar / Overlay */}
        {showExif && (
          <aside
            aria-label="Photo metadata and camera settings"
            className="absolute top-4 right-4 z-30 w-80 bg-[#121215]/95 border border-white/10 rounded-xl p-5 shadow-2xl backdrop-blur-md text-xs space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-semibold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#d4af37]" />
                Technical EXIF
              </span>
              <button
                onClick={() => setShowExif(false)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-zinc-300">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Camera</span>
                <span className="font-medium">{currentPhoto.camera || 'Leica M11'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Lens</span>
                <span className="font-medium">{currentPhoto.lens || '50mm f/1.4'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Aperture</span>
                <span className="font-medium font-mono">{currentPhoto.aperture || 'f/2.0'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Shutter</span>
                <span className="font-medium font-mono">{currentPhoto.shutterSpeed || '1/500s'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">ISO</span>
                <span className="font-medium font-mono">{currentPhoto.iso || 160}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Focal Length</span>
                <span className="font-medium font-mono">{currentPhoto.focalLength || '50mm'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 space-y-2">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Resolution</span>
                <span className="text-zinc-300 font-mono">{currentPhoto.width} × {currentPhoto.height} px</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Photographer</span>
                <span className="text-zinc-300">{album.photographer}</span>
              </div>
              <div className="flex items-center gap-2 pt-2 text-[#d4af37]">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] font-medium">Release ID: {album.modelReleaseId}</span>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="h-20 bg-black/80 border-t border-white/10 px-4 py-2 flex items-center justify-center gap-2 overflow-x-auto z-20">
        {album.photos.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => setPhotoIndex(idx)}
            className={`relative h-14 w-20 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
              idx === photoIndex ? 'border-[#d4af37] scale-105' : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img
              src={photo.url}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
