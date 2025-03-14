const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'docs',
  publicPath: '/ToDoList/'
})
// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//     ? '/<todo-list-app>/'
//     : '/'
// }
