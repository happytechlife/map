const path = require('path');
const nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const rules = [
    {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: [{
            loader: 'ts-loader',
            options: { transpileOnly: true }
        }]
    },
    {
        test: /\.css?$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader'] })
    },
    {
        test: /\.md$/,
        use: [{ loader: "raw-loader" }]
    }
];

const resolve = {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", '.css', '.md'],
};



module.exports = function (env, argv) {
    console.log(env);
    const mode = env.mode;
    const devtool = mode === 'production' ? 'source-map' : 'cheap-module-eval-source-map';
    const pathinfo = mode === 'development';

    const outputPath = path.resolve(process.cwd(), 'build');

    var browserConfig = {
        entry: './src/index.tsx',
        output: {
            path: outputPath,
            pathinfo,
            filename: 'client/bundle.js',
            publicPath: '/'
        },
        resolve,
        devtool,
        module: {
            rules
        },
        plugins: [
            new webpack.DefinePlugin({
                __isBrowser__: "true"
            }),
            new ExtractTextPlugin("client/styles.css")
        ],
        mode
    };

    var serverConfig = {
        mode,
        entry: './src/server/index.tsx',
        target: 'node',
        // externals: [nodeExternals()],
        output: {
            path: outputPath,
            pathinfo,
            filename: 'server/index.js',
            publicPath: '/'
        },
        resolve,
        devtool,
        module: {
            rules
        },
        plugins: [
            new webpack.DefinePlugin({
                __isBrowser__: "false"
            }),
            new ExtractTextPlugin("server/styles.css")
        ]
    };
    return [browserConfig, serverConfig];
    // return [browserConfig];
};

// module.exports = function (env, argv) {
//     // { 'google': 'window.google' }
//     const externals = env.platform === 'server' ? [nodeExternals()] : [];
//     // default to the server configuration
//     const base = {
//         entry: './src/server/index.ts',
//         output: {
//             filename: 'js/server.js',
//             // path needs to be an ABSOLUTE file path
//             path: path.resolve(process.cwd(), 'build'),
//             publicPath: '/',
//         },
//         // Enable sourcemaps for debugging webpack's output.
//         devtool: 'cheap-module-eval-source-map',
//         resolve: {
//             // Add '.ts' and '.tsx' as resolvable extensions.
//             extensions: [".ts", ".tsx", ".js", ".json"],
//         },
//         node: {
//             fs: 'empty',
//             readline: 'empty',
//             child_process: 'empty'
//         },
//         externals: externals,
//         module: {
//             rules: [
//                 // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
//                 {
//                     test: /\.(ts|tsx)?$/,
//                     exclude: /node_modules/,
//                     use: [{
//                         loader: 'ts-loader',
//                         options: { transpileOnly: true }
//                     }]
//                 },
//                 {
//                     test: /\.css?$/,
//                     exclude: /node_modules/,
//                     use: [{
//                         loader: 'css-loader'
//                     }]
//                 },
//             ]
//         },
//     }
//     // server-specific configuration
//     if (env.platform === 'server') {
//         base.target = 'node';
//     }
//     // client-specific configurations
//     if (env.platform === 'web') {
//         base.entry = './src/App.tsx';
//         base.output.filename = 'js/client.js';
//     }
//     return base;
// }