const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    app.use(proxy(['/api', '/auth/google'], { target:  process.env.PORT || 'http://localhost:4000' }))};