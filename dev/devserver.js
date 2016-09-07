var path = require("path");
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require("./webpack.config.js");


var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  contentBase: path.resolve(__dirname, ".."),
  stats: { colors: true }
});

server.listen(8080, "localhost", function (err, result) {
    if (err) console.log(err);
    console.log('Listening at localhost:8080');
});