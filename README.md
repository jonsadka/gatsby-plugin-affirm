# gatsby-plugin-affirm

This plugin adds the JavaScript SDK for Affirm.

## Install

`npm install --save gatsby-plugin-affirm`

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-affirm`,
      options: {
        // Path of the Affirm script to load
        environmentScript: AFFIRM_SCRIPT_PATH,
        // Load the script loading asynchronously
        isAsync: false,
        // Affirm write key for your environment
        publicAPIKey: YOUR_AFFIRM_KEY,
        // Load the script after the document has been parsed
        shouldDefer: false
      },
    },
  ],
};
```
