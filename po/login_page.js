const {browser, ExpectedConditions: EC} = require("protractor");
const utils = require("../utils");
const userData = require("../accounts.json");

const LoginPage = function () {

    const loginForm = "form#theform";
    const emailField = browser.element(by.css("input#email"));
    const passwordField = browser.element(by.css("input#password"));
    const loginButton = browser.element(by.css("button#loginbutton"));

    this.get = async () => {
        await browser.get("https://login.clicktime.com/");
    };

    this.login = async () => {
        try {
            await utils.elWaiter(loginForm);
            await emailField.sendKeys(userData.email);
            await passwordField.sendKeys(userData.password);
            await loginButton.click();
        } catch (e) {
            throw new Error(`Login is failed. Error: ${e}`)
        }
    };
};
module.exports = new LoginPage();
