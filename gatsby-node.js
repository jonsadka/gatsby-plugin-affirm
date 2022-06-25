'use strict';

exports.onPreInit = function (_ref, options) {
  var reporter = _ref.reporter;

  if (!options.environmentScript) {
    reporter.warn('A path to the Affirm SDK has not been specified. Falling back to the sandbox SDK script.');
  }

  if (options.experimental_shouldDeferAffirmScript) {
    reporter.warn('The official Affirm script does not natively set `defer`. Be sure you know what you are doing :).');
  }
};

exports.pluginOptionsSchema = function (_ref2) {
  var Joi = _ref2.Joi;

  return Joi.object({
    publicAPIKey: Joi.string().required().description('The Affirm SDK requires a public API key. Did you forget to add it?'),
    environmentScript: Joi.string(),
    experimental_shouldDeferAffirmScript: Joi.boolean(),
    isAsync: Joi.boolean()
  });
};