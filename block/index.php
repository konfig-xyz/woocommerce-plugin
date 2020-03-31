<?php

// Load assets for wp-admin when editor is active
add_action('enqueue_block_editor_assets', function () {
    wp_enqueue_script(
        'gutenberg-konfig',
        plugins_url('block.js', __FILE__),
        ['wp-blocks', 'wp-element']
    );

    wp_enqueue_style(
        'gutenberg-konfig',
        plugins_url('block.css', __FILE__),
        []
    );
});

// Load assets for frontend
add_action( 'wp_enqueue_scripts', function () {
    // wp_enqueue_style(
    //    'gutenberg-konfig',
    //    plugins_url( 'block.css', __FILE__ ),
    //    []
    // );
    wp_enqueue_script(
        'gutenberg-konfig',
        plugins_url( '../script.js', __FILE__ ),
        []
     );
 } );
