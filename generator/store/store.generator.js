const { getGeneratedFilePath } = require('../app/app.service');
const {
  getStoreTemplatePath,
  getStoreStateName,
  getStoreModuleName,
} = require('./store.service');

const storeGenerator = (api, options) => {
  console.log('options:', options);
  if (!options.store) return;

  const storeTemplatePath = getStoreTemplatePath();
  const storeStateName = getStoreStateName(options);
  const storeModuleName = getStoreModuleName(options);
  const generatedStorePath = getGeneratedFilePath('store', options);

  api.render(
    {
      [generatedStorePath]: storeTemplatePath,
    },
    { storeStateName, storeModuleName },
  );
};

module.exports = storeGenerator;
