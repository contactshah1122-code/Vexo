<?php
/**
 * The template for displaying 404 pages (not found) in VEXO
 *
 * @package VEXO
 * @version 1.0.0
 */

get_header();
?>

<div class="vexo-container" style="min-height: 70vh; display: flex; align-items: center; justify-content: center; padding-top: 4rem; padding-bottom: 6rem; text-align: center;">
  <div style="max-width: 36rem;">
    <div style="width: 4rem; height: 4rem; border-radius: 9999px; background: var(--vexo-surface); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
    </div>

    <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--vexo-gold); font-weight: 600;">
      404 · Unexposed Plate
    </span>

    <h1 style="font-family: var(--font-serif); font-size: clamp(2.5rem, 5vw, 4rem); color: #fff; margin-top: 0.5rem; margin-bottom: 1rem;">
      Frame Not Found
    </h1>

    <p style="font-size: 1rem; color: var(--vexo-text-muted); line-height: 1.6; margin-bottom: 2rem;">
      The archive coordinates you requested do not point to an active photographic collection or video discovery reel.
    </p>

    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="vexo-btn-primary">
        <span>Return to Salon Entry</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
      <a href="<?php echo esc_url(home_url('/photos')); ?>" class="vexo-btn-secondary">
        <span>Browse Photos</span>
      </a>
    </div>
  </div>
</div>

<?php
get_footer();
