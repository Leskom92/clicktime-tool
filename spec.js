const {browser} = require("protractor");
const {expect} = require('chai');
const loginPage = require("./po/login_page");
const utils = require("./utils");
const dashboardPage = require("./po/dashboard_page");
const reportsPage = require("./po/reports_page");

describe('The user which generates a personal report', function () {

    it('should login to ClickTime', async function () {
        await browser.waitForAngularEnabled(false);
        await loginPage.get();
        await loginPage.login();

        //return expect(await dashboardLink.isPresent()).to.be.true;
        return expect(await browser.element(by.cssContainingText("div#navbar li a", "Dashboard")).isPresent()).to.be.true;
    });
    it('should navigate to Personal tab', async function () {
        //await browser.waitForAngularEnabled(true);
        await utils.elWaiter("div#primaryHeaderContainer");
        await dashboardPage.navigateToPersonal();

        return expect(await browser.getCurrentUrl()).to.include("/WeekEntry");
    });
    it('should navigate to My Reports tab and generate a report for the last month', async function () {
        await reportsPage.navigateToReports();
        await reportsPage.generateReport();
    });
    it('should log total hours', async function () {
        await reportsPage.logTotal();
    });

});
