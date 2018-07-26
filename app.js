/**
 * node app
 */
'use strict'

const Koa = require('koa')
const app = new Koa()

const body = ctx => {
  ctx.response.body = 'Hello, World!'
}

app.use(body)
app.listen(3000)