const { Given, When, Then } = require('cucumber')
const { LoginPage } = require('../page_object/login.page')
const { LandingPage } = require('../page_object/landing.page')
const { MarketMaintainance } = require('../page_object/MarketMaintainance.page');
const { OrderApproval } = require('../page_object/OrderApproval.page');
const { Report } = require('../page_object/Report.page');

const loginpage = new LoginPage();
const landingpage = new LandingPage();
const marketMaintainance = new MarketMaintainance();
const report = new Report();

Then('Navigate to {string} Report', async(_report) => {
    await loginpage.Dismiss_Card_SSA();
    await report.navigate_to_report____(_report);
});
Then('Verify No of records After removing all Filters', async() => {
    await report.verify_no_of_records_after_removing_filter();
});
Then('Verify select all Filter', async() => {
    await report.verify_select_all_filter();
});
Then('Verify DeSelect all Filter', async() => {
    await report.verify_DeSelect_all_filter();
});
Then('Verify InLine Filter', async() => {
    await report.verify_Inline_filter();
});
Then('Verify Filter tab', async() => {
    await report.Verify_filter_tab();
});
Then(`Remove All Filter`, async() => {
    await report.remove_all_filter();
});
Then(`Export as Excel`, async() => {
    await report.Export_Excel();
});
Then(`Export as PDF`, async() => {
    await report.Export_PDF();
});
Then(`Save Report`, async() => {
    await report.Save_report();
});

Then(`Send Report at Valid mail address`, async() => {
    await report.Send_valid_Email();
});
Then(`Send Report at invalid mail address`, async() => {
    await report.Send_Invalid_Email();
});
Then(`Verifiy Pagination`, async() => {
    await report.Verify_pagination();
});