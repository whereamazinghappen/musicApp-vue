require('./check-versions')()
var crawer = require('./crawer')
var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => { },
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

//前端推荐歌单数据获取请求
app.get('/api/getRecommends', function (req, res) {
  crawer.getRecommends().then(function (value) {   
    res.json(value)
  }, function (err) {
    res.json(err)
  });
})
//前端新歌列表数据获取请求
app.get('/api/getNewSongs', function (req, res) {
  crawer.getNewSongs().then(function (value) {
    res.json(value)
  }).catch(function(err){
    res.json(err)
  })
})
//前端歌单列表数据获取请求
app.get('/api/getPlaylists', function (req, res) {
  crawer.getPlaylists().then(function (value) {
    res.json(value)
  }).catch(function(err){
    res.json(err)
  })
})
//前端热歌排行榜列表数据获取请求
app.get('/api/getHotranks', function (req, res) {
  crawer.getHotranks().then(function (value) {
    res.json({tracks:value.data.playlist.tracks,updatetime:value.data.playlist.updateTime})
  }).catch(function(err){
    res.json(err)
  })
})
//前端歌单详情数据获取请求
app.get('/api/getPlaylistsDetail', function (req, res) {
  let id =req.query.id;
  crawer.getPlaylistsDetail(id).then(function (value) {
    res.json(value)
  }).catch(function(err){
    res.json(err)
  })
})
//前端获取歌词数据获取请求
app.get('/api/getLrc', function (req, res) {
  let id =req.query.id;
  crawer.getLrc(id).then(function (value) {
    res.json(value)
  }).catch(function(err){
    res.json(err)
  })
})
// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
