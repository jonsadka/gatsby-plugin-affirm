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

  // Affirm minified snippet (version 2)
  // See https://docs.affirm.com/affirm-developers/docs/checkout-web
  const snippet = `(function(l,g,m,e,a,f,b){var d,c=l[m]||{},h=document.createElement(f),n=document.getElementsByTagName(f)[0],k=function(a,b,c){return function(){a[b]._.push([c,arguments])}};c[e]=k(c,e,"set");d=c[e];c[a]={};c[a]._=[];d._=[];c[a][b]=k(c,a,b);a=0;for(b="set add save post open empty reset on off trigger ready setProduct".split(" ");a<b.length;a++)d[b[a]]=k(c,e,b[a]);a=0;for(b=["get","token","url","items"];a<b.length;a++)d[b[a]]=function(){};${
    experimental_shouldDeferAffirmScript ? 'k.defer=!0' : 'k.async=!0'
  };h.src=g[f];n.parentNode.insertBefore(h,n);delete g[f];d(g);l[m]=c})(window,${JSON.stringify(
    affirmConfig
  )},"affirm","checkout","ui","script","ready");`;

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
//   affirmRef.ui.ready = saveAffirmRef(affirmRef, 'ui', 'ready');

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
