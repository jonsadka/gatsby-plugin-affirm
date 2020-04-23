'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.onRenderBody = function (_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents;
  var isAsync = pluginOptions.isAsync,
      environmentScript = pluginOptions.environmentScript,
      experimental_shouldDeferAffirmScript = pluginOptions.experimental_shouldDeferAffirmScript,
      publicAPIKey = pluginOptions.publicAPIKey;


  if (!environmentScript) {
    throw new Error('The Affirm plugin requires the path to an Affirm environment script. Did you mean to add it?');
  }

  if (!publicAPIKey) {
    throw new Error('The Affirm plugin requires a public API key. Did you mean to add it?');
  }

  var affirmConfig = {
    public_api_key: publicAPIKey,
    script: environmentScript
  };

  var snippet = '(function(l,g,m,e,a,f,b){var d,c=l[m]||{},h=document.createElement(f),n=document.getElementsByTagName(f)[0],k=function(a,b,c){return function(){a[b]._.push([c,arguments])}};c[e]=k(c,e,"set");d=c[e];c[a]={};c[a]._=[];d._=[];c[a][b]=k(c,a,b);a=0;for(b="set add save post open empty reset on off trigger ready setProduct".split(" ");a<b.length;a++)d[b[a]]=k(c,e,b[a]);a=0;for(b=["get","token","url","items"];a<b.length;a++)d[b[a]]=function(){};' + (experimental_shouldDeferAffirmScript ? 'k.defer=!0' : 'k.async=!0') + ';h.src=g[f];n.parentNode.insertBefore(h,n);delete g[f];d(g);l[m]=c})(window,' + JSON.stringify(affirmConfig) + ',"affirm","checkout","ui","script","ready");';

  return setHeadComponents([_react2.default.createElement('script', {
    async: Boolean(isAsync),
    dangerouslySetInnerHTML: { __html: snippet },
    key: 'plugin-affirm'
  })]);
};