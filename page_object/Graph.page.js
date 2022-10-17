const { expect, assert } = require("chai");
const locator = require('../page_locators/loginLocator');
const MarketLocator = require('../page_locators/MarketMaintainance');
const DVMLocator = require('../page_locators/DVMLocator');
const { LandingPage } = require("./landing.page");
const { LoginPage } = require("./login.page");
const { MarketMaintainance } = require("./MarketMaintainance.page");
// const { Graph } = require("./");

const marketMaintainance = new MarketMaintainance();
const loginPage = new LoginPage();
class Graph {

    async scroll_report_right(ButtonValue) {
        loginPage.sleep(5000);
        for (var i = Number(ButtonValue); i >= 0; i--) {
            await page.click(`//table[@id='standardTable1']/tbody[1]/tr[4]/td[77]`);
        }
        loginPage.sleep(5000);
    }
    async Verify_aggregate_function_of_count(R_name) {
        loginPage.sleep(4000);
        const total_records = await page.$eval(`//*[@id="rpt_Paging"]/div/ul/li[1]`, (el) => el.innerHTML.split("<span>")[3].split(" ")[3]);
        console.log("total_records: " + total_records);
        if (R_name == 'Shipping') {
            const total_count_shipping = await page.$eval(`table#standardTable1>tbody>tr:nth-of-type(2)>td:nth-of-type(74)`, (el) => el.innerHTML);
            console.log("total_count_shipping: " + total_count_shipping.split(" ")[1].replace("<br>", ""));
            for (var i = Number(10); i >= 0; i--) {
                await page.click(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[77]`);
            }
            loginPage.sleep(5000);

            expect(total_count_shipping.split(" ")[1].replace("<br>", "")).to.equal(total_records);
        } else
        if (R_name == 'Invitee Information') {
            const total_count_Invitee = await page.$eval(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[83]`, (el) => el.innerHTML);
            console.log("total_count_Invitee: " + total_count_Invitee.split(" ")[1].replace("<br>", ""));

            for (var i = Number(10); i >= 0; i--) {
                await page.click(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[83]`);
            }
            loginPage.sleep(10000);
            expect((total_count_Invitee.split(" ")[1].replace("<br>", "")).replace(",", "")).to.equal(total_records);
        } else
        if (R_name == 'All Tickets') {
            const total_count__ALL_tickets = await page.$eval(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[44]`, (el) => el.innerHTML);
            console.log("total_count__ALL_tickets: " + total_count__ALL_tickets.split(" ")[1].replace("<br>", ""));

            for (var i = Number(10); i >= 0; i--) {
                await page.click(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[44]`);
            }
            loginPage.sleep(10000);
            expect((total_count__ALL_tickets.split(" ")[1].replace("<br>", "")).replace(",", "")).to.equal(total_records);
        }


    }
    async Verify_aggregate_function_of_sum(R_name) {
        let sumArray = 0,
            sum = Number(0);
        loginPage.sleep(4000);
        const total_records = await page.$eval(`//*[@id="rpt_Paging"]/div/ul/li[1]`, (el) => el.innerHTML.split("<span>")[3].split(" ")[3]);
        console.log("total_records: " + total_records);

        for (var i = 3; i <= (Number(total_records) + Number(2)); i++) {
            let element = await page.$eval(`//table[@id='standardTable1']/tbody[1]/tr[` + (i) + `]/td[76]`, (el) => el.innerHTML);
            sumArray = (sumArray) + (element) + ",";
        }
        var res = sumArray.split(",");
        for (var i = 0; i < total_records; i++) {
            sum = (Number(sum) + Number(res[i]));
        }
        console.log("Calculated sum = " + sum);
        locator.locators.Final_sum = sum.toString();
        locator.locators.Final_records = total_records.toString();
        // 
        loginPage.sleep(3000);
        if (R_name == 'Shipping') {
            const portal_sum_shipping = await page.$eval(`table#standardTable1>tbody>tr:nth-of-type(2)>td:nth-of-type(76)`, (el) => el.innerHTML);
            console.log("portal_sum_shipping: " + (Number(portal_sum_shipping.split(" ")[1].replace("<br>", "").replace(",", ""))));
            for (var i = Number(10); i >= 0; i--) {
                await page.click(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[77]`);
            }
            loginPage.sleep(5000);
            expect(Number(portal_sum_shipping.split(" ")[1].replace("<br>", "").replace(",", ""))).to.equal(sum);
        } else if (R_name == 'Invitee Information') {
            const Portal_Invitee = await page.$eval(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[85]`, (el) => el.innerHTML);
            console.log("Portal_Invitee: " + Portal_Invitee);

            for (var i = Number(10); i >= 0; i--) {
                await page.click(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[83]`);
            }
            loginPage.sleep(5000);
            expect(Number(Portal_Invitee.split(" ")[1].replace("<br>", "").replace(",", ""))).to.equal(sum);
        } else if (R_name == 'All Tickets') {
            const Portal__ALL_tickets = await page.$eval(`table#standardTable1>tbody>tr:nth-of-type(2)>td:nth-of-type(45)`, (el) => el.innerHTML);
            console.log("Portal__ALL_tickets: " + Portal__ALL_tickets);

            for (var i = Number(10); i >= 0; i--) {
                await page.click(`//table[@id='standardTable1']/tbody[1]/tr[3]/td[43]`);
            }
            loginPage.sleep(5000);
            expect(Number(Portal__ALL_tickets.split(" ")[1].replace("<br>", "").replace(",", ""))).to.equal(sum);
        }
    }

    async reset_view() {
        loginPage.sleep(2000);
        try {
            await page.click(`//a[@title='Reset View']`);
        } catch {}
    }
    async Verify_aggregate_function_of_average(R_name) {
        loginPage.sleep(5000);
        var calc_Average = Number(0);
        calc_Average = (Number(locator.locators.Final_sum.toString()) / Number(locator.locators.Final_records.toString()));
        console.log("Calculated Average  is " + calc_Average);
        let portal_average = await page.$eval(`table#standardTable1>tbody>tr:nth-of-type(2)>td:nth-of-type(76)`, (el) => el.innerHTML);
        loginPage.sleep(5000);
        // await page.reload();
        console.log("portal Average: " + (Number(portal_average.split(" ")[1].replace("<br>", ""))));

        for (var i = Number(10); i >= 0; i--) {
            await page.click(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[76]`);
        }
        loginPage.sleep(5000);
        expect(calc_Average).to.equal((Number(portal_average.split(" ")[1].replace("<br>", ""))));
    }
    async Reduce_no_of_Tickets_using_multiple_inline_filters() {
        loginPage.sleep(1000);
        await page.click(`//*[@id="inlineFilterText60"]`);
        await page.fill(`//*[@id="inlineFilterText60"]`, 'CSA');
        await page.press(`//*[@id="inlineFilterText60"]`, 'Enter');
        loginPage.sleep(3000);

        await page.click(`//*[@id="inlineFilterText63"]`);
        await page.fill(`//*[@id="inlineFilterText63"]`, 'Arizona Diamondbacks vs. Washington Nationals');
        await page.press(`//*[@id="inlineFilterText63"]`, 'Enter');
        loginPage.sleep(3000);
    }
    async func_count_selectoption(R_name) {
        loginPage.sleep(2000);
        if (R_name == 'Invitee Information') {
            await page.selectOption(`(//select[@class='rpt_liststyle'])[3]`, '1491');
        } else if (R_name == 'Shipping') {
            await page.selectOption(`(//select[@class='rpt_liststyle'])[3]`, '1468');
        } else if (R_name == 'All Tickets') {
            await page.selectOption(`(//select[@class='rpt_liststyle'])[3]`, '447');
        }
        loginPage.sleep(1000);
        await page.selectOption(`select[name='aggregationOperator']`, '3');
    }
    async func_sum_selectoption(R_name) {
        loginPage.sleep(2000);
        if (R_name == 'Invitee Information') {
            await page.selectOption(`(//select[@class='rpt_liststyle'])[3]`, '1499');
        } else if (R_name == 'Shipping') {
            await page.selectOption(`(//select[@class='rpt_liststyle'])[3]`, '1469');
        } else if (R_name == 'All Tickets') {
            await page.selectOption(`(//select[@class='rpt_liststyle'])[3]`, '448');
        }
        // loginPage.sleep(2000);
        await page.selectOption(`select[name='aggregationOperator']`, '1');
        // loginPage.sleep(1000);
    }
    async func_average_selectoption(R_name) {
        loginPage.sleep(2000);
        if (R_name == 'Invitee Information') {
            await page.selectOption(`(//select[@class='rpt_liststyle'])[3]`, '1499');
        } else if (R_name == 'Shipping') {
            await page.selectOption(`(//select[@class='rpt_liststyle'])[3]`, '1469');
        } else if (R_name == 'All Tickets') {
            await page.selectOption(`(//select[@class='rpt_liststyle'])[3]`, '448');
        }
        // loginPage.sleep(2000);
        await page.selectOption(`select[name='aggregationOperator']`, '2');
        // loginPage.sleep(1000);
    }
    async func_no_agregate_selectoption() {
        await page.click(`(//select[@class='rpt_liststyle'])[3]`);
        await page.click(`(//select[@class='rpt_liststyle'])[3]`);
        await page.click(`(//select[@class='rpt_liststyle'])[3]`);

    }
    async Apply_aggregate_function(R_name, func) {
        loginPage.sleep(2000);

        await page.click(`//div[@id='AggregateBox']//a[1]`);
        // if (!(func == 'Average')) {
        try { await page.click(`//a[@title='Remove All Aggregation']`); } catch {}
        // }
        loginPage.sleep(2000);
        if (func == 'Sum') {
            this.func_sum_selectoption(R_name);
        }
        if (func == 'Count') {
            this.func_count_selectoption(R_name);
        }
        if (func == 'Average') {
            this.func_average_selectoption(R_name);
        }
        if (func == '') {
            this.func_no_agregate_selectoption(R_name);
        }
        await page.waitForTimeout(3000);
        await page.click(`(//span[@class='rpt_blueText']//a)[3]`);
        loginPage.sleep(2000);
        await page.click(`//a[@title='Add Aggregation']//span[1]`);
        await page.waitForTimeout(2000);
    }
    async Apply_aggregate_functio_oldn(R_name) { ///count old
        await page.click(`//div[@id='AggregateBox']//a[1]`);
        try { await page.click(`//a[@title='Remove All Aggregation']`); } catch {}

        loginPage.sleep(1000);
        await page.selectOption(`select[name='aggregationOperator']`, '3');
        loginPage.sleep(2000);
        await page.click(`(//span[@class='rpt_blueText']//a)[3]`);
        loginPage.sleep(5000);
        await page.click(`//a[@title='Add Aggregation']//span[1]`);
    }

    async Is_aggregation_disabled() {
        console.log("No aggregation found");
    }
    async Verify_Check_box() {
        var coulmn;
        await page.click(`//input[@checked='checked']`);
        try {
            coulmn = await page.click(`//table[@class='google-visualization-table-table']/tbody[1]/tr[8]/td[1]`);
        } catch {
            console.log("After check Box table value should be Undefined:==>  " + coulmn);
            expect(coulmn).to.equal(undefined);

        }
    }
    async Verify_Pie_graph(_type, Label, Data_Column, R_name) {
        await page.click(`//li[@title='Graphs']`);
        if (R_name == 'Usage by Team') {
            if (_type == 'Bar') {
                await page.click(`//img[@alt='Bar Graph Image']`);
                await page.selectOption(`(//div[@class='bar_diagram_title_n_input']//select)[3]`, '183');
                await page.selectOption(`(//label[text()='Data Column:']/following-sibling::select)[2]`, '285');
                await page.click(`(//span[text()='Draw'])[2]`);
            } else if (_type == 'Pie') {
                await page.selectOption(`//label[text()='Label Column:']/following-sibling::select`, '183');
                await page.selectOption(`(//label[text()='Data Column:']/following-sibling::select)[1]`, '285');
                await page.click(`(//span[text()='Draw'])[1]`);
            }
            const before_no_of_coulmn = await page.locator(`//table[@class='google-visualization-table-table']/tbody[1]/tr`).count();
            console.log("Initial Legends in graph: " + before_no_of_coulmn);

            await page.waitForSelector("(//div[@class='google-visualization-controls-slider-thumb'])[1]");
            const s = await page.$("(//div[@class='google-visualization-controls-slider-thumb'])[1]");
            let text = 300;
            let targetAmount = "800",
                ButtonValue = 0,
                isCompleted = false;
            while (ButtonValue != 10) {
                await page.press("(//div[@class='bar_diagram_img']//div)[1]", 'ArrowDown');
                ButtonValue += 1;
            }
            if (s) {
                while (!isCompleted) {
                    let srcBound = await s.boundingBox();
                    if (srcBound) {
                        await page.mouse.move(srcBound.x + srcBound.width / 2,
                            srcBound.y + srcBound.height / 2)
                        await page.mouse.down();
                        await page.mouse.move(srcBound.x + 15, srcBound.y + srcBound.height / 2);
                        await page.mouse.up();
                        // let text = await ele.inputValue();
                        text += 50;
                        // console.log('Initial text: ' + text);

                        if (text == targetAmount) {
                            isCompleted = true;
                        }
                    }
                }
            }
            loginPage.sleep(2000);

            const after_no_of_coulmn = await page.locator(`//table[@class='google-visualization-table-table']/tbody[1]/tr`).count();
            console.log("After Legends in graph: " + after_no_of_coulmn);
            expect(before_no_of_coulmn).not.to.equal(after_no_of_coulmn);


        }

    }
}
module.exports = { Graph };