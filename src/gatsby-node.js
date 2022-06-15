exports.onPreInit = ({reporter}, options) => {
  if (!options.environmentScript) {
    reporter.warn(
      'A path to the Affirm SDK has not been specified. Falling back to the sandbox SDK script.'
    );
  }

  if (options.experimental_shouldDeferAffirmScript) {
    reporter.warn(
      'The official Affirm script does not natively set `defer`. Be sure you know what you are doing :).'
    );
  }
};

exports.pluginOptionsSchema = ({Joi}) => {
  return Joi.object({
    publicAPIKey: Joi.string()
      .required()
      .description(
        `The Affirm SDK requires a public API key. Did you forget to add it?`
      ),
    environmentScript: Join.string(),
    experimental_shouldDeferAffirmScript: Join.boolean(),
    isAsync: Join.boolean(),
  });
};
