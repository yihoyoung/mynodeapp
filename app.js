/**
 * node app
 */
'use strict'

const Koa = require('koa')
const app = new Koa()

const path = require('path')
const bodyParser = require('koa-bodyparser');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./config/server.js');
const mysqlConfig = require('./config/mysql.js');
const views = require('koa-views')
const staticCache = require('koa-static-cache')


// set home dirname
global.__home_dir = __dirname

// session存储配置
const sessionMysqlConfig = {
  user: mysqlConfig.USERNAME,
  password: mysqlConfig.PASSWORD,
  database: mysqlConfig.DATABASE,
  host: mysqlConfig.HOST,
}

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))

// 静态文件

const logger = async (ctx, next) => {
  const start = Date.now()
  const end = new Date()
  const duration = end.getTime() - start
  const d_s = `${end.getFullYear()}-` +
  `${end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1): end.getMonth() + 1}` +
  `-${end.getDate()} ` +
  `${end.getHours() < 10 ? '0' + end.getHours() : end.getHours()}:` +
  `${end.getMinutes() < 10 ? '0' + end.getMinutes() : end.getMinutes()}:` +
  `${end.getSeconds() < 10 ? '0' + end.getSeconds() : end.getSeconds()}`
  console.log(`[${d_s}]: ${ctx.request.method} ${ctx.request.url}` +
  ` - ${ctx.response.status} - ${duration}ms`)
  await next()
}
app.use(logger)

app.use(staticCache(path.join(__dirname, './public'), { dynamic: true }, {
  maxAge: 365 * 24 * 60 * 60
}))
app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
  maxAge: 365 * 24 * 60 * 60
}))
  
// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// 解析 body
app.use(bodyParser({
  formLimit: '1mb'
}))

//  路由
app.use(require('./routers/signin.js').routes())
app.use(require('./routers/signup.js').routes())
app.use(require('./routers/posts.js').routes())
app.use(require('./routers/signout.js').routes())


app.on('error', (err) =>
  console.error('server error', err)
)

app.listen(config.PORT)
console.log(`listening in port ${config.PORT}`)