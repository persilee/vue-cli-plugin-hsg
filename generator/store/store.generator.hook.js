const storeGeneratorHook = (api, options) => {
  api.afterInvoke(() => {
    if (!options.store || !options.parent) return;
    console.log('store hook ....');
  });
};

module.exports = storeGeneratorHook;
