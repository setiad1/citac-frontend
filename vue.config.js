const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      title: 'CITAC Extension',
    },
  },
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/ext/'
    : '/'
})
