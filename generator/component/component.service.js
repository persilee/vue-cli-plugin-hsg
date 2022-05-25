const path = require('path');
const { camelCase, startCase } = require('lodash');

const getTemplatePath = () => {
  const componentTemplatePath = path.join('.', 'templates', 'component.ejs');
  const styleTemplatePath = path.join('.', 'templates', 'component.style.ejs');

  return { componentTemplatePath, styleTemplatePath };
};

const getComponentName = (options) => {
  const { component: componentName } = options;
  const componentNamePascalCase = startCase(camelCase(componentName)).replace(
    ' ',
    '',
  );

  return { componentName, componentNamePascalCase };
};

module.exports = { getTemplatePath, getComponentName };
