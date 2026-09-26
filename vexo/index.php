<?php
/**
 * The main template file for VEXO
 *
 * @package VEXO
 * @version 1.0.0
 */

get_header();
?>

<div class="vexo-container" style="padding-top: 3rem; padding-bottom: 5rem;">
  <div style="max-width: 42rem; margin-bottom: 2.5rem;">
    <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--vexo-gold); font-weight: 600;">
      Archive Catalog
    </span>
    <h1 style="font-family: var(--font-serif); font-size: 2.5rem; color: #fff; margin-top: 0.25rem;">
      <?php single_post_title(); ?>
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

        the_posts_navigation(array(
            'prev_text' => __('Older Entries', 'vexo'),
            'next_text' => __('Newer Entries', 'vexo'),
        ));
    else :
        ?>
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--vexo-surface); border: 1px solid var(--vexo-border-subtle); border-radius: 0.75rem;">
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: #fff; margin-bottom: 0.5rem;">No media records found</h3>
          <p style="font-size: 0.875rem; color: var(--vexo-text-muted);">Please check back soon for newly published fine art collections.</p>
        </div>
        <?php
    endif;
    ?>
  </div>
</div>

<?php
get_footer();
