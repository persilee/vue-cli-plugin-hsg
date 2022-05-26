const appGenerator = require('./app/app.generator');
const componentGenerator = require('./component/component.generator');
const storeGenerator = require('./store/store.generator');
const storeGeneratorHook = require('./store/store.generator.hook');

module.exports = (api, options) => {
  // 添加命令到package.json
  appGenerator(api, options);
  // 生成组件
  componentGenerator(api, options);
  // 生成store
  storeGenerator(api, options);
};

module.exports.hooks = (api, options) => {
  storeGeneratorHook(api, options);
};
