const {
  getGeneratedFilePath,
  getParentFilePath,
} = require('../app/app.service');
const {
  getTemplatePath,
  getComponentName,
  getComponentImportStatement,
} = require('./component.service');
const chalk = require('chalk');

const componentGenerator = (api, options) => {
  if (options.component == true) {
    api.exitLog(chalk.bold.red('请输入组件名称！🚨🚨🚨'), 'error');
    api.exitLog(
      chalk.hex(
        '#FFA500',
      )(`例如：npm run gc -- child-component --path /views/accountManagement/accountSummary/components --parent /views/accountManagement/accountSummary/account-summary
      child-component：为组件名称
      --path：为组件的存放路径
      --parent：为父组件的路径（会自动在父组件里导入子组件）`),
      'warn',
    );
    return;
  }

  const generatedComponentPath = getGeneratedFilePath('component', options);

  let generatedStylePath;
  if (options.parent) {
    generatedStylePath = getParentFilePath('style', options);
  } else {
    generatedStylePath = getGeneratedFilePath('style', options);
  }

  const { componentTemplatePath, styleTemplatePath } = getTemplatePath();
  const { componentName, componentNamePascalCase } = getComponentName(options);

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

  if (options.parent) {
    const componentImportStatement = getComponentImportStatement(options);
    const parentComponentPath = getParentFilePath('component', options);

    api.injectImports(parentComponentPath, componentImportStatement);
  }
};

module.exports = componentGenerator;
