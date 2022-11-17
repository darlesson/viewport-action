const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('node:path');

module.exports = (env, argv) => {

    const mode = argv.mode === 'development' ? argv.mode : 'production'
    const isDev = mode === 'development';
    const libraryName = 'viewportAction';

    // const plugins = [new CleanWebpackPlugin()];
    const plugins = [];

    const entry = {
        viewportAction: './src/index.ts'
    };

    if (isDev) {

        plugins.push(new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './examples/index.html'
        }));

        entry.examples = './examples/scripts/examples.js';
    }

    return {
        mode: mode,

        devtool: 'source-map',

        devServer: {
            contentBase: path.join(__dirname, 'examples'),
            index: './examples/index.html',
            compress: true,
            port: 9000
        },

        entry: entry,

        output: {
            path: path.join(__dirname, 'dist'),
            filename: isDev ? '[name].js' : '[name].min.js',
            library: libraryName,
            libraryExport: 'default',
            libraryTarget: 'umd',
            chunkLoadingGlobal: `${libraryName}_webpackChunkwebpack`
        },

        module: {
            rules: [{
                test: /\.ts(x?)$/,
                exclude: /(node_modules)/,
                include: path.resolve(__dirname, 'src'),
                loader: 'ts-loader'
            }, {
                test: /.js$/,
                enforce: 'pre',
                use: ['source-map-loader']
            }]
        },

        resolve: {
            extensions: ['.ts', '.js']
        },

        // plugins: plugins
    };
}