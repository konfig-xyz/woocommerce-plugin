/* block.js */
var el = wp.element.createElement;

wp.blocks.registerBlockType('konfig/viewer', {
  title: 'Konfig', // Block name visible to user
  icon: 'lightbulb', // Toolbar icon can be either using WP Dashicons or custom SVG
  category: 'common', // Under which category the block would appear
  attributes: { // The data this block will be storing
    id: { type: 'string' }, // Notice box title in h4 tag
    redirect: { type: 'string' }, // Notice box title in h4 tag
  },

  edit(props) {
    // How our block renders in the editor in edit mode
    return el('div',
      {
        className: 'notice-box notice-' + props.attributes.type
      },
      el(
        'input',
        {
          type: 'text',
          placeholder: 'Enter your Konfig Id here...',
          value: props.attributes.id,
          onChange: (event) => {
            props.setAttributes({ id: event.target.value });
          },
          style: { width: '100%' }
        }
      ),
      el(
        'input',
        {
          type: 'redirect',
          placeholder: 'Enter a url to redirect to when product has been added to cart. Leave empty for no action.',
          value: props.attributes.redirect,
          onChange: (event) => {
            props.setAttributes({ redirect: event.target.value });
          },
          style: { width: '100%' }
        }
      )
    ); // End return

  },  // End edit()

  /* block.js */
  save(props) {
    // How our block renders on the frontend


    // return `<iframe   data-src="https://viewer.konfig.io/5e6fd9ac6814d8001704b87e" class="configurator lazyload" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="></iframe>`
    return el('iframe',
      {
        class: "konfig",
        style: "width:100%;height:50vh",
        "data-redirect":props.attributes.redirect,
        src: `https://viewer.konfig.io/${props.attributes.id}/`
      }
    ); // End return

  } // End save()
});