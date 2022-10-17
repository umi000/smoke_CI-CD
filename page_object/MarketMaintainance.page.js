const { expect, assert } = require("chai");
const locator = require('../page_locators/loginLocator');
const MarketLocator = require('../page_locators/MarketMaintainance');
class MarketMaintainance {

    ///function to sleep
    async sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e10; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }
    async select_customer_feature() {

        this.sleep(10000);
        await page.click(locator.locators.LogOutHover2.toString());
        this.sleep(2000);
        await page.hover(locator.locators.SSAHover.toString());

        this.sleep(1000);
        await page.click(locator.locators.CustomerFeatureListHover.toString());

        this.sleep(6000);
        // await Promise.all([
        //     page.waitForNavigation({ timeout: 40000 }),
        //     page.goto(locator.locators.url.toString() + 'customerFeatures/list')
        // ]);
    }
    async Verify_Hide_External_Tickets() {
        // Click input[name="inline_filter_value883"]
        await page.click(MarketLocator.locators.inlineFilter.toString());
        await page.fill(MarketLocator.locators.inlineFilter.toString(), 'Hide External Tickets');
        await page.press(MarketLocator.locators.inlineFilter.toString(), 'Enter');
        this.sleep(3000);
        let result = await page.$eval('#standardTable1 > tbody > tr.even > td:nth-child(9)',
            (el) => el.innerHTML
        );
        // Click :nth-match(:text("Yes"), 4)
        console.log(result);
        if (result === 'No') {
            console.log('Verified:  Hide_External_ticket_Manager_is_Disable');
        }
        //     // Select 2
        // await page.selectOption(MarketLocator.locators.SelectInlineFilter.toString(), '2');
    }
    async Verify_Stub_Hub_Tickets() {
        await Promise.all([
            page.waitForNavigation({ timeout: 40000 }),
            page.goto(MarketLocator.locators.StubHubUrl.toString())
        ]);

        // Select 1
        await page.click(MarketLocator.locators.SelectStubHub.toString());
        await page.selectOption(MarketLocator.locators.SelectStubHub.toString(), '1');
        await page.click(MarketLocator.locators.SelectStubHub.toString(), '1');

        this.sleep(5000);
        // Click img[alt="TicketManager"]
        // await page.click('img[alt="TicketManager"]');
        await Promise.all([
            page.waitForNavigation({ timeout: 40000 }),
            page.goto(locator.locators.url.toString() + 'app/explore')
        ]);
        this.sleep(3000);
    }
    async navigate_home() {
        // await page.click('img[alt="TicketManager"]');
        await Promise.all([
            page.waitForNavigation({ timeout: 40000 }),
            page.goto(locator.locators.url.toString())
        ]);
        this.sleep(3000);
    }
    async Select_Marketplace_ticket() {

        await page.click(MarketLocator.locators.ticketTypeDropdown.toString());

        // Click text=MP Market Place
        await page.click(MarketLocator.locators.selectMarketPlace.toString());
        this.search_event();
        // Click text=Buy
        await page.click(MarketLocator.locators.TextBuy.toString());
        // Click text=Continue
        await page.click(MarketLocator.locators.TextContinue.toString());
    }
    async select_Ticket_from_LandingPage_for_shipping(order_type) {
        if (order_type == 'Personal Use') {
            // await page.click('xpath=/html/body/app-root/div/app-home/div[3]/div[2]/div[2]/app-feature-box/div/div[3]/ul/li[2]/div/div[2]/a');
            page.goto(locator.locators.url.toString() + 'app/event-detail/4275937');
            // Click [aria-label="Shopping Cart"]
        } else { //22549802
            page.goto(locator.locators.url.toString() + 'app/event-detail/4461565'); //22484278
        }
        await page.click('#ticketCards1 >> text=Request');
        this.sleep(2000);
        page.click('text=View Cart and Checkout');
        this.sleep(3000);
    }
    async select_Ticket_from_LandingPage(order_type) {
        if (order_type == 'Personal Use') {
            // await page.click('xpath=/html/body/app-root/div/app-home/div[3]/div[2]/div[2]/app-feature-box/div/div[3]/ul/li[2]/div/div[2]/a');
            page.goto(locator.locators.url.toString() + 'app/event-detail/4275937');
            // Click [aria-label="Shopping Cart"]
        } else { //22549802
            page.goto(locator.locators.url.toString() + 'app/event-detail/22484278');
        }
        await page.click('#ticketCards1 >> text=Request');
        this.sleep(3000);
        // await page.click('[aria-label="Shopping Cart"]');
        this.sleep(3000);
        // Click text=View Cart and Checkout
        page.click('text=View Cart and Checkout');
        this.sleep(3000);
    }
    async Select_Marketplace_ticket__() {

        page.goto(locator.locators.url.toString() + 'app/event-detail/4131410');
        this.sleep(5000);
        // Click button:has-text("COCompany Owned")
        await page.click(MarketLocator.locators.ticketTypeDropdown.toString());
        // Click text=MP Market Place
        await page.click(MarketLocator.locators.selectMarketPlace.toString());

    }
    async Select_Marketplace_ticket_Dropdown() {

        this.sleep(3000);
        // Click button:has-text("COCompany Owned")
        await page.click(MarketLocator.locators.ticketTypeDropdown.toString());
        // Click text=MP Market Place
        await page.click(MarketLocator.locators.selectMarketPlace.toString());

    }
    async select_all_location() {
        await page.click(`(//button[contains(@class,'dropdown-toggle btn')])[1]`);
        // Click app-geo-cities-filter span:has-text("All Locations")
        await page.click(`//button[text()='All Locations']`);
        this.sleep(3000);

    }
    async select_all_location_NON_SSA() {
        await page.click(`(//button[contains(@class,'dropdown-toggle btn')])[1]`);
        // Click app-geo-cities-filter span:has-text("All Locations")
        await page.click(`//button[text()='All Locations']`);
        this.sleep(3000);

    }
    async Select_Random_event() {
        // Go to https://app01-qa10.spotlighttms.com/app/event-detail/4396346
        await page.goto(locator.locators.url.toString() + 'app/event-detail/4396346');
    }
    async Buy_Continue() {
        // Click text=Buy
        await page.click(MarketLocator.locators.TextBuy.toString());
        this.sleep(3000);
        // Click text=Continue
        await page.click(MarketLocator.locators.TextContinue.toString());
    }
    async search_event() {

        await page.fill(MarketLocator.locators.Searchevent.toString(), 'mean girls');
        await page.press(MarketLocator.locators.Searchevent.toString(), 'Enter');
        this.sleep(2000);
    }
    async scroll_page_down() {
            let ButtonValue = "";
            try {
                ButtonValue = await page.$eval(MarketLocator.locators.TextBuy.toString(),
                    (el) => el.innerHTML
                );
            } catch {
                // console.log("Initial not found");
            }
            while (ButtonValue == "") {
                await page.press(MarketLocator.locators.DashboardBodyPath.toString(), 'ArrowDown');
                try {
                    ButtonValue = await page.$eval(MarketLocator.locators.TextBuy.toString(),
                        (el) => el.innerHTML
                    );
                    // console.log(ButtonValue + "id");
                } catch {}
            }
        }
        //For SSA
    async Insert_Order_Details(type) {
            if (type == 'Personal') {
                // Select Personal Purchase
                await page.selectOption(MarketLocator.locators.OrderType.toString(), 'Personal Purchase');

                this.sleep(2000);
                await page.click(MarketLocator.locators.selectOrderList.toString());
                await page.press(MarketLocator.locators.selectOrderList.toString(), 'ArrowDown');
                await page.press(MarketLocator.locators.selectOrderList.toString(), 'Enter');
                // Click text=Save and Continue
                this.sleep(2000);
                await page.click(MarketLocator.locators.ClickSaveContinue.toString());

            } else if (type == 'Business') {

                if (await page.$('.fancybox-item') !== null) {
                    await page.click('.fancybox-item');
                }
                // Select Business Purchase
                await page.selectOption(MarketLocator.locators.OrderType.toString(), 'Business Purchase');

                await page.click(MarketLocator.locators.selectOrderList.toString());
                await page.press(MarketLocator.locators.selectOrderList.toString(), 'ArrowDown');
                await page.press(MarketLocator.locators.selectOrderList.toString(), 'Enter');
                // Select 1347
                await page.selectOption(MarketLocator.locators.SelectPurpose.toString(), '1347');
                // Click text=Add Invitee
                this.sleep(3000);
                await page.click(MarketLocator.locators.AddInvitee.toString());
                // Click #invitee-form >> text=UIAutomator
                await page.click(MarketLocator.locators.SelectUIAutomator.toString());
                // Click #ticketsLeft

                await page.click(MarketLocator.locators.TicketLeft.toString());
                let no_of_tickets = await page.$eval(MarketLocator.locators.TicketLeft.toString(),
                    (el) => el.innerHTML
                );
                this.sleep(3000);
                // Select 1
                await page.selectOption(MarketLocator.locators.SelectNoOfTickets.toString(), no_of_tickets);
                // Click #invSave >> text=OK
                await page.click(MarketLocator.locators.OK_After_SelectNoOfTickets.toString());
                this.sleep(6000);
                // Click text=Save and Continue
                await page.click(MarketLocator.locators.ClickSaveContinue.toString());
            }
            this.sleep(10000);
        }
        //For CSA, Admin, User
    async Insert_Order_Details_others(type, user) {
        if (type == 'Personal') {
            // Select Personal Purchase
            await page.selectOption(MarketLocator.locators.OrderType.toString(), 'Personal Purchase');
            this.sleep(2000);
            await page.click(MarketLocator.locators.selectOrderList.toString());
            await page.press(MarketLocator.locators.selectOrderList.toString(), 'ArrowDown');
            await page.press(MarketLocator.locators.selectOrderList.toString(), 'Enter');
            // Click text=Save and Continue
            this.sleep(2000);
            await page.click(MarketLocator.locators.ClickSaveContinue.toString());

        } else if (type == 'Business') {
            if (user == 'Admin' || user == 'Standard user') {

                // Fill input[name="requestor_attuid"]
                await page.fill('input[name="requestor_attuid"]', '3556');

                // Fill input[name="requestor_title"]
                await page.fill('input[name="requestor_title"]', 'Admin Ticket');
                // Fill input[name="supervisor_name_attuid"]
                await page.fill('input[name="supervisor_name_attuid"]', 'umair.aslam.ssa@techtrnoix.biz');
                await page.fill('textarea[name="business_reason_for_hosting"]', 'as per Management Decision');

                // Click text=Submit
                await Promise.all([
                    page.waitForNavigation( /*{ url: 'https://app01-qa10.spotlighttms.com/app/explore' }*/ ),
                    page.click('text=Submit')
                ]);
            } else if (user == 'CSA' || user == 'SSA') {
                if (await page.$('.fancybox-item') !== null) {
                    await page.click('.fancybox-item');
                }
                // Select Business Purchase
                await page.selectOption(MarketLocator.locators.OrderType.toString(), 'Business Purchase');

                await page.click(MarketLocator.locators.selectOrderList.toString());
                await page.press(MarketLocator.locators.selectOrderList.toString(), 'ArrowDown');
                await page.press(MarketLocator.locators.selectOrderList.toString(), 'Enter');
                // Select 1347
                await page.selectOption(MarketLocator.locators.SelectPurpose.toString(), '1347');
                // Click text=Add Invitee
                this.sleep(3000);
                await page.click(MarketLocator.locators.AddInvitee.toString());
                if (user == 'SSA') {
                    // Click #invitee-form >> text=UIAutomator
                    await page.click(MarketLocator.locators.SelectUIAutomator.toString());
                } else if (user == 'CSA') {
                    await page.click(MarketLocator.locators.SelectTMAutomatorCSA.toString());
                }
                // Click #ticketsLeft

                await page.click(MarketLocator.locators.TicketLeft.toString());
                let no_of_tickets = await page.$eval(MarketLocator.locators.TicketLeft.toString(),
                    (el) => el.innerHTML
                );
                this.sleep(3000);
                // Select 1
                await page.selectOption(MarketLocator.locators.SelectNoOfTickets.toString(), no_of_tickets);
                // Click #invSave >> text=OK
                await page.click(MarketLocator.locators.OK_After_SelectNoOfTickets.toString());
                this.sleep(5000);
                // Click text=Save and Continue
                await page.click(MarketLocator.locators.ClickSaveContinue.toString());
            }
        }
        this.sleep(5000);
    }
    async ApproveOrder() {

        await page.click(`input[value='Approve Order']`);
        this.sleep(5000);

    }
    async Submit(user) {
        this.sleep(2000);
        if (user == 'admin') {} else if (user == 'SSA' || user == 'CSA' || user == 'Standard user') {
            // Click text=Submit
            await Promise.all([
                page.click('text=Submit')
            ]);
        }
        this.sleep(10000);
    }
    async Change_Order_status(status, type) {
        if (type == 'Business') {
            await page.selectOption(MarketLocator.locators.OrderStatus.toString(), status);
            this.sleep(3000);
            if (status == 'order_deny') {
                await page.click(MarketLocator.locators.OrderNotDeny.toString());
            }
        }
        this.sleep(10000);
    }

}
module.exports = { MarketMaintainance };