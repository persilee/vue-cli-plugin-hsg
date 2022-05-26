const {
  getGeneratedFilePath,
  getParentFilePath,
} = require('../app/app.service');
const {
  getTemplatePath,
  getComponentName,
  getComponentImportStatement,
} = require('./component.service');

const componentGenerator = (api, options) => {
  if (!options.component) return;

  const generatedComponentPath = getGeneratedFilePath('component', options);
  console.log(generatedComponentPath);

  let generatedStylePath;
  if (options.parent) {
    generatedStylePath = getParentFilePath('style', options);
  } else {
    generatedStylePath = getGeneratedFilePath('style', options);
  }

  const { componentTemplatePath, styleTemplatePath } = getTemplatePath();

  const { componentName, componentNamePascalCase } = getComponentName(options);
  console.log(generatedStylePath);
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

  if (options.parent) {
    const componentImportStatement = getComponentImportStatement(options);
    const parentComponentPath = getParentFilePath('component', options);

    api.injectImports(parentComponentPath, componentImportStatement);
  }
};

module.exports = componentGenerator;
