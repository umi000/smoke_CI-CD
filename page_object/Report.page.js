const { expect, assert } = require("chai");
const locator = require('../page_locators/loginLocator');
const MarketLocator = require('../page_locators/MarketMaintainance');
// const { LoginPage } = require('../page_object/login.page')
// const { ShippingModule } = require('../page_object/ShippingModule.page')


// const loginpage = new LoginPage();
// const shippingModule = new ShippingModule();

class Report {
    async sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 10e10; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }
    async Export_Excel() {
        await page.click(`//li[@title='Export Results']`);
        await page.click(`//a[@title='Export To Excel']`); // //a[@title='Export To PDF']
        this.sleep(5000);
        let download_text = await page.$eval(`//div[@id='normal-export']//p[1]`,
            (el) => el.innerHTML
        );
        // console.log(not_download_text);
        console.log(download_text.substr(0, 90));
        try { await page.click(`//div[@title='Close']`); } catch {}

        // console.log(download_text);
        expect(download_text.substr(0, 90)).to.equal(`Your report is being generated. Your browser will let you know when the file is downloaded`);

    }
    async Export_PDF() {
        await page.click(`//li[@title='Export Results']`);
        await page.click(`//a[@title='Export To PDF']`);
        this.sleep(5000);
        let not_download_text = await page.$eval(`//div[@id='export-pdf']//p[1]`,
            (el) => el.innerHTML
        );
        // console.log(not_download_text);
        console.log(not_download_text.substr(0, 48));
        try { await page.click(`//div[@title='Close']`); } catch {}

        expect(not_download_text.substr(0, 48)).to.equal(`You can select maximum 20 columns for PDF export`);
        this.sleep(4000);
    }
    async remove_all_filter() {
        this.sleep(2000);
        try {
            await page.click(`(//a[@title='Remove All Filters'])[2]`);
        } catch {
            await page.click(`//a[@title='Reset View']`);
        }
    }
    async Verify_filter_tab() {

        let before_records = await page.$eval(`//*[@id="rpt_Paging"]/div/ul/li[1]`,
            (el) => el.innerHTML.split("<span>")[3].split(" ")[3]
        );
        console.log("before_records: " + before_records);
        this.sleep(3000);
        await page.click(`//a[@id='filter_tab']`);
        this.sleep(6000);
        await page.selectOption(`(//select[@class='rpt_liststyle'])[1]`, '2876');
        this.sleep(3000);
        await page.selectOption(`(//select[@class='rpt_liststyle'])[2]`, '1');
        this.sleep(3000);
        await page.selectOption(`select[name='filter_value']`, '1');
        this.sleep(3000);
        await page.click(`//*[@id="tabs3-filter"]/div[1]/div[3]/span/span[1]/a`);
        this.sleep(3000);
        await page.click(`(//a[@title='Add Filter'])[2]`);
        this.sleep(6000);
        const now_records = await page.$eval(`//*[@id="rpt_Paging"]/div/ul/li[1]`,
            (el) => el.innerHTML.split("<span>")[3].split(" ")[3]
        );
        console.log("now_records: " + now_records);
        expect(now_records).not.to.equal(before_records);

    }
    async verify_select_all_filter() {
        // try {
        //     await page.click(`(//a[@title='Remove All Filters'])[2]`);
        // } catch {
        //     await page.click(`//a[@title='Reset View']`);
        // }
        const before_no_of_coulmn = await page.locator(`(//table[@id='standardTable1']//tr)[2]/td`).count();
        console.log("before_no_of_coulmn: " + before_no_of_coulmn);
        await page.click(`//a[@id='layout_tab']//span[1]`);
        this.sleep(6000);
        await page.click(`//a[@id='btnSelectAll']`);
        this.sleep(6000);
        await page.click(`//*[@id="tabs3-layout1"]/div[3]/a[1]`);
        this.sleep(6000);

        const after_no_of_coulmn = await page.locator(`(//table[@id='standardTable1']//tr)[2]/td`).count();
        console.log("after_no_of_coulmn: " + after_no_of_coulmn);
        expect(after_no_of_coulmn).not.to.equal(before_no_of_coulmn);

    }
    async verify_Inline_filter() {
        let before_record = await page.$eval(`//*[@id="rpt_Paging"]/div/ul/li[1]`,
            (el) => el.innerHTML.split("<span>")[3].split(" ")[3]
        );
        console.log("before_record : " + before_record);
        this.sleep(3000);

        // Click input[name="inline_filter_value883"]
        await page.click(`//*[@id="inlineFilterText65"]`);
        await page.fill(`//*[@id="inlineFilterText65"]`, 'Uiautomator1');
        await page.press(`//*[@id="inlineFilterText65"]`, 'Enter');
        this.sleep(3000);

        let now_record = await page.$eval(`//*[@id="rpt_Paging"]/div/ul/li[1]`,
            (el) => el.innerHTML.split("<span>")[3].split(" ")[3]
        );
        console.log("now_record: " + now_record);
        expect(now_record).not.to.equal(before_record);
    }
    async verify_DeSelect_all_filter() {
        await page.reload();
        const before_no_of_coulmns_ = await page.locator(`(//table[@id='standardTable1']//tr)[2]/td`).count();
        console.log("before_no_of_coulmns_: " + before_no_of_coulmns_);
        await page.click(`//a[@id='layout_tab']`);
        this.sleep(3000);
        await page.click(`//*[@id="btnDeselectAll"]`);
        this.sleep(6000);
        await page.click(`//*[@id="tabs3-layout1"]/div[3]/a[1]`);
        this.sleep(6000);

        const after_no_of_coulmns_ = await page.locator(`(//table[@id='standardTable1']//tr)[2]/td`).count();
        console.log("after_no_of_coulmns_: " + after_no_of_coulmns_);
        expect(after_no_of_coulmns_).not.to.equal(before_no_of_coulmns_);

    }
    async Save_report() {
        await page.click(`//a[@title='Save Report']`);
        await page.fill(`//div[@class='border_text']//input[1]`, 'test');

        await page.click(`(//div[@class='save_cont']//input)[2]`);
        try {
            await page.click(`//span[text()='Yes']`);

        } catch {}
    }
    async Verify_pagination() {
        var Current_page, i = 1;
        var Total_page = await page.$eval(`div#rpt_Paging>div>ul>li:nth-of-type(5)`,
            (el) => el.innerHTML.split(" ")[2]
        );
        do {
            Current_page = '';
            Current_page = await page.$eval(`div#rpt_Paging>div>ul>li:nth-of-type(5)`,
                (el) => el.innerHTML.split(" ")[0].split("-")[0]
            );
            console.log("Total_page " + Total_page + " Current_page " + Current_page + "loop " + i);
            await page.click(`//img[@alt='Next']`);
            this.sleep(2000);
            i++;
        }
        while (Number(i) < Number(Total_page))
        if (Number(i) != Total_page) { return 'NOPE' }
    }
    async Send_Invalid_Email() {
        await page.click(`//a[@title='Email Results']`);
        console.log("1");
        await page.fill(`//div[@class='textarea_border']//textarea[1]`, 'umair.Techtronix');
        console.log("catch 2");

        await page.click(`//div[@class='email_report_middle']//input[1]`);
        console.log("3 catcj");
        this.sleep(3000);
        let notification_text_mail = await page.$eval(`(//div[@class='email_report_middle']//p)[2]`,
            (el) => el.innerHTML
        );
        console.log(notification_text_mail);
        try { await page.click(`//div[@title='Close']`); } catch {}
        this.sleep(3000);

        expect(notification_text_mail).to.equal("Invalid Email Address");


    }
    async Send_valid_Email() {
        await page.click(`//a[@title='Email Results']`);
        this.sleep(1000);
        await page.fill(`//div[@class='textarea_border']//textarea[1]`, ' ');
        await page.type(`//div[@class='textarea_border']//textarea[1]`, ' umair.aslam@Techtronix.biz');

        await page.click(`//div[@class='email_report_middle']//input[1]`);

        let notification_text_email = await page.$eval(`(//div[@class='email_report_middle']//p)[3]`,
            (el) => el.innerHTML
        );
        console.log(notification_text_email);
        try { await page.click(`//div[@title='Close']`); } catch {}

        expect(notification_text_email).to.equal("The results have been emailed successfully.");


    }
    async verify_no_of_records_after_removing_filter() {
        // try { await page.click(`//a[@title='Reset View']`) } catch {}
        this.sleep(3000);
        let before_records = await page.$eval(`//*[@id="rpt_Paging"]/div/ul/li[1]`,
            (el) => el.innerHTML.split("<span>")[3].split(" ")[3]
        );
        console.log("before_records: " + before_records);
        this.sleep(3000);
        //remove all
        try { await page.click(`(//a[@title='Remove All Filters'])[2]`); } catch { await page.click(`//a[@title='Reset View']`); }
        this.sleep(5000);
        let now_records = await page.$eval(`//*[@id="rpt_Paging"]/div/ul/li[1]`,
            (el) => el.innerHTML.split("<span>")[3].split(" ")[3]
        );
        console.log("now_records " + now_records);
        // await page.click(`//*[@id="rpt_Paging"]/div/ul/li[1]`);
        this.sleep(10000);
        expect(now_records).not.to.equal(before_records);
    }
    async navigate_to_report____(_report) {

        this.sleep(5000);
        if (_report == 'Workflow Assignment Report') {
            await page.click(`div#newui-header>ul>li:nth-of-type(5)>a`);
            console.log("Workflow Assignment Report");
            this.sleep(2000);
            await page.hover(`//*[@id="newui-header"]/ul/li[5]/ul/li[3]/a`);
            this.sleep(1000);
            await page.click(`//*[@id="newui-header"]/ul/li[5]/ul/li[3]/ul/li[8]/a`);

        } else if (_report == 'Shipping') { ///////////////////////////
            await page.click(`//a[@aria-label='Reports']`);
            console.log("shipping");
            this.sleep(2000);
            await page.hover(`a[name='Events']`);

            this.sleep(1000);
            await page.click(`//li[@id='Events_Shipping']/a[1]/span[1]`);
        } else if (_report == 'Invitee Information') { //////////////////////
            await page.click(`//a[@aria-label='Reports']`);
            console.log("Invitee Information");
            this.sleep(2000);
            await page.hover(`a[name='Events']`);

            this.sleep(1000);
            await page.click(`//li[@id='Events_Invitee Information']/a[1]/span[1]`);
        } else if (_report == 'All Tickets') { ///////////////////////////
            await page.click(`//a[@aria-label='Reports']`);
            console.log("All Tickets");
            this.sleep(2000);
            await page.hover(`a[name='Inventory']`);

            this.sleep(1000);
            await page.click(`//li[@id='Inventory_All Tickets']/a[1]/span[1]`);
        } else if (_report == 'Unsubscribe Status') { ///////////////////////////

            await page.click(`//a[@aria-label='Reports']`);
            console.log("Unsubscribe Status");
            this.sleep(2000);
            await page.hover(`a[name='Events']`);

            this.sleep(1000);
            await page.click(`//li[@id='Events_Unsubscribe Status']/a[1]/span[1]`);
        } else if (_report == 'Manage Orders') { /////////////////////////
            await page.click(`div#newui-header>ul>li:nth-of-type(4)>a`);
            console.log("Manage Orders");
            // this.sleep(2000);
            // await page.hover(`a[name='Inventory']`);

            this.sleep(1000);
            await page.click(`//li[@id='Order_manage Order']/a[1]/span[1]`);
        } else if (_report == 'Usage by Team') { /////////////////////////
            await page.click(`//a[@aria-label='Reports']`);
            console.log("All Tickets");
            this.sleep(2000);
            await page.hover(`a[name='Usage']`);

            this.sleep(1000);
            await page.click(`//li[@id='Usage_By Team']/a[1]/span[1]`);
        }


        this.sleep(6000);
        // await Promise.all([
        //     page.waitForNavigation({ timeout: 40000 }),
        //     page.goto(locator.locators.url.toString() + 'customerFeatures/list')

    }
}
module.exports = { Report };