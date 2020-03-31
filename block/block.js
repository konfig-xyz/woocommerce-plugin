/* block.js */
var el = wp.element.createElement;

wp.blocks.registerBlockType("konfig/viewer", {
  title: "Konfig", // Block name visible to user
  icon: "lightbulb", // Toolbar icon can be either using WP Dashicons or custom SVG
  category: "common", // Under which category the block would appear
  attributes: {
    // The data this block will be storing
    id: { type: "string" }, // Notice box title in h4 tag
    redirect: { type: "string" }, // Notice box title in h4 tag
    extraCss: { type: "string" } // Notice box title in h4 tag
  },

  edit(props) {
    // How our block renders in the editor in edit mode
    return el(
      "div",
      {
        className: "notice-box notice-" + props.attributes.type
      },
      el("input", {
        type: "text",
        placeholder: "Enter your Konfig Id here...",
        value: props.attributes.id,
        onChange: event => {
          props.setAttributes({ id: event.target.value });
        },
        style: { width: "100%" }
      }),
      el("input", {
        type: "text",
        placeholder:
          "Enter a url to redirect to when product has been added to cart. Leave empty for no action.",
        value: props.attributes.redirect,
        onChange: event => {
          props.setAttributes({ redirect: event.target.value });
        },
        style: { width: "100%" }
      }),
      el("textarea", {
        type: "css",
        placeholder: "Enter some CSS",
        value: props.attributes.extraCss,
        onChange: event => {
          props.setAttributes({ extraCss: event.target.value });
        },
        style: { width: "100%" }
      })
    ); // End return
  }, // End edit()

  /* block.js */
  save(props) {
    const { id, background, extraCss } = props.attributes;
    const css = `
    background-size: cover;
    background-position: center top;
    width:100%;
    height: calc(100vh - 150px);
    ${extraCss}`;
    // How our block renders on the frontend
    return el("iframe", {
      class: "konfig",
      style: css,
      "data-redirect": props.attributes.redirect,
      src: `https://viewer.konfig.io/${id}/`
    }); // End return
  } // End save()
});
