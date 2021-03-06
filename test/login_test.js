"use strict";


const assert = require("assert").strict;
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const TestUtils = require("../src/models/TestUtils.js");


test.describe("Path /login", function() {
    let browser;
    

    test.beforeEach(function(done) {
        this.timeout(10000);

        
        browser = TestUtils.getWebdriverWithPredefOpts();
        
        browser.get(TestUtils.url + "/login");

        done();
    });

    test.afterEach(function(done) {
        browser.quit();

        done();
    });

    test.it("Trying to log in", function(done) {
        let emailElInp = browser.findElement(webdriver.By.id("email"));
        emailElInp.sendKeys("test@test.com");

        let passwdElInp = browser.findElement(webdriver.By.id("password"));
        passwdElInp.sendKeys("test");

        let formEl = browser.findElement(webdriver.By.className("form-layout"));
        formEl.submit();

        let loginMsg = browser.wait(
            webdriver.until.elementLocated(
                webdriver.By.className("success-message")
            )
        , 5000
        );

        loginMsg.getText().then(text => {
            assert.strictEqual(text, "You have successfully logged in!");
        });
        
        done();
    });
});
