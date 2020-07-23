const utils = require("../utils");

const DashboardPage = function () {
    const personalLink = browser.element(by.css("div#PersonalTab_Link a"));

    this.navigateToPersonal = async () => {
        await personalLink.click();
        await utils.elWaiter("div#WeekEntry");
    };

};

module.exports = new DashboardPage();
