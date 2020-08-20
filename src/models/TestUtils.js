const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");


const TestUtils = {
    url: typeof process.env.JWT_SECRET !== "undefined" 
        ? "http://localhost:8080/#" 
        : "https://kryman.me/#"
    ,
    getWebdriverWithPredefOpts: function() {
        return new webdriver.Builder()
            .forBrowser("chrome")
            .setChromeOptions(
                new chrome.Options()
                    .headless()
                    .addArguments("--no-sandbox")
            )            
            .build();
    },
}

module.exports = TestUtils;
