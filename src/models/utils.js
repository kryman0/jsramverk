const Utils = {
    localhost: {
        port: 5000,
        url: "http://localhost",
    },
    localhostFullUrl: function () {
        return this.localhost.url + ":" + this.localhost.port;
    },
    messages: {
        error: "Something went wrong from frontend!",
        login: "You have successfully logged in!",
    },
    token: null,
    user: {
        email: null
    },
    url: typeof DEVELOPMENT !== "undefined" ? DEV_URL : PROD_URL
};


module.exports = Utils;
