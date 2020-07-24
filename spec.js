const {browser} = require("protractor");
const utils = require("./utils");
const loginPage = require("./po/login_page");
const reportsPage = require("./po/reports_page");

describe('The user with ClickTime account', function () {
    it('generates a report', async function () {
        await browser.waitForAngularEnabled(false);
        // open the login form
        await loginPage.get();
        // perform login
        await loginPage.login();
        // wait for header visibility
        await utils.elWaiter("div#primaryHeaderContainer");
        // open My Reports > Task Summary page
        await reportsPage.get();
        // wait for Run Report button visibility
        await utils.elWaiter("input.reportButton");
        // generate report
        await reportsPage.generateReport();
    });
});
