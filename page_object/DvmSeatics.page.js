const { expect, assert } = require("chai");
const locator = require('../page_locators/loginLocator');
const MarketLocator = require('../page_locators/MarketMaintainance');
const DVMLocator = require('../page_locators/DVMLocator');
const { LandingPage } = require("./landing.page");
const { LoginPage } = require("./login.page");
const { MarketMaintainance } = require("./MarketMaintainance.page");
// const { DvmSeatics } = require("./");

const marketMaintainance = new MarketMaintainance();
class DvmSeatics {

    ///function to sleep
    async sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e10; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    async Select_ticket_type_Dropdown(type) {
        // Click button:has-text("COCompany Owned")
        await page.click(MarketLocator.locators.ticketTypeDropdown.toString());
        if (type == 'All Available Tickets') {
            await page.click(MarketLocator.locators.selectAllLocation.toString());
        } else if (type == 'Company Owned') {
            await page.click(MarketLocator.locators.selectCompanyOwned.toString());
        } else if (type == 'Market Place') {
            await page.click(MarketLocator.locators.selectMarketPlace.toString());
        }
        // Click text=MP Market Place
    }
    async scroll_page_up() {
        let ButtonValue = 0;

        while (ButtonValue < 5) {
            await page.press(`//div[@role='application']`, 'ArrowUp');
            ButtonValue++;
        }
    }
    async Reset_Map() {
        var initial_no_of_tickets = await page.$eval(`//h3[@class='ticket-available-status outline-none']//span[1]`,
            (el) => el.innerHTML
        );
        await page.click(`//div[@aria-label='Reset Map']//div[1]`);
        this.sleep(2000);
        var After_Reset_no_of_tickets = await page.$eval(`//h3[@class='ticket-available-status outline-none']//span[1]`,
            (el) => el.innerHTML
        );
        expect(initial_no_of_tickets).not.to.equal(After_Reset_no_of_tickets);

    }
    async Verify_No_of_tickets_acc_to_map() {}
    async Select_LandingPage_Random_Event() {
        await page.waitForTimeout(3000);

        // await page.reload();
        await page.goto('https://app1.spotlighttms.com/app/event-detail/3898448'); //22479994  //best 22484180
        await page.waitForTimeout(5000);

        // await page.click(DVMLocator.Landing_1stEventCard.toString());
    }
    async Read_map() {
        // this.Select_LandingPage_Random_Event();
        // await page.waitForTimeout(3000);
        this.sleep(2000);

        await page.goto('https://app1.spotlighttms.com/app/event-detail/3898448'); //22479994  //best 22484180  22484278
        // await page.waitForTimeout(5000);
        for (let i = 0; i <= 20; i++) {
            try {
                // Click svg:nth-child(2) g path:nth-child(21)
                await page.click('svg:nth-child(2) g path:nth-child(' + i + ')');
                // console.log(i);
            } catch { break; }

        }
    }
    async Check_Zoom_in_and_Zoom_out_functionality() {
        // await page.keyboard.down('Control');
        // await page.mouse.down();
        // await page.mouse.wheel(0, 10000);
        // await page.zoom(1.5);
        // this.setZoom(1.5, `//div[@role='application']`);
        // await page.evaluate(() => {
        // await page.waitForTimeout(3000);
        // await page.reload();
        await Promise.all([
            page.waitForNavigation({ timeout: 50000 }),
            page.goto(`https://app1.spotlighttms.com/app/event-detail/3898448`)
        ]);
        for (let i = 7; i > 0; i--) {
            this.sleep(5000);
            console.log(" Please wait for " + i + " Seconds to Loads map completely");
            // await page.click(`//div[@class='sea-map-inner sea-hide-zoom-controls']`);

        }
        await page.$eval(`//div[@class='sea-map-inner sea-hide-zoom-controls']`, (el) => el.style.zoom = 0.8);
        await page.$eval(`//div[@class='sea-map-inner sea-hide-zoom-controls']`, (el) => el.style.zoom = 0.6);
        await page.$eval(`//div[@class='sea-map-inner sea-hide-zoom-controls']`, (el) => el.style.zoom = 0.4);
        await page.$eval(`//div[@class='sea-map-inner sea-hide-zoom-controls']`, (el) => el.style.zoom = 0.2);

        // await page.$eval(`//div[@id='venue-map']//div[1]`, (el) => el.style.zoom = 0.1);
        this.sleep(4000);
        await page.$eval(`//div[@class='sea-map-inner sea-hide-zoom-controls']`, (el) => el.style.zoom = 1.0);
        await page.$eval(`//div[@class='sea-map-inner sea-hide-zoom-controls']`, (el) => el.style.zoom = 1.4);
        await page.$eval(`//div[@class='sea-map-inner sea-hide-zoom-controls']`, (el) => el.style.zoom = 1.8);
        await page.$eval(`//div[@class='sea-map-inner sea-hide-zoom-controls']`, (el) => el.style.zoom = 2.0);
        await page.$eval(`//div[@class='sea-map-inner sea-hide-zoom-controls']`, (el) => el.style.zoom = 3.2);
        // document.body.style.zoom = 0.5;
        // });
        for (let i = 0; i < 7; i++) {
            this.sleep(2000);
            // console.log(i);
        }
        // await page.evaluate(() =>
        //     document.body.style.zoom = 1.5;
        // });   `//div[@class='sea-map-inner sea-hide-zoom-controls']`


        // await page.keyboard.press('Control+');
        // }
        // await page.keyboard.up('Control');
    }
    async Read_map_dynamically_and_Verify_No_of_tickets() {
        var initial_no_of_tickets = '';
        // do {
        // this.sleep(3000);
        var no_of_tickets = await page.$eval(`//h3[@class='ticket-available-status outline-none']//span[1]`,
            (el) => el.innerHTML
        );
        for (let i = 1; i <= 30; i++) {
            try {
                await page.click('svg:nth-child(2) g path:nth-child(' + i + ')');
                // console.log(i);
                no_of_tickets = await page.$eval(`//h3[@class='ticket-available-status outline-none']//span[1]`,
                    (el) => el.innerHTML
                );
                // console.log(no_of_tickets + "   vs   " + i + "   " + initial_no_of_tickets);
                this.scroll_page_up();
                await page.click(`//h3[@class='ticket-available-status outline-none']//span[1]`);

            } catch {
                // console.log("catch   " + i);
                continue;
            }
        }
        if (initial_no_of_tickets == no_of_tickets) {
            console.log('failed')
            return 'NOPE';
        }
    }

}
module.exports = { DvmSeatics };