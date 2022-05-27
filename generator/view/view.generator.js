const { getGeneratedFilePath } = require('../app/app.service');
const {
  getTemplatePath,
  getComponentName,
  getComponentImportStatement,
} = require('../component/component.service');
const {
  getStoreTemplatePath,
  getStoreStateName,
  getStoreModuleName,
} = require('../store/store.service');

const viewGenerator = (api, options) => {
  if (!options.view) return;
  console.log('options.view:', options.view);

  const generatedComponentPath = getGeneratedFilePath('component', options);

  const generatedStylePath = getGeneratedFilePath('style', options);

  const { componentTemplatePath, styleTemplatePath } = getTemplatePath();
  const { componentName, componentNamePascalCase } = getComponentName(options);

  const generatedStorePath = getGeneratedFilePath('store', options);

  const storeTemplatePath = getStoreTemplatePath();
  const storeStateName = getStoreStateName(options);
  const storeModuleName = getStoreModuleName(options);

  api.render(
    {
      [generatedComponentPath]: componentTemplatePath,
      [generatedStylePath]: styleTemplatePath,
    },
    {
      componentName,
      componentNamePascalCase,
    },
  );

  api.render(
    {
      [generatedStorePath]: storeTemplatePath,
    },
    { storeStateName, storeModuleName },
  );
};

module.exports = viewGenerator;
