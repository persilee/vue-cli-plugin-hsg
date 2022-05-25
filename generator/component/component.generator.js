const { getGeneratedFilePath } = require('../app/app.service');
const { getTemplatePath, getComponentName } = require('./component.service');

const componentGenerator = (api, options) => {
  if (!options.component) return;

  const generatedComponentPath = getGeneratedFilePath('component', options);
  console.log(generatedComponentPath);

  const generatedStylePath = getGeneratedFilePath('style', options);

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
};

module.exports = componentGenerator;
