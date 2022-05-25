const appGenerator = require('./app/app.generator');
const componentGenerator = require('./component/component.generator');

module.exports = (api, options) => {
  // 添加命令到package.json
  appGenerator(api, options);
  // 生成组件
  componentGenerator(api, options);
};
