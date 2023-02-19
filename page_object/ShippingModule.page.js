const { expect, assert } = require("chai");
const MarketLocator = require('../page_locators/MarketMaintainance');
const { LoginPage } = require("./login.page");
const loginpage = new LoginPage();
class ShippingModule {
    // OrderId = "";
    async sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 30e10; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }
    async test() {
        this.sleep(5000);
        await Promise.all([
            page.waitForNavigation({ timeout: 50000 }),
            page.goto(`https://app1.spotlighttms.com/procurementRequest/show/id/4117029`)
        ]);
        this.sleep(5000);
    }
    async inlineFilterForOrderId(Orderid) {

        await page.click(`(//a[@title='Remove All Filters'])[2]`);
        this.sleep(1000);
        // await page.click(`//input[@name='inline_filter_value705']`);
        await page.fill(`//input[@name='inline_filter_value705']`, Orderid);
        this.sleep(1000);
        await page.press(`//input[@name='inline_filter_value705']`, 'Enter');
        this.sleep(5000);
    }
    async Verify_FedeEx_Integration_is_enable() {

        await page.click(`(//a[@title='Remove All Filters'])[2]`);
        await page.click(MarketLocator.locators.inlineFilter.toString());
        await page.fill(MarketLocator.locators.inlineFilter.toString(), 'FedEx Integration');
        await page.press(MarketLocator.locators.inlineFilter.toString(), 'Enter');
        this.sleep(3000);
        let result = await page.$eval('#standardTable1 > tbody > tr.even > td:nth-child(9)',
            (el) => el.innerHTML
        );
        // Click :nth-match(:text("Yes"), 4)
        // console.log(result);
        if (result === 'Yes') {
            console.log('Verified:  FedeEx_Integration_is_enable');
        } else if (result === 'No') {
            console.log('FedeEx_Integration_is_Disable!!! Enabling now');
            await page.click(MarketLocator.locators.IconAddItem.toString());
            this.sleep(3000);
            await page.click(`//select[@multiple='multiple']//option[1]`);
            this.sleep(3000);
            await page.click(MarketLocator.locators.Submit.toString());
            console.log('Verified:  FedeEx_Integration_is_enable now');
        }
    }
    async Verify_UPS_Integration_is_enable() {
        await page.click(`(//a[@title='Remove All Filters'])[2]`);
        await page.click(MarketLocator.locators.inlineFilter.toString());
        await page.fill(MarketLocator.locators.inlineFilter.toString(), 'UPS Integration');
        await page.press(MarketLocator.locators.inlineFilter.toString(), 'Enter');
        this.sleep(3000);
        let result = await page.$eval('#standardTable1 > tbody > tr.even > td:nth-child(9)',
            (el) => el.innerHTML
        );
        // Click :nth-match(:text("Yes"), 4)
        // console.log(result);
        if (result === 'Yes') {
            console.log('Verified:  UPS_Integration_is_enable');
        } else if (result === 'No') {
            console.log('UPS_Integration_is_Disable!!! Enabling now');
            await page.click(MarketLocator.locators.IconAddItem.toString());
            this.sleep(3000);
            await page.click(`//select[@multiple='multiple']//option[1]`);
            this.sleep(3000);
            await page.click(MarketLocator.locators.Submit.toString());
            console.log('Verified:  UPS_Integration_is_enable now');
        }
    }

    async Process_FedEx_Shipment() {
        // this.sleep(2000);
        let Orderid = await page.$eval(`//*[@id="order-detail"]/div[1]/div[3]/span`,
            (el) => el.innerHTML
        );
        // Orderid = `'` + Orderid + `'`;
        await page.click(`//img[@alt='InviteManager']`);
        loginpage.Dismiss_Card_SSA_();
        this.sleep(3000);
        await page.hover(`//a[@aria-label='Orders']`);
        this.sleep(2000);
        await page.click(`//li[@id='Manage Shipments']`);
        // console.log("ffffffffffffff" + Orderid);
        this.sleep(2000);
        await page.click(`//input[@name='inline_filter_value705']`);
        await page.fill(`//input[@name='inline_filter_value705']`, Orderid);
        this.sleep(1000);
        await page.press(`//input[@name='inline_filter_value705']`, 'Enter');
        this.sleep(5000);
        /////////////////////
        this.sleep(10000);
        ///actual
        await page.click(`input[name='selectedRow[]']`);
        this.sleep(2000);
        await page.selectOption(`select[name='actionsDropDown']`, 'fedex');
        this.sleep(2000);
        await page.click(`input[type='submit']`);
        this.sleep(5000);
        const NoOfAdresses = await page.$eval('table tbody tr tbody', tableBody => {
            let all = []
            for (let i = 0, row; row = tableBody.rows[i]; i++) {
                let stock = [];
                for (let j = 0, col; col = row.cells[j]; j++) {
                    stock.push(row.cells[j].innerText)
                }
                all.push(stock)
            }
            return all;
        });
        console.log("Total pending shipments are  " + NoOfAdresses.length);
        //checkbox
        await page.click(`//table[@class='tableList']/tbody[1]/tr[` + NoOfAdresses.length + `]/td[1]/input`);

        await page.click(`//input[@value='FIRST_OVERNIGHT']`);

        await page.click(`input[value='DIRECT']`);
        await page.click(`//input[@value='Submit']`);
        this.sleep(5000);
        let result = await page.$eval('div#content>div>p',
            (el) => el.innerHTML
        );
        // Click :nth-match(:text("Yes"), 4)
        console.log(result);
        await page.click(`input[value='Return to Manage Shipment']`);
        this.sleep(5000);
        // this.inlineFilterForOrderId(Orderid);
        await page.fill(`//input[@name='inline_filter_value705']`, Orderid);
        this.sleep(1000);
        await page.press(`//input[@name='inline_filter_value705']`, 'Enter');
        this.sleep(5000);

        let shippingType = await page.$eval(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[29]`,
            (el) => el.innerHTML
        );
        let shippingStatus = await page.$eval(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[30]`,
            (el) => el.innerHTML
        );
        // Click :nth-match(:text("Yes"), 4)
        if (shippingStatus == `Shipped`) {
            console.log("shipping Completed Status is:--> " + shippingStatus + " using " + shippingType + " type");
        } else {
            console.log("shipping Not Completed Status is:--> " + shippingStatus);
        }
        this.sleep(8000);
        // loginpage.navigate();


    }
    async Cancel_Shipment() {
        this.sleep(5000);
        ///actual
        await page.click(`input[name='selectedRow[]']`);
        this.sleep(2000);
        await page.selectOption(`select[name='actionsDropDown']`, 'Cancel');
        this.sleep(2000);
    }
    async Process_UPS_Shipment() {
        // this.sleep(2000);
        let Orderid = await page.$eval(`//*[@id="order-detail"]/div[1]/div[3]/span`,
            (el) => el.innerHTML
        );
        // Orderid = `'` + Orderid + `'`;
        await page.click(`//img[@alt='InviteManager']`);
        loginpage.Dismiss_Card_SSA();
        this.sleep(3000);
        await page.click(`//a[@aria-label='Orders']`);
        await page.hover(`//a[@aria-label='Orders']`);
        this.sleep(2000);
        await page.click(`//li[@id='Manage Shipments']`);
        // console.log("ffffffffffffff" + Orderid);
        this.sleep(2000);
        await page.click(`//input[@name='inline_filter_value705']`);
        await page.fill(`//input[@name='inline_filter_value705']`, Orderid);
        this.sleep(1000);
        await page.press(`//input[@name='inline_filter_value705']`, 'Enter');

        /////////////////////
        this.sleep(10000);
        await page.click(`input[name='selectedRow[]']`);
        this.sleep(2000);
        await page.selectOption(`select[name='actionsDropDown']`, 'ups');
        this.sleep(2000);
        await page.click(`input[type='submit']`);
        this.sleep(5000);
        await page.click(`//input[@value='Submit']`);
        this.sleep(5000);
        const NoOfAdresses = await page.$eval('table tbody tr tbody', tableBody => {
            let all = []
            for (let i = 0, row; row = tableBody.rows[i]; i++) {
                let stock = [];
                for (let j = 0, col; col = row.cells[j]; j++) {
                    stock.push(row.cells[j].innerText)
                }
                all.push(stock)
            }
            return all;
        });
        console.log("Total pending shipments are  " + NoOfAdresses.length);
        //checkbox
        await page.click(`//table[@class='tableList']/tbody[1]/tr[` + NoOfAdresses.length + `]/td[1]/input`);
        this.sleep(3000);
        // await page.click(`(//input[@name='upsRate'])[1]`);
        await page.click(`//tr[@id='showSaturday_4']//input[1]`);

        await page.click(`(//td[@class='lbl']//input)[2]`);
        await page.click(`//input[@value='Submit']`);
        this.sleep(5000);
        let result = await page.$eval('div#content>div>p',
            (el) => el.innerHTML
        );
        // Click :nth-match(:text("Yes"), 4)
        console.log(result);
        await page.click(`input[value='Return to Manage Shipment']`);
        this.sleep(5000);
        await page.fill(`//input[@name='inline_filter_value705']`, Orderid);
        this.sleep(1000);
        await page.press(`//input[@name='inline_filter_value705']`, 'Enter');
        this.sleep(5000);
        // this.inlineFilterForOrderId(Orderid);
        // await Promise.all([
        //     page.waitForNavigation({ timeout: 50000 }),
        //     page.goto()
        // ]);

        // this.sleep(5000);

        let shippingType = await page.$eval(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[29]`,
            (el) => el.innerHTML
        );
        let shippingStatus = await page.$eval(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[30]`,
            (el) => el.innerHTML
        );
        // Click :nth-match(:text("Yes"), 4)
        if (shippingStatus == `Shipped`) {
            console.log("shipping Completed Status is:--> " + shippingStatus + " using " + shippingType + " type");
        } else {
            console.log("shipping Not Completed Status is:--> " + shippingStatus);

        }
        this.sleep(5000);
        // loginpage.navigate();


    }
    async Process_Multiple_FedEx_Shipment_first(no_of_tickets) {
        let Orderid = await page.$eval(`//*[@id="order-detail"]/div[1]/div[3]/span`,
            (el) => el.innerHTML
        );
        await page.click(`//img[@alt='InviteManager']`);
        loginpage.Dismiss_Card_SSA();
        this.sleep(4000);
        await page.hover(`//a[@aria-label='Orders']`);
        this.sleep(2000);
        await page.click(`//li[@id='Manage Shipments']`);
        this.sleep(2000);
        for (let i = 0; i <= no_of_tickets - 1; i++) {
            this.sleep(2000);
            // await page.selectOption(`select[id='inline_filter_value712']`, '0');
            // this.sleep(5000);

            await page.click(`//input[@name='inline_filter_value705']`);
            await page.fill(`//input[@name='inline_filter_value705']`, Orderid);
            this.sleep(1000);
            await page.press(`//input[@name='inline_filter_value705']`, 'Enter');
            this.sleep(10000);
            await page.click(`input[name='selectedRow[]']`);
            this.sleep(2000);
            await page.selectOption(`select[name='actionsDropDown']`, 'fedex');
            this.sleep(2000);
            await page.click(`input[type='submit']`);
            this.sleep(5000);
            const NoOfAdresses = await page.$eval('table tbody tr tbody', tableBody => {
                let all = []
                for (let i = 0, row; row = tableBody.rows[i]; i++) {
                    let stock = [];
                    for (let j = 0, col; col = row.cells[j]; j++) {
                        stock.push(row.cells[j].innerText)
                    }
                    all.push(stock)
                }
                return all;
            });
            console.log("Total pending shipments are  " + NoOfAdresses.length);
            //checkbox
            await page.click(`//table[@class='tableList']/tbody[1]/tr[` + NoOfAdresses.length + `]/td[1]/input`);

            await page.click(`//input[@value='FIRST_OVERNIGHT']`);

            await page.click(`input[value='DIRECT']`);
            await page.click(`//input[@value='Submit']`);
            this.sleep(5000);
            let result = await page.$eval('div#content>div>p',
                (el) => el.innerHTML
            );
            // Click :nth-match(:text("Yes"), 4)
            console.log(result);
            await page.click(`input[value='Return to Manage Shipment']`);
            this.sleep(5000);
        }
        await page.fill(`//input[@name='inline_filter_value705']`, Orderid);
        this.sleep(1000);
        await page.press(`//input[@name='inline_filter_value705']`, 'Enter');
        this.sleep(5000);
        // this.inlineFilterForOrderId(Orderid);

        this.sleep(5000);
        for (let i = 2; i < 4; i++) {

            let shippingType = await page.$eval(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[29]`,
                (el) => el.innerHTML
            );
            let shippingStatus = await page.$eval(`//table[@id='standardTable1']/tbody[1]/tr[` + i + `]/td[30]`,
                (el) => el.innerHTML
            );
            // let shippingStatus1 = await page.$eval(`//table[@id='standardTable1']/tbody[1]/tr[3]/td[30]`,
            //     (el) => el.innerHTML
            // );
            // Click :nth-match(:text("Yes"), 4)
            if (shippingStatus == `Shipped`) {
                console.log("shipping for " + (i - 1) + " Completed: Status is:--> " + shippingStatus + " using " + shippingType + " type");
            } else {
                console.log("shipping for  " + (i - 1) + " Not Completed: Status is:--> " + shippingStatus);

            }
        }

    }
    async Process_Multiple_FedEx_Shipment_second(no_of_tickets) {
        // this.sleep(2000);
        let Orderid = await page.$eval(`//*[@id="order-detail"]/div[1]/div[3]/span`,
            (el) => el.innerHTML
        );
        await page.click(`//img[@alt='InviteManager']`);
        loginpage.Dismiss_Card_SSA();
        this.sleep(4000);
        await page.hover(`//a[@aria-label='Orders']`);
        this.sleep(2000);
        await page.click(`//li[@id='Manage Shipments']`);
        this.sleep(2000);
        // await page.selectOption(`select[id='inline_filter_value712']`, '0');
        // this.sleep(5000);

        await page.click(`//input[@name='inline_filter_value705']`);
        await page.fill(`//input[@name='inline_filter_value705']`, Orderid);
        this.sleep(1000);
        await page.press(`//input[@name='inline_filter_value705']`, 'Enter');
        /////////////////////
        this.sleep(10000);
        ///actual
        await page.click(`//th[@colspan='1']//input[1]`);
        this.sleep(2000);
        await page.selectOption(`select[name='actionsDropDown']`, 'will_call');
        this.sleep(2000);
        await page.click(`input[type='submit']`);
        this.sleep(5000);
        this.sleep(5000);
        // let result = await page.$eval('div#content>div>p',
        let result = await page.$eval('#content > div.notification.success',
            (el) => el.innerHTML
        );
        // Click :nth-match(:text("Yes"), 4)
        console.log(result);
        this.sleep(5000);
        // }

        this.sleep(5000);
        for (let i = 2; i < 4; i++) {

            let shippingType = await page.$eval(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[29]`,
                (el) => el.innerHTML
            );
            await page.click(`//table[@id='standardTable1']/tbody[1]/tr[` + i + `]/td[30]`);
            await page.click(`//table[@id='standardTable1']/tbody[1]/tr[` + i + `]/td[30]`);
            let shippingStatus = await page.$eval(`//table[@id='standardTable1']/tbody[1]/tr[` + i + `]/td[30]`,
                (el) => el.innerHTML
            );
            if (shippingStatus == `Shipped`) {
                console.log("shipping for " + (i - 1) + " Completed: Status is:--> " + shippingStatus + " using " + shippingType + " type");
            } else {
                console.log("shipping for  " + (i - 1) + " Not Completed: Status is:--> " + shippingStatus);

            }
        }

    }
    async Print_Packing_List() {
        const [page1] = await Promise.all([
            // page.waitForEvent('popup'),
            // page.click('#order-detail > div.columns_odr_left_newUI > div:nth-child(3) > span > a:nth-child(1)')
            // page.click('xpath=/html/body/app-root/div/app-order-confirmation/div[2]/div/div[1]/div[5]/div/app-order-guest-list/div/div[2]/div/div[2]/div[2]/div[1]/p/a')
            page.click(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[31]/a[2]`)
            // page.click(`#standardTable1 > tbody > tr.even > td:nth-child(31) > a`)
        ]);
        this.sleep(5000);
        // await page1.close();


    }
}
module.exports = { ShippingModule };