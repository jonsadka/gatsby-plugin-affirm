import React from 'react';

exports.onRenderBody = ({setHeadComponents}, pluginOptions) => {
  const {
    isAsync,
    environmentScript,
    experimental_shouldDeferAffirmScript,
    publicAPIKey,
  } = pluginOptions;

  if (!environmentScript) {
    throw new Error(
      'The Affirm plugin requires the path to an Affirm environment script. Did you mean to add it?'
    );
  }

  if (!publicAPIKey) {
    throw new Error(
      'The Affirm plugin requires a public API key. Did you mean to add it?'
    );
  }

  // Use your public API Key and environment script to point to the correct Affirm environment.
  const affirmConfig = {
    public_api_key: publicAPIKey,
    script: environmentScript,
  };

  // Affirm minified snippet (version 2) - Last checked on April 25, 2021
  // See https://docs.affirm.com/affirm-developers/docs/checkout-web
  const snippet = `(function(m,g,n,d,a,e,h,c){var b=m[n]||{},k=document.createElement(e),p=document.getElementsByTagName(e)[0],l=function(a,b,c){return function(){a[b]._.push([c,arguments])}};b[d]=l(b,d,"set");var f=b[d];b[a]={};b[a]._=[];f._=[];b._=[];b[a][h]=l(b,a,h);b[c]=function(){b._.push([h,arguments])};a=0;for(c="set add save post open empty reset on off trigger ready setProduct".split(" ");a<c.length;a++)f[c[a]]=l(b,d,c[a]);a=0;for(c=["get","token","url","items"];a<c.length;a++)f[c[a]]=function(){};${
    experimental_shouldDeferAffirmScript ? 'k.defer=!0' : 'k.async=!0'
  };k.src=g[e];p.parentNode.insertBefore(k,p);delete g[e];f(g);m[n]=b})(window,${JSON.stringify(
    affirmConfig
  )},"affirm","checkout","ui","script","ready","jsReady");`;

  return setHeadComponents([
    <script
      async={Boolean(isAsync)}
      dangerouslySetInnerHTML={{__html: snippet}}
      key="plugin-affirm"
    />,
  ]);
};

// NOTE: The Snippet code looks something like this when un-minified
// function (affirmConfig) {
//   var affirmRef = window.affirm || {};
//   var affirmCDNScript = document.createElement('script');
//   var affirmCDNScriptRef = document.getElementsByTagName('script')[0];
//   var saveAffirmRef = function (affirmRef, key, subkey) {
//     return () => {
//       affirmRef[key]._.push([subkey, arguments]);
//     };
//   };

//   affirmRef.checkout = saveAffirmRef(affirmRef, 'checkout', 'set');
//   var checkoutRef = affirmRef.checkout;

//   affirmRef.ui = {};
//   affirmRef.ui._ = [];
//   checkoutRef._ = [];
//   affirmRef._ = [];
//   affirmRef.ui.ready = saveAffirmRef(affirmRef, 'ui', 'ready');

//   affirmRef.jsReady = function () {
//     affirmRef._.push(['ready', arguments])
//   };

//   let idx = 0;
//   let keys = 'set add save post open empty reset on off trigger ready setProduct';
//   for (keys = keys.split(' '); idx < keys.length; idx++){
//     const key = keys[idx];
//     checkoutRef[key] = saveAffirmRef(affirmRef, 'checkout', key);
//   }

//   let idx = 0;
//   let keys = 'get token url items';
//   for (keys = keys.split(' '); idx < keys.length; idx++){
//     const key = keys[idx];
//     checkoutRef[key] = function () {};
//   }

//   affirmCDNScript.async = true;
//   affirmCDNScript.src = affirmConfig.script;
//   affirmCDNScriptRef.parentNode.insertBefore(affirmCDNScript, affirmCDNScriptRef);
//   delete affirmConfig.script;
//   checkoutRef(affirmConfig);

//   window.affirm = affirmRef;
// }
