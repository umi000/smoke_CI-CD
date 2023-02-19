const { expect } = require("chai");
const LandingLocator = require('../page_locators/LandingLocators');
const MarketLocator = require('../page_locators/MarketMaintainance');

const { MarketMaintainance } = require('./MarketMaintainance.page');

const marketMaintainance = new MarketMaintainance();

class LandingPage {
    async sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e10; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }
    async select_location(location, type) {
        // Click text=All Locations
        const a = location;
        const b = type;

        await marketMaintainance.select_all_location();

        if (type == "Company Owned") {
            await page.click(MarketLocator.locators.ticketTypeDropdown.toString());
            await page.click(MarketLocator.locators.selectCompanyOwned.toString());
        } else if (type == "All Available Tickets") {
            await page.click(MarketLocator.locators.ticketTypeDropdown.toString());
            await page.click(MarketLocator.locators.AllAvailableTickets.toString());
        } else if (type == "Market Place") {
            await page.click(MarketLocator.locators.ticketTypeDropdown.toString());
            await page.click(MarketLocator.locators.selectMarketPlace.toString());
        }
        await page.click(LandingLocator.CartIcon.toString());
        this.sleep(3000);
        await page.click(LandingLocator.CartIcon.toString());
        this.sleep(3000);
        await page.click(LandingLocator.Request.toString());

        await Promise.all([
            page.waitForNavigation( /*{ url: 'https://app1.spotlighttms.com/app/order-details/38737' }*/ ),
            page.click(LandingLocator.View_Cart_Checkout.toString())
        ]);
    }
    async Insert_Ticket_Details(order_type, user) {
        if (user === 'SSA') {
            if (order_type === 'Personal Use') {
                await page.click(LandingLocator.orderType.toString());
                await page.press(LandingLocator.orderType.toString(), 'ArrowDown');
                await page.press(LandingLocator.orderType.toString(), 'Enter');
            } else if (order_type === 'Business Use') {
                await page.click(LandingLocator.orderPurpose.toString());
                await page.press(LandingLocator.orderPurpose.toString(), 'ArrowDown');
                await page.press(LandingLocator.orderPurpose.toString(), 'ArrowDown');
                await page.press(LandingLocator.orderPurpose.toString(), 'Enter');
            }
        } else {
            if (order_type === 'Business Use') {
                await page.click(LandingLocator.orderPurpose.toString());
                await page.press(LandingLocator.orderPurpose.toString(), 'ArrowDown');
                await page.press(LandingLocator.orderPurpose.toString(), 'ArrowDown');
                await page.press(LandingLocator.orderPurpose.toString(), 'Enter');
            } else if (order_type === 'Personal Use') {
                await page.click(LandingLocator.orderType.toString());
                await page.press(LandingLocator.orderType.toString(), 'ArrowDown');
                await page.press(LandingLocator.orderType.toString(), 'Enter');
            }

            // Click [placeholder="Approving Manager"]
            await page.click(LandingLocator.ApprovingManager.toString());
            // Fill [placeholder="Approving Manager"]
            await page.fill(LandingLocator.ApprovingManager.toString(), 'Umair aslam');
            await page.press(LandingLocator.ApprovingManager.toString(), 'Escape');
            // Click [placeholder="Approving Manager Email"]
            await page.click(LandingLocator.ApprovingManagerEmail.toString());
            // Fill [placeholder="Approving Manager Email"]
            await page.fill(LandingLocator.ApprovingManagerEmail.toString(), 'amir.abbasi.ssa@techtronix.biz');
            // try {
            //     await page.selectOption(`shippingStateLite`, `56: AL`);
            // } catch {}
            await page.click('xpath=//*[@id="wizard-screens"]/div[1]/div/app-details/div/div/app-dynamic-questions/div');
            this.sleep(5000);
        }
    }
    async Search_event(event, no_of_tickets) {
        // Click [aria-label="Shopping Cart"]
        await page.click(LandingLocator.CartIcon.toString());
        //delete previous=;
        var data = '';
        try {
            data = await page.$eval(LandingLocator.View_Cart_Checkout.toString(), el => el.innerText);
            console.log(data);
        } catch (err) { data = ''; }
        if (data == 'VIEW CART AND CHECKOUT') {
            await page.click(LandingLocator.View_Cart_Checkout_button.toString());
        }
        await page.click(LandingLocator.CartIcon.toString());
        ///////////////////////////////////////
        // Fill [placeholder="Search a venue, team or performer"]
        await page.fill(LandingLocator.SearchBar.toString(), event);
        await page.press(LandingLocator.SearchBar.toString(), 'Enter');

        await page.click(LandingLocator.RequestButton.toString());
        for (var i = 2; i <= no_of_tickets; i++) {
            page.click(LandingLocator.add_no_of_ticket_by_1.toString());
        }
        page.click(LandingLocator.View_Cart_Checkout.toString())
    }
    async Insert_invitee_default(user) {
        // if (user == 'SSA') {
        page.click(LandingLocator.EditQuantityAndGuest.toString());
        // if (user == 'Admin') {
        //     await page.click('text=1 Passes');
        //     // Click text=0 passes
        //     await page.click('text=0 passes');
        // }

        await page.click(LandingLocator.AddGuest.toString());

        // Fill [placeholder="Name"]
        await page.click(LandingLocator.NameInvitee.toString());
        this.sleep(3000);
        await page.fill(LandingLocator.NameInvitee2.toString(), 'UIAutomator');
        this.sleep(3000);
        await page.press(LandingLocator.NameInvitee2.toString(), 'Enter');

        // Fill [placeholder="Company"]
        await page.fill(LandingLocator.CompanyInvitee.toString(), 'Techtronix');
        this.sleep(3000);
        await page.press(LandingLocator.CompanyInvitee.toString(), 'Enter');

        await page.fill(LandingLocator.EmailInvitee.toString(), 'umair.aslam@techtronix.biz');
        this.sleep(3000);
        await page.press(LandingLocator.EmailInvitee.toString(), 'Enter');

        // Click [placeholder="Title"]
        await page.click(LandingLocator.TitleInvitee.toString());
        await page.fill(LandingLocator.TitleInvitee.toString(), 'RSVP');
        this.sleep(3000);
        await page.click(LandingLocator.PhoneInvitee.toString());
        await page.fill(LandingLocator.PhoneInvitee.toString(), '+16505130514');
        await page.fill(`//input[@placeholder='Shipping Email']`, 'umair.aslam@gmail.com');
        this.sleep(1000);
        // Click text=ADD TO LIST
        await page.click(LandingLocator.AddToList.toString());
        // this.sleep(4000);
        try {
            await page.click(`(//button[contains(@class,'dropdown-toggle btn')])[2]`);
            await page.click(`//button[text()=' 0 passes ']`);
        } catch {}
        this.sleep(4000);


    }
    async Insert_invitees(no_of_tickets) {
        if (no_of_tickets > 1) {
            console.log("ticketeta aer" + no_of_tickets);
            await page.click(`(//button[contains(@class,'dropdown-toggle btn')])[1]`);
            await page.click(`(//div[@class='ng-star-inserted']//button)[3]`);
            // await page.click(`text=' ` + no_of_tickets + ` tickets'`);
            let path = no_of_tickets + 1;
            //comment// await page.click(`#Panel_0 > div > div > app-event-order > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(3) > button`);
            // `#Panel_0 > div > div > app-event-order > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(2) > button`
            for (var i = 2; i <= no_of_tickets; i++) {
                // page.goto(page.url().toString())
                this.sleep(3000);
                // Click text=ADD GUEST
                await page.click(LandingLocator.AddGuest.toString());
                this.sleep(3000);
                // Fill [placeholder="Name"]
                await page.click(LandingLocator.NameInvitee.toString());
                this.sleep(3000);
                await page.fill(LandingLocator.NameInvitee1.toString(), 'UIAutomator');
                this.sleep(3000);
                await page.press(LandingLocator.NameInvitee1.toString(), 'Enter');

                // Fill [placeholder="Company"]
                await page.fill(LandingLocator.CompanyInvitee.toString(), 'TechTronix Corp');
                this.sleep(3000);
                await page.press(LandingLocator.CompanyInvitee.toString(), 'Enter');

                await page.fill(LandingLocator.EmailInvitee.toString(), 'umairrajput.xyz@gmail.com');
                this.sleep(3000);
                await page.press(LandingLocator.EmailInvitee.toString(), 'Enter');

                // Click [placeholder="Title"]
                await page.click(LandingLocator.TitleInvitee.toString());
                await page.fill(LandingLocator.TitleInvitee.toString(), 'RSVP');
                this.sleep(3000);
                // Click [placeholder="Phone"]
                await page.click(LandingLocator.PhoneInvitee.toString());
                await page.fill(LandingLocator.PhoneInvitee.toString(), '+910000000000');
                this.sleep(3000);
                // Click text=ADD TO LIST
                await page.click(LandingLocator.AddToList.toString());
            }
        }
    }
    async wait_for_a_while() {
        this.sleep(3000);
        await page.click(`//label[text()='Order Status']/following-sibling::p`);
        this.sleep(8000);
    }
    async Submit_Ticket() {
            await Promise.all([
                page.click(LandingLocator.Submit.toString())
            ]);
            this.sleep(10000);
            var data = await page.$eval(LandingLocator.CartOrderConfirmation.toString(), el => el.innerText);
            expect(data).to.equal('Cart Order Confirmation');
        }
        // async logout() {
        //     await page.click(locator.locators.LogOutHover.toString());
        //     // Click text=Logout
        //     await Promise.all([
        //         page.click(LandingLocator.logout.toString())
        //     ]);
        // }

}
module.exports = { LandingPage };