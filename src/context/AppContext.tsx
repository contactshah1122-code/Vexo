import React, { createContext, useContext, useState, useEffect } from 'react';
import { PhotoAlbum, VideoEntry, Category, UserReport, TakedownRequest, PhotoItem } from '../types';
import { INITIAL_ALBUMS, INITIAL_VIDEOS, INITIAL_CATEGORIES, INITIAL_REPORTS, INITIAL_TAKEDOWNS } from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  // Age confirmation
  ageVerified: boolean;
  confirmAge: () => void;
  revokeAge: () => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (id: string, title?: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  exportFavorites: () => void;

  // Media
  albums: PhotoAlbum[];
  videos: VideoEntry[];
  categories: Category[];
  addAlbum: (album: Omit<PhotoAlbum, 'id' | 'views' | 'likes' | 'publishedAt'>) => void;
  updateAlbum: (id: string, updates: Partial<PhotoAlbum>) => void;
  deleteAlbum: (id: string) => void;
  addVideo: (video: Omit<VideoEntry, 'id' | 'views' | 'likes' | 'rating' | 'publishedAt'>) => void;
  updateVideo: (id: string, updates: Partial<VideoEntry>) => void;
  deleteVideo: (id: string) => void;

  // Reports & Takedowns
  reports: UserReport[];
  takedowns: TakedownRequest[];
  submitReport: (report: Omit<UserReport, 'id' | 'createdAt' | 'status'>) => string;
  updateReportStatus: (id: string, status: UserReport['status']) => void;
  submitTakedown: (takedown: Omit<TakedownRequest, 'id' | 'ticketReference' | 'createdAt' | 'status'>) => string;
  updateTakedownStatus: (id: string, status: TakedownRequest['status']) => void;

  // Admin
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  // Lightbox
  lightboxState: { isOpen: boolean; album: PhotoAlbum | null; photoIndex: number };
  openLightbox: (album: PhotoAlbum, photoIndex?: number) => void;
  closeLightbox: () => void;
  setPhotoIndex: (index: number) => void;

  // Video Player Modal
  activeVideo: VideoEntry | null;
  openVideoPlayer: (video: VideoEntry) => void;
  closeVideoPlayer: () => void;

  // Toast
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Age confirmation state
  const [ageVerified, setAgeVerified] = useState<boolean>(() => {
    return localStorage.getItem('nocturne_age_verified') === 'true';
  });

  const confirmAge = () => {
    localStorage.setItem('nocturne_age_verified', 'true');
    setAgeVerified(true);
  };

  const revokeAge = () => {
    localStorage.removeItem('nocturne_age_verified');
    setAgeVerified(false);
  };

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nocturne_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string, title?: string) => {
    setFavorites(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('nocturne_favorites', JSON.stringify(next));
      if (exists) {
        showToast(`Removed "${title || 'item'}" from favorites`, 'info');
      } else {
        showToast(`Saved "${title || 'item'}" to your favorites`, 'success');
      }
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('nocturne_favorites');
    showToast('Favorites list cleared', 'info');
  };

  const exportFavorites = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(favorites, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nocturne_favorites_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Favorites exported to JSON', 'success');
  };

  // Albums state
  const [albums, setAlbums] = useState<PhotoAlbum[]>(() => {
    try {
      const saved = localStorage.getItem('nocturne_albums');
      return saved ? JSON.parse(saved) : INITIAL_ALBUMS;
    } catch {
      return INITIAL_ALBUMS;
    }
  });

  useEffect(() => {
    localStorage.setItem('nocturne_albums', JSON.stringify(albums));
  }, [albums]);

  const addAlbum = (newAlbumData: Omit<PhotoAlbum, 'id' | 'views' | 'likes' | 'publishedAt'>) => {
    const newAlbum: PhotoAlbum = {
      ...newAlbumData,
      id: `album-${Date.now()}`,
      views: 120,
      likes: 15,
      publishedAt: new Date().toISOString().split('T')[0],
    };
    setAlbums(prev => [newAlbum, ...prev]);
    showToast(`Published album "${newAlbum.title}"`, 'success');
  };

  const updateAlbum = (id: string, updates: Partial<PhotoAlbum>) => {
    setAlbums(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    showToast('Album metadata updated successfully', 'success');
  };

  const deleteAlbum = (id: string) => {
    setAlbums(prev => prev.filter(a => a.id !== id));
    showToast('Album removed from catalog', 'info');
  };

  // Videos state
  const [videos, setVideos] = useState<VideoEntry[]>(() => {
    try {
      const saved = localStorage.getItem('nocturne_videos');
      return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
    } catch {
      return INITIAL_VIDEOS;
    }
  });

  useEffect(() => {
    localStorage.setItem('nocturne_videos', JSON.stringify(videos));
  }, [videos]);

  const addVideo = (newVideoData: Omit<VideoEntry, 'id' | 'views' | 'likes' | 'rating' | 'publishedAt'>) => {
    const newVideo: VideoEntry = {
      ...newVideoData,
      id: `vid-${Date.now()}`,
      views: 95,
      likes: 8,
      rating: 5.0,
      publishedAt: new Date().toISOString().split('T')[0],
    };
    setVideos(prev => [newVideo, ...prev]);
    showToast(`Published video "${newVideo.title}"`, 'success');
  };

  const updateVideo = (id: string, updates: Partial<VideoEntry>) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
    showToast('Video details updated', 'success');
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
    showToast('Video removed from catalog', 'info');
  };

  // Categories
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  // Reports
  const [reports, setReports] = useState<UserReport[]>(() => {
    try {
      const saved = localStorage.getItem('nocturne_reports');
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('nocturne_reports', JSON.stringify(reports));
  }, [reports]);

  const submitReport = (reportData: Omit<UserReport, 'id' | 'createdAt' | 'status'>) => {
    const ticketId = `REP-${Date.now().toString().slice(-6)}`;
    const newReport: UserReport = {
      ...reportData,
      id: ticketId,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    setReports(prev => [newReport, ...prev]);
    showToast(`Report received. Reference: ${ticketId}`, 'success');
    return ticketId;
  };

  const updateReportStatus = (id: string, status: UserReport['status']) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    showToast(`Report ${id} marked as ${status}`, 'info');
  };

  // Takedowns
  const [takedowns, setTakedowns] = useState<TakedownRequest[]>(() => {
    try {
      const saved = localStorage.getItem('nocturne_takedowns');
      return saved ? JSON.parse(saved) : INITIAL_TAKEDOWNS;
    } catch {
      return INITIAL_TAKEDOWNS;
    }
  });

  useEffect(() => {
    localStorage.setItem('nocturne_takedowns', JSON.stringify(takedowns));
  }, [takedowns]);

  const submitTakedown = (takedownData: Omit<TakedownRequest, 'id' | 'ticketReference' | 'createdAt' | 'status'>) => {
    const ref = `NOC-DMCA-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;
    const newTakedown: TakedownRequest = {
      ...takedownData,
      id: `tk-${Date.now()}`,
      ticketReference: ref,
      createdAt: new Date().toISOString(),
      status: 'submitted',
    };
    setTakedowns(prev => [newTakedown, ...prev]);
    showToast(`Takedown request logged. Reference: ${ref}`, 'success');
    return ref;
  };

  const updateTakedownStatus = (id: string, status: TakedownRequest['status']) => {
    setTakedowns(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    showToast(`Takedown status updated to ${status}`, 'info');
  };

  // Admin Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('nocturne_admin_session') === 'true';
  });

  const loginAdmin = (password: string): boolean => {
    // Standard secure client demo authorization check (can also connect to backend route)
    if (password === 'admin2026' || password === 'nocturne18') {
      sessionStorage.setItem('nocturne_admin_session', 'true');
      setIsAdminLoggedIn(true);
      showToast('Admin session authorized', 'success');
      return true;
    }
    showToast('Invalid administrator password', 'error');
    return false;
  };

  const logoutAdmin = () => {
    sessionStorage.removeItem('nocturne_admin_session');
    setIsAdminLoggedIn(false);
    showToast('Logged out of admin console', 'info');
  };

  // Global Lightbox
  const [lightboxState, setLightboxState] = useState<{ isOpen: boolean; album: PhotoAlbum | null; photoIndex: number }>({
    isOpen: false,
    album: null,
    photoIndex: 0,
  });

  const openLightbox = (album: PhotoAlbum, photoIndex = 0) => {
    setLightboxState({
      isOpen: true,
      album,
      photoIndex,
    });
  };

  const closeLightbox = () => {
    setLightboxState(prev => ({ ...prev, isOpen: false }));
  };

  const setPhotoIndex = (index: number) => {
    setLightboxState(prev => ({ ...prev, photoIndex: index }));
  };

  // Global Video Modal
  const [activeVideo, setActiveVideo] = useState<VideoEntry | null>(null);
  const openVideoPlayer = (video: VideoEntry) => setActiveVideo(video);
  const closeVideoPlayer = () => setActiveVideo(null);

  // Toast
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast(current => (current?.id === id ? null : current));
    }, 4000);
  };

  return (
    <AppContext.Provider
      value={{
        ageVerified,
        confirmAge,
        revokeAge,
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        exportFavorites,
        albums,
        videos,
        categories,
        addAlbum,
        updateAlbum,
        deleteAlbum,
        addVideo,
        updateVideo,
        deleteVideo,
        reports,
        takedowns,
        submitReport,
        updateReportStatus,
        submitTakedown,
        updateTakedownStatus,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        lightboxState,
        openLightbox,
        closeLightbox,
        setPhotoIndex,
        activeVideo,
        openVideoPlayer,
        closeVideoPlayer,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
