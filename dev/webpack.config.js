var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var srcPath = path.resolve(__dirname, "..", "src");
var buildPath = path.resolve(__dirname, "..", "build");

var extractCSS = new ExtractTextPlugin("main.css");

module.exports = {
    entry: path.resolve(srcPath, "main.ts"),
    output: {
        path: buildPath,
        filename: "main.js"
    },
    target: "web",
    colors: true,
    progress: true,
    resolve: {
        root: [ srcPath ],
        extensions: [ "", ".js", ".ts" ]
    },
    module: {
        loaders: [{
                test: /\.ts$/,
                loader: "ts-loader",
                include: srcPath
            }, {
                test: /\.css$/,
                loader: extractCSS.extract('style', 'css-loader!postcss-loader'),
                include: srcPath
            }]
    },
    plugins: [
        extractCSS,
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    node: {
        fs: "empty"
    },
    postcss: function () {
        return [
            require('postcss-import')(),
            require('postcss-cssnext')()
        ];
    }
};