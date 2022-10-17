
    
# Playwright with CucumberJS
    
Playwright end-to-end test automation with CucumberJS
    
## Getting Started 

* open VS code or any ide
* ctrl + shift + ` ==> open new terminal`
* move in branch QA-39 ```git checkout QA-39```
* Download the git repository using
* write command ```git clone 'https://github.com/ticketmanager/QAutomation.git```


* To install Playwright : `npm install playwright --save-dev`
* To install Cucumber   : `npm install cucumber --save-dev`
* To install Junit Reporter : `npm install cucumberjs-junitxml --save-dev`
* To install Chai : `npm install chai --save-dev`
 
## To execute the tests

Define the scripts in package.json as follows :
```json
"scripts": {
    "test": "cucumber-js --parallel 1 -f json:report/report.json && node report.js && cat report/report.json | npx cucumber-junit > report/junitreport.xml"
  }
```
Finally execute the tests with `npm test`

### Create a global browser for the test session
```Javascript
BeforeAll(async() =>{
        global.browser = await chromium.launch();
});
```
### Create a fresh browser context for each test
```Javascript
Before(async() =>{
    global.context = await global.browser.newContext();
    global.page = await global.context.newPage();
});
```
### A sample Feature file
```gherkin
Scenario Outline: Login to the E-Shop Application with Wrong Password
    Given User launched eshop login page
    When User logged in eshop using the invalid emailid "<EmailID>" and the invalid password "<Password>"
    Then User should not get logged in

    Examples:
      | EmailID                              | Password  |
      | umair.aslam.ssa@techtronix.biz.com   | Testing_1 |
```
### A sample stepdefinition
```Javascript
When('User logged in eshop using the invalid emailid {string} and the invalid password {string}',async(username,password) =>{
    await loginpage.login(username,password);
});
```
### Example of how a Playwright code snippet looks
```Javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chrome.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.example.com/');
  await page.screenshot({ path: 'page.png', fullPage: true });

  await browser.close();
})();
```
For more on Playwright click [here](https://playwright.dev/)

For more on Cucumber click [here](https://cucumber.io/)

