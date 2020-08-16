<?php
/**
 * We have to tell WC that this should not be handled as a REST request.
 * Otherwise we can't use the product loop template contents properly.
 * Since WooCommerce 3.6
 *
 * @param bool $is_rest_api_request
 * @return bool
 */
add_filter( 'woocommerce_is_rest_api_request', function ($is_rest_api_request ) {
	if ( empty( $_SERVER['REQUEST_URI'] ) ) {
			return $is_rest_api_request;
	}

	// Bail early if this is not our request.
	if ( false === strpos( $_SERVER['REQUEST_URI'], 'konfig' ) ) {
		return $is_rest_api_request;
	}

	return false;
});


/**
 * This enqueue our block script when the editor is active
 */
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

/**
 * This enqueue our script for the frontend only
 */
add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_script(
        'gutenberg-konfig',
        plugins_url( '../script.js', __FILE__ ),
        []
    );

} );

/**
 * This adds a set of sku's to the woocommerce cart.
 */
function add_skus(WP_REST_Request $request) {
  global $wpdb;
  $params = $request -> get_json_params();

  if(!$params['skus']) {
    $response = new WP_REST_Response("No SKU's");
    $response->set_status(403);
    return $response;
  }

  try {
    foreach($params['skus'] as &$sku) {
      $product_id = $wpdb->get_var(
        $wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key='_sku' AND meta_value='%s'", $sku)
      );
      WC()->cart->add_to_cart($product_id, $quantity=1, $variation_id = 0, $variation = array(), $cart_item_data=array("data" => "Some Extra Data"));
      $sku = $product_id;
    };

    $response = new WP_REST_Response( "Ok" );
    $response->set_status(201);

  } catch (Exception $e) {
    $response = new WP_REST_Response( $e->getMessage() );
    $response->set_status(500);
  }

  return $response;
};

add_action('rest_api_init', function() {
  register_rest_route("konfig", '/add-to-cart', array(
    'methods' => 'post',
    'callback' => 'add_skus',
    'permission_callback' => '__return_true'
  ));
});

