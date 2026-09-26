<?php
/**
 * The front page template for VEXO
 *
 * @package VEXO
 * @version 1.0.0
 */

get_header();

$hero_img = get_template_directory_uri() . '/assets/images/hero_cinematic_editorial_1790394913234.jpg';
?>

<!-- 1. Hero Section -->
<section style="position: relative; min-height: 85vh; display: flex; align-items: center; border-bottom: 1px solid var(--vexo-border-subtle); overflow: hidden;">
  <div style="position: absolute; inset: 0; z-index: 0;">
    <img src="<?php echo esc_url($hero_img); ?>" alt="VEXO Fine Art Hero" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6);">
    <div style="position: absolute; inset: 0; background: linear-gradient(to right, #09090b 0%, rgba(9,9,11,0.8) 50%, transparent 100%);"></div>
    <div style="position: absolute; inset: 0; background: linear-gradient(to top, #09090b 0%, transparent 70%);"></div>
  </div>

  <div class="vexo-container" style="position: relative; z-index: 10; padding-top: 5rem; padding-bottom: 5rem; width: 100%;">
    <div style="max-w: 48rem;">
      <div style="display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 500; color: var(--vexo-text-muted); background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 0.35rem 0.85rem; border-radius: 9999px; margin-bottom: 1.5rem; backdrop-filter: blur(8px);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>Consensual & Lawfully Licensed 18+ Fine Art Visual Media</span>
      </div>

      <h1 style="font-family: var(--font-serif); font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 300; line-height: 1.1; color: #fff; margin-bottom: 1.5rem;">
        Shadows, light, and the intimacy of form.
      </h1>

      <p style="font-size: 1.125rem; color: var(--vexo-text-muted); font-weight: 300; line-height: 1.6; max-width: 40rem; margin-bottom: 2rem;">
        An uncompromising digital salon showcasing contemporary monochrome chiaroscuro, cinematic editorial narratives, and auteur showreels. Featuring fully documented adult artists.
      </p>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="<?php echo esc_url(home_url('/photos')); ?>" class="vexo-btn-primary">
          <span>Discover Photo Albums</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
        <a href="<?php echo esc_url(home_url('/videos')); ?>" class="vexo-btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span>Cinematic Video Discovery</span>
        </a>
      </div>

      <div style="margin-top: 2rem; display: flex; align-items: center; gap: 1rem; font-size: 0.75rem; color: var(--vexo-text-dim);">
        <span>Leica & Hasselblad Masters</span>
        <span>·</span>
        <span>18 U.S.C. § 2257 Records Kept</span>
        <span>·</span>
        <span>4K Ultra HD</span>
      </div>
    </div>
  </div>
</section>

<!-- 2. Trust Charter Strip -->
<section style="border-bottom: 1px solid var(--vexo-border-subtle); background: #0d0d11; padding: 2rem 0;">
  <div class="vexo-container">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem;">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <div>
          <p style="font-size: 0.75rem; font-weight: 600; color: #fff;">100% Consensual & 18+</p>
          <p style="font-size: 0.6875rem; color: var(--vexo-text-dim);">Verified with photo government ID</p>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
        <div>
          <p style="font-size: 0.75rem; font-weight: 600; color: #fff;">Full EXIF & Attribution</p>
          <p style="font-size: 0.6875rem; color: var(--vexo-text-dim);">Camera optics & artist royalties</p>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <div>
          <p style="font-size: 0.75rem; font-weight: 600; color: #fff;">Zero Data Profiling</p>
          <p style="font-size: 0.6875rem; color: var(--vexo-text-dim);">No ad trackers, private local storage</p>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        <div>
          <p style="font-size: 0.75rem; font-weight: 600; color: #fff;">Master 4K Resolution</p>
          <p style="font-size: 0.6875rem; color: var(--vexo-text-dim);">Digital negatives & cinema master color</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 3. Recent Photo Albums Section -->
<section style="padding: 5rem 0; border-bottom: 1px solid var(--vexo-border-subtle);">
  <div class="vexo-container">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem;">
      <div>
        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--vexo-gold); font-weight: 600;">
          Curated Collections
        </span>
        <h2 style="font-family: var(--font-serif); font-size: 2rem; color: #fff; margin-top: 0.25rem;">
          Recent Photo Albums
        </h2>
      </div>

      <a href="<?php echo esc_url(home_url('/photos')); ?>" style="font-size: 0.75rem; color: var(--vexo-text-muted); display: flex; align-items: center; gap: 0.25rem;">
        <span>View All Albums</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      </a>
    </div>

    <div class="vexo-grid-3">
      <?php
      $album_query = new WP_Query(array(
          'post_type'      => 'vexo_album',
          'posts_per_page' => 6,
          'post_status'    => 'publish',
      ));

      if ($album_query->have_posts()) {
          while ($album_query->have_posts()) {
              $album_query->the_post();
              get_template_part('template-parts/card', 'album');
          }
          wp_reset_postdata();
      } else {
          // Curated fallback cards when WordPress database has not yet been seeded
          get_template_part('template-parts/card', 'album');
      }
      ?>
    </div>
  </div>
</section>

<!-- 4. Cinematic Video Discovery Strip -->
<section style="padding: 5rem 0;">
  <div class="vexo-container">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem;">
      <div>
        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--vexo-gold); font-weight: 600;">
          Motion & Light
        </span>
        <h2 style="font-family: var(--font-serif); font-size: 2rem; color: #fff; margin-top: 0.25rem;">
          Cinematic Discovery Reels
        </h2>
      </div>

      <a href="<?php echo esc_url(home_url('/videos')); ?>" style="font-size: 0.75rem; color: var(--vexo-text-muted); display: flex; align-items: center; gap: 0.25rem;">
        <span>All Videos</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      </a>
    </div>

    <div class="vexo-grid-3">
      <?php
      $video_query = new WP_Query(array(
          'post_type'      => 'vexo_video',
          'posts_per_page' => 3,
          'post_status'    => 'publish',
      ));

      if ($video_query->have_posts()) {
          while ($video_query->have_posts()) {
              $video_query->the_post();
              get_template_part('template-parts/card', 'video');
          }
          wp_reset_postdata();
      } else {
          get_template_part('template-parts/card', 'video');
      }
      ?>
    </div>
  </div>
</section>

<?php
get_footer();
