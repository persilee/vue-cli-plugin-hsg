const {
  getGeneratedFilePath,
  getParentFilePath,
} = require('../app/app.service');
const {
  getTemplatePath,
  getComponentName,
} = require('../component/component.service');
const {
  getStoreTemplatePath,
  getStoreStateName,
  getStoreModuleName,
  getStoreImportStatement,
} = require('../store/store.service');
const {
  getRoutesPath,
  getRoutesTemplatePath,
  getRoutesName,
  getRoutesImportPath,
} = require('./view.service');
const chalk = require('chalk');

const viewGenerator = (api, options) => {
  if (options.view == true) {
    api.exitLog(chalk.bold.red('请输入组件名称！🚨🚨🚨'), 'error');
    api.exitLog(
      chalk.hex(
        '#FFA500',
      )(`例如：npm run gv -- history-query  --path views/accountManagement/transactionHistoryQuery
      history-query：为组件名称（必填）
      --path：为组件的存放路径（必填）`),
      'warn',
    );
    return;
  } else if (!options.path || options.path == true) {
    api.exitLog(chalk.bold.red('请指定路径！⛳️⛳️⛳️'), 'error');
    api.exitLog(
      chalk.hex(
        '#FFA500',
      )(`例如：npm run gv -- history-query  --path views/accountManagement/transactionHistoryQuery
      history-query：为组件名称（必填）
      --path：为组件的存放路径（必填）`),
      'warn',
    );
    return;
  }

  const generatedComponentPath = getGeneratedFilePath('component', options);

  const generatedStylePath = getGeneratedFilePath('style', options);

  const { componentTemplatePath, styleTemplatePath } = getTemplatePath();
  const { componentName, componentNamePascalCase } = getComponentName(options);

  const generatedStorePath = getGeneratedFilePath('store', options);

  const storeTemplatePath = getStoreTemplatePath();
  const storeStateName = getStoreStateName(options);
  const storeModuleName = getStoreModuleName(options);

  const routesName = getRoutesName(options);
  const generatedRoutesPath = getGeneratedFilePath('routes', options);
  const routesTemplatePath = getRoutesTemplatePath();
  const routesPath = getRoutesPath(options);
  const routesImportPath = getRoutesImportPath(options);

  // 生成 component 和 style
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

  // 生成 store
  api.render(
    {
      [generatedStorePath]: storeTemplatePath,
    },
    { storeStateName, storeModuleName },
  );

  // 在parent里导入store模块
  const parentStorePath = getParentFilePath('store', options);
  const storeImportStatement = getStoreImportStatement(options);
  api.injectImports(parentStorePath, storeImportStatement);

  // 生成 routes
  api.render(
    {
      [generatedRoutesPath]: routesTemplatePath,
    },
    { routesName, routesPath, routesImportPath },
  );
};

module.exports = viewGenerator;
