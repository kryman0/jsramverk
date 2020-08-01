const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");


module.exports = merge.merge(common, {        
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "public"),
        watchContentBase: true,
        publicPath: "/public/",        
    },
    plugins: [
        new webpack.DefinePlugin({            
            DEVELOPMENT: JSON.stringify(true),
            DEV_URL: JSON.stringify("http://localhost:5000")
        })
    ]
});
