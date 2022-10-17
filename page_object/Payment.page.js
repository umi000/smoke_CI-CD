const { expect, assert } = require("chai");
const locator = require('../page_locators/loginLocator');
const MarketLocator = require('../page_locators/MarketMaintainance');
class PaymentModule {
    OrderUrl = "";
    async sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 10e10; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }
    async Verify_alpha_is_enable() {

        await page.click(MarketLocator.locators.inlineFilter.toString());
        await page.fill(MarketLocator.locators.inlineFilter.toString(), 'Alpha');
        await page.press(MarketLocator.locators.inlineFilter.toString(), 'Enter');
        this.sleep(3000);
        let result = await page.$eval('#standardTable1 > tbody > tr.even > td:nth-child(9)',
            (el) => el.innerHTML
        );
        // Click :nth-match(:text("Yes"), 4)
        console.log(result);
        if (result == 'Yes') {
            console.log('Verified==>Payment Processing for Requests (ALPHA) is enable');
        } else {
            console.log('failed==>Payment Processing for Requests (ALPHA) is enable Not Enable');

        }
    }
    async Perform_Payment(PaymentData) {
        this.sleep(2000);
        //Click on make payment
        this.OrderUrl = page.url();
        await page.click(`text='Make Payment'`);
        this.sleep(1500);
        await page.goto(page.url());
        this.sleep(5000);
        // Click text=Continue
        await page.frame({
            name: 'processPaymentImpl_frame'
        }).click('text=Continue');
        this.sleep(2000);
        // Fill input[name="exact_cardholder_name"]
        await page.frame({
            name: 'processPaymentImpl_frame'
        }).fill('input[name="exact_cardholder_name"]', 'First Data');
        // Fill input[name="x_card_num"]
        await page.frame({
            name: 'processPaymentImpl_frame'
        }).fill('input[name="x_card_num"]', '4111111111111111');
        // Fill input[name="x_exp_date"]
        await page.frame({
            name: 'processPaymentImpl_frame'
        }).fill('input[name="x_exp_date"]', '1222');
        // Fill input[name="x_email"]
        await page.frame({
            name: 'processPaymentImpl_frame'
        }).fill('input[name="x_email"]', 'umair.aslam.ssa@techtronix.biz');
        // 0× click
        //Pay Button
        await page.frame({
            name: 'processPaymentImpl_frame'
        }).click('input[value="Pay With Your Credit Card"]');
        this.sleep(5000);
        await page.click(`//table[@id='standardTable']/tbody[1]/tr[1]/td[1]/a[1]`);
        this.sleep(4000);
        let PaymentStatus = await page.$eval(`(//span[@class='labelSingle_odr_newUI'])[1]`,
            (el) => el.innerHTML
        );
        console.log(PaymentStatus);
        this.sleep(10000);

    }
    async Refund_Order(Refund_Operation) {
        // await page.click('//*[@id="order-detail"]/div[1]/div[3]/span/a');
        // Click text=Mark Pending Refund
        await page.click('text=Mark Pending Refund');
        // Check input[name="order_id[]"]
        await page.check('input[name="order_id[]"]');
        // Select request_partial_refund_complete
        await page.selectOption('select[name="operation_' + (this.OrderUrl.toString()).substring(this.OrderUrl.length - 5) + '"]', Refund_Operation);
        // Click input:has-text("Apply")
        await page.click('input[name="submit_refund"]');
        this.sleep(3000);
        await page.goto(this.OrderUrl);
        this.sleep(3000);
        let RefundPayment = await page.$eval(`(//span[@class='labelSingle_odr_newUI'])[2]`,
            (el) => el.innerHTML
        );
        console.log(RefundPayment);
        // assert.equal(page.url(), 'https://app01-qa10spotlighttms.com/procurementRequest/list');

    }

}
module.exports = { PaymentModule };