'use strict';

exports.onPreInit = function (_ref, options) {
  var reporter = _ref.reporter;

  if (!options.environmentScript) {
    reporter.warn('The Affirm plugin requires the path to an Affirm environment script. Did you mean to add it?');
  }
  if (!options.publicAPIKey) {
    reporter.warn('The Affirm plugin requires a public API key. Did you mean to add it?');
  }
  if (!options.experimental_shouldDeferAffirmScript) {
    reporter.warn('The official Affirm script does not natively set `defer`. Be sure you know what you are doing :).');
  }
};