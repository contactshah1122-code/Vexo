<?php
/**
 * The template for displaying single photo albums and videos in VEXO
 *
 * @package VEXO
 * @version 1.0.0
 */

get_header();

while (have_posts()) :
    the_post();
    $post_id     = get_the_ID();
    $is_video    = get_post_type() === 'vexo_video';
    $release_id  = get_post_meta($post_id, '_vexo_release_id', true) ?: 'MR-2026-7841A';
    $resolution  = get_post_meta($post_id, '_vexo_resolution', true) ?: '4K';
    $artist      = get_post_meta($post_id, '_vexo_photographer', true) ?: (get_post_meta($post_id, '_vexo_director', true) ?: 'Laurent Vaneau');
    $models      = get_post_meta($post_id, '_vexo_model_names', true) ?: 'Camille Durand (24), Elodie Laurent (26)';
    $video_url   = get_post_meta($post_id, '_vexo_video_url', true) ?: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    $duration    = get_post_meta($post_id, '_vexo_duration', true) ?: '14:28';

    $terms = get_the_terms($post_id, 'vexo_category');
    $category_name = !empty($terms) && !is_wp_error($terms) ? $terms[0]->name : 'Noir & Monochrome';
    ?>

    <div class="vexo-container" style="padding-top: 2rem; padding-bottom: 5rem;">
      <!-- Breadcrumb Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; font-size: 0.75rem; color: var(--vexo-text-dim);">
        <a href="<?php echo esc_url(home_url($is_video ? '/videos' : '/photos')); ?>" style="display: flex; align-items: center; gap: 0.25rem; color: var(--vexo-text-muted);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          <span>Return to <?php echo $is_video ? 'Videos' : 'Photo Albums'; ?></span>
        </a>

        <a href="<?php echo esc_url(home_url('/report?target_id=' . $post_id . '&target_title=' . urlencode(get_the_title()))); ?>" style="display: flex; align-items: center; gap: 0.25rem; color: var(--vexo-gold);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          <span>Report Content</span>
        </a>
      </div>

      <!-- Main Showcase Container -->
      <?php if ($is_video) : ?>
        <div style="position: relative; aspect-ratio: 16 / 9; width: 100%; border-radius: 1rem; overflow: hidden; background: #000; border: 1px solid var(--vexo-border); margin-bottom: 2.5rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8);">
          <video src="<?php echo esc_url($video_url); ?>" poster="<?php echo esc_url(get_the_post_thumbnail_url($post_id, 'full')); ?>" controls playsinline style="width: 100%; height: 100%; object-fit: contain;"></video>
        </div>
      <?php else : ?>
        <div style="display: grid; grid-template-columns: 1fr; gap: 2rem; margin-bottom: 3rem;">
          <div style="position: relative; aspect-ratio: 4 / 3; width: 100%; border-radius: 1rem; overflow: hidden; background: #000; border: 1px solid var(--vexo-border); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8); cursor: pointer;" id="vexo-album-cover-trigger">
            <img src="<?php echo esc_url(get_the_post_thumbnail_url($post_id, 'full') ?: get_template_directory_uri() . '/assets/images/album_noir_couture_1790394929132.jpg'); ?>" alt="<?php the_title_attribute(); ?>" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; bottom: 1rem; left: 1rem; right: 1rem; display: flex; justify-content: space-between; align-items: center; color: #fff; font-size: 0.75rem;">
              <span style="background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); padding: 0.35rem 0.75rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.1);">Click to Launch High-Res Lightbox</span>
              <span style="background: var(--vexo-gold); color: #000; font-weight: 600; padding: 0.35rem 0.75rem; border-radius: 0.5rem;">4K Digital Negative</span>
            </div>
          </div>
        </div>
      <?php endif; ?>

      <!-- Details & Metadata Specs -->
      <div style="display: grid; grid-template-columns: 1fr; gap: 2.5rem;">
        <div>
          <div class="vexo-meta-row" style="margin-bottom: 0.5rem;">
            <span class="vexo-meta-category"><?php echo esc_html($category_name); ?></span>
            <span>·</span>
            <span>By <?php echo esc_html($artist); ?></span>
            <span>·</span>
            <span><?php echo esc_html(get_the_date()); ?></span>
          </div>

          <h1 style="font-family: var(--font-serif); font-size: clamp(2rem, 4vw, 3rem); color: #fff; margin-bottom: 1.5rem; line-height: 1.1;">
            <?php the_title(); ?>
          </h1>

          <div style="font-size: 1rem; color: var(--vexo-text-muted); line-height: 1.7; margin-bottom: 2rem;">
            <?php the_content(); ?>
          </div>

          <!-- Verified Adult & 18 U.S.C. 2257 Specification Box -->
          <div style="padding: 1.5rem; border-radius: 0.75rem; background: var(--vexo-surface); border: 1px solid var(--vexo-border-subtle); display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; font-size: 0.75rem;">
            <div>
              <span style="display: block; font-size: 0.625rem; text-transform: uppercase; color: var(--vexo-text-dim);">Depicted Adults</span>
              <span style="font-weight: 500; color: #fff;"><?php echo esc_html($models); ?></span>
            </div>
            <div>
              <span style="display: block; font-size: 0.625rem; text-transform: uppercase; color: var(--vexo-text-dim);">18 U.S.C. § 2257 Record ID</span>
              <span style="font-family: monospace; color: var(--vexo-gold);"><?php echo esc_html($release_id); ?></span>
            </div>
            <div>
              <span style="display: block; font-size: 0.625rem; text-transform: uppercase; color: var(--vexo-text-dim);">Format & Resolution</span>
              <span style="color: #fff;"><?php echo esc_html($resolution); ?> Ultra HD Master</span>
            </div>
            <div>
              <span style="display: block; font-size: 0.625rem; text-transform: uppercase; color: var(--vexo-text-dim);">Performer Protection</span>
              <span style="color: #34d399; font-weight: 500;">Consensual 18+ Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <?php
endwhile;

get_footer();
