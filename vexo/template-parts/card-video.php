<?php
/**
 * Template part for displaying video discovery cards in VEXO
 *
 * @package VEXO
 * @version 1.0.0
 */

$video_id         = get_the_ID();
$video_title      = get_the_title();
$video_permalink  = get_permalink();
$director         = get_post_meta($video_id, '_vexo_director', true) ?: 'Marcus Sterling';
$duration         = get_post_meta($video_id, '_vexo_duration', true) ?: '18:42';
$rating           = get_post_meta($video_id, '_vexo_rating', true) ?: '4.96';
$resolution       = get_post_meta($video_id, '_vexo_resolution', true) ?: '4K';
$video_url        = get_post_meta($video_id, '_vexo_video_url', true) ?: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

// Taxonomies
$terms = get_the_terms($video_id, 'vexo_category');
$category_name = !empty($terms) && !is_wp_error($terms) ? $terms[0]->name : 'Cinematic Editorial';

$thumb_url = get_the_post_thumbnail_url($video_id, 'vexo-video');
if (!$thumb_url) {
    $thumb_url = get_template_directory_uri() . '/assets/images/video_thumb_mastery_1790394973652.jpg';
}
?>
<article id="post-<?php echo esc_attr($video_id); ?>" class="vexo-card">
  <a href="<?php echo esc_url($video_permalink); ?>" class="vexo-card-media vexo-card-media-video">
    <img src="<?php echo esc_url($thumb_url); ?>" alt="<?php echo esc_attr($video_title); ?>" loading="lazy">
    <div class="vexo-card-media-scrim"></div>

    <!-- Center Play Icon -->
    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none;">
      <div style="width: 3rem; height: 3rem; border-radius: 9999px; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(4px);">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </div>
    </div>

    <div class="vexo-card-top-badges">
      <div class="vexo-card-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>18+ Verified</span>
      </div>

      <button class="vexo-card-fav-btn vexo-fav-trigger" data-id="<?php echo esc_attr($video_id); ?>" data-title="<?php echo esc_attr($video_title); ?>" aria-label="<?php esc_attr_e('Save to favorites', 'vexo'); ?>">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
      </button>
    </div>

    <div style="position: absolute; bottom: 0.75rem; right: 0.75rem; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.6875rem; color: #fff; border: 1px solid rgba(255,255,255,0.1);">
      <?php echo esc_html($duration); ?>
    </div>
  </a>

  <div class="vexo-card-body">
    <div>
      <div class="vexo-meta-row">
        <span class="vexo-meta-category"><?php echo esc_html($category_name); ?></span>
        <span>·</span>
        <span>Dir. <?php echo esc_html($director); ?></span>
      </div>

      <h3 class="vexo-card-title">
        <a href="<?php echo esc_url($video_permalink); ?>"><?php echo esc_html($video_title); ?></a>
      </h3>

      <div class="vexo-card-excerpt">
        <?php echo esc_html(wp_trim_words(get_the_excerpt(), 18)); ?>
      </div>
    </div>

    <div class="vexo-card-footer">
      <div style="display: flex; align-items: center; gap: 0.35rem; color: #fde047;">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#d4af37" stroke="#d4af37" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span><?php echo esc_html($rating); ?></span>
      </div>
      <span style="font-family: monospace; color: var(--vexo-text-muted);"><?php echo esc_html($resolution); ?></span>
    </div>
  </div>
</article>
