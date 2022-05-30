const { camelCase } = require('lodash');
const path = require('path');

const getRoutesTemplatePath = () => {
  return path.join('.', 'templates', 'routes.ejs');
};

const getRoutesPath = (options) => {
  const { path: filePath } = options;
  const routesPathArray = filePath.split('/');
  routesPathArray.shift();
  return path.join(...routesPathArray);
};

const getRoutesName = (options) => {
  const { view: routesName } = options;
  const routesCamelCaseName = camelCase(routesName);
  return routesCamelCaseName;
};

const getRoutesImportPath = (options) => {
  const { view: routesName, path: filePath } = options;
  const filePathArray = filePath.split('/');
  const routesImportPath = ['@', ...filePathArray, `${routesName}.vue`];
  return path.join(...routesImportPath);
};

module.exports = {
  getRoutesTemplatePath,
  getRoutesPath,
  getRoutesName,
  getRoutesImportPath,
};
