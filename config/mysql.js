const env = process.env
// console.log(JSON.stringify(env))
module.exports = {
  DATABASE: 'blog',
  USERNAME: 'root',
  PASSWORD: '12345',
  PORT: '3306',
  HOST: process.env.DBHOST_PORT_3306_TCP_ADDR || 'localhost'
}