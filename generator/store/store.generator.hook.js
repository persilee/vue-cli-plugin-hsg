const storeGeneratorHook = (api, options) => {
  api.afterInvoke(() => {
    if (!options.store || !options.parent) return;
  });
};

module.exports = storeGeneratorHook;
