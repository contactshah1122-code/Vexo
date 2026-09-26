<?php
/**
 * The template for displaying the footer of VEXO
 *
 * @package VEXO
 * @version 1.0.0
 */
?>
</main><!-- #primary -->

<!-- Lightbox Modal Container for Fullscreen EXIF & Plate Inspection -->
<div id="vexo-lightbox" class="vexo-lightbox-overlay" style="display: none;" role="dialog" aria-modal="true" aria-label="Visual Inspection Plate">
  <div class="vexo-lightbox-topbar">
    <div>
      <h3 id="vexo-lightbox-title" style="font-size: 0.875rem; color: #fff; font-weight: 500;"></h3>
      <span id="vexo-lightbox-meta" style="font-size: 0.75rem; color: var(--vexo-text-dim);"></span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <button id="vexo-lightbox-exif-toggle" class="vexo-btn-icon" title="Toggle EXIF Data">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
      </button>
      <button id="vexo-lightbox-close" class="vexo-btn-icon" title="Close Lightbox">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
  </div>

  <div class="vexo-lightbox-stage">
    <button id="vexo-lightbox-prev" class="vexo-btn-icon" style="position: absolute; left: 1rem; z-index: 10; background: rgba(0,0,0,0.6); padding: 0.75rem; border-radius: 9999px;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
    </button>
    <img id="vexo-lightbox-img" src="" alt="Exhibition Plate">
    <button id="vexo-lightbox-next" class="vexo-btn-icon" style="position: absolute; right: 1rem; z-index: 10; background: rgba(0,0,0,0.6); padding: 0.75rem; border-radius: 9999px;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
    </button>

    <!-- EXIF Panel Drawer -->
    <div id="vexo-lightbox-exif-panel" style="display: none; position: absolute; top: 1rem; right: 1rem; z-index: 20; width: 18rem; background: rgba(18, 18, 22, 0.95); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.75rem; padding: 1.25rem; font-size: 0.75rem; backdrop-filter: blur(12px);">
      <h4 style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--vexo-gold); margin-bottom: 0.75rem;">Technical EXIF</h4>
      <div id="vexo-lightbox-exif-content" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; color: var(--vexo-text-muted);">
        <!-- Injected dynamically -->
      </div>
    </div>
  </div>

  <div class="vexo-lightbox-thumbstrip" id="vexo-lightbox-strip">
    <!-- Thumbnails injected dynamically -->
  </div>
</div>

<footer class="vexo-footer">
  <div class="vexo-container">
    <div class="vexo-footer-grid">
      <!-- Brand & Mission -->
      <div>
        <a href="<?php echo esc_url(home_url('/')); ?>" class="vexo-brand-logo" style="display: inline-block; margin-bottom: 1rem;">
          VEXO
        </a>
        <p style="font-size: 0.875rem; color: var(--vexo-text-muted); line-height: 1.6; max-width: 24rem; margin-bottom: 1.25rem;">
          A curated digital salon for adult fine art portraiture, monochrome chiaroscuro, and cinematic visual discovery. Dedicated to ethical production, artist attribution, and consensual visual storytelling.
        </p>
        <div style="font-size: 0.6875rem; color: var(--vexo-text-dim); display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <span>18+ RESTRICTED</span>
          <span>·</span>
          <span>RTA (RESTRICTED TO ADULTS)</span>
          <span>·</span>
          <span>ICRA CERTIFIED</span>
        </div>
      </div>

      <!-- Discover -->
      <div>
        <h4 class="vexo-footer-title"><?php esc_html_e('Discover', 'vexo'); ?></h4>
        <ul class="vexo-footer-links">
          <li><a href="<?php echo esc_url(home_url('/photos')); ?>">Photo Albums</a></li>
          <li><a href="<?php echo esc_url(home_url('/videos')); ?>">Cinematic Videos</a></li>
          <li><a href="<?php echo esc_url(home_url('/categories')); ?>">All Categories</a></li>
          <li><a href="<?php echo esc_url(home_url('/trending')); ?>">Trending Releases</a></li>
          <li><a href="<?php echo esc_url(home_url('/recent')); ?>">Recently Added</a></li>
          <li><a href="<?php echo esc_url(home_url('/favorites')); ?>">Saved Favorites</a></li>
        </ul>
      </div>

      <!-- Safety & Legal -->
      <div>
        <h4 class="vexo-footer-title"><?php esc_html_e('Safety & Compliance', 'vexo'); ?></h4>
        <ul class="vexo-footer-links">
          <li><a href="<?php echo esc_url(home_url('/report')); ?>" style="color: var(--vexo-gold);">Report Content</a></li>
          <li><a href="<?php echo esc_url(home_url('/takedown')); ?>">Takedown / DMCA Notice</a></li>
          <li><a href="<?php echo esc_url(home_url('/terms')); ?>">Terms of Service (18+)</a></li>
          <li><a href="<?php echo esc_url(home_url('/privacy')); ?>">Privacy Policy & GDPR</a></li>
          <li><button id="vexo-reverify-age" style="background:none; border:none; padding:0; font-size:inherit; color:var(--vexo-text-dim); cursor:pointer;">Re-verify Age Gate</button></li>
        </ul>
      </div>

      <!-- Information -->
      <div>
        <h4 class="vexo-footer-title"><?php esc_html_e('Information', 'vexo'); ?></h4>
        <ul class="vexo-footer-links">
          <li><a href="<?php echo esc_url(home_url('/about')); ?>">About the Archive</a></li>
          <li><a href="<?php echo esc_url(home_url('/contact')); ?>">Contact & Press</a></li>
          <li><a href="<?php echo esc_url(admin_url()); ?>">Curator Admin</a></li>
        </ul>
      </div>
    </div>

    <!-- 18 U.S.C. 2257 Mandatory Statement Banner -->
    <div style="margin-top: 2rem; padding: 1.25rem; border-radius: 0.75rem; background: #0c0c10; border: 1px solid var(--vexo-border-subtle); font-size: 0.75rem; color: var(--vexo-text-dim); line-height: 1.6;">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: var(--vexo-text-muted); font-weight: 500;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>
        <span>18 U.S.C. § 2257 Record-Keeping Requirements Compliance Statement</span>
      </div>
      <p>
        All models, actors, actresses, and other persons depicted in visual media on VEXO were at least 18 years of age at the time the visual depictions were created. All visual records required pursuant to 18 U.S.C. § 2257 and 28 C.F.R. 75 are maintained by the respective authorized custodian of records. Any questions regarding records or compliance should be directed via our legal compliance desk.
      </p>
    </div>

    <!-- Bottom Bar -->
    <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--vexo-border-subtle); display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: space-between; font-size: 0.75rem; color: var(--vexo-text-dim);">
      <p>© <?php echo date('Y'); ?> VEXO Visual Arts. All rights reserved. Strictly 18+.</p>
      <div style="display: flex; gap: 1rem;">
        <a href="<?php echo esc_url(home_url('/privacy')); ?>">Privacy</a>
        <span>·</span>
        <a href="<?php echo esc_url(home_url('/terms')); ?>">Terms</a>
        <span>·</span>
        <a href="<?php echo esc_url(home_url('/takedown')); ?>">DMCA</a>
        <span>·</span>
        <a href="<?php echo esc_url(home_url('/contact')); ?>">Inquiries</a>
      </div>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
