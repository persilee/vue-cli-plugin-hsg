const { getGeneratedFilePath } = require('../app/app.service');
const {
  getStoreTemplatePath,
  getStoreStateName,
  getStoreModuleName,
} = require('./store.service');
const chalk = require('chalk');

const storeGenerator = (api, options) => {
  if (options.component || options.view) return;
  if (!options.store || options.store == true) {
    api.exitLog(chalk.bold.red('请输入Store的名称！🏦🏦🏦'), 'error');
    api.exitLog(
      chalk.hex(
        '#FFA500',
      )(`例如：npm run gs -- history-query  --path views/accountManagement/transactionHistoryQuery
      history-query：为Store的名称
      --path：为Store的存放路径`),
      'warn',
    );
    return;
  }

  const storeTemplatePath = getStoreTemplatePath();
  const storeStateName = getStoreStateName(options);
  const storeModuleName = getStoreModuleName(options);
  const generatedStorePath = getGeneratedFilePath('store', options);

  api.render(
    {
      [generatedStorePath]: storeTemplatePath,
    },
    { storeStateName, storeModuleName },
  );
};

module.exports = storeGenerator;
