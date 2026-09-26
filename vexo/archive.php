<?php
/**
 * The archive template for VEXO (Albums, Videos, and Taxonomies)
 *
 * @package VEXO
 * @version 1.0.0
 */

get_header();

$is_video_archive = is_post_type_archive('vexo_video');
$archive_title    = get_the_archive_title();
$archive_desc     = get_the_archive_description();
?>

<div class="vexo-container" style="padding-top: 3rem; padding-bottom: 5rem;">
  <div style="max-width: 48rem; margin-bottom: 2.5rem;">
    <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--vexo-gold); font-weight: 600; margin-bottom: 0.5rem;">
      <span>Archive Directory</span>
      <span>·</span>
      <span>18+ Curated</span>
    </div>

    <h1 style="font-family: var(--font-serif); font-size: clamp(2rem, 4vw, 3rem); color: #fff; margin-bottom: 0.75rem;">
      <?php the_archive_title(); ?>
    </h1>

    <?php if ($archive_desc) : ?>
      <div style="font-size: 0.875rem; color: var(--vexo-text-muted); line-height: 1.6;">
        <?php echo wp_kses_post($archive_desc); ?>
      </div>
    <?php else : ?>
      <p style="font-size: 0.875rem; color: var(--vexo-text-muted); line-height: 1.6;">
        <?php echo $is_video_archive
          ? esc_html__('Curated auteur video reels, high-frame-rate studio captures, and lighting masterclasses.', 'vexo')
          : esc_html__('Curated collections of contemporary adult monochrome, chiaroscuro portraiture, and architectural daylight studies.', 'vexo'); ?>
      </p>
    <?php endif; ?>
  </div>

  <div class="vexo-grid-3">
    <?php
    if (have_posts()) :
        while (have_posts()) :
            the_post();
            if (get_post_type() === 'vexo_video' || $is_video_archive) {
                get_template_part('template-parts/card', 'video');
            } else {
                get_template_part('template-parts/card', 'album');
            }
        endwhile;
    else :
        ?>
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--vexo-surface); border: 1px solid var(--vexo-border-subtle); border-radius: 0.75rem;">
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: #fff; margin-bottom: 0.5rem;">No items found in this section</h3>
          <p style="font-size: 0.875rem; color: var(--vexo-text-muted);">Please explore other aesthetic categories or check back soon.</p>
        </div>
        <?php
    endif;
    ?>
  </div>

  <div style="margin-top: 3rem; text-align: center;">
    <?php
    the_posts_pagination(array(
        'prev_text' => __('&larr; Previous', 'vexo'),
        'next_text' => __('Next &rarr;', 'vexo'),
    ));
    ?>
  </div>
</div>

<?php
get_footer();
