const { expect } = require("chai");

const { MarketMaintainance } = require('./MarketMaintainance.page');

const locator = require('../page_locators/loginLocator');
const LandingLocator = require('../page_locators/LandingLocators');
const MarketLocator = require('../page_locators/MarketMaintainance');
// const marketMaintainance = new MarketMaintainance();
class LoginPage {
    ///function to sleep
    async sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e10; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }
    async login_Backend(username, password) {
        await Promise.all([
            page.waitForNavigation({ timeout: 50000 }),
            page.goto('https://app01-qa10.spotlighttms.com/backend.php')
        ]);
        this.sleep(3000);
        await page.fill(`//input[@value='Username']`, username);
        await page.fill(`//input[@value='Password']`, password);
        await page.click(`//input[@type='submit']`);

    }
    async navigate() {
        await Promise.all([
            page.waitForNavigation({ timeout: 50000 }),
            page.goto(locator.locators.url.toString())
        ]);
        this.sleep(3000);
    }
    async login(username, password) {
        await page.fill(locator.locators.username.toString(), username);
        await page.fill(locator.locators.password.toString(), password);

    }
    async verify_warning(warning) {
        if (warning == `User already`) {
            let warning = await page.$eval(`(//form[contains(@class,'register-form ng-dirty')]//div)[1]`,
                (el) => el.innerHTML
            );
            expect(warning).to.equal(`User already exists in given customer with given email.`);
        } else if (warning === `Invalid code`) {
            let warning = await page.$eval(`(//form[contains(@class,'register-form ng-dirty')]//div)[1]`,
                (el) => el.innerHTML
            );
            expect(warning).to.equal(`Invalid customer code.`);
        } else if (warning === `Invalid mail`) {
            let warning = await page.$eval(`(//form[contains(@class,'register-form ng-dirty')]//div)[1]`,
                (el) => el.innerHTML
            );

            expect(warning).to.equal(`Domain: gmail.co does not exist in allowed domains`);
        }
    }
    async Register_user(code, email) {
        await page.click(`//span[@class='outline-none']/following-sibling::a[1]`);
        await page.fill(`(//input[contains(@class,'form-control ng-untouched')])[1]`, code);
        await page.fill(`(//input[contains(@class,'form-control ng-untouched')])[2]`, email);
        await page.click(`//input[@type='checkbox']`);
        await page.click(`//button[contains(@class,'btn btn-success')]`);
        this.sleep(3000);

    }
    async forgot_username(email) {
        await page.fill(locator.locators.username.toString(), "  ");
        await page.click(`//div[@class='form']/following-sibling::p[1]/a`);
        await page.click(`//p[@class='message']//a[1]`);
        await page.fill(`//input[@placeholder='E-mail Address']`, email);
        await page.click(`//button[text()=' RECOVER USERNAME ']`);
        this.sleep(2000);
    }
    async forgot_Password(username) {
        await page.fill(locator.locators.username.toString(), "  ");
        await page.click(`//div[@class='form']/following-sibling::p[1]/a`);
        this.sleep(2000);
        await page.fill(`(//input[contains(@class,'form-control ng-untouched')])[1]`, username);
        await page.click(`//button[contains(@class,'btn btn-success')]`);
        this.sleep(2000);
    }
    async verify_username_warning(email) {
        let warnings = await page.$eval(`//p[@class='outline-none']//b[1]`,
            (el) => el.innerHTML
        );
        expect(email).to.equal(warnings.trim());
    }
    async verify_password_warning(username) {
        let warnings = await page.$eval(`//p[@class='outline-none']//b[1]`,
            (el) => el.innerHTML
        );
        expect(username).to.equal(warnings.trim());
    }
    async Create_New_Customer(CustomerName) {
        await page.click(`(//div[@class='main-content']//a)[1]`);
        await page.fill(`(//div[@class='form_error']/following-sibling::input)[1]`, CustomerName.toString());
        await page.fill(`(//div[@class='form_error']/following-sibling::input)[2]`, `Street 404`);
        this.sleep(3000);
        await page.fill(`(//div[@class='form_error']/following-sibling::input)[3]`, `Dallas`);
        await page.selectOption(`(//div[@class='form_error']/following-sibling::select)[1]`, '9');
        this.sleep(3000);
        await page.fill(`//div[@id='error_for_sub_domain']/following-sibling::input[1]`, `TronTech`);
        await page.fill(`//div[@class='form_error']/following-sibling::textarea[1]`, `tech.com`);
        await page.selectOption(`//div[@id='error_for_instance_type']/following-sibling::select[1]`, '3');
        this.sleep(3000);
        await page.click(`//input[@value='Save']`);
    }
    async landing_page() {
        await page.click(locator.locators.keepMeLoggedin.toString());
        await page.click(locator.locators.loginButton.toString());
        // this.sleep(5000);
        // await page.waitForSelector('#dropdownMenuProfile > div > div > img');

    }
    async Dismiss_Card() {
        // await locator.
        this.sleep(3000);
        // if (await page.$(locator.locators.DismissButton.toString()) !== null) {
        //     //console.log('1st DC\n');
        //     await page.click((locator.locators.LogOutHover.toString()));
        // }
        await page.click(locator.locators.DismissButton.toString());
        // await page.waitForSelector(locator.locators.LogOutHover.toString());

    }
    async Dismiss_Card_SSA() {

        // this.sleep(3000);
        await page.goto(locator.locators.url.toString());
        // Click text=Feeds are awesome Learn more Powered by Usetiful >> button
        this.sleep(10000);
        if (await page.$(locator.locators.DismissNotification1.toString()) !== null) {
            //console.log('1st DC');
            await page.click((locator.locators.DismissNotification1.toString()));
        } //else { console.log('not found'); }
        if (await page.$('text=Dismiss') !== null) {
            //console.log('2nd DC');
            await page.click('text=Dismiss');
        } //else { console.log('not found'); }

        this.sleep(3000);

    }
    async Dismiss_Card_SSA_() {

        // this.sleep(3000);
        // await Promise.all([
        //     await page.goto(locator.locators.url.toString() + 'app/explore/')
        // ]);

        // // Click text=Feeds are awesome Learn more Powered by Usetiful >> button

        this.sleep(15000);
        ////////y1,ERROR2 commnt kia h
        if (await page.$(locator.locators.DismissNotification1.toString()) !== null) {
            //console.log('found');
            await page.click((locator.locators.DismissNotification1.toString()));
        } //else { console.log('not found'); }
        if (await page.$('text=Dismiss') !== null) {
            //console.log('found');
            await page.click('text=Dismiss');
        } //else { console.log('not found'); }
        this.sleep(5000); {
            if (await page.$(locator.locators.DismissNotification1.toString()) !== null) {
                //console.log('1st DC\n');
                await page.click((locator.locators.DismissNotification1.toString()));
            } //else { console.log('not found'); }
            if (await page.$('text=Dismiss') !== null) {
                //console.log('2nd DC');
                await page.click('text=Dismiss');
            } //else { console.log('not found'); }
        }
        this.sleep(3000);

    }
    async search_customer_filter(Name, City, Email, Subdomain) {
        await page.fill(`(//input[@class='filter-input-field'])[1]`, Name);
        await page.fill(`(//input[@class='filter-input-field'])[2]`, City);
        await page.fill(`(//input[@class='filter-input-field'])[3]`, Email);
        await page.fill(`//input[@id='sub_domain']`, Subdomain);
        await page.click(`//input[@value='Filter']`);
        this.sleep(3000);
        await page.click(`(//div[@class='header-link-item']//a)[2]`);
        this.sleep(2000);

    }
    async search_Customer_UI(customer, SubDomain) {
        // Fill input[name="customerName"]
        await page.fill(locator.locators.CustomerName.toString(), customer);
        this.sleep(1000);
        await page.press(locator.locators.CustomerName.toString(), 'ArrowDown');
        this.sleep(3000);
        await page.press(locator.locators.CustomerName.toString(), 'Enter');
        this.sleep(6000);
        // Fill input[name="customerName"]
        await page.fill(locator.locators.CustomerName.toString(), SubDomain);
        this.sleep(1000);
        await page.press(locator.locators.CustomerName.toString(), 'ArrowDown');
        this.sleep(3000);
        await page.press(locator.locators.CustomerName.toString(), 'Enter');
        this.sleep(6000);
        let customerr = await page.$eval('xpath=/html/body/div/div[2]/div[3]/div/div[2]/div[2]/form/div/div/ul/li',
            (el) => el.innerHTML
        );
        this.sleep(2000);
        if (customerr != null) {
            // Click text=Continue
            await Promise.all([
                page.click('text=Continue')
                // page.waitForNavigation({ url: 'https://app01-qa10.spotlighttms.com/app/' }),
            ]);
        }
        this.sleep(2000);
    }
    async Verify_cart_Icon_super_title() {
        let no_of_tickets_in_cart = await page.$eval(`//span[contains(@class,'countIcon ng-tns-c188-2')]`,
            (el) => el.innerHTML
        );
        expect(no_of_tickets_in_cart).to.equal(`1`);


    }
    async Add_Random_ticket_to_cart() {
        await marketMaintainance.select_all_location();
        await page.click(MarketLocator.locators.ticketTypeDropdown.toString());
        await page.click(MarketLocator.locators.selectCompanyOwned.toString());

        await page.click(LandingLocator.CartIcon.toString());
        this.sleep(3000);
        await page.click(LandingLocator.CartIcon.toString());
        this.sleep(3000);
        await page.click(LandingLocator.Request.toString());
    }
    async select_customer() {

        // Fill input[name="customerName"]
        await page.fill(locator.locators.CustomerName.toString(), 'uiautomator');
        this.sleep(1000);
        await page.press(locator.locators.CustomerName.toString(), 'ArrowDown');
        this.sleep(3000);
        await page.press(locator.locators.CustomerName.toString(), 'Enter');
        this.sleep(6000);
        let customer = await page.$eval('xpath=/html/body/div/div[2]/div[3]/div/div[2]/div[2]/form/div/div/ul/li',
            (el) => el.innerHTML
        );
        this.sleep(2000);

        try {

        } catch (error) {
            if (customer === 'UIAutomator1 (uiautomator, 6126)') {
                // Click text=Continue
                await Promise.all([
                    page.click('text=Continue')
                    // page.waitForNavigation({ url: 'https://app01-qa10.spotlighttms.com/app/' }),
                ]);
            }

        }
        customer = await page.$eval('xpath=/html/body/div/div[2]/div[3]/div/div[2]/div[2]/form/div/div/ul/li',
            (el) => el.innerHTML
        );
        this.sleep(2000);
        if (customer === 'UIAutomator1 (uiautomator, 6126)') {
            // Click text=Continue
            await Promise.all([
                page.click('text=Continue')
                // page.waitForNavigation({ url: 'https://app01-qa10.spotlighttms.com/app/' }),
            ]);
        }
        this.sleep(6000);

    }
    async logout_SSA() {
        this.Dismiss_Card_SSA();
        this.sleep(5000);
        await page.click(locator.locators.LogOutHover2.toString());
        // Click text=Logout
        await Promise.all([
            page.waitForNavigation( /*{ url: 'https://app01-qa10.spotlighttms.com/app/login' }*/ ),
            page.click('text=Logout')
        ]);
        console.log('Logout');
        this.sleep(5000);

    }
    async logout() {
        this.navigate();
        this.Dismiss_Card();
        // console.log('1st DC\n');
        this.sleep(5000);
        // let result = await page.$eval('#content > div.notification.success > p',
        //     (el) => el.innerHTML
        // );
        // if (result == `Selected request has been approved`) {
        await page.click(locator.locators.LogOutHover2.toString());
        // Click text=Logout
        await Promise.all([
            page.waitForNavigation( /*{ url: 'https://app01-qa10.spotlighttms.com/app/login' }*/ ),
            page.click('text=Logout')
        ]);
        console.log('Logout');
        // }
        this.sleep(5000);

    }
    async logout_Standard_User_Admin() {
        this.sleep(5000);
        await page.click(locator.locators.LogOutHover_Standard_User.toString());
        // Click text=Logout
        await Promise.all([
            page.waitForNavigation( /*{ url: 'https://app01-qa10.spotlighttms.com/app/login' }*/ ),
            page.click('text=Logout')
        ]);
        console.log('Logout');
        // }

    }
    async Read_Error_of_password() {
        // eslint-disable-next-line prettier/prettier
        let error = await page.$eval(locator.locators.passwordError.toString(),
            (el) => el.innerHTML
        );
        expect(error).to.include(' Username is required ');
    }
    async Read_Error_of_username() {
        let error = await page.$eval(locator.locators.UsernameError.toString(),
            (el) => el.innerHTML
        );
        expect(error).to.include(' Password is required ');
    }
}
module.exports = { LoginPage };