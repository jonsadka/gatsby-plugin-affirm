# gatsby-plugin-affirm

Adds the (Affirm JavaScript SDK)[https://docs.affirm.com/developers/docs/afjs-reference] to your Gatsby project.

## Installation

1. Install `gatsby-plugin-affirm` .

```shell
npm install gatsby-plugin-affirm

# or

yarn add gatsby-plugin-affirm
```

2. Add the plugins to your `gatsby-config.js`:

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-affirm`,
      options: {
        // REQUIRED VALUES
        //
        // Affirm API write key for the running environment
        publicAPIKey: YOUR_AFFIRM_KEY,
        // Affirm SDK url for the running environment (i.e. https://cdn1.affirm.com/js/v2/affirm.js)
        environmentScript: AFFIRM_SDK_URL

        // OPTIONAL VALUES
        //
        // Loads the Affirm script after the document has been parsed
        experimental_shouldDeferAffirmScript: false,
        // Loads the initial script asynchronously
        isAsync: true,
      },
    },
  ],
};
```

## How to use

In the client, the Affirm SDK will now be available in the window / global context.

```javascript
if (affirm && affirm.ui.ready()) {
  affirm.checkout(affirmCheckoutPayload);
  affirm.checkout.open();
}

// or

window.affirm;
```
