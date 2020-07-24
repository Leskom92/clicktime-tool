const {browser, ExpectedConditions: EC} = require("protractor");
const {expect} = require("chai");
const utils = require("../utils");

const LoginPage = function () {
    const loginForm = "form#theform";
    const emailField = browser.element(by.css("input#email"));
    const passwordField = browser.element(by.css("input#password"));
    const loginButton = browser.element(by.css("button#loginbutton"));
    const errorMessage = browser.element(by.cssContainingText("#signinAlert p", "not recognized"));
    const userName = browser.params.login.email;
    const userPassword = browser.params.login.password


    this.get = async () => {
        await browser.get("https://login.clicktime.com/");
    };

    this.login = async () => {
        try {
            await utils.elWaiter(loginForm);
            await emailField.sendKeys(userName);
            await passwordField.sendKeys(userPassword);
            //TODO: remove temp
            console.log(userName);
            console.log(userPassword);
            await loginButton.click();

            return expect(await errorMessage.isPresent()).to.be.false;

        } catch (e) {
            throw new Error(`Login is failed. Error: ${e}`)
        }
    };
};
module.exports = new LoginPage();
