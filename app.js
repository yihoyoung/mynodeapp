/**
 * node app
 */
'use strict'

const Koa = require('koa')
const app = new Koa()

const route = require('koa-route')

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