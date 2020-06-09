const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        alias: {
            vue$: path.resolve(__dirname, "./node_modules/vue/dist/vue.esm.js"),
        },
    },
};
