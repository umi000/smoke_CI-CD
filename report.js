const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: 'report/report.json',
    reportPath: 'report/cucumber-html-report.html',
    metadata: {
        browser: {
            name: 'chrome',
            version: '60'
        },
        device: 'Local test machine',
        platform: {
            name: 'ubuntu',
            version: '16.04'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            { label: 'Project', value: 'Custom project' },
            { label: 'Release', value: '1.2.3' },
            { label: 'Cycle', value: 'B11221.34321' },
            { label: 'Execution Start Time', value: 'Nov 19th 2017, 02:31 PM EST' },
            { label: 'Execution End Time', value: 'Nov 19th 2017, 02:56 PM EST' }
        ]
    }
});

// const reporter = require("cucumber-html-reporter")
// const options = {
//     theme: 'bootstrap',
//     jsonFile: 'report/report.json',
//     output: 'report/cucumber-html-report.html',
//     reportSuiteAsScenaros: true,
//     launchReport: true,
// }
// reporter.generate(options)

// // --npm install cucumber-html-report-generator