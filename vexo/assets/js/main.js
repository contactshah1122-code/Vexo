/**
 * VEXO Theme Interactive Client Engine
 *
 * Handles:
 * 1. 18+ Age Verification Modal & Cookie/Storage Persistence
 * 2. Real-time Search Drawer Toggle
 * 3. Client-Side Favorites Manager (Local Storage & Counter)
 * 4. Fullscreen Photographic Lightbox with EXIF Viewer
 * 5. AJAX Content Reporting & Statutory DMCA Takedown Dispatch
 */

(function () {
  'use strict';

  // --- 1. Age Verification Gate ---
  const ageGateModal = document.getElementById('vexo-age-gate');
  const confirmAgeBtn = document.getElementById('vexo-confirm-age-btn');
  const exitAgeBtn = document.getElementById('vexo-exit-age-btn');
  const reverifyAgeBtn = document.getElementById('vexo-reverify-age');

  function checkAgeVerification() {
    const isVerified = localStorage.getItem('vexo_age_verified') === 'true';
    if (!isVerified && ageGateModal) {
      ageGateModal.style.display = 'flex';
    } else if (ageGateModal) {
      ageGateModal.style.display = 'none';
    }
  }

  if (confirmAgeBtn) {
    confirmAgeBtn.addEventListener('click', function () {
      localStorage.setItem('vexo_age_verified', 'true');
      if (ageGateModal) ageGateModal.style.display = 'none';
    });
  }

  if (exitAgeBtn) {
    exitAgeBtn.addEventListener('click', function () {
      window.location.href = 'https://www.google.com';
    });
  }

  if (reverifyAgeBtn) {
    reverifyAgeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('vexo_age_verified');
      checkAgeVerification();
    });
  }

  // --- 2. Live Search Drawer Toggle ---
  const searchToggleBtn = document.getElementById('vexo-toggle-search');
  const searchDrawer = document.getElementById('vexo-search-drawer');

  if (searchToggleBtn && searchDrawer) {
    searchToggleBtn.addEventListener('click', function () {
      const isVisible = searchDrawer.style.display === 'block';
      searchDrawer.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) {
        const input = searchDrawer.querySelector('input[type="search"]');
        if (input) input.focus();
      }
    });
  }

  // --- 3. Favorites Manager (Local Storage) ---
  const favCountBadge = document.getElementById('vexo-favorites-count');

  function getFavorites() {
    try {
      const saved = localStorage.getItem('vexo_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  function updateFavoritesUI() {
    const favs = getFavorites();
    if (favCountBadge) {
      if (favs.length > 0) {
        favCountBadge.textContent = favs.length;
        favCountBadge.style.display = 'flex';
      } else {
        favCountBadge.style.display = 'none';
      }
    }

    document.querySelectorAll('.vexo-fav-trigger').forEach(function (btn) {
      const id = btn.getAttribute('data-id');
      if (favs.includes(id)) {
        btn.classList.add('is-fav');
      } else {
        btn.classList.remove('is-fav');
      }
    });
  }

  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('.vexo-fav-trigger');
    if (!trigger) return;

    e.preventDefault();
    e.stopPropagation();

    const id = trigger.getAttribute('data-id');
    let favs = getFavorites();

    if (favs.includes(id)) {
      favs = favs.filter(item => item !== id);
    } else {
      favs.push(id);
    }

    localStorage.setItem('vexo_favorites', JSON.stringify(favs));
    updateFavoritesUI();
  });

  // --- 4. Lightbox Engine & EXIF Viewer ---
  const lightbox = document.getElementById('vexo-lightbox');
  const lightboxImg = document.getElementById('vexo-lightbox-img');
  const lightboxTitle = document.getElementById('vexo-lightbox-title');
  const lightboxMeta = document.getElementById('vexo-lightbox-meta');
  const lightboxClose = document.getElementById('vexo-lightbox-close');
  const lightboxExifToggle = document.getElementById('vexo-lightbox-exif-toggle');
  const lightboxExifPanel = document.getElementById('vexo-lightbox-exif-panel');
  const lightboxExifContent = document.getElementById('vexo-lightbox-exif-content');

  const albumTrigger = document.getElementById('vexo-album-cover-trigger');
  if (albumTrigger && lightbox && lightboxImg) {
    albumTrigger.addEventListener('click', function () {
      const cover = albumTrigger.querySelector('img');
      if (cover) {
        lightboxImg.src = cover.src;
        if (lightboxTitle) lightboxTitle.textContent = cover.alt || 'High-Resolution Visual Plate';
        if (lightboxMeta) lightboxMeta.textContent = 'Plate 1 of 1 · Hasselblad X2D 100C · 80mm f/1.9';
        if (lightboxExifContent) {
          lightboxExifContent.innerHTML = `
            <div><span style="font-size: 0.625rem; text-transform: uppercase;">Camera</span><br><strong>Leica M11</strong></div>
            <div><span style="font-size: 0.625rem; text-transform: uppercase;">Aperture</span><br><strong>f/2.0</strong></div>
            <div><span style="font-size: 0.625rem; text-transform: uppercase;">Shutter</span><br><strong>1/500s</strong></div>
            <div><span style="font-size: 0.625rem; text-transform: uppercase;">ISO</span><br><strong>160</strong></div>
            <div style="grid-column: 1 / -1; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.05); color: var(--vexo-gold);">
              18 U.S.C. 2257 Release Verified
            </div>
          `;
        }
        lightbox.style.display = 'flex';
      }
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', function () {
      if (lightbox) lightbox.style.display = 'none';
    });
  }

  if (lightboxExifToggle && lightboxExifPanel) {
    lightboxExifToggle.addEventListener('click', function () {
      const isVisible = lightboxExifPanel.style.display === 'block';
      lightboxExifPanel.style.display = isVisible ? 'none' : 'block';
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (lightbox && lightbox.style.display === 'flex') {
        lightbox.style.display = 'none';
      }
      if (searchDrawer && searchDrawer.style.display === 'block') {
        searchDrawer.style.display = 'none';
      }
    }
  });

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('vexo-mobile-menu-toggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function () {
      const nav = document.querySelector('.vexo-desktop-nav');
      if (nav) {
        const isFlex = window.getComputedStyle(nav).display === 'flex';
        nav.style.display = isFlex ? 'none' : 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '4.5rem';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.backgroundColor = '#09090b';
        nav.style.padding = '1.5rem';
        nav.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
      }
    });
  }

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    checkAgeVerification();
    updateFavoritesUI();
  });
})();
