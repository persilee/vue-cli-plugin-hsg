const path = require('path');
const { last, startCase, camelCase } = require('lodash');

/**
 * 生成文件存放路径
 *
 * @param {*} fileType
 * @param {*} options
 * @return {*}
 */
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

  console.log('fileType:', fileType);

  if (fileType === 'style' && !options.view) {
    typeOption = 'component';
  } else if (options.view) {
    typeOption = 'view';
  }

  const { [typeOption]: fileName, path: filePath } = options;

  const fileNameArray = fileName.split('-');
  const filePathNameArray = fileName.split('/');
  const isFileWithPath = filePathNameArray.length > 1;
  const isMultiWordsFile = fileNameArray.length > 1 && !isFileWithPath;

  if (isFileWithPath) {
    fileName = last(filePathNameArray);
  }

  let fileFullName;

  switch (fileType) {
    case 'component':
      fileFullName = `${fileName}.vue`;
      break;
    case 'style':
      fileFullName = path.join('styles', `${fileName}.css`);
      break;
    case 'store':
      fileFullName = `${fileName}.store.ts`;
      break;
    case 'routes':
      fileFullName = `${fileName}.routes.ts`;
      break;
  }

  let fileFullPath = [];

  if (isFileWithPath) {
    filePathNameArray.pop();
    fileFullPath = ['src', ...filePathNameArray, fileFullName];
  } else if (filePath) {
    const filePathArray = filePath.split('/');
    fileFullPath = ['src', ...filePathArray, fileFullName];
  } else if (isMultiWordsFile) {
    fileFullPath = ['src', ...fileNameArray, fileFullName];
  } else {
    fileFullPath = ['src', fileName, fileFullName];
  }

  return path.join(...fileFullPath);
};

/**
 * 生成parent的路径
 *
 * @param {*} fileType
 * @param {*} options
 * @return {*}
 */
const getParentFilePath = (fileType, options) => {
  if (options.view) {
    options.parent = 'app/app';
  }
  let { parent, component: fileName } = options;
  let fileExtension = '';

  switch (fileType) {
    case 'component':
      fileExtension = '.vue';
      break;
    case 'style':
      fileExtension = '.css';
      fileName = fileName + '.css';
      break;
    case 'store':
      fileExtension = '.store.ts';
      break;
  }

  let parentFilePath = [];
  const parentArray = parent.split('/');
  const parentFileName = last(parentArray) + fileExtension;

  if (parentArray.length > 1) {
    parentArray.pop();
    parentFilePath = ['src', ...parentArray, parentFileName];
    if (fileType === 'style') {
      parentFilePath = ['src', ...parentArray, 'styles', fileName];
    }
  } else {
    parentFilePath = ['src', parent, parentFileName];
  }

  return path.join(...parentFilePath);
};

/**
 * 取parent路径的最后一个单词为名字
 *
 * @param {*} options
 * @return {*}
 */
const getParentName = (options) => {
  return last(options.parent.split('/'));
};

/**
 * 生成 import 的路径
 *
 * @param {*} fileType
 * @param {*} options
 * @return {*}
 */
const getParentImportPath = (fileType, options) => {
  const { [fileType]: fileName, path: filePath } = options;

  let fileFullName;

  switch (fileType) {
    case 'component':
      fileFullName = fileName;
      break;
    case 'store':
      fileFullName = `${fileName}.store`;
      break;
  }

  const fileNameArray = fileName.split('-');
  const isMultiWordsFile = fileNameArray.length > 1;

  let fileImportPath = [];

  if (filePath) {
    const filePathArray = filePath.split('/');
    fileImportPath = ['@', ...filePathArray, fileFullName];
  } else if (isMultiWordsFile) {
    fileImportPath = ['@', ...fileNameArray, fileFullName];
  } else {
    fileImportPath = ['@', fileName, fileFullName];
  }

  return fileImportPath.join('/');
};

/**
 * 获取文件内容
 *
 * @param {*} filePath
 * @param {*} api
 * @return {*}
 */
const getProjectFileContent = (filePath, api) => {
  const file = api.generator.files[filePath];
  return file.split(/\r?\n/g);
};

/**
 * 在文件里插入内容
 *
 * @param {*} [options={}]
 * @return {*}
 */
const insertFileContent = (options = {}) => {
  const { fileContent, find, insert } = options;
  const lineIndex = fileContent.findIndex((line) => line.match(RegExp(find)));

  if (Array.isArray(insert)) {
    fileContent.splice(lineIndex + 1, 0, ...insert);
  } else {
    fileContent.splice(lineIndex + 1, 0, insert);
  }

  return fileContent;
};

module.exports = {
  getGeneratedFilePath,
  getParentFilePath,
  getParentName,
  getParentImportPath,
  getProjectFileContent,
  insertFileContent,
};
