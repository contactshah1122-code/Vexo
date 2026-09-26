<?php
/**
 * Template part for displaying album cards in VEXO
 *
 * @package VEXO
 * @version 1.0.0
 */

$album_id         = get_the_ID();
$album_title      = get_the_title();
$album_permalink  = get_permalink();
$photographer     = get_post_meta($album_id, '_vexo_photographer', true) ?: 'Laurent Vaneau';
$release_id       = get_post_meta($album_id, '_vexo_release_id', true) ?: 'MR-2026-7841A';
$resolution       = get_post_meta($album_id, '_vexo_resolution', true) ?: '4K';
$photos_count     = get_post_meta($album_id, '_vexo_photos_count', true) ?: '12';

// Taxonomies
$terms = get_the_terms($album_id, 'vexo_category');
$category_name = !empty($terms) && !is_wp_error($terms) ? $terms[0]->name : 'Noir & Monochrome';

$thumb_url = get_the_post_thumbnail_url($album_id, 'vexo-card');
if (!$thumb_url) {
    $thumb_url = get_template_directory_uri() . '/assets/images/album_noir_couture_1790394929132.jpg';
}
?>
<article id="post-<?php echo esc_attr($album_id); ?>" class="vexo-card">
  <a href="<?php echo esc_url($album_permalink); ?>" class="vexo-card-media">
    <img src="<?php echo esc_url($thumb_url); ?>" alt="<?php echo esc_attr($album_title); ?>" loading="lazy">
    <div class="vexo-card-media-scrim"></div>

    <div class="vexo-card-top-badges">
      <div class="vexo-card-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>18+ Verified</span>
      </div>

      <button class="vexo-card-fav-btn vexo-fav-trigger" data-id="<?php echo esc_attr($album_id); ?>" data-title="<?php echo esc_attr($album_title); ?>" aria-label="<?php esc_attr_e('Save to favorites', 'vexo'); ?>">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
      </button>
    </div>
  </a>

  <div class="vexo-card-body">
    <div>
      <div class="vexo-meta-row">
        <span class="vexo-meta-category"><?php echo esc_html($category_name); ?></span>
        <span>·</span>
        <span><?php echo esc_html($photos_count); ?> Plates</span>
        <span>·</span>
        <span><?php echo esc_html($photographer); ?></span>
      </div>

      <h3 class="vexo-card-title">
        <a href="<?php echo esc_url($album_permalink); ?>"><?php echo esc_html($album_title); ?></a>
      </h3>

      <div class="vexo-card-excerpt">
        <?php echo esc_html(wp_trim_words(get_the_excerpt(), 18)); ?>
      </div>
    </div>

    <div class="vexo-card-footer">
      <div style="display: flex; gap: 0.75rem;">
        <span><?php echo esc_html($release_id); ?></span>
      </div>
      <span style="font-family: monospace; color: var(--vexo-text-muted);"><?php echo esc_html($resolution); ?></span>
    </div>
  </div>
</article>
