// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },
      scss: {}
    }
  },
  chainWebpack: config => {
    config.module
      .rule("stylus-loader")
      .test(/\.styl$/)
      .use("stylus-loader")
      .loader("stylus-loader")
      .end();
  }
};
