const { startCase, camelCase } = require('lodash');
const path = require('path');
const { getParentImportPath } = require('../app/app.service');

/**
 * 生成store模板路径
 *
 * @return {*}
 */
const getStoreTemplatePath = () => {
  return path.join('.', 'templates', 'store.ejs');
};

/**
 * 生成store的名字(驼峰)
 *
 * @param {*} options
 * @return {*}
 */
const getStoreStateName = (options) => {
  if (options.view) {
    options.store = options.view;
  }
  const { store: storeName } = options;

  return startCase(camelCase(storeName)).replace(/ /g, '') + 'StoreState';
};

/**
 * 生成store的模块名称（小驼峰）
 *
 * @param {*} options
 * @return {*}
 */
const getStoreModuleName = (options) => {
  if (options.view) {
    options.store = options.view;
  }
  const { store: storeName } = options;

  return camelCase(storeName) + 'StoreModule';
};

/**
 * 生成store的导入路径
 *
 * @param {*} options
 * @return {*}
 */
const getStoreImportStatement = (options) => {
  const storeStateName = getStoreStateName(options);
  const storeModuleName = getStoreModuleName(options);
  const storeImportPath = getParentImportPath('store', options);

  return `import { ${storeStateName}, ${storeModuleName} } from  '${storeImportPath}'`;
};

module.exports = {
  getStoreTemplatePath,
  getStoreStateName,
  getStoreModuleName,
  getStoreImportStatement,
};
