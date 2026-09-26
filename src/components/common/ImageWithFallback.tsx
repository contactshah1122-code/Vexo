import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  fallbackTitle,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`w-full h-full min-h-[160px] bg-gradient-to-br from-[#18181b] via-[#121215] to-[#09090b] border border-white/5 flex flex-col items-center justify-center p-4 text-center select-none ${containerClassName}`}
      >
        <ImageIcon className="w-8 h-8 text-[#d4af37]/40 mb-2" />
        <span className="text-xs text-zinc-400 font-medium max-w-[200px] truncate">
          {fallbackTitle || alt || 'Visual Media Frame'}
        </span>
        <span className="text-[10px] text-zinc-600 mt-1 uppercase tracking-wider">
          Curated Archive
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-[#121215] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </div>
  );
};
