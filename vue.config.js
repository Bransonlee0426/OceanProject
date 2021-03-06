module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
            @import "./src/assets/style/regular";
            @import "./src/assets/style/media";
          `,
      },
    },
  },
  devServer: {
    before: (app) => {
      app.set('etag', 'strong');
      app.use((req, res, next) => {
        res.set('Cache-Control', 'must-revalidate');
        next();
      });
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/OceanProject/'
    : '/',
};
