const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {


                            localIdentName: "[name]_[local]_[hash:base64:5]",
                            sourceMap: true,
                            minimize: true,
                            import:true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [htmlWebpackPlugin]
};