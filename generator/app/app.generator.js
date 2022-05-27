const appGenerator = (api, options) => {
  api.extendPackage({
    scripts: {
      'generate:component': 'vue invoke vue-cli-plugin-hsg --component',
      'generate:view': 'vue invoke vue-cli-plugin-hsg --view',
      'generate:store': 'vue invoke vue-cli-plugin-hsg --store',
      'generate:store:state': 'vue invoke vue-cli-plugin-hsg --storeState',
      gc: 'vue invoke vue-cli-plugin-hsg --component',
      gs: 'vue invoke vue-cli-plugin-hsg --store',
      gss: 'vue invoke vue-cli-plugin-hsg --storeState',
      gv: 'vue invoke vue-cli-plugin-hsg --view',
    },
  });
};

module.exports = appGenerator;
