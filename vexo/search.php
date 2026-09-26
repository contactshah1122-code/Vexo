<?php
/**
 * The template for displaying search results in VEXO
 *
 * @package VEXO
 * @version 1.0.0
 */

get_header();
?>

<div class="vexo-container" style="padding-top: 3rem; padding-bottom: 5rem;">
  <div style="max-width: 48rem; margin-bottom: 2.5rem;">
    <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--vexo-gold); font-weight: 600;">
      Search Inquiries
    </span>
    <h1 style="font-family: var(--font-serif); font-size: clamp(2rem, 4vw, 3rem); color: #fff; margin-top: 0.5rem;">
      <?php printf(esc_html__('Results for: "%s"', 'vexo'), '<span style="color: var(--vexo-gold);">' . esc_html(get_search_query()) . '</span>'); ?>
    </h1>
  </div>

  <div class="vexo-grid-3">
    <?php
    if (have_posts()) :
        while (have_posts()) :
            the_post();
            if (get_post_type() === 'vexo_video') {
                get_template_part('template-parts/card', 'video');
            } else {
                get_template_part('template-parts/card', 'album');
            }
        endwhile;
    else :
        ?>
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--vexo-surface); border: 1px solid var(--vexo-border-subtle); border-radius: 0.75rem;">
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: #fff; margin-bottom: 0.5rem;">No matching plates or reels found</h3>
          <p style="font-size: 0.875rem; color: var(--vexo-text-muted); margin-bottom: 1.5rem;">Please check your search term or try broad keywords like "Monochrome" or "Studio".</p>
          <a href="<?php echo esc_url(home_url('/photos')); ?>" class="vexo-btn-primary" style="display: inline-flex;">Browse All Photo Albums</a>
        </div>
        <?php
    endif;
    ?>
  </div>
</div>

<?php
get_footer();
