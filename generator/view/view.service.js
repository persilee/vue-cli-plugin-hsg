const { camelCase } = require('lodash');
const path = require('path');

/**
 * 生成路由的模板路径
 *
 * @return {*}
 */
const getRoutesTemplatePath = () => {
  return path.join('.', 'templates', 'routes.ejs');
};

/**
 * 生成路由的路径
 *
 * @param {*} options
 * @return {*}
 */
const getRoutesPath = (options) => {
  const { path: filePath } = options;
  const routesPathArray = filePath.split('/');
  routesPathArray.shift();
  return path.join(...routesPathArray);
};

/**
 * 生成路由的名字（小驼峰）
 *
 * @param {*} options
 * @return {*}
 */
const getRoutesName = (options) => {
  const { view: routesName } = options;
  const routesCamelCaseName = camelCase(routesName);
  return routesCamelCaseName;
};

/**
 * 生成路由的import的路径
 *
 * @param {*} options
 * @return {*}
 */
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
