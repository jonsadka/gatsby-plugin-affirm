exports.onPreInit = ({reporter}, options) => {
  if (!options.environmentScript) {
    reporter.warn(
      'The Affirm plugin requires the path to an Affirm environment script. Did you mean to add it?'
    );
  }
  if (!options.publicAPIKey) {
    reporter.warn(
      'The Affirm plugin requires a public API key. Did you mean to add it?'
    );
  }
};
