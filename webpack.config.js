var webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",
    entry: {
        app: ['webpack-dev-server/client?http://localhost:3000',
          'webpack/hot/only-dev-server',
          './index.js'
        ]
    },
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        publicPath: "/assets/"
    },
    plugins: [  
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            { test: /\.js$/, loaders: ["react-hot", "babel-loader"], include: __dirname + "/src" },
        ]
    }
}
