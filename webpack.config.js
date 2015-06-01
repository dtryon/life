module.exports = {
    context: __dirname + "/src",
    entry: "./components/game-of-life.jsx",
    output: {
        path: __dirname + "/src/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: "jsx-loader" }
        ]
    }
}
