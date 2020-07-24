const utils = require("../utils");
const fs = require('fs-extra');

const ReportsPage = function () {
    const myReportsLink = browser.element(by.css("#MyReports_Link a"));
    const runReportButton = browser.element(by.css("input.RunReportButton"));
    const reportButton = browser.element(by.css("input.reportButton"))
    const rangeFilter = browser.element(by.css("select#range"));
    //TODO: change to mtd for debug
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
        if (!await totalHours.isPresent()) {
            console.log("There are no reported hours for the last month")
            const userData = {
                "Email": browser.params.login.email,
                "Total Hours": 0
            };
            await fs.writeJson("./totalHours.json", {userData}, {spaces: '\t'})
        } else {
            const getTotal = await totalHours.getText();
            const userData = {
                "Email": browser.params.login.email,
                "Total Hours": getTotal
            };
            await fs.writeJson("./totalHours.json", {userData}, {spaces: '\t'})
        }
    };

    this.logTotal = async () => {
        const getTotal = await totalHours.getText();
        const userData = {
            "Email": browser.params.login.email,
            "Total Hours": getTotal
        };
        await fs.writeJson("./totalHours.json", {userData}, {spaces: '\t'})
    };




};

module.exports = new ReportsPage();
