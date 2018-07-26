/**
 * node app
 */
'use strict'

const Koa = require('koa')
const app = new Koa()

const body = ctx => {
  if (ctx.request.path !== '/') {
    ctx.response.type = 'html'
    ctx.response.body = `<a href='/'>Go to hello wolrd</a>`
  } else {
    ctx.response.body = 'Hello, world!'
  }
}

app.use(body)
app.listen(3000)