const { startCase, camelCase } = require('lodash');
const path = require('path');
const { getParentImportPath } = require('../app/app.service');

const getStoreTemplatePath = () => {
  return path.join('.', 'templates', 'store.ejs');
};

const getStoreStateName = (options) => {
  const { store: storeName } = options;
  return startCase(camelCase(storeName)).replace(/ /g, '') + 'StoreState';
};

const getStoreModuleName = (options) => {
  const { store: storeName } = options;

  return camelCase(storeName) + 'StoreModule';
};

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
