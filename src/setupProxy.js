const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
    app.use( 
        createProxyMiddleware("/api", {
            target: "https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/",
            changeOrigin: true
        })
    );

    app.use( 
        createProxyMiddleware("/user", {
            target: "https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/",
            changeOrigin: true
        })
    );

};