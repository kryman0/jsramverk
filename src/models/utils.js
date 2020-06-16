const Utils = {
    localhost: {
        port: 5000,
        url: "http://localhost",
    },
    localhostFullUrl: function () {
        return this.localhost.url + ":" + this.localhost.port;
    },
};

module.exports = Utils;
