const webpack = require("webpack"),
    path = require("path"),
    cleanWebpackPlugin = require("clean-webpack-plugin"),
    extractPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: [
            './src/js/app.js', './src/scss/app.scss'
        ],
        details: [
            './src/js/details.js'
        ]

    },
    output:{
        path : path.resolve(__dirname,'dist/js'),
        filename : '[name].bundle.js',
        publicPath: '/build/'
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: extractPlugin.extract(['css-loader?url=false','sass-loader'])
        }]
    },
    plugins : [
        new cleanWebpackPlugin('[dist/js]'),
        new extractPlugin({
            filename:'../css/app.css',
            allChunks: true
        })
    ]
};



// module.exports = {
//     entry: ['./src/js/app.js', './src/scss/app.scss'],
//     output:{
//         path : path.resolve(__dirname,'dist/js'),
//         filename : 'app.bundle.js',
//         publicPath: '/build/'
//     },
//     plugins : [
//         new cleanWebpackPlugin('[dist/js]'),
//         new extractPlugin({
//             filename:'../css/app.css',
//             allChunks: true
//         })
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /(node_modules|bower_components)/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['env']
//                     }
//                 }
//             },
//             {
//                 test: /\.scss$/,
//                 loader: extractPlugin.extract(['css-loader?url=false','sass-loader'])
//             }
//         ]
//     }
// };
