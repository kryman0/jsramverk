const Utils = {
    localhost: {
        port: 5000,
        url: "http://localhost",
    },
    localhostFullUrl: function () {
        return this.localhost.url + ":" + this.localhost.port;
    },
    messages: {
        error: "Something went wrong!",
        login: "You have successfully logged in!",
    },
    token: null,
    user: {
        email: null
    }
};


module.exports = Utils;
