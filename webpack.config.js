module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "./docs/assets/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["env"]
                }
            }, {
                test: /\.csv/,
                loader: "dsv-loader"
            }
        ]
    },
    devServer: {
        contentBase: "./docs",
        hot: true
    }
}