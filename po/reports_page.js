const utils = require("../utils");
const fs = require("fs-extra");

const ReportsPage = function () {
    const reportButton = browser.element(by.css("input.reportButton"))
    const rangeFilter = browser.element(by.css("select#range"));
    //TODO: change to mtd for debug
    const lastMonth = browser.element(by.css("select#range")).element(by.css("option[value=\"mtd\"]"));
    const totalHours = browser.element(by.css(".grandTotal td:nth-child(even)"));

    this.get = async () => {
        await browser.get("https://rpt.clicktime.com/Reports/ReportInput.asp?ReportID=63&submit=Run+Report");
    };

    this.generateReport = async () => {
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
            console.log(userData);
            await fs.writeJson("./totalHours.json", {userData}, {spaces: '\t'})
        }
    };
};

module.exports = new ReportsPage();
