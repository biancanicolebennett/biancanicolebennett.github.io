var webpack = require("webpack");
var config = Object.assign({}, require("./webpack.config.js"));

config.plugins.push(new webpack.optimize.UglifyJsPlugin());
config.postcss.push(require("cssnano")());

module.exports = config