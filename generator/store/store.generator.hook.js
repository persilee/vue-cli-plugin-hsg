const fs = require('fs');
const { EOL } = require('os');
const { getStoreStateName, getStoreModuleName } = require('./store.service');
const {
  getParentFilePath,
  getProjectFileContent,
  insertFileContent,
} = require('../app/app.service');

const storeGeneratorHook = (api, options) => {
  api.afterInvoke(() => {
    if (!options.store || !options.parent) return;
    let moduleName = '';
    const { parent: parentStore } = options;
    const storeStateName = getStoreStateName(options);
    const storeModuleName = getStoreModuleName(options);
    const parentStorePath = getParentFilePath('store', options);
    let parentFileContent = getProjectFileContent(parentStorePath, api);
    let findParentStoreState;

    if (!options.module) {
      moduleName = storeModuleName;
    }

    if (parentStore === 'app/app') {
      findParentStoreState = 'export interface RootState';
    } else {
      findParentStoreState = 'export interface .+StoreState';
    }

    // 在定义的state里新增类型
    parentFileContent = insertFileContent({
      fileContent: parentFileContent,
      find: findParentStoreState,
      insert: `    ${moduleName}: ${storeStateName};`,
    });

    // 在VueX的state里新增类型
    parentFileContent = insertFileContent({
      fileContent: parentFileContent,
      find: 'state: {',
      insert: `    ${moduleName}: <${storeStateName}>{},`,
    });

    // 在module里新增模块
    parentFileContent = insertFileContent({
      fileContent: parentFileContent,
      find: 'modules: {',
      insert: `    ${moduleName}: ${storeModuleName},`,
    });

    fs.writeFileSync(
      api.resolve(parentStorePath),
      parentFileContent.join(EOL),
      { encoding: 'utf-8' },
    );
  });
};

module.exports = storeGeneratorHook;
