const { expect, assert } = require("chai");
const locator = require('../page_locators/loginLocator');
const MarketLocator = require('../page_locators/MarketMaintainance');
const { LoginPage } = require('../page_object/login.page')
const { ShippingModule } = require('../page_object/ShippingModule.page')


const loginpage = new LoginPage();
const shippingModule = new ShippingModule();

class OrderApproval {
    OrderUrl_ = 'https://app01-qa10.spotlighttms.com/procurementRequest/show/id/';
    Orderid = '';
    ///function to sleep
    async sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 10e10; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }
    async Set_Approval_Manager_and_email(manager_approver, email) {
        this.sleep(10000);
        await Promise.all([
            page.waitForNavigation({ timeout: 40000 }),
            page.goto(locator.locators.url.toString() + 'userProfile')
        ]);
        // Fill input[name="approvalManager"]
        await page.fill('input[name="approvalManager"]', 'tmautomator.csa');

        // Fill input[name="approvingManagerEmail"]
        await page.fill('input[name="approvingManagerEmail"]', 'tmautomator.csa@techtronix.biz');
        // Click text=Update
        await Promise.all([
            page.click('text=Update')
        ]);
        this.sleep(10000);


    }


    async Verify_Approval_Manager_is_Enable() {

        await page.click(MarketLocator.locators.inlineFilter.toString());
        await page.fill(MarketLocator.locators.inlineFilter.toString(), 'Approval Manager');
        await page.press(MarketLocator.locators.inlineFilter.toString(), 'Enter');
        this.sleep(3000);
        let result = await page.$eval('#standardTable1 > tbody > tr.even > td:nth-child(9)',
            (el) => el.innerHTML
        );
        // Click :nth-match(:text("Yes"), 4)
        console.log(result);
        if (result == 'Yes') {
            console.log('Verified:  Approval_Manager_is_Enable');
        } else {
            console.log('failed: Approval_Manager_Not_Enable');

        }
    }
    async Verify_Ticket_Approval_Manager_is_Enable() {
        // Click #rpt_applied_filter_bar >> text=Remove All
        await page.click('#rpt_applied_filter_bar >> text=Remove All');

        await page.click(MarketLocator.locators.inlineFilter.toString());
        await page.fill(MarketLocator.locators.inlineFilter.toString(), 'Ticket Approval Manager');
        await page.press(MarketLocator.locators.inlineFilter.toString(), 'Enter');
        this.sleep(3000);
        let result = await page.$eval('#standardTable1 > tbody > tr.even > td:nth-child(9)',
            (el) => el.innerHTML
        );
        // Click :nth-match(:text("Yes"), 4)
        console.log(result);
        if (result == 'Yes') {
            console.log('Verified:  Ticket Level _Approval_Manager_is_Enable');
        } else {
            console.log('failed: Ticket Level _Approval_Manager_Not_Enable');

        }

        // Select 2
        // await page.selectOption(MarketLocator.locators.SelectInlineFilter.toString(), '2');
    }
    async Verify_Order_purpose_approver_is_Enable() {
            // Click #rpt_applied_filter_bar >> text=Remove All
            await page.click('#rpt_applied_filter_bar >> text=Remove All');
            await page.click(MarketLocator.locators.inlineFilter.toString());
            await page.fill(MarketLocator.locators.inlineFilter.toString(), 'Order Purpose Approver');
            await page.press(MarketLocator.locators.inlineFilter.toString(), 'Enter');
            this.sleep(3000);
            let result = await page.$eval('#standardTable1 > tbody > tr.even > td:nth-child(9)',
                (el) => el.innerHTML
            );
            // Click :nth-match(:text("Yes"), 4)
            console.log(result);
            if (result == 'Yes') {
                console.log('Verified:  Order Purpose _Approval_is_Enable');
            } else {
                console.log('failed: Order Purpose _Approval_Not_Enable');
            }


        }
        //marketplace
    async Manager_Approval_only(status, type) {
            // Click text=177393
            const [page1] = await Promise.all([
                page.waitForEvent('popup'),
                // page.click('#order-detail > div.columns_odr_left_newUI > div:nth-child(3) > span > a:nth-child(1)')
                page.click('xpath=/html/body/app-root/div/app-order-confirmation/div[2]/div/div[1]/div[5]/div/app-order-guest-list/div/div[2]/div/div[2]/div[2]/div[1]/p/a')

            ]);
            let editUrl = (page1.url()).replace("show", "edit");
            console.log(editUrl.toString());
            page1.close();

            await Promise.all([
                page2.goto(editUrl.toString())
            ]);
            // Fill input[name="low_seat_number"]
            await page2.fill('input[name="low_seat_number"]', '1');
            this.sleep(3000);
            // Click text=Select All
            await page2.click('text=Select All');
            // Click text=Select AllDeselect AllDevelopersMarketingnew dept >> span
            await page2.click('text=Select All', '2');
            // Click text=Save
            await page2.click('text=Save');
            this.sleep(3000);
            await page2.close();
            if (type == 'Business') {
                this.sleep(2000);
                await page.selectOption(MarketLocator.locators.OrderStatus.toString(), status);
                this.sleep(3000);
                if (status != 'order_deny') {
                    await page.click(MarketLocator.locators.OrderNotDeny.toString());
                }
            }
            this.sleep(2000);
        }
        //company owned
    async NotificationAfterSubmit() {
        this.sleep(10000);
        let NotificationAfterSubmit = await page.$eval(`xpath=//div[@class='notification success']//p[1]`,
            (el) => el.innerHTML
        );
        console.log(NotificationAfterSubmit);
    }
    async getOrderId() {
        return this.Orderid;
    }

    async Set_Hook_Payment_Method() {
        this.sleep(2000);
        // Click text=179153
        const [page1] = await Promise.all([
            page.waitForEvent('popup'),
            page.click(`//span[@class='labelSingle_odr_newUI']//a`)
        ]);
        // Click text=Edit
        await page1.click('text=Edit');
        await page1.selectOption('select[name="payment_account"]', '78');
        // Fill text=Bracey,Debra A1Bracey,Debra A1Bracey,Debra A1bushra,Theodore L1eEushra,Theodore  >> [placeholder="Search..."]
        await page1.fill(`(//label[text()='Ticket Level Approval managers:']/following::input)[1]`, 'umair');
        // Check #treemultiselect-2-1662
        await page1.check('#treemultiselect-2-1662');

        // Click text=Save
        await page1.click('text=Save');
        await page1.close();
        // .down('Control');
        // await page.keyboard.down('Shift');
        // await page.keyboard.press('T');
        // await page.keyboard.up('Control');
        // await page.keyboard.up('Shift');
    }
    async Change_first_status_as_Approval_Rejection(status_, type, isApproveDirectly) {
        // page.click('#order-detail > div.columns_odr_left_newUI > div:nth-child(3) > span > a:nth-child(1)')
        this.sleep(2000);
        let Orderid = await page.$eval(MarketLocator.locators.LinkTextOrderId.toString(),
            (el) => el.innerHTML
        );
        this.OrderUrl = this.OrderUrl_ + Orderid;
        await page.click(MarketLocator.locators.LinkTextOrderId.toString());
        this.sleep(3500);
        if (type === 'Personal Use') {
            this.sleep(2000);
            await page.selectOption(MarketLocator.locators.OrderStatus.toString(), status_);
            this.sleep(3000);
            if (status_ === 'order_approve') {
                if (isApproveDirectly === `1`) {
                    this.sleep(10000);
                    await page.click(MarketLocator.locators.B_ApprovalOrder.toString());

                } else {
                    this.sleep(10000);
                    await page.click(MarketLocator.locators.B_ManagerApprovalOnly.toString());
                }
            }

            if (status_ === 'order_deny') {
                await page.click(MarketLocator.locators.OrderNotDeny.toString());

            }
        }
        if (type === 'Business Use') {
            this.sleep(4000);
            // await page.click(MarketLocator.locators.OrderStatus.toString());
            await page.selectOption(MarketLocator.locators.OrderStatus.toString(), status_);
            // await page.press(MarketLocator.locators.OrderStatus.toString(), 'Enter');
            if (status_ === 'order_approve') {
                if (isApproveDirectly === `1`) {
                    this.sleep(10000);
                    await page.click(MarketLocator.locators.B_ApprovalOrder.toString());
                    // console.log(page.url() + '2nd');
                    // this.NotificationAfterSubmit();

                } else {
                    this.sleep(10000);
                    await page.click(MarketLocator.locators.B_ManagerApprovalOnly.toString());
                }
            }
            if (status_ === 'order_deny') {
                this.sleep(10000);
                await page.click(MarketLocator.locators.OrderDeny.toString());
                this.sleep(3000);
                // this.NotificationAfterSubmit();
            }

        }
        this.sleep(5000);
        await page.goto(this.OrderUrl);

    }
    async Change_second_status_as_Approval_Rejection(status__, type) {
        // page.click('#order-detail > div.columns_odr_left_newUI > div:nth-child(3) > span > a:nth-child(1)')
        if (type === 'Business Use') {
            this.sleep(2000);
            // await page.click(MarketLocator.locators.OrderStatus.toString());
            await page.selectOption(MarketLocator.locators.OrderStatus.toString(), status__);
            // await page.press(MarketLocator.locators.OrderStatus.toString(), 'Enter');
            if (status__ === 'order_approve') {
                this.sleep(2000);
                await page.click(MarketLocator.locators.B_ApprovalOrder.toString());
                // this.sleep(5000);
            }
            if (status__ === 'order_deny') {
                this.sleep(10000);
                await page.click(MarketLocator.locators.OrderDeny.toString());
                this.sleep(3000);
            }

        }
        this.sleep(5000);
    }
    async Change_Third_status_as_Approval_Rejection(status__, type) {
        // page.click('#order-detail > div.columns_odr_left_newUI > div:nth-child(3) > span > a:nth-child(1)')
        if (type === 'Business Use') {
            this.sleep(2000);
            // await page.click(MarketLocator.locators.OrderStatus.toString());
            await page.selectOption(MarketLocator.locators.OrderStatus.toString(), status__);
            if (status__ === 'order_approve') {
                this.sleep(2000);
                await page.click(MarketLocator.locators.B_ApprovalOrder.toString());
                // this.sleep(10000);
            }
            if (status__ === 'order_deny') {
                this.sleep(10000);
                await page.click(MarketLocator.locators.OrderDeny.toString());
                this.sleep(3000);
            }
        }
        await page.waitForLoadState();
        await page.goto(this.OrderUrl.toString());
        await page.waitForLoadState();

        this.sleep(3000);
    }

    async Verify_FCFS_is_Enabled() {
        // Click #rpt_applied_filter_bar >> text=Remove All
        await page.click('#rpt_applied_filter_bar >> text=Remove All');
        await page.click(MarketLocator.locators.inlineFilter.toString());
        await page.fill(MarketLocator.locators.inlineFilter.toString(), 'First Come First Serve');
        await page.press(MarketLocator.locators.inlineFilter.toString(), 'Enter');
        this.sleep(3000);
        let result = await page.$eval('#standardTable1 > tbody > tr.even > td:nth-child(9)',
            (el) => el.innerHTML
        );
        // Click :nth-match(:text("Yes"), 4)
        console.log(result);
        if (result == 'Yes') {
            console.log('Verified: FCFS_is_Enable');
        } else {
            console.log('failed: FCFS_is_Not_Enable');

        }
        // await Promise.all([
        //     page.goto(locator.locators.url.toString() + 'customerProfile/advanceWorkflow')
        // ]);

        // this.sleep(3000);
        // // Select 2

        // await page.click('select[name="auto_approval_enabled_for_users"]');
        // await page.press('select[name="auto_approval_enabled_for_users"]', 'ArrowDown');
        // await page.press('select[name="auto_approval_enabled_for_users"]', 'Enter');
        // // await page.selectOption('select[name="auto_approval_enabled_for_users"]', '1');
        // // Select 2

        // await page.click('select[name="auto_approval_default_for_users"]');
        // await page.press('select[name="auto_approval_default_for_users"]', 'ArrowDown');
        // await page.press('select[name="auto_approval_default_for_users"]', 'Enter');
        // // await page.selectOption('select[name="auto_approval_default_for_users"]', '1');
        // this.sleep(3000);
        // // Select 2

        // await page.click('select[name="auto_approval_default_for_tickets"]');
        // await page.press('select[name="auto_approval_default_for_tickets"]', 'ArrowDown');
        // await page.press('select[name="auto_approval_default_for_tickets"]', 'Enter');
        // // await page.selectOption('select[name="auto_approval_default_for_tickets"]', '1');

        // await page.click('text=Save');
        // await Promise.all([
        //     page.goto(locator.locators.url.toString())
        // ]);
        this.sleep(6000);

    }
}
module.exports = { OrderApproval };