const appGenerator = require('./app/app.generator');
const componentGenerator = require('./component/component.generator');
const storeGenerator = require('./store/store.generator');
const storeGeneratorHook = require('./store/store.generator.hook');
const viewGenerator = require('./view/view.generator');

module.exports = (api, options) => {
  // 添加命令到package.json
  appGenerator(api, options);
  // 生成组件
  componentGenerator(api, options);
  // 生成store
  storeGenerator(api, options);
  // 生成view模块
  viewGenerator(api, options);
};

module.exports.hooks = (api, options) => {
  // 在父模块里导入子模块和添加state和module
  storeGeneratorHook(api, options);
};
