const  webpack = require('webpack')
const  path = require('path')
const  fs = require('fs')
const  nodeModules = {}
const  env = process.env

fs.readdirSync('node_modules').filter(function (x) {
  return ['.bin'].indexOf(x) === -1
}).forEach(function (mod) {
  nodeModules[mod] = 'commonjs ' + mod
})
module.exports = {
  // devtool: 'source-map',
  entry: [
    './app.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  target: 'node',
  externals: nodeModules,
  context: __dirname,
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /.css$/,
        resourceQuery: /inline/,
        use: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  optimization: {
    minimize: false
  }
}
