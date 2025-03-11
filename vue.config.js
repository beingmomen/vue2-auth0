module.exports = {
  // احتفظ بالمصادر المصدرية في الإنتاج للتصحيح
  productionSourceMap: false,
  
  // تكوين webpack
  configureWebpack: {
    // تحسينات للإنتاج
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  
  // تكوين PWA إذا كنت ترغب في استخدامه
  pwa: {
    name: 'تطبيق Vue2 مع Auth0',
    themeColor: '#42b983',
    msTileColor: '#42b983',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black'
  },
  
  // تكوين أساسي
  publicPath: '/'
}
