const utils = require("../utils");
const userData = require("../accounts.json");

const ReportsPage = function () {
    const myReportsLink = browser.element(by.css("#MyReports_Link a"));
    const runReportButton = browser.element(by.css("input.RunReportButton"));
    const reportButton = browser.element(by.css("input.reportButton"))
    const rangeFilter = browser.element(by.css("select#range"));
    //TODO: change to lm
    const lastMonth = browser.element(by.css("select#range")).element(by.css("option[value=\"lm\"]"));
    const totalHours = browser.element(by.css(".grandTotal td:nth-child(even)"));
    const reportSummaryOption = browser.element(by.css("input#Radio4"));

    this.navigateToReports = async () => {
        await myReportsLink.click();
        await utils.elWaiter("input.RunReportButton");
    };

    this.generateReport = async () => {
        await reportSummaryOption.click();
        await runReportButton.click();
        await utils.elWaiter("select#range");
        await rangeFilter.click();
        await lastMonth.click();
        await reportButton.click();
        try {
            await utils.elWaiter(".grandTotal td:nth-child(even)");
        } catch (e) {
            throw new Error (`There is no reported hours for the last month. Error: ${e}`);
        }
    };

    this.getTotal = async () => {
        const hours = await totalHours.getText();
    }

    this.logTotal = async () => {
        const getTotal = await totalHours.getText();
        const rows = [
            userData.email,
            getTotal
        ];
        console.log(rows);
    };



};

module.exports = new ReportsPage();
