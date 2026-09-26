<?php
/**
 * The template for displaying all pages in VEXO
 *
 * @package VEXO
 * @version 1.0.0
 */

get_header();

while (have_posts()) :
    the_post();
    ?>
    <div class="vexo-container" style="max-width: 56rem; padding-top: 4rem; padding-bottom: 6rem;">
      <div style="margin-bottom: 2.5rem;">
        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--vexo-gold); font-weight: 600;">
          <?php echo is_front_page() ? 'VEXO Studio' : 'VEXO Documentation'; ?>
        </span>
        <h1 style="font-family: var(--font-serif); font-size: clamp(2.25rem, 5vw, 3.5rem); color: #fff; margin-top: 0.5rem; line-height: 1.1;">
          <?php the_title(); ?>
        </h1>
      </div>

      <div class="entry-content" style="font-size: 1rem; color: var(--vexo-text-muted); line-height: 1.8;">
        <?php the_content(); ?>
      </div>
    </div>
    <?php
endwhile;

get_footer();
