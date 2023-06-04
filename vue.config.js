module.exports = {
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: "dist",
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: "",
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: true,
  /* webpack-dev-server 相关配置 */
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: "0.0.0.0",
    port: 8090,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        /* 目标代理服务器地址 */
        changeOrigin: true,
        /* 允许跨域 */
        pathRewrite: {
          "^/api": "/xboot" /*重新改写地址，原请求地址不含/api,所以替换为""*/ ,
        },
      },
      "/mode": {
        target: "http://121.36.210.0:8092/publishdata/web3D/01qxsy/wuda/whdx",
        /* 目标代理服务器地址 */
        changeOrigin: true,
        /* 允许跨域 */
        pathRewrite: {
          "^/mode": "" /*重新改写地址，原请求地址不含/api,所以替换为""*/ ,
        },
      },
      "/dahua": {
        target: "https://101.71.254.163:49582",
        /* 目标代理服务器地址 */
        changeOrigin: true,
        /* 允许跨域 */
        pathRewrite: {
          "^/dahua": "" /*重新改写地址，原请求地址不含/api,所以替换为""*/ ,
        },
      },
      // geoserver的wfs服务代理
      "/geoserver_wfs": {
        target: "http://121.36.210.0:8060/",
        changeOrigin: true,
        pathRewrite: {
          "^/geoserver_wfs": "" /*重新改写地址，原请求地址不含/api,所以替换为""*/ ,
        },
      }
    },
  },
  css: {
    // 启用 CSS modules
    requireModuleExtension: true,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      // 导入scss变量
      // scss: {
      //  prependData: `@import "@/assets/variable.scss";`
      // },
      postcss: {
        plugins: [
          //remUnit这个配置项的数值是多少呢？？？ 通常我们是根据设计图来定这个值，原因很简单，便于开发。
          //假如设计图给的宽度是750，我们通常就会把remUnit设置为75，这样我们写样式时，可以直接按照设计图标注的宽高来1:1还原开发。
          require('postcss-px2rem')({
            remUnit: 16
          }), // 换算的基数
        ]
      }
    }
  },
};