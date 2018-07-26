/**
 * node app
 */
'use strict'

const Koa = require('koa')
const app = new Koa()

const route = require('koa-route')
const path = require('path')
const serve = require('koa-static')

const _static = serve(path.join(__dirname))
app.use(_static)

const logger = async (ctx, next) => {
  let start = Date.now()
  await next()
  let end = new Date()
  let duration = end.getTime() - start
  let d_s = `${end.getFullYear()}-` +
    `${end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1): end.getMonth() + 1}` +
    `-${end.getDate()} ` +
    `${end.getHours() < 10 ? '0' + end.getHours() : end.getHours()}:` +
    `${end.getMinutes() < 10 ? '0' + end.getMinutes() : end.getMinutes()}:` +
    `${end.getSeconds() < 10 ? '0' + end.getSeconds() : end.getSeconds()}`
  console.log(`[${d_s}]: ${ctx.request.method} ${ctx.request.url}` +
    ` - ${ctx.response.status} - ${duration}ms`)
}

app.use(logger)

const redirect = ctx => {
  ctx.response.redirect('/')
  ctx.response.body = `<a href="/">Index Page</a>`
}

app.use(route.get('/redirect', redirect))

const about = ctx => {
  ctx.response.type = 'html'
  ctx.response.body = `<a href='/'>Go to hello wolrd</a>`
}
const main = ctx => {
  const n = Number(ctx.cookies.get('view') || 0) + 1
  ctx.cookies.set('view', n)
  ctx.response.body = `第${n}次访问次页面， Hello, World!`
}

const handler = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.response.status = error.statusCode || err.status || 500
    ctx.response.body = {
      message: error.message
    }
    ctx.app.emit('error', err, ctx)
  }
}

app.use(handler)

app.use(route.get('/about', about))
app.use(route.get('/', main))

app.on('error', (err) =>
  console.error('server error', err)
)

app.listen(3000)