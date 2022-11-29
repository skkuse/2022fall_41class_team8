const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
  app.use(
		'/server',
		createProxyMiddleware({
			target: 'http://localhost:8000/',
			changeOrigin: true,
		})
	)
}
	