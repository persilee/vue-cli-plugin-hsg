const path = require('path');

const getGeneratedFilePath = (fileType, options) => {
  /**
   * 文件生成规则
   *
   * 1. --component home
   *    -> src/home/home.vue
   *
   * 2. --component home-index
   *    -> src/home/index/home-index.vue
   *
   * 3. --component transfer-list --path transfer/index/components
   *    -> src/transfer/index/components/transfer-list.vue
   *
   * 4. --component transfer/index/components/transfer-list
   *    -> src/transfer/index/components/transfer-list.vue
   */

  let typeOption = fileType;

  if (fileType === 'style') {
    typeOption = 'component';
  }

  const { [typeOption]: fileName, path: filePath } = options;

  let fileFullName;

  switch (fileType) {
    case 'component':
      fileFullName = `${fileName}.vue`;
      break;
    case 'style':
      fileFullName = path.join('styles', `${fileName}.css`);
  }

  const fileNameArray = fileName.split('-');
  const isMultiWordsFile = fileNameArray.length > 1;

  let fileFullPath = [];

  if (filePath) {
    const filePathArray = filePath.split('/');
    fileFullPath = ['src', ...filePathArray, fileFullName];
  } else if (isMultiWordsFile) {
    fileFullPath = ['src', ...fileNameArray, fileFullName];
  } else {
    fileFullPath = ['src', fileName, fileFullName];
  }

  return path.join(...fileFullPath);
};

module.exports = { getGeneratedFilePath };
