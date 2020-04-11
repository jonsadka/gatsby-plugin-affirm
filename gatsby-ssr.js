import React from 'react';

exports.onRenderBody = ({setHeadComponents}, pluginOptions) => {
  const {publicAPIKey, environmentScript} = pluginOptions;

  if (!publicAPIKey) {
    throw new Error(
      'The Affirm plugin requires a public API key. Did you mean to add it?'
    );
  }

  if (!environmentScript) {
    throw new Error(
      'The Affirm plugin requires the path to an Affirm environment script. Did you mean to add it?'
    );
  }

  // Use your public API Key and environment script to point to the correct Affirm environment.
  const affirmConfig = {
    public_api_key: publicAPIKey, // eslint-disable-line @typescript-eslint/camelcase
    script: environmentScript,
  };

  // Affirm minified snippet (version 2)
  const snippet = `(function(m,g,n,d,a,e,h,c){var b=m[n]||{},k=document.createElement(e),p=document.getElementsByTagName(e)[0],l=function(a,b,c){return function(){a[b]._.push([c,arguments])}};b[d]=l(b,d,"set");var f=b[d];b[a]={};b[a]._=[];f._=[];b._=[];b[a][h]=l(b,a,h);b[c]=function(){b._.push([h,arguments])};a=0;for(c="set add save post open empty reset on off trigger ready setProduct".split(" ");a<c.length;a++)f[c[a]]=l(b,d,c[a]);a=0;for(c=["get","token","url","items"];a<c.length;a++)f[c[a]]=function(){};k.async=!0;k.src=g[e];p.parentNode.insertBefore(k,p);delete g[e];f(g);m[n]=b})(window,${JSON.stringify(
    affirmConfig
  )},"affirm","checkout","ui","script","ready","jsReady");`;

  return setHeadComponents([
    <script
      async={true}
      key="plugin-affirm"
      dangerouslySetInnerHTML={{
        __html: snippet,
      }}
    />,
  ]);
};