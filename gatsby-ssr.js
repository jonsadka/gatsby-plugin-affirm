'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AFFIRM_SANDBOX_CDN = 'https://cdn1-sandbox.affirm.com/js/v2/affirm.js';

exports.onRenderBody = function (_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents;
  var isAsync = pluginOptions.isAsync,
      environmentScript = pluginOptions.environmentScript,
      experimental_shouldDeferAffirmScript = pluginOptions.experimental_shouldDeferAffirmScript,
      publicAPIKey = pluginOptions.publicAPIKey;


  if (!publicAPIKey) {
    throw new Error('The Affirm plugin requires a public API key. Did you mean to add it?');
  }

  var affirmConfig = {
    public_api_key: publicAPIKey,
    script: environmentScript || AFFIRM_SANDBOX_CDN
  };

  var snippet = '(function(m,g,n,d,a,e,h,c){var b=m[n]||{},k=document.createElement(e),p=document.getElementsByTagName(e)[0],l=function(a,b,c){return function(){a[b]._.push([c,arguments])}};b[d]=l(b,d,"set");var f=b[d];b[a]={};b[a]._=[];f._=[];b._=[];b[a][h]=l(b,a,h);b[c]=function(){b._.push([h,arguments])};a=0;for(c="set add save post open empty reset on off trigger ready setProduct".split(" ");a<c.length;a++)f[c[a]]=l(b,d,c[a]);a=0;for(c=["get","token","url","items"];a<c.length;a++)f[c[a]]=function(){};' + (experimental_shouldDeferAffirmScript ? 'k.defer=!0' : 'k.async=!0') + ';k.src=g[e];p.parentNode.insertBefore(k,p);delete g[e];f(g);m[n]=b})(window,' + JSON.stringify(affirmConfig) + ',"affirm","checkout","ui","script","ready","jsReady");';

  return setHeadComponents([_react2.default.createElement('script', {
    async: Boolean(isAsync),
    dangerouslySetInnerHTML: { __html: snippet },
    key: 'plugin-affirm'
  })]);
};