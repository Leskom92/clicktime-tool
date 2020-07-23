const {ExpectedConditions: EC} = require("protractor");
const {getPageTimeout} = require("./timeouts.json");

const Utils = function () {

    this.elWaiter = async (selector) => {
        await browser.wait(
            EC.visibilityOf(browser.element(by.css(selector))),
            getPageTimeout,
            `${selector} is not visible`
        )
    }
};

module.exports = new Utils();
