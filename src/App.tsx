/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { AgeGateModal } from './components/common/AgeGateModal';
import { Lightbox } from './components/common/Lightbox';
import { VideoPlayerModal } from './components/common/VideoPlayerModal';
import { NotificationToast } from './components/common/NotificationToast';
import { ScrollToTop } from './components/common/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { PhotosPage } from './pages/PhotosPage';
import { AlbumDetailPage } from './pages/AlbumDetailPage';
import { VideosPage } from './pages/VideosPage';
import { VideoDetailPage } from './pages/VideoDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { SearchPage } from './pages/SearchPage';
import { TrendingPage } from './pages/TrendingPage';
import { RecentPage } from './pages/RecentPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ReportPage } from './pages/ReportPage';
import { TakedownPage } from './pages/TakedownPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#09090b] text-[#f4f4f5]">
          {/* Mandatory Adult Age Confirmation Gate */}
          <AgeGateModal />

          {/* Global Lightbox Viewer */}
          <Lightbox />

          {/* Global Video Discovery Modal */}
          <VideoPlayerModal />

          {/* Toast Notification */}
          <NotificationToast />

          {/* Strict 3-zone Top Bar Contract Header */}
          <Header />

          {/* Main Viewport Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/photos" element={<PhotosPage />} />
              <Route path="/photos/:id" element={<AlbumDetailPage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/videos/:id" element={<VideoDetailPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:slug" element={<CategoryDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="/recent" element={<RecentPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/takedown" element={<TakedownPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Compliance & Editorial Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
