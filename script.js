(async function () {
    const getProductsBySkus = async (skus = []) => {
        return fetch(`/wp-json/wc/store/products?sku=${skus.join("%2C")}`, {
            method: 'GET',
        }).then(response => response.json());
    }

    const addToCart = (id = 6) =>
        fetch(`/wp-json/wc/store/cart/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id=${id}&quantity=1`
        }).then(response => response.json());

    const iframeMessage = async event => {
        console.log('-----------------');
        console.log('Message Received');
        console.log(event);
        console.log('-----------------');
        if (!event || !Array.isArray(event.data)) return;


        // Map SKU to id
        const sampleItems = [] // ["sku1","sku2"]

        const [action, items = sampleItems] = event.data;

        const products = await getProductsBySkus(items)

        for (const item of products) {
            try {
                const cartAdding = await addToCart(item.id);
                console.log('success', cartAdding);
            } catch (err) {
                console.warn('error', error);
            }
        }

        // Get redirect url?
        // TODO allow multiple konfigs on single page ?
        const elements = document.getElementsByClassName("konfig")
        const redirectUrl = elements && elements[0].getAttribute('data-redirect')
        // Redirect
        if(redirectUrl) window.location.assign(redirectUrl);
    };

    window.addEventListener('message', iframeMessage, false);
})();