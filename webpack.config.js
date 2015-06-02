var webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",
    entry: {
        app: ['webpack-dev-server/client?http://localhost:3000',
          'webpack/hot/only-dev-server',
          './components/game-of-life.jsx'
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
            { test: /\.jsx$/, loaders: ["react-hot", "jsx-loader"] }
        ]
    }
}
