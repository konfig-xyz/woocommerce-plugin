(async function() {
  const addToCart = skus =>
    fetch(`/wp-json/konfig/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ skus: skus })
    });

  const iframeMessage = async event => {
    if (!event || !Array.isArray(event.data)) return;
    const [action, skus = []] = event.data;
    switch (action) {
      case "ADD_TO_CART": {
        try {
          const products = await addToCart(skus);
          const elements = document.getElementsByClassName("konfig");
          const redirectUrl =
            elements && elements[0].getAttribute("data-redirect");
          if (redirectUrl) window.location.assign(redirectUrl);
          window.parent.postMessage(["ADD_TO_CART_SUCCESS", skus], "*");
        } catch (err) {
          console.warn("error", err);
          window.parent.postMessage(["ADD_TO_CART_ERROR", err], "*");
        }
      }
      default:
        console.log(action);
    }
  };

  window.addEventListener("message", iframeMessage, false);
})();
