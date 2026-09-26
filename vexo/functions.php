<?php
/**
 * VEXO Theme Functions and definitions
 *
 * @package VEXO
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

define('VEXO_VERSION', '1.0.0');
define('VEXO_DIR', get_template_directory());
define('VEXO_URI', get_template_directory_uri());

/**
 * Theme Setup
 */
function vexo_theme_setup() {
    // Make theme available for translation.
    load_theme_textdomain('vexo', VEXO_DIR . '/languages');

    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title.
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages.
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(1200, 900, true);
    add_image_size('vexo-card', 800, 600, true);
    add_image_size('vexo-video', 800, 450, true);
    add_image_size('vexo-plate', 1920, 1080, false);

    // Register Navigation Menus
    register_nav_menus(array(
        'primary' => esc_html__('Primary Navigation', 'vexo'),
        'footer'  => esc_html__('Footer Legal & Safety', 'vexo'),
    ));

    // Switch default core markup to output valid HTML5.
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));
}
add_action('after_setup_theme', 'vexo_theme_setup');

/**
 * Enqueue scripts and styles.
 */
function vexo_enqueue_scripts() {
    // Google Fonts: Cormorant Garamond & Plus Jakarta Sans
    wp_enqueue_style(
        'vexo-google-fonts',
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap',
        array(),
        null
    );

    // Main stylesheet
    wp_enqueue_style('vexo-main-style', get_stylesheet_uri(), array(), VEXO_VERSION);

    // Theme interactive script
    wp_enqueue_script(
        'vexo-main-js',
        VEXO_URI . '/assets/js/main.js',
        array(),
        VEXO_VERSION,
        true
    );

    // Localize script with AJAX URL, Nonce, and statutory strings
    wp_localize_script('vexo-main-js', 'vexoData', array(
        'ajaxUrl'       => admin_url('admin-ajax.php'),
        'nonce'         => wp_create_nonce('vexo_security_nonce'),
        'siteUrl'       => home_url('/'),
        'themeUri'      => VEXO_URI,
        'brand'         => 'VEXO',
        'complianceNote'=> esc_html__('All depicted adult models are 18+ with 18 U.S.C. 2257 records kept on file.', 'vexo'),
    ));
}
add_action('wp_enqueue_scripts', 'vexo_enqueue_scripts');

/**
 * Register Custom Post Types: Photo Albums & Videos
 */
function vexo_register_custom_post_types() {
    // Photo Albums
    $album_labels = array(
        'name'               => _x('Photo Albums', 'post type general name', 'vexo'),
        'singular_name'      => _x('Photo Album', 'post type singular name', 'vexo'),
        'menu_name'          => _x('Photo Albums', 'admin menu', 'vexo'),
        'name_admin_bar'     => _x('Photo Album', 'add new on admin bar', 'vexo'),
        'add_new'            => _x('Add New Album', 'album', 'vexo'),
        'add_new_item'       => __('Add New Photo Album', 'vexo'),
        'new_item'           => __('New Photo Album', 'vexo'),
        'edit_item'          => __('Edit Photo Album', 'vexo'),
        'view_item'          => __('View Photo Album', 'vexo'),
        'all_items'          => __('All Photo Albums', 'vexo'),
        'search_items'       => __('Search Photo Albums', 'vexo'),
        'not_found'          => __('No albums found.', 'vexo'),
        'not_found_in_trash' => __('No albums found in Trash.', 'vexo')
    );

    $album_args = array(
        'labels'             => $album_labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'photos'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-format-gallery',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'show_in_rest'       => true,
    );
    register_post_type('vexo_album', $album_args);

    // Video Discovery Reels
    $video_labels = array(
        'name'               => _x('Videos', 'post type general name', 'vexo'),
        'singular_name'      => _x('Video Reel', 'post type singular name', 'vexo'),
        'menu_name'          => _x('Videos', 'admin menu', 'vexo'),
        'name_admin_bar'     => _x('Video', 'add new on admin bar', 'vexo'),
        'add_new'            => _x('Add New Video', 'video', 'vexo'),
        'add_new_item'       => __('Add New Video Reel', 'vexo'),
        'new_item'           => __('New Video Reel', 'vexo'),
        'edit_item'          => __('Edit Video Reel', 'vexo'),
        'view_item'          => __('View Video Reel', 'vexo'),
        'all_items'          => __('All Videos', 'vexo'),
        'search_items'       => __('Search Videos', 'vexo'),
        'not_found'          => __('No videos found.', 'vexo'),
        'not_found_in_trash' => __('No videos found in Trash.', 'vexo')
    );

    $video_args = array(
        'labels'             => $video_labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'videos'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 6,
        'menu_icon'          => 'dashicons-video-alt3',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'comments'),
        'show_in_rest'       => true,
    );
    register_post_type('vexo_video', $video_args);

    // Aesthetic Taxonomies (Categories)
    register_taxonomy('vexo_category', array('vexo_album', 'vexo_video', 'post'), array(
        'hierarchical'      => true,
        'labels'            => array(
            'name'              => _x('Aesthetic Categories', 'taxonomy general name', 'vexo'),
            'singular_name'     => _x('Aesthetic Category', 'taxonomy singular name', 'vexo'),
            'search_items'      => __('Search Categories', 'vexo'),
            'all_items'         => __('All Aesthetic Categories', 'vexo'),
            'parent_item'       => __('Parent Category', 'vexo'),
            'parent_item_colon' => __('Parent Category:', 'vexo'),
            'edit_item'         => __('Edit Category', 'vexo'),
            'update_item'       => __('Update Category', 'vexo'),
            'add_new_item'      => __('Add New Aesthetic Category', 'vexo'),
            'new_item_name'     => __('New Category Name', 'vexo'),
            'menu_name'         => __('Aesthetic Categories', 'vexo'),
        ),
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'category'),
        'show_in_rest'      => true,
    ));
}
add_action('init', 'vexo_register_custom_post_types');

