const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('node:path');

module.exports = (env, argv) => {

    const mode = argv.mode === 'development' ? argv.mode : 'production'
    const isDev = mode === 'development';
    const libraryName = 'viewportAction';

    const plugins = [];

    const entry = {
        viewportAction: './src/index.ts'
    };

    if (isDev) {

        const pages = ['index', 'basic'];

        pages.forEach((page) => {
            plugins.push(new HtmlWebpackPlugin({
                filename: `${page}.html`,
                template: `./examples/${page}.html`
            }));

            entry[page] = `./examples/scripts/${page}.js`;
        });

        plugins.concat(plugins);
    }

    return {
        mode: mode,

        devtool: 'source-map',

        devServer: {
            static: {
                directory: path.join(__dirname, 'examples')
            },
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

        plugins: plugins
    };
}