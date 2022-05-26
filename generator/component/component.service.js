const path = require('path');
const { camelCase, startCase } = require('lodash');
const { getGeneratedFilePath } = require('../app/app.service');

const getTemplatePath = () => {
  const componentTemplatePath = path.join('.', 'templates', 'component.ejs');
  const styleTemplatePath = path.join('.', 'templates', 'component.style.ejs');

  return { componentTemplatePath, styleTemplatePath };
};

const getComponentName = (options) => {
  const { component: componentName } = options;
  const componentNamePascalCase = startCase(camelCase(componentName)).replace(
    / /g,
    '',
  );

  return { componentName, componentNamePascalCase };
};

const getComponentImportStatement = (options) => {
  const { componentNamePascalCase } = getComponentName(options);
  const componentImportPath = getGeneratedFilePath('component', options);

  return `import ${componentNamePascalCase} from '${componentImportPath}'`;
};

module.exports = {
  getTemplatePath,
  getComponentName,
  getComponentImportStatement,
};
