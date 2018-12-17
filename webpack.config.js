const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    mode: "development",

    devtool: "source-map",

    devServer: {
        //contentBase: path.join(__dirname, 'dist'),
        // index: './examples/index.html',
        compress: true,
        port: 9000
    },

    entry: {
        viewportAction: "./src/index.js",
        examples: './examples/scripts/examples.js'
    },

    externals: /(xlsx|pdfmake|canvg)$/,

    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        chunkFilename: "[name].js"
    },

    module: {
        rules: [{
            test: /.js$/,
            enforce: "pre",
            use: ["source-map-loader"],
            exclude: /(pdfmake)$/
        }]
    },

    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './examples/index.html'
    })]
};