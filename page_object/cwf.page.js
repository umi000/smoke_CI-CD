const { expect } = require("chai");
const locator = require('../page_locators/loginLocator');
const LandingLocator = require('../page_locators/LandingLocators');
const MarketLocator = require('../page_locators/MarketMaintainance');

// const { MarketMaintainance } = require('./MarketMaintainance.page');

// const marketMaintainance = new MarketMaintainance();
var newDate = new Date().toLocaleString();

class CWF {
    async sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e10; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }
    async Verify_Configurable_Workflow_is_Enable() {

        await page.click(`(//a[@title='Remove All Filters'])[2]`);
        await page.click(MarketLocator.locators.inlineFilter.toString());
        await page.fill(MarketLocator.locators.inlineFilter.toString(), 'Configurable Workflow');
        await page.press(MarketLocator.locators.inlineFilter.toString(), 'Enter');
        this.sleep(3000);
        let result = await page.$eval('#standardTable1 > tbody > tr.even > td:nth-child(8)',
            (el) => el.innerHTML
        );
        // Click :nth-match(:text("Yes"), 4)
        // console.log(result);
        if (result === 'Yes') {
            console.log('Verified:  Configurable_Workflow_is_Enable');
        } else if (result === 'No') {
            console.log('Configurable_Workflow_is_Disable!!! Enabling now');
            await page.click(MarketLocator.locators.IconAddItem.toString());
            this.sleep(3000);
            await page.click(`//select[@multiple='multiple']//option[1]`);
            this.sleep(3000);
            await page.click(MarketLocator.locators.Submit.toString());
            console.log('Verified:  Configurable_Workflow_is_Enable now');
        }

    }
    async Sort_workflows_by_Date_updated_Desc_and_edit_workflow() {
        await page.click(`(//th[@scope='col']/following-sibling::th)[3]`);
        this.sleep(500);
        await page.click(`(//th[@scope='col']/following-sibling::th)[3]`);
        this.sleep(500);
        await page.click(`(//i[@placement='top-left'])[1]`);
        await page.waitForSelector(`//table[@class='table']/tbody[1]/tr[1]/td[2]`);
    }
    async Verify_Default_Workflow_is_Disable() {
        this.sleep(3000);
        await page.click(locator.locators.LogOutHover.toString());
        this.sleep(2000);
        await page.hover(`(//i[contains(@class,'fa fa-caret-left')]/following-sibling::a)[3]`);
        this.sleep(1000);
        await page.click(`//*[@id="newui-header"]/div/div[3]/div/div[2]/div/div/ul/li/ul/li[5]/ul/li[4]/a`);
        await page.click(`//a[@title='Other Settings']`);
        await page.selectOption(`//*[@id="default_wf_allowed"]`, '2');
        let Selected = await page.$eval(`//*[@id="default_wf_allowed"]`, (el) => el.innerHTML);
        await page.click(`//input[@type='submit']`);
        expect(Selected.split(" ")[2].replace(`selected="selected">`, "").replace("</option>", "").replace("<option", "").substring(0, 2)).to.equal(`No`);
        // this.sleep(3000);
    }
    async Verify_Configurable_Workflow_is_Visible_in_Menu() {
        this.sleep(3000);
        await page.click(locator.locators.LogOutHover1.toString());
        this.sleep(2000);
        await page.hover(`(//i[contains(@class,'fa fa-caret-left')]/following-sibling::a)[3]`);
        this.sleep(1000);
        await page.hover(`//*[@id="header"]/nav/div/div/div/div[3]/ul/li[4]/div/div/div/ul/li[5]/div/div/ul/li[5]/a`);
        await page.click(`//*[@id="header"]/nav/div/div/div/div[3]/ul/li[4]/div/div/div/ul/li[5]/div/div/ul/li[5]/a`);
        this.sleep(3000);
    }
    async Verify_Title() {
        expect(await page.$eval(`//h1[text()='Configurable Workflow']`, (el) => el.innerHTML)).to.equal(`Configurable Workflow`);
    }
    async Navigate_to_Configurable_Workflow() {
        this.sleep(3000);
        await page.click(locator.locators.LogOutHover1.toString());
        this.sleep(2000);
        await page.hover(`(//i[contains(@class,'fa fa-caret-left')]/following-sibling::a)[3]`);
        this.sleep(1000);
        await page.hover(`//*[@id="header"]/nav/div/div/div/div[3]/ul/li[4]/div/div/div/ul/li[5]/div/div/ul/li[5]/a`);
        await page.click(`//*[@id="header"]/nav/div/div/div/div[3]/ul/li[4]/div/div/div/ul/li[5]/div/div/ul/li[5]/a`);
        this.sleep(3000);
    }
    async Verify_Headers() {
        this.sleep(2000);
        expect(await page.$eval(`(//th[@scope='col'])[1]`, (el) => el.innerHTML)).to.equal(`Name`);
        expect(await page.$eval(`(//th[@scope='col'])[2]`, (el) => el.innerHTML)).to.equal(`Description`);
        expect(await page.$eval(`(//th[@scope='col'])[3]`, (el) => el.innerHTML)).to.equal(`Date Created`);
        expect(await page.$eval(`(//th[@scope='col'])[4]`, (el) => el.innerHTML)).to.equal(`Date Updated`);
        expect(await page.$eval(`(//th[@scope='col'])[5]`, (el) => el.innerHTML)).to.equal(`Actions`);
    }
    async Verify_Button() {
        this.sleep(3000);
        let button_text = await page.$$((`//div[contains(@class,'col-6 btn-create')]//a[1]`));
        expect(button_text).to.not.equal(null);
    }
    async Verify_List_elements() {
        this.sleep(2000);
        let button_text = await page.$$((`(//tr[@class='first-row ng-star-inserted']//i)[3]`));
        expect(button_text).to.not.equal(undefined);
        await page.click(`(//tr[@class='first-row ng-star-inserted']//i)[3]`);
        let total_list_index = await page.$$(`//div[@class='popover-body']//ul[1]/li`);
        expect(total_list_index.length).to.not.equal('0');
    }
    async Validate_Default_states_Created_Approved_Denied() {
        // let newDate = new Date().toLocaleString();
        this.sleep(2000);
        await page.click(`//div[contains(@class,'col-6 btn-create')]//a[1]`);
        await page.click(`//button[text()=' CREATE ']`);
        await page.type(`//input[contains(@class,'form-control ng-pristine')]`, `ACME_Automator` + newDate);
        await page.type(`//label[text()='Description']/following::textarea`, `@Ç┐€é § ¥ ‰ æ © © ¶ ½ ¿`);
        await page.click(`//button[text()=' CREATE ']`);
        this.sleep(15000);
        await page.waitForSelector(`//table[@class='table']/tbody[1]/tr[1]/td[2]`);
        let created = (await page.$eval(`//table[@class='table']/tbody[1]/tr[1]/td[2]`, (el) => el.innerHTML)).substring(0, 8);
        let approved = (await page.$eval(`//table[@class='table']/tbody[1]/tr[3]/td[2]`, (el) => el.innerHTML)).substring(0, 9);
        let denied = (await page.$eval(`//table[@class='table']/tbody[1]/tr[4]/td[2]`, (el) => el.innerHTML)).substring(0, 7);
        expect(created).to.equal(` Created`);
        expect(approved).to.equal(` Approved`);
        expect(denied).to.equal(` Denied`);

    }
    async Validate_Default_image_contain_all_3_Default_states() {
        this.sleep(2000);
        let isImageAvailable = await page.$$((`(//tr[@class='first-row ng-star-inserted']//i)[3]`));
        expect(isImageAvailable).to.not.equal(null);
        // expect(screenshot).toMatchSnapshot(`test-${browserName}.png`, { threshold: 0.2 });
    }
    async Add_State_and_verify_UI_elements(state1) {
        this.sleep(500);
        await page.click(`a.btn.btn-save.ng-star-inserted`); //add state
        this.sleep(2000);
        let path = await page.$eval(`//div[@class='bread-crumb']//span[1]`, (el) => el.innerText);
        expect(path.split(">", 3)[2]).to.equal(` Add State`);
        //verify cancel button
        await page.click(`//button[contains(@class,'btn btn-add')]/following-sibling::button[1]`); //cancel state
        this.sleep(1000);
        await page.click(`a.btn.btn-save.ng-star-inserted`); //add state
        // await page.click(`//*[@id="wf-sticky-table"]/table/tbody/tr[2]/td[2]/a`); //add state
        await page.type(`//div[@class='form-group']//input[1]`, state1 + newDate);
        await page.click(`//button[contains(@class,'btn btn-add')]`);
        this.sleep(1500);
        await page.waitForSelector(`//table[@class='table']/tbody[1]/tr[1]/td[2]`);
    }

}
module.exports = { CWF };