const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge.merge(common, {
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "public"),
        watchContentBase: true,
        publicPath: "/public/",
    },
});
