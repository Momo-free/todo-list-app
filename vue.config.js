const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'docs',
  publicPath: '/todo-list-app/'
})
// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//     ? '/<todo-list-app>/'
//     : '/'
// }
