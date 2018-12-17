const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const plugins = [new CleanWebpackPlugin(['dist'])];

module.exports = (env, argv) => {

    const isDev = argv.mode === 'development';

    if (isDev) {

        plugins.push(new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './examples/index.html'
        }));
    }

    return {
        mode: argv.mode,

        devtool: 'source-map',

        devServer: {
            // contentBase: path.join(__dirname, 'dist'),
            // index: './examples/index.html',
            compress: true,
            port: 9000
        },

        entry: {
            viewportAction: './src/index.js',
            examples: './examples/scripts/examples.js'
        },

        output: {
            path: path.join(__dirname, 'dist'),
            filename: isDev ? '[name].js' : '[name].min.js'
        },

        module: {
            rules: [{
                test: /.js$/,
                enforce: 'pre',
                use: ['source-map-loader']
            }]
        },

        plugins: plugins
    };
}