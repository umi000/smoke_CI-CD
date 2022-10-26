const reporter = require("cucumber-html-reporter")
const options = {
    theme: 'bootstrap',
    jsonFile: 'report/report.json',
    output: 'report/cucumber-html-report.html',
    reportSuiteAsScenaros: true,
    launchReport: true,
}
reporter.generate(options)

// --npm install cucumber-html-report-generator