import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Layers, ArrowRight } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { categories, albums, videos } = useApp();

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <Layers className="w-4 h-4" />
            <span>Curated Taxonomies</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-light text-white tracking-tight">
            Aesthetic Categories
          </h1>
          <p className="mt-3 text-sm text-zinc-400 font-light leading-relaxed">
            Navigate the VEXO archive by visual grammar: from Parisian chiaroscuro to ambient neon rain and architectural sunlight studies.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const catAlbums = albums.filter(a => a.category.toLowerCase() === cat.name.toLowerCase());
            const catVideos = videos.filter(v => v.category.toLowerCase() === cat.name.toLowerCase());

            return (
              <Link
                key={cat.id}
                to={`/categories/${cat.slug}`}
                className="group relative flex flex-col bg-[#111116] border border-white/5 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* Media Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <img
                    src={cat.thumbnail}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-black/40 to-transparent opacity-90" />

                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-xs font-mono text-white border border-white/10">
                    {catAlbums.length} Albums · {catVideos.length} Reels
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="font-editorial text-2xl text-white group-hover:text-[#d4af37] transition-colors">
                      {cat.name}
                    </h2>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-light">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#d4af37] font-medium">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
