const { startCase, camelCase } = require('lodash');
const path = require('path');

const getStoreTemplatePath = () => {
  return path.join('.', 'templates', 'store.ejs');
};

const getStoreStateName = (options) => {
  const { store: storeName } = options;
  return startCase(camelCase(storeName)).replace(/ /g, '') + 'StoreState';
};

const getStoreModuleName = (options) => {
  const { store: storeName } = options;

  return camelCase(storeName) + 'StoreState';
};

module.exports = {
  getStoreTemplatePath,
  getStoreStateName,
  getStoreModuleName,
};
