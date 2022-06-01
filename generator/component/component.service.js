const path = require('path');
const { camelCase, startCase } = require('lodash');
const { getGeneratedFilePath } = require('../app/app.service');

/**
 * 生成组件和样式的模板文件路径
 *
 * @return {*}
 */
const getTemplatePath = () => {
  const componentTemplatePath = path.join('.', 'templates', 'component.ejs');
  const styleTemplatePath = path.join('.', 'templates', 'component.style.ejs');

  return { componentTemplatePath, styleTemplatePath };
};

/**
 * 生成组件的名称（驼峰）
 *
 * @param {*} options
 * @return {*}
 */
const getComponentName = (options) => {
  let componentKey = 'component';
  if (options.view) {
    componentKey = 'view';
  }
  const { [componentKey]: componentName } = options;
  const componentNamePascalCase = startCase(camelCase(componentName)).replace(
    / /g,
    '',
  );

  return { componentName, componentNamePascalCase };
};

/**
 * 生成组件的导入路径
 *
 * @param {*} options
 * @return {*}
 */
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
