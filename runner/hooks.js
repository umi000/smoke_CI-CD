const { BeforeAll, Before, AfterAll, After, Status } = require('cucumber')
const { chromium } = require('playwright');
const fs = require('fs')
var path = require('path');

const options = {
    headless: true,
    // headless: false,
    slowMo: 50,
    timeout: 60000,
};
// // Create a global browser for the test session.
BeforeAll(async() => {
    global.browser = await chromium.launch(options);
    global.context = await global.browser.newContext({});
    global.page = await global.context.newPage();
    await page.setDefaultNavigationTimeout(60000);
    // global.page2 = await global.context.newPage();
});

// // Create a fresh browser context for each test.
// // Before(async(scenario) => {
// //     global.context = await global.browser.newContext({
// //         recordVideo: {
// //             dir: 'videos/' + scenario.pickle.name,
// //         }
// //     });
// //     // global.page = await global.context.newPage();
// //     // await page.setDefaultNavigationTimeout(50000);
// //     // global.page2 = await global.context.newPage();
// // });
// // After(async(scenario) => {
// //     if (scenario.result.status === Status.FAILED) {
// //         const attach = this.attach; // cucumber's world object has attach function which should be used
// //         return browser.takeScreenshot().then(function(png) {
// //             const decodedImage = new Buffer(png, "base64");
// //             return attach(decodedImage, "image/png");
// //         });
// //     }
// // });

// // After(async function(scenario) {
// //     if (scenario.result.status === Status.FAILED) {
// //         const date = new Date();
// //         // var buffer = await global.page.screenshot({ path: `report/${scenario.pickle.name}.png`, fullPage: true })
// //         var buffer = await global.page.screenshot({ path: `report/image/${scenario.pickle.name + date.toISOString()}.png`, fullPage: true })
// //             // var buffer = await global.page.screenshot({ path: `report/image/${'abc'}.png`, fullPage: true })
// //         this.attach(buffer, 'png');
// //     }
// //     // await global.page.close();
// // });
// After(async() => {
//     await global.page.close();
//     // await global.page2.close();
//     // global.context.close();
// });
// After hook to capture screenshot on test failure
After(async function (testCase) {
  if (testCase.result.status === 'failed') {
    const screenshotPath = `./screenshots/${testCase.pickle.name.replace(/\s+/g, '_')}.png`;
    await this.browser.screenshot({ path: screenshotPath });
  }
});

// AfterAll hook to generate HTML report
AfterAll(() => {
  cucumberHtmlReporter.generate({
    theme: 'bootstrap',
    jsonFile: './report/cucumber-report.json',
    output: './report/cucumber-report.html',
    reportSuiteAsScenarios: true,
    launchReport: true,
  });
});

AfterAll(async() => {
    await global.page.close();
    await global.browser.close();
});
