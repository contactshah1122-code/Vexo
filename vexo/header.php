<?php
/**
 * The header for the VEXO theme
 *
 * @package VEXO
 * @version 1.0.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="dark">
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="profile" href="https://gmpg.org/xfn/11">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Mandatory Adult 18+ Age Gate Modal -->
<div id="vexo-age-gate" class="vexo-modal-overlay" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="vexo-age-title">
  <div class="vexo-modal-box">
    <div style="width: 3.5rem; height: 3.5rem; border-radius: 9999px; background: #1c1c22; border: 1px solid rgba(212,175,55,0.3); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    </div>

    <h1 id="vexo-age-title" style="font-family: var(--font-serif); font-size: 2rem; color: #fff; margin-bottom: 0.5rem; font-weight: 400;">
      Age Verification Required
    </h1>
    <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--vexo-gold); font-weight: 600; margin-bottom: 1.5rem;">
      Adult Visual Arts & Discovery Archive · 18+ Only
    </p>

    <div style="font-size: 0.875rem; color: var(--vexo-text-muted); text-align: left; background: #0c0c0f; padding: 1.25rem; border-radius: 0.75rem; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 2rem; line-height: 1.6;">
      <p style="margin-bottom: 0.75rem;">
        Welcome to <strong style="color: #fff;">VEXO</strong>. This website features curated fine art photography, editorial albums, and cinematic discovery reels intended exclusively for mature audiences aged <span style="color: var(--vexo-gold); font-weight: 600;">18 years or older</span> (or legal age of majority in your jurisdiction).
      </p>
      <p style="font-size: 0.75rem; color: var(--vexo-text-dim); border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem;">
        <strong>Statutory Compliance:</strong> All content is lawful, consensual, and appropriately licensed. All depicted models are confirmed adults aged 18+ with verified photo identification and 18 U.S.C. § 2257 record keeping compliance.
      </p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.75rem; justify-content: center;">
      <button id="vexo-confirm-age-btn" class="vexo-btn-primary" style="width: 100%;">
        <span>I Am 18 or Older — Enter VEXO</span>
      </button>
      <button id="vexo-exit-age-btn" class="vexo-btn-secondary" style="width: 100%;">
        <span>Under 18 — Exit Site</span>
      </button>
    </div>
  </div>
</div>

<!-- Main Sticky Header -->
<header class="vexo-header">
  <div class="vexo-container">
    <div class="vexo-nav-inner">
      <!-- Brand Logo / Wordmark -->
      <a href="<?php echo esc_url(home_url('/')); ?>" class="vexo-brand-logo" rel="home">
        <?php bloginfo('name'); ?>
      </a>

      <!-- Primary Navigation -->
      <nav class="vexo-desktop-nav" aria-label="<?php esc_attr_e('Primary Navigation', 'vexo'); ?>">
        <?php
        if (has_nav_menu('primary')) {
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'container'      => false,
                'items_wrap'     => '%3$s',
                'depth'          => 1,
            ));
        } else {
            // Default elegant navigation links
            ?>
            <a href="<?php echo esc_url(home_url('/photos')); ?>" class="<?php echo is_post_type_archive('vexo_album') ? 'current' : ''; ?>">Photos</a>
            <a href="<?php echo esc_url(home_url('/videos')); ?>" class="<?php echo is_post_type_archive('vexo_video') ? 'current' : ''; ?>">Videos</a>
            <a href="<?php echo esc_url(home_url('/categories')); ?>">Categories</a>
            <a href="<?php echo esc_url(home_url('/trending')); ?>">Trending</a>
            <a href="<?php echo esc_url(home_url('/recent')); ?>">Recent</a>
            <?php
        }
        ?>
      </nav>

      <!-- Action Controls -->
      <div class="vexo-nav-actions">
        <!-- Search Trigger -->
        <button id="vexo-toggle-search" class="vexo-btn-icon" aria-label="<?php esc_attr_e('Search Catalog', 'vexo'); ?>">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
        </button>

        <!-- Favorites Link -->
        <a href="<?php echo esc_url(home_url('/favorites')); ?>" class="vexo-btn-icon" style="position: relative;" aria-label="<?php esc_attr_e('Saved Favorites', 'vexo'); ?>">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
          <span id="vexo-favorites-count" class="vexo-badge-count" style="display: none;">0</span>
        </a>

        <!-- Mobile Menu Hamburger -->
        <button id="vexo-mobile-menu-toggle" class="vexo-btn-icon" style="display: flex;" aria-label="<?php esc_attr_e('Toggle Menu', 'vexo'); ?>">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Search Modal Drawer -->
  <div id="vexo-search-drawer" style="display: none; background: #0f0f13; border-top: 1px solid var(--vexo-border-subtle); padding: 1.5rem 1rem;">
    <div class="vexo-container" style="max-width: 48rem;">
      <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" style="position: relative; display: flex; align-items: center;">
        <input type="search" name="s" placeholder="<?php esc_attr_e('Search albums, videos, photographers, or aesthetic styles...', 'vexo'); ?>" value="<?php echo get_search_query(); ?>" style="width: 100%; background: #18181f; border: 1px solid rgba(255,255,255,0.1); border-radius: 0.75rem; padding: 0.875rem 6rem 0.875rem 2.75rem; font-size: 0.875rem; color: #fff; outline: none;">
        <button type="submit" class="vexo-btn-primary" style="position: absolute; right: 0.5rem; padding: 0.5rem 1.25rem; font-size: 0.75rem;">
          <?php esc_html_e('Search', 'vexo'); ?>
        </button>
      </form>
    </div>
  </div>
</header>
<main id="primary" class="site-main">
