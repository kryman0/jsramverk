"use strict";

const assert = require("assert").strict;
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const TestUtils = require("../src/models/TestUtils.js");


test.describe("Create a new report", function() {
    let browser;

    
    test.before(function(done) {
        this.timeout(10000);


        browser = TestUtils.getWebdriverWithPredefOpts();

        
        done();
    });

    test.after(function(done) {
        browser.quit();


        done();
    });
    
    
    test.describe("POST /Login", function() {
        test.it("Trying to log in", function(done) {
            browser.get(TestUtils.url + "/login");

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

    test.describe("POST /reports", function() {
        test.it("Create a new report", function(done) {
            browser.get(TestUtils.url + "/reports");

            
            let btnElAddRep = browser.findElement(webdriver.By.className("btn-add-report"));
            btnElAddRep.click();

            let titleElInp = browser.findElement(webdriver.By.id("title"));
            titleElInp.sendKeys("Selenium");

            let textElTextAr = browser.findElement(webdriver.By.id("text"));
            textElTextAr.sendKeys(
                "This report has been created by Selenium."
            );

            let weekElInp = browser.findElement(webdriver.By.id("week"));
            weekElInp.sendKeys(8);

            let formEl = browser.findElement(webdriver.By.css("form"));
            formEl.submit();

            let reportMsg = browser.wait(
                webdriver.until.alertIsPresent()
            , 5000
            );

            reportMsg.then(msg => {
                msg.getText().then(text => {
                    assert.strictEqual(text, "You have created a new report!");
                });
            });

            done();
        });
    });
});
