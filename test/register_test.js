"use strict";


const assert = require("assert").strict;
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const uuid = require("uuid-random");


test.describe("Path /register", function() {
    let browser;
    
    test.beforeEach(function(done) {
        this.timeout(10000);
        
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        browser.get("http://localhost:8080/#/register");
        
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        
        done();
    });

    test.it("Create a new account", function(done) {
        let email = `${uuid()}@test.com`;
        let emailElInput = browser.findElement(webdriver.By.id("email"));
        emailElInput.sendKeys(email);

        let passElInput = browser.findElement(webdriver.By.id("password"));
        passElInput.sendKeys("selenium");

        let formEl = browser.findElement(webdriver.By.className("form-layout"));
        formEl.submit();
        
        let msg = browser.wait(
            webdriver.until.elementLocated(
                webdriver.By.className("success-message")
            )
        , 5000);
        
        msg.getText().then(text => {
            assert.strictEqual(text, "Successfully registered a new user.");
        });
        
        done();
    });
});
