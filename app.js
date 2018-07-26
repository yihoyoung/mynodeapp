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

const logger = (ctx, next) => {
  let start = Date.now()
  next()
  let end = new Date()
  let duration = end.getTime() - start
  let d_s = `${end.getFullYear()}-` +
    `${end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1): end.getMonth() + 1}` +
    `-${end.getDate()} ` +
    `${end.getHours() < 10 ? '0' + end.getHours() : end.getHours()}:` +
    `${end.getMinutes() < 10 ? '0' + end.getMinutes(): end.getMinutes()}:` +
    `${end.getSeconds() < 10 ? '0' + end.getSeconds(): end.getSeconds()}`
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
  ctx.response.body = 'Hello, world!'
}

app.use(route.get('/about', about))
app.use(route.get('/', main))



app.listen(3000)