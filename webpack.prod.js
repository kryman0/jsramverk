const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");


module.exports = merge.merge(common, {
    mode: "production",
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            PROD_URL: JSON.stringify("https://me-api.kryman.me")
        })
    ]
});
