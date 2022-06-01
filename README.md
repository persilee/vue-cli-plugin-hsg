# vue-cli-plugin-hsg 命令行工具

## 功能

- 自动生成组件文件
- 自动生成store文件
- 自动生成路由文件
- 自动生成view模块
- 自动在父模块导入子模块
- 自动在父模块的state中添加子模块的state
- 自动在父模块的module中添加子模块的module

## 安装

在终端执行如下命令

```bash
yarn add vue-cli-plugin-hsg -D

#or

npm install vue-cli-plugin-hsg -D
```

## 添加自定义命令

在终端执行如下命令，

```bash
vue invoke vue-cli-plugin-hsg
```

会在 `package.json` 文件中生成如下命令

```ba
"generate:component": "vue invoke vue-cli-plugin-hsg --component",
"gc": "vue invoke vue-cli-plugin-hsg --component",
"generate:store": "vue invoke vue-cli-plugin-hsg --store",
"gs": "vue invoke vue-cli-plugin-hsg --store",
"generate:view": "vue invoke vue-cli-plugin-hsg --view",
"gv": "vue invoke vue-cli-plugin-hsg --view"
```

`gc`、`gs`、`gv` 分别是生成组件、store、view模块的简写命令。

## 生成组件 Component

生成组件可以用 `generate:component` 或 `gc` 命令，如：

```bash
yarn gc -- child-component --path /views/accountSummary/components --parent /views/accountSummary/account-summary

#or

npm run gc -- child-component --path /views/accountSummary/components --parent /views/accountSummary/account-summary
```

以上命令会在 */views/accountSummary/components* 路径下生成 **child-component.vue** 组件，并且，会在 **account-summary** 父组件中自动导入子组件。

### gc命令参数

- path：为组件生成的路径
- parent：为父组件的路径，为了是自动在父组件中导入子组件

## 生成store模块

生成store模块可以用`generate:store` 或 `gs` 命令，如：

```bash
yarn gs -- history-query  --path views/accountManagement/transactionHistoryQuery

#or

npm run gs -- history-query  --path views/accountManagement/transactionHistoryQuery
```

以上命令会在 *views/accountManagement/transactionHistoryQuery* 目录下生成 **history-query.store.ts** 的store模块。

### gs命令参数

- path: 为store模块生成的路径
- parent：为父store模块的路径，会在父模块中导入子模块的 **state** 和 **module**
- module：为store模块的名字

## 生成view模块

生成一个view模块可以用 `generate:view` 或 `gv` 命令，如：

```bash
yarn gv -- history-query  --path views/accountManagement/transactionHistoryQuery

#or

npm run gv -- history-query  --path views/accountManagement/transactionHistoryQuery
```

以上命令会在 *views/accountManagement/transactionHistoryQuery* 目录上生成以下文件

```bash
└── transactionHistoryQuery/
    ├── history-query.routes.ts
    ├── history-query.store.ts
    ├── history-query.vue
    └── styles/
        └── history-query.css
```

生成的 **history-query.store.ts** 会自动在 **app/app.store.ts** 中导入，也会新增 **state** 和 **module** 。

### gv命令参数

- path(必填)：为view模块生成的路径
