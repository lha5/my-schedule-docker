const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/my-schedule',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_URI}`,
      changeOrigin: true,
    })
  );
}