/**
 * Handle AJAX Content Reporting Form
 */
function vexo_ajax_submit_report() {
    check_ajax_referer('vexo_security_nonce', 'security');

    $target_type = isset($_POST['target_type']) ? sanitize_text_field(wp_unslash($_POST['target_type'])) : 'general';
    $target_id   = isset($_POST['target_id']) ? sanitize_text_field(wp_unslash($_POST['target_id'])) : '';
    $reason      = isset($_POST['reason']) ? sanitize_text_field(wp_unslash($_POST['reason'])) : '';
    $description = isset($_POST['description']) ? sanitize_textarea_field(wp_unslash($_POST['description'])) : '';
    $email       = isset($_POST['reporter_email']) ? sanitize_email(wp_unslash($_POST['reporter_email'])) : '';

    if (empty($description) || empty($email) || !is_email($email)) {
        wp_send_json_error(array('message' => esc_html__('Please provide a valid email and description.', 'vexo')));
    }

    $ticket_id = 'REP-' . substr(time(), -6);

    // Save report in custom table or options / custom post for review
    $reports = get_option('vexo_reports_log', array());
    $reports[] = array(
        'ticket_id'   => $ticket_id,
        'target_type' => $target_type,
        'target_id'   => $target_id,
        'reason'      => $reason,
        'description' => $description,
        'email'       => $email,
        'status'      => 'pending',
        'created_at'  => current_time('mysql'),
    );
    update_option('vexo_reports_log', $reports);

    wp_send_json_success(array(
        'ticket_id' => $ticket_id,
        'message'   => esc_html__('Report received and prioritized. Our compliance officers have been alerted.', 'vexo')
    ));
}
add_action('wp_ajax_vexo_submit_report', 'vexo_ajax_submit_report');
add_action('wp_ajax_nopriv_vexo_submit_report', 'vexo_ajax_submit_report');

/**
 * Handle AJAX DMCA Takedown Request Form
 */
function vexo_ajax_submit_takedown() {
    check_ajax_referer('vexo_security_nonce', 'security');

    $name          = isset($_POST['full_name']) ? sanitize_text_field(wp_unslash($_POST['full_name'])) : '';
    $email         = isset($_POST['email']) ? sanitize_email(wp_unslash($_POST['email'])) : '';
    $claimant_role = isset($_POST['claimant_role']) ? sanitize_text_field(wp_unslash($_POST['claimant_role'])) : 'model_depicted';
    $media_url     = isset($_POST['media_url']) ? esc_url_raw(wp_unslash($_POST['media_url'])) : '';
    $justification = isset($_POST['justification']) ? sanitize_textarea_field(wp_unslash($_POST['justification'])) : '';
    $sworn         = isset($_POST['sworn_statement']) && $_POST['sworn_statement'] === 'true';

    if (empty($name) || empty($email) || empty($justification) || !$sworn) {
        wp_send_json_error(array('message' => esc_html__('Please complete all required fields and confirm the sworn declaration.', 'vexo')));
    }

    $ref = 'VEXO-DMCA-' . date('Y') . '-' . substr(time(), -4);

    $takedowns = get_option('vexo_takedowns_log', array());
    $takedowns[] = array(
        'reference'     => $ref,
        'name'          => $name,
        'email'         => $email,
        'claimant_role' => $claimant_role,
        'media_url'     => $media_url,
        'justification' => $justification,
        'status'        => 'under_review',
        'created_at'    => current_time('mysql'),
    );
    update_option('vexo_takedowns_log', $takedowns);

    wp_send_json_success(array(
        'reference' => $ref,
        'message'   => esc_html__('DMCA and Performer Consent request lodged under priority review.', 'vexo')
    ));
}
add_action('wp_ajax_vexo_submit_takedown', 'vexo_ajax_submit_takedown');
add_action('wp_ajax_nopriv_vexo_submit_takedown', 'vexo_ajax_submit_takedown');
