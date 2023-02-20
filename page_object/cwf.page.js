const { expect } = require("chai");
const locator = require('../page_locators/loginLocator');
const LandingLocator = require('../page_locators/LandingLocators');
const MarketLocator = require('../page_locators/MarketMaintainance');
const CWFlocator = require('../page_locators/CWFlocator');
const { cwf_top_path, Manage_peoples } = require("../page_locators/CWFlocator");
const { Report } = require("./Report.page");

// const { MarketMaintainance } = require('./MarketMaintainance.page');
// const marketMaintainance = new MarketMaintainance();
const report = new Report();

let newDate = new Date().toLocaleString();
var WF_Id = '';
var event_id = '';
var ticket_id = '';
var order_id = '';
WF_Id = '80', event_id = '22993194'; //, ticket_id = '182322'; ////////////////////////////////////////

const user_Group_name = '';
let dateSec = (Math.floor(Math.random() * (Date.parse("March 21, 2022"))));

const path_value = [`order.account_name`, `order.comment`, `order.comment_author`, `order.e_ticketing_enabled`, `order.from_salesforce`, `order.id`, `order.last_approved_at`, `order.last_approved_by_email`, `order.last_approved_by_name`, `order.notes`, `order.opportunity_name`, `order.package_name`, `order.parking`, `order.purpose_name`, `order.status`, `order.tickets`, `order.type`, `event.city`, `event.date`, `event.date_and_time`, `event.name`, `event.state_province`, `event.time`, `invitee.contact_company`, `invitee.contact_first_name`, `invitee.contact_last_name`, `invitee.contact_name`, `invitee.id`, `invitee.recipient_email`, `invitee.recipient_first_name`, `invitee.recipient_last_name`, `invitee.shipping_address_line_1`, `invitee.shipping_address_line_2`, `invitee.shipping_city`, `invitee.shipping_country`, `invitee.shipping_date`, `invitee.shipping_method`, `invitee.shipping_name`,
    `invitee.shipping_notes`, `invitee.shipping_phone`, `invitee.shipping_state`, `invitee.shipping_zipcode`, `invitee.title`, `invitee.type`, `tickets.available`, `tickets.estimated_market_value`, `tickets.face_value`, `tickets.notes`, `tickets.pending_tickets`, `tickets.row`, `tickets.section`, `tickets.source`, `requester.address_line_1`, `requester.address_line_2`, `requester.approving_manager`, `requester.approving_manager_email`, `requester.city`, `requester.country`, `requester.department_name`, `requester.email`, `requester.first_name`, `requester.full_name`, `requester.last_name`, `requester.region_name`, `requester.state_name`, `requester.title`, `requester.username`, `requester.zipcode`, `host.country`, `component.component_name`, `component.face_value`, `component.published_price`, `package.face_value`, `package.name`, `package.published_price`
];
const path_text = [`Order Account Name`, `Order Comment`, `Order Comment Author`, `Order eticketing enabled`, `Is S4S Order?`, `Order ID`, `Last Approved At`, `Last Approved By Email`, `Last Approved By Name`, `Order Notes`, `Order Opportunity Name`, `Package Name`, `Ordered Parking Passes`, `Order Purpose`, `Order Status`, `Ordered Tickets`, `Order Type`, `Event City`, `Event Date`, `Event Date And Time`, `Event Name`, `Event State Province`, `Event Time`, `Invitee Contact Company`, `Invitee Contact First Name`, `Invitee Contact Last Name`, `Invitee Contact Name`, `Invitee Id`, `Recipient Email`, `Recipient First Name`, `Recipient Last Name`, `Invitee Shipping Address Line 1`, `Invitee Shipping Address Line 2`, `Invitee Shipping City`, `Invitee Shipping Country`, `Invitee Shipping Date`, `Invitee Shipping Method`, `Invitee Shipping Name`, `Invitee Shipping Notes`, `Invitee Shipping Phone`, `Invitee Shipping State`, `Invitee Shipping Zipcode`,
    `Invitee Title`, `Invitee Type`, `Ticket Group Available Tickets`, `Tickets estimated market value`, `Tickets face value`, `Tickets Notes`, `Ticket Group Pending Tickets`, `Tickets Row`, `Tickets Section`, `Ticket Source`, `Requester Address Line 1`, `Requester Address Line 2`, `Requester Approving Manager Name`, `Requester Approving Manager Email`, `Requester City`, `Requester Country`, `Requester Department`, `Requester Email`, `Requester First Name`, `Requester Full Name`, `Requester Last Name`, `Requester Region`, `Requester State`, `Requester Title`, `Requester Username`, `Requester Zipcode`, `Host Country`, `Component Name`, `Component Face Value`, `Component Published Price`, `Package Face Value`, `Package Name`, `Package Published Price`
];
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

        await page.click(CWFlocator.Remove_all_filter.toString());
        await page.click(MarketLocator.locators.inlineFilter.toString());
        await page.fill(MarketLocator.locators.inlineFilter.toString(), 'Configurable Workflow');
        await page.press(MarketLocator.locators.inlineFilter.toString(), 'Enter');
        await this.sleep(3000);
        let result = await page.$eval('table#standardTable1>tbody>tr:nth-of-type(2)>td:nth-of-type(7)', (el) => el.innerHTML);
        // Click :nth-match(:text("Yes"), 4)
        // console.log(result);
        if (result === 'Yes') {
            console.log('Verified:  Configurable_Workflow_is_Enable');
        } else if (result === 'No') {
            console.log('Configurable_Workflow_is_Disable!!! Enabling now');
            await page.click(MarketLocator.locators.IconAddItem.toString());
            // this.sleep(3000);
            // try {
            //     await page.click(`//select[@multiple='multiple']//option[1]`);
            // } catch (err) {}
            await this.sleep(3000);
            await page.click(MarketLocator.locators.Submit.toString());
            console.log('Verified:  Configurable_Workflow_is_Enable now');
        }

    }
    async Sort_workflows_by_Date_updated_Desc_and_edit_workflow() {
        await page.click(CWFlocator.col_date_updated.toString());
        await this.sleep(500);
        await page.click(CWFlocator.col_date_updated.toString());
        await this.sleep(500);
        await page.click(`//td[text()='Sample Automator ']/following-sibling::td[4]/a[1]`);
        // await page.click(`//td[text()='General Availability ']/following-sibling::td[4]/a[1]`);
        // await page.click(CWFlocator.Edit_icon.toString());
        await page.waitForSelector(CWFlocator.cwf_top_path.toString());
    }
    async Verify_Default_Workflow_is_Disable() {
        await this.sleep(3000);
        await page.click(locator.locators.LogOutHover1.toString());
        await this.sleep(2000);
        await page.hover(CWFlocator.Manage_settings.toString());
        await this.sleep(1000);
        // await page.click(`//*[@id="newui-header"]/div/div[3]/div/div[2]/div/div/ul/li/ul/li[5]/ul/li[2]/a`);
        await page.click(CWFlocator.Nav_CompanySetup.toString());
        await page.click(CWFlocator.Tab_OtherSettings.toString());
        await page.click(CWFlocator.Dropdown_Default_workflow.toString());
        this.sleep(2000);
        await page.selectOption(CWFlocator.Dropdown_Default_workflow.toString(), '2');
        let Selected = await page.$eval(CWFlocator.Dropdown_Default_workflow.toString(), (el) => el.innerHTML);
        await page.click(CWFlocator.Button_submit.toString());
        expect(Selected.split(" ")[2].replace(`selected="selected">`, "").replace("</option>", "").replace("<option", "").substring(0, 2)).to.equal(`No`);
        // this.sleep(3000);
    }
    async Verify_Configurable_Workflow_is_Visible_in_Menu() {
        await this.sleep(3000);
        try {
            await page.click(locator.locators.LogOutHover.toString());
        } catch (err) {
            await page.click(locator.locators.LogOutHover1.toString());
        }
        // await page.click(locator.locators.LogOutHover.toString());
        await this.sleep(2000);
        await page.hover(CWFlocator.Manage_settings.toString());
        await this.sleep(1000);
        try {
            await page.hover(CWFlocator.Nav_ConfigurableWorkflow_CompanySetup.toString());
            await page.click(CWFlocator.Nav_ConfigurableWorkflow_CompanySetup.toString());
        } catch (err) {
            await page.hover(CWFlocator.Nav_ConfigurableWorkflow1.toString());
            await page.click(CWFlocator.Nav_ConfigurableWorkflow1.toString());
        }
        await this.sleep(3000);
    }
    async Verify_Title() {
        expect(await page.$eval(CWFlocator.topHeader.toString(), (el) => el.innerHTML)).to.equal(`Configurable Workflow`);
    }
    async Navigate_to_Custom_User_Settings() {
        await this.sleep(3000);
        await page.click(locator.locators.LogOutHover1.toString());
        await this.sleep(2000);
        await page.hover(CWFlocator.Manage_peoples.toString());
        await this.sleep(1000);
        try {
            await page.hover(`(//a[@data-pid='4'])[1]`);
            await page.click(`(//a[@data-pid='4'])[1]`);
        } catch {
            await page.hover(`(//a[@data-pid='3'])[1]`);
            await page.click(`(//a[@data-pid='3'])[1]`);
        }
        await this.sleep(3000);
        await page.click(`//a[@title='Manage User Groups']`);
    }
    async Navigate_to_Configurable_Workflow() {
        await this.sleep(3000);
        await page.click(locator.locators.LogOutHover1.toString());
        await this.sleep(2000);
        await page.hover(CWFlocator.Manage_settings.toString());
        await this.sleep(1000);
        await page.hover(CWFlocator.Nav_ConfigurableWorkflow3.toString());
        await page.click(CWFlocator.Nav_ConfigurableWorkflow3.toString());
        await this.sleep(3000);
    }
    async Navigate_to_Ticket_Inventory() {
        await this.sleep(3000);
        await page.click(`//a[@aria-label='Inventory']`);
        await this.sleep(1000);
        await page.click(`//a[@title='All Inventory']`);
        await this.sleep(3000);
    }
    async Attach_same_Workflow_on_ticket(WF) {
        // await report.navigate_to_report____(`Workflow Assignment Report`);
        try {
            await page.click(`(//a[@title='Remove All Filters'])[2]`);
            await this.sleep(3000);
            await page.reload();
        } catch {}
        await page.fill(`//input[@id='inlineFilterText3848']`, WF_Id);
        await page.press(`//input[@id='inlineFilterText3848']`, `Enter`);
        await this.sleep(3000);
        await page.click(`(//input[@type='checkbox'])[4]`);
        await page.selectOption(`(//div[@class='rpt_white_bar_cont']//select)[1]`, 'changeWorkflow');
        await this.sleep(3000);
        await page.selectOption(`//div[@id='changeWorkflowBox']//select[1]`, WF_Id);
        await page.click(`//select[@id='selectWorkflows']/following-sibling::button[1]`);
        await this.sleep(3000);
        try {
            await page.selectOption(`(//div[@class='new-state']//select)[1]`, { label: 'Approved' });
            await page.selectOption(`(//div[@class='new-state']//select)[2]`, { label: 'Approved' });
            await page.selectOption(`(//div[@class='new-state']//select)[3]`, { label: 'Approved' });
            await page.selectOption(`(//div[@class='new-state']//select)[4]`, { label: 'Approved' });
        } catch {}
        try { await page.click(`//button[@id='btnCancelWF']/following-sibling::button[1]`); } catch {}
        await this.sleep(3000);
        expect(await page.$eval(`//a[@class='close-msg']/following-sibling::p[1]`, (el) => el.innerHTML)).to.contains(`No processing required.`);

    }
    async Attach_Workflow_on_ticket(WF) {
        try {
            await page.click(`(//a[@title='Remove All Filters'])[2]`);
            await this.sleep(3000);
            await page.reload();
        } catch {}
        await page.fill(`//input[@id='inlineFilterText964']`, `4132220`);
        await page.press(`//input[@id='inlineFilterText964']`, `Enter`);
        this.sleep(2000);
        await page.waitForSelector(`(//input[@type='checkbox'])[4]`);
        await page.click(`(//input[@type='checkbox'])[4]`);
        //table[@id='standardTable1']/tbody[1]/tr[3]/td[13]
        event_id = (await page.$eval(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[57]`, (el) => el.innerHTML));
        ticket_id = (await page.$eval(`//table[@id='standardTable1']/tbody[1]/tr[2]/td[8]/a[1]`, (el) => el.innerHTML));
        await this.sleep(3000);
        console.log("Workflow id is " + WF_Id);
        console.log("event id is " + event_id);
        console.log("ticket id  is: " + ticket_id);
        await this.sleep(3000);
        await page.click(`select[name='actionsDropDown']`);
        await page.selectOption(`select[name='actionsDropDown']`, 'edit');
        await this.sleep(3000);

        //////TLA admin
        try { await page.click(`//div[@data-value='8257140']//span[1]`); } catch {}
        await page.type(`(//input[@class='search'])[3]`, `umair aslam admin`);
        await page.click(`(//div[@data-value='8257140']//label)[1]`);
        //////TLA MAnager
        try { await page.click(`//div[@data-value='8252956']//span[1]`); } catch {}
        await page.click(`//input[@value='Save']`);
        await page.click(`//input[@value='Edit']`);

        await page.click(`select[name='selectedWorkflow']`);
        await this.sleep(3000);
        await page.selectOption(`select[name='selectedWorkflow']`, WF_Id);
        // await page.click(`select[name='selectedWorkflow']`);
        // await page.click(`//option[text()='` + WF + " " + newDate + `']`);
        // await page.selectOption(`select[name='selectedWorkflow']`, WF + " " + newDate);
        await page.click(`//input[@value='Save']`);
        try {
            await page.waitForSelector(`(//fieldset[@name='text']//div)[2]`);
            let err = (await page.$eval(`(//fieldset[@name='text']//div)[2]`, (el) => el.innerHTML));
            console.log(err);
            if (err.length > 5) {
                console.log(`---------------We need to change the workflow from assignment report---------------`);
                await report.navigate_to_report____(`Workflow Assignment Report`);
                await page.fill(`//input[@id='inlineFilterText3790']`, ticket_id);
                await page.press(`//input[@id='inlineFilterText3790']`, `Enter`);
                await this.sleep(3000);
                await page.click(`(//input[@type='checkbox'])[4]`);
                await page.selectOption(`(//div[@class='rpt_white_bar_cont']//select)[1]`, 'changeWorkflow');
                await this.sleep(3000);
                await page.selectOption(`//div[@id='changeWorkflowBox']//select[1]`, WF_Id);
                await page.click(`//select[@id='selectWorkflows']/following-sibling::button[1]`);
                await this.sleep(3000);
                try {
                    await page.selectOption(`(//div[@class='new-state']//select)[1]`, { label: 'Approved' });
                    await page.selectOption(`(//div[@class='new-state']//select)[2]`, { label: 'Approved' });
                    await page.selectOption(`(//div[@class='new-state']//select)[3]`, { label: 'Approved' });
                    await page.selectOption(`(//div[@class='new-state']//select)[4]`, { label: 'Approved' });
                } catch {}
                await page.click(`//button[@id='btnCancelWF']/following-sibling::button[1]`);
                await this.sleep(5000);
                expect(await page.$eval(`//a[@class='close-msg']/following-sibling::p[1]`, (el) => el.innerHTML)).to.contains(`Workflow changed successfully!`);
            }
        } catch (err) {
            // expect(await page.$eval(`//a[@class='close-msg']/following-sibling::p[1]`, (el) => el.innerHTML)).to.contains(`Workflow changed successfully!`);

        }
        await this.sleep(3000);
    }
    async Set_Order_Purpose_approver() {
        await this.sleep(3000);
        await page.click(locator.locators.LogOutHover1.toString());
        await this.sleep(2000);
        await page.hover(CWFlocator.Manage_settings.toString());
        await this.sleep(1000);
        // await page.click(`(//a[@data-pid='4'])[14]`);
        // await page.click(`//a[text()='Order Purpose']`);
        await page.click(`ul > li:nth-child(14) > a`);
        await page.fill(`//input[@id='inlineFilterText917']`, `Nakamoto.2`);
        await page.press(`//input[@id='inlineFilterText917']`, `Enter`);
        await page.click(`//span[@title='Edit']`);
        await page.click(`(//table[@class='salestPageTicketDetails']//select)[3]`);
        await page.selectOption(`(//table[@class='salestPageTicketDetails']//select)[3]`, `1`);
        await page.fill(`//input[@id='order_purpose_approver_id']/following-sibling::input[1]`, `Umair Aslam CSA`);
        // await page.press(`//input[@id='order_purpose_approver_id']/following-sibling::input[1]`, `ArrowDown`);
        // await page.press(`//input[@id='order_purpose_approver_id']/following-sibling::input[1]`, `Enter`);
        await page.click(`//input[@value='Save']`);
        this.sleep(3000);
        await page.click(`//img[@alt='InviteManager']`);
        try { await page.click(`//button[text()=' Dismiss ']`); } catch {}
    }
    async Set_Venue_Admin() {
        await this.sleep(3000);
        await page.click(locator.locators.LogOutHover1.toString());
        await this.sleep(2000);
        await page.hover(CWFlocator.Manage_peoples.toString());
        await this.sleep(1000);
        await page.click(`(//a[@data-pid='4'])[5]`);
        await this.sleep(1000);
        await page.fill(`//input[@id='inlineFilterText822']`, `RingCentral Coliseum`);
        await page.press(`//input[@id='inlineFilterText822']`, `Enter`);
        await page.fill(`//input[@id='inlineFilterText823']`, `Umair aslam`);
        await page.press(`//input[@id='inlineFilterText823']`, `Enter`);
        await page.click(`(//span[@title='Edit'])[1]`);
        await page.selectOption(`(//table[@class='salestPageTicketDetails']//select)[1]`, `8257140`);
        await page.click(`//input[@value='Save']`);
        await this.sleep(3000);
        // await page.click(`//img[@alt='InviteManager']`);
        // try { await page.click(`//button[text()=' Dismiss ']`); } catch {}
    }
    async Move_on_event_Insert_Ticket_Details(order_type, user) {
        await this.sleep(3000);
        // await page.goto(`https://app1.spotlighttms.com/app/event-detail/` + event_id);
        await page.goto(`https://app1.spotlighttms.com/app/event-detail/22993194`);
        // await page.goto(`https://app1.spotlighttms.com/app/event-detail/22992390`);
        await page.click(`(//a[contains(@class,'btn btn-request')])[1]`);
        try {
            await page.click(`//div[@class='cart-sub ng-tns-c188-2']//button[1]`);
        } catch {
            await page.click(`//div[@class='cart-sub ng-tns-c188-1']//button[1]`);
        }
        await this.sleep(6000);
        if (user == `SSA`) {
            await page.selectOption(`//div[@class='content pt-1']//select[1]`, { index: 1 });
        } else {}
        try { await page.waitForSelector(`(//label[text()='Assign To']/following::input)[1]`); } catch {}
        try { await page.fill(`(//label[text()='Assign To']/following::input)[1]`, 'Umair Aslam'); } catch {}
        try { await page.selectOption(`(//div[@class='content pt-1']//select)[2]`, { index: 3 }); } catch {}
        try { await page.fill(`//textarea[@placeholder='Order Notes']`, 'Test12'); } catch {}
        try { await page.type(`(//input[@role='combobox'])[2]`, 'umair aslam ssa'); } catch {}
        try { await page.waitForSelector(`//input[@placeholder='Approving Manager Email']`); } catch {}
        try { await page.fill(`//input[@placeholder='Approving Manager Email']`, 'umair.aslam@techtronix.biz'); } catch {}
        try { await page.fill(`(//input[@min='0'])[1]`, '35'); } catch {}
        await this.sleep(3000);
        await page.click(`//button[contains(@class,'btn button')]`);
    }
    async Perform_Bulk_Order() {
        await this.sleep(3000);
        await page.goto(`https://app1.spotlighttms.com/procurementRequest/list`);
        try { await page.click(`(//a[@title='Remove All Filters'])[2]`); } catch {}
        await page.fill(`(//input[@class='deletable inlineFilterText'])[3]`, 'Los Angeles Angels vs. Baltimore Orioles');
        await page.press(`(//input[@class='deletable inlineFilterText'])[3]`, 'Enter');
        await this.sleep(4000);
        await page.click(`(//th[@colspan='1']//label)[2]`);
        await this.sleep(2000);
        await page.click(`(//th[@colspan='1']//label)[1]`);
        await this.sleep(2000);
        await page.click(`(//input[@name='selectedRow[]'])[1]`);
        await page.click(`(//input[@name='selectedRow[]'])[2]`);
        await page.selectOption(`(//div[@class='rpt_white_bar_cont']//select)[1]`, `chooseTransition`);
        await this.sleep(5000);
        await page.waitForSelector(`//h4[text()='Order Transitions']`);
        try { await page.selectOption(`//div[@class='form form_container']//select[1]`, { index: 1 }); } catch {}
        try { await page.selectOption(`//div[@class='form form_container']//select[2]`, { index: 1 }); } catch {}
        try { await page.selectOption(`//div[@class='form form_container']//select[3]`, { index: 1 }); } catch {}
        try { await page.click(`//input[@type='submit']`); } catch { await page.click(`(//input[@class='actionPageButtons'])[1]`); }
        await this.sleep(5000);
        // expect(await page.$eval(`//a[@class='close-msg']/following-sibling::p[1]`, (el) => el.innerHTML)).to.contains(`All valid transitions completed successfully`);
        let temp = (await page.$eval(`(//tr[@class='even']//td)[3]/a[1]`, (el) => el.innerHTML));
        await page.fill(`//input[@id='inlineFilterText946']`, temp);
        await page.press(`//input[@id='inlineFilterText946']`, 'Enter');
        await this.sleep(2000);
        await page.click(`(//th[@colspan='1']//label)[1]`);
        await this.sleep(2000);
        await page.click(`(//input[@name='selectedRow[]'])[1]`);
        await page.click(`(//input[@name='selectedRow[]'])[2]`);
        await page.click(`(//input[@name='selectedRow[]'])[3]`);
        await page.selectOption(`(//div[@class='rpt_white_bar_cont']//select)[1]`, `chooseTransition`);
        await this.sleep(5000);
        await page.waitForSelector(`//h4[text()='Order Transitions']`);
        try { await page.selectOption(`//div[@class='form form_container']//select[1]`, { index: 1 }); } catch {}
        try { await page.selectOption(`//div[@class='form form_container']//select[2]`, { index: 1 }); } catch {}
        try { await page.selectOption(`//div[@class='form form_container']//select[3]`, { index: 1 }); } catch {}
        try { await page.click(`//input[@type='submit']`); } catch { await page.click(`(//input[@class='actionPageButtons'])[1]`); }
        await this.sleep(3000);
        // await page.waitForSelector(`//a[@class='close-msg']/following-sibling::p[1]`);
        // expect(await page.$eval(`//a[@class='close-msg']/following-sibling::p[1]`, (el) => el.innerHTML)).to.contains(`All valid transitions completed successfully`);
    }
    async Move_on_event_Insert_Ticket_Details_for_Bulk_approval(order_type, user, TG) {
        await this.sleep(3000);
        await page.goto(`https://app1.spotlighttms.com/app/event-detail/22993304`);
        await page.click(`(//a[contains(@class,'btn btn-request')])[` + TG + `]`);
        try {
            await page.click(`//div[@class='cart-sub ng-tns-c188-2']//button[1]`);
        } catch {
            await page.click(`//div[@class='cart-sub ng-tns-c188-1']//button[1]`);
        }
        await this.sleep(6000);
        await page.waitForSelector(`(//label[text()='Assign To']/following::input)[1]`);
        if (user == `SSA`) {
            await page.selectOption(`//div[@class='content pt-1']//select[1]`, { index: 1 });
        } else {}
        try { await page.waitForSelector(`(//label[text()='Assign To']/following::input)[1]`); } catch {}
        try { await page.fill(`(//label[text()='Assign To']/following::input)[1]`, 'Umair Aslam'); } catch {}
        try { await page.selectOption(`(//div[@class='content pt-1']//select)[2]`, { index: 3 }); } catch {}
        try { await page.fill(`//textarea[@placeholder='Order Notes']`, 'Test12'); } catch {}
        try { await page.type(`(//input[@role='combobox'])[2]`, 'umair aslam ssa'); } catch { await page.type(`(//input[@role='combobox'])`, 'umair aslam ssa'); }
        try { await page.waitForSelector(`//input[@placeholder='Approving Manager Email']`); } catch {}
        try { await page.fill(`//input[@placeholder='Approving Manager Email']`, 'umair.aslam@techtronix.biz'); } catch {}
        try { await page.fill(`(//input[@min='0'])[1]`, '35'); } catch {}
        await this.sleep(3000);
        await page.click(`//button[contains(@class,'btn button')]`);
    }
    async Attach_Workflow_on_ticket_bulk_Edit(WF) {
        // await this.Navigate_to_Ticket_Inventory();
        await page.goto(`https://app1.spotlighttms.com/ticketInventory/list`);
        await this.sleep(3000);
        try {
            await page.click(`(//a[@title='Remove All Filters'])[2]`);
            await this.sleep(3000);
            await page.reload();
        } catch {}
        await page.click(`(//input[@type='checkbox'])[6]`);
        await page.click(`(//input[@type='checkbox'])[5]`);
        await page.click(`(//input[@type='checkbox'])[4]`);
        await this.sleep(3000);
        await page.click(`select[name='actionsDropDown']`);
        await page.selectOption(`select[name='actionsDropDown']`, 'edit');
        await this.sleep(3000);
        await page.click(`select[name='selectedWorkflow']`);
        await page.selectOption(`select[name='selectedWorkflow']`, WF_Id);
        await page.on('dialog', async dialog => {
            console.log(dialog.message());
            await this.sleep(3000);
            await dialog.accept();
        });
        await page.click(`//input[@value='Save']`);
        await this.sleep(10000);
        try {
            await page.waitForSelector(`//*[@id="error_for_selectedWorkflow"]`);
            let err = (await page.$eval(`//*[@id="error_for_selectedWorkflow"]`, (el) => el.innerHTML));
            console.log(err);
            console.log(`---------------We need to change the workflow from assignment report---------------`);
            if (err.length > 5) {
                await report.navigate_to_report____(`Workflow Assignment Report`);
                try { await page.click(`(//a[@title='Remove All Filters'])[2]`); } catch {}
                await this.sleep(5000);
                await page.click(`(//input[@type='checkbox'])[5]`);
                await page.click(`(//input[@type='checkbox'])[4]`);
                await page.selectOption(`(//div[@class='rpt_white_bar_cont']//select)[1]`, 'changeWorkflow');
                await this.sleep(3000);
                await page.selectOption(`//div[@id='changeWorkflowBox']//select[1]`, WF_Id);
                await page.click(`//select[@id='selectWorkflows']/following-sibling::button[1]`);
                await this.sleep(3000);
                try {
                    await page.selectOption(`(//div[@class='new-state']//select)[1]`, { label: 'Approved' });
                    await page.selectOption(`(//div[@class='new-state']//select)[2]`, { label: 'Approved' });
                    await page.selectOption(`(//div[@class='new-state']//select)[3]`, { label: 'Approved' });
                    await page.selectOption(`(//div[@class='new-state']//select)[4]`, { label: 'Approved' });
                    await page.selectOption(`(//div[@class='new-state']//select)[5]`, { label: 'Approved' });
                    await page.selectOption(`(//div[@class='new-state']//select)[6]`, { label: 'Approved' });
                } catch {}
                await page.click(`//button[@id='btnCancelWF']/following-sibling::button[1]`);
                await this.sleep(5000);
                expect(await page.$eval(`//a[@class='close-msg']/following-sibling::p[1]`, (el) => el.innerHTML)).to.contains(`Workflow changed successfully!`);
            }
        } catch (err) {
            // expect(await page.$eval(`//a[@class='close-msg']/following-sibling::p[1]`, (el) => el.innerHTML)).to.contains(`Workflow changed successfully!`);
            // console.log(err);
        }
        await this.sleep(3000);
    }
    async Verify_Headers() {
        await this.sleep(2000);
        expect(await page.$eval(`(//th[@scope='col'])[1]`, (el) => el.innerHTML)).to.equal(`Name`);
        expect(await page.$eval(`(//th[@scope='col'])[2]`, (el) => el.innerHTML)).to.equal(`Description`);
        expect(await page.$eval(`(//th[@scope='col'])[3]`, (el) => el.innerHTML)).to.equal(`Date Created`);
        expect(await page.$eval(`(//th[@scope='col'])[4]`, (el) => el.innerHTML)).to.equal(`Date Updated`);
        expect(await page.$eval(`(//th[@scope='col'])[5]`, (el) => el.innerHTML)).to.equal(`Actions`);
    }
    async Verify_Button() {
        await this.sleep(3000);
        let button_text = await page.$$((`//div[contains(@class,'col-6 btn-create')]//a[1]`));
        expect(button_text).to.not.equal(null);
    }
    async Verify_List_elements() {
        await this.sleep(2000);
        let button_text = await page.$$((`(//tr[@class='first-row ng-star-inserted']//i)[3]`));
        expect(button_text).to.not.equal(undefined);
        await page.click(`(//tr[@class='first-row ng-star-inserted']//i)[3]`);
        let total_list_index = await page.$$(`//div[@class='popover-body']//ul[1]/li`);
        expect(total_list_index.length).to.not.equal('0');
    }
    async Create_New_Workflow_and_Validate_Default_states_Created_Approved_Denied(WF) {
        // let newDate = new Date().toLocaleString();
        await this.sleep(2000);
        await page.click(CWFlocator.Create_Workflow_right.toString());
        await page.click(CWFlocator.Create_popup.toString()); ///needs to check
        await page.type(CWFlocator.Input_WF_name.toString(), WF + " " + newDate);
        await page.type(CWFlocator.Input_WF_Description.toString(), `!!@Ç┐€é § ¥ ‰ æ © © ¶ ½ ¿`);
        await page.click(CWFlocator.Create_popup.toString());
        await this.sleep(15000);
        await page.waitForSelector(CWFlocator.Label_created.toString());
        let created = (await page.$eval(CWFlocator.Label_created.toString(), (el) => el.innerHTML)).substring(0, 8);
        let approved = (await page.$eval(CWFlocator.Label_approved.toString(), (el) => el.innerHTML)).substring(0, 9);
        let denied = (await page.$eval(CWFlocator.Label_denied.toString(), (el) => el.innerHTML)).substring(0, 7);
        expect(created).to.equal(` Created`);
        expect(approved).to.equal(` Approved`);
        expect(denied).to.equal(` Denied`);
        WF_Id = await page.url().toString();
        WF_Id = WF_Id.split('/', 6)[5];
        console.log(WF_Id);

    }
    async Validate_Default_image_contain_all_3_Default_states() {
        await this.sleep(2000);
        let isImageAvailable = await page.$$(CWFlocator.row_wf_img.toString());
        expect(isImageAvailable).to.not.equal(null);
        // expect(screenshot).toMatchSnapshot(`test-${browserName}.png`, { threshold: 0.2 });
    }
    async Set_Current_Date_Time_Stamp() {
        newDate = new Date().toLocaleString();

    }
    async Add_State(state1) {
        await this.sleep(1000);
        await page.click(CWFlocator.Button_add_state_on_CWF_page.toString()); //add state
        // await page.click(`//*[@id="wf-sticky-table"]/table/tbody/tr[2]/td[2]/a`); //add state
        await page.type(CWFlocator.Input_State_name.toString(), state1); // + newDate);
        await page.press(CWFlocator.Input_State_name.toString(), 'ArrowDown');
        await this.sleep(3000);
        await page.press(CWFlocator.Input_State_name.toString(), 'Enter');
        await page.click(CWFlocator.Input_State_name.toString());
        try {
            await page.click(`(//button[contains(@class,'dropdown-item ng-star-inserted')])[1]`);
        } catch {
            await page.press(CWFlocator.Input_State_name.toString(), 'ArrowDown');
            await this.sleep(3000);
            await page.press(CWFlocator.Input_State_name.toString(), 'Enter');
        }
        await this.sleep(3000);
        await page.click(CWFlocator.Button_add_state_on_state_page.toString());
        await this.sleep(1500);
        await page.waitForSelector(CWFlocator.Label_created.toString());
    }
    async verify_UI_elements_Add_State() {
        await this.sleep(500);
        await page.click(CWFlocator.Button_add_state_on_CWF_page.toString()); //add state
        await this.sleep(6500);
        expect((await page.$eval(CWFlocator.path_Current_WF.toString(), (el) => el.innerText)).split(">", 3)[2]).to.equal(` Add State`);
        //verify cancel button
        await page.click(CWFlocator.Button_cancel_state.toString()); //cancel state
        await this.sleep(1000);
        // this.sleep(1500);
        // await page.waitForSelector(CWFlocator.Label_created.toString());
    }
    async select_add_transition(num) {
            await this.sleep(2000);
            await page.hover(`(//td[@class='ng-star-inserted'])[` + num + `]`);
            await page.click(`(//td[@class='ng-star-inserted']//a)[` + num + `]`);
            await this.sleep(2500);
        }
        //old one
        // async Add_Transiton_from_state1_to_state2(TN, transition, state1, state2) {
        //     let warning = "";
        //     try {
        //         warning = await page.$eval(CWFlocator.warning_CwfPage.toString(), (el) => el.innerHTML);
        //         console.log('error Message on page ' + page.url + "==>" + warning);
        //     } catch (err) {}
        //     if (warning) {
        //         await page.click(CWFlocator.Button_Save.toString());
        //     }
        //     this.select_add_transition(TN);
        //     this.sleep(2500);

    //     await page.type(CWFlocator.Input_Transition_name.toString(), transition);
    //     //select who allowed?
    //     this.sleep(1500);
    //     await page.click(CWFlocator.Select_who_allowed.toString());
    //     // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[1]`); //system
    //     await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[2]`); //SSA
    //     // await page.locator(`//input[@aria-label='SSA']`);
    //     try {
    //         await page.selectOption(CWFlocator.Select_state2.toString(), { label: state2 + newDate });
    //     } catch (err) {
    //         await page.selectOption(CWFlocator.Select_state2.toString(), { label: state2 });
    //     } //save
    //     await page.click(CWFlocator.Button_Save.toString());
    //     try {
    //         warning = await page.$eval(CWFlocator.warning_CwfPage.toString(), (el) => el.innerText);
    //         console.log('error Message on page ' + page.url + "==>" + warning);
    //     } catch (err) {
    //         console.log('No Warning')
    //     }
    //     if (warning) {
    //         await page.click(CWFlocator.Button_Save.toString());
    //     }
    //     // await page.click(`(//a[@draggable='false'])[3]`);
    //     this.sleep(5000);

    // }
    async warning() {
        await this.sleep(1000);
        let warning = "";
        try {
            warning = await page.$eval(CWFlocator.warning_CwfPage.toString(), (el) => el.innerHTML);
            console.log('error Message on page ' + page.url + "==>" + warning);
        } catch (err) {}
        if (warning) {
            await page.click(CWFlocator.Button_Save.toString());
        }
        let war = "";
        try {
            war = await page.$eval(CWFlocator.warning_CwfPage.toString(), (el) => el.innerHTML);
            console.log('error Message on page ' + page.url + "==>" + warning);
        } catch (err) {}
        if (war) {
            await page.click(`(//button[contains(@class,'btn btn-add')])[3]`);
        }
    }
    async Add_Transiton_from_state1_to_state2(TN, transition, state1, state2) {
        await this.warning();
        await this.select_add_transition(TN);
        await this.sleep(2500);

        await page.type(CWFlocator.Input_Transition_name.toString(), transition);
        //select who allowed?
        await this.sleep(1500);
        await page.click(CWFlocator.Select_who_allowed.toString());
        await this.sleep(1500);
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[1]`); //system
        await page.click(`//input[@aria-label='` + this.user_Group_name + " " + dateSec + `']/following-sibling::div[1]`); //system
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[9]`); //SSA
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[8]`); //Requeestor
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[1]`); //Admin
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[4]`); //cSA
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[15]`); //UG
        // await page.locator(`//input[@aria-label='SSA']`);
        try {
            await page.selectOption(CWFlocator.Select_state2.toString(), { label: state2 + newDate });
        } catch (err) {
            await page.selectOption(CWFlocator.Select_state2.toString(), { label: state2 });
        } //save
        await page.click(CWFlocator.Button_Save.toString());
        await this.warning();

        // await page.click(`(//a[@draggable='false'])[3]`);
        await this.sleep(5000);

    }
    async Add_Transiton_from_state1_to_state2_with_permission_3(TN, transition, state1, state2, LExpression, Operation, RExpression, LExpression1, Operation1, RExpression1, LExpression2, Operation2, RExpression2) {
        await this.warning();
        await this.select_add_transition(TN);
        await this.sleep(2500);
        await page.type(CWFlocator.Input_Transition_name.toString(), transition);
        //////////addition
        await page.click(CWFlocator.RadioButton_yes.toString());
        await page.selectOption(CWFlocator.Select_Left_Expression.toString(), path_value[path_text.indexOf(LExpression)]);
        await page.selectOption(CWFlocator.Select_Operation.toString(), Operation);
        await page.click(CWFlocator.Input_Right_Expression.toString());
        await page.fill(CWFlocator.Input_Right_Expression.toString(), RExpression);
        await this.sleep(2500);
        //2nd condition
        await page.click(`//a[@class='btn-add btn']`);
        await page.selectOption(`(` + CWFlocator.Select_Left_Expression.toString() + `)[2]`, path_value[path_text.indexOf(LExpression1)]);
        await page.selectOption(`(` + CWFlocator.Select_Operation.toString() + `)[2]`, Operation1);
        await page.click(`(` + CWFlocator.Input_Right_Expression.toString() + `)[2]`);
        await page.fill(`(` + CWFlocator.Input_Right_Expression.toString() + `)[2]`, RExpression1);
        //3rd condition
        await page.click(`//a[@class='btn-add btn']`);
        await page.selectOption(`(` + CWFlocator.Select_Left_Expression.toString() + `)[3]`, path_value[path_text.indexOf(LExpression2)]);
        await page.selectOption(`(` + CWFlocator.Select_Operation.toString() + `)[3]`, Operation2);
        await page.click(`(` + CWFlocator.Input_Right_Expression.toString() + `)[3]`);
        await page.fill(`(` + CWFlocator.Input_Right_Expression.toString() + `)[3]`, RExpression2);
        //select who allowed?
        await this.sleep(2000);
        await page.click(CWFlocator.Select_who_allowed.toString());
        if (TN == `5`) {
            await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[12]`); //Requeestor
        }
        if (TN == `6`) {
            await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[11]`); //Admin
        } // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[1]`); //SSA
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[` + TN + `]`); //SSA
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[4]`); //Requeestor
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[9]`); //cSA
        await page.click(`(//span[@class='dropdown-multiselect__caret'])[1]`);
        await this.sleep(1500);
        //2nd permission
        await page.click(`//button[@class='btn btn-add']`);
        await page.click(CWFlocator.RadioButton_yes1.toString());
        await page.selectOption(`(` + CWFlocator.Select_Left_Expression.toString() + `)[4]`, path_value[path_text.indexOf(LExpression2)]);
        await page.selectOption(`(` + CWFlocator.Select_Operation.toString() + `)[4]`, Operation2);
        await page.click(`(` + CWFlocator.Input_Right_Expression.toString() + `)[4]`);
        await page.fill(`(` + CWFlocator.Input_Right_Expression.toString() + `)[4]`, RExpression2);
        await this.sleep(2500);
        //2nd condition
        await page.click(`(//a[@class='btn-add btn'])[2]`);
        await page.selectOption(`(` + CWFlocator.Select_Left_Expression.toString() + `)[5]`, path_value[path_text.indexOf(LExpression)]);
        await page.selectOption(`(` + CWFlocator.Select_Operation.toString() + `)[5]`, Operation);
        await page.click(`(` + CWFlocator.Input_Right_Expression.toString() + `)[5]`);
        await page.fill(`(` + CWFlocator.Input_Right_Expression.toString() + `)[5]`, RExpression);
        //3rd condition
        await page.click(`(//a[@class='btn-add btn'])[2]`);
        await page.selectOption(`(` + CWFlocator.Select_Left_Expression.toString() + `)[6]`, path_value[path_text.indexOf(LExpression1)]);
        await page.selectOption(`(` + CWFlocator.Select_Operation.toString() + `)[6]`, Operation1);
        await page.click(`(` + CWFlocator.Input_Right_Expression.toString() + `)[6]`);
        await page.fill(`(` + CWFlocator.Input_Right_Expression.toString() + `)[6]`, RExpression1);
        //select who allowed?
        await this.sleep(2000);
        await page.click(CWFlocator.Select_who_allowed.toString());
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[11]`); //SSA
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[` + (Number(TN) + 1) + `]`); //SSA
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[14]`); //Requeestor
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[4]`); //cSA
        await page.click(`(//span[@class='dropdown-multiselect__caret'])[1]`); //again close
        await this.sleep(1500);
        //3rd permission
        await page.click(`//button[@class='btn btn-add']`);
        await page.click(CWFlocator.RadioButton_yes2.toString());
        await page.selectOption(`(` + CWFlocator.Select_Left_Expression.toString() + `)[7]`, path_value[path_text.indexOf(LExpression2)]);
        await page.selectOption(`(` + CWFlocator.Select_Operation.toString() + `)[7]`, Operation2);
        await page.click(`(` + CWFlocator.Input_Right_Expression.toString() + `)[7]`);
        await page.fill(`(` + CWFlocator.Input_Right_Expression.toString() + `)[7]`, RExpression2);
        //select who allowed?
        await this.sleep(2000);
        await page.click(CWFlocator.Select_who_allowed.toString());
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[13]`); //Requeestor
        await page.click(`(//span[@class='dropdown-multiselect__caret'])[1]`); //again close

        await this.sleep(2500);
        try { await page.selectOption(CWFlocator.Select_state2.toString(), { label: state2 }); } catch (err) { await page.selectOption(CWFlocator.Select_state2.toString(), { label: state2 + newDate }); }
        try { await page.click(CWFlocator.Button_Save.toString()); } catch (err) { await page.click(`(//button[contains(@class,'btn btn-add')])[3]`); }
        await this.sleep(1500);
        await this.warning();
        await this.sleep(5000);
    }
    async Add_Transiton_from_state1_to_state2_with_permission_2(TN, transition, state1, state2, LExpression, Operation, RExpression, LExpression1, Operation1, RExpression1) {
        await this.warning();
        await this.select_add_transition(TN);
        await this.sleep(2500);
        await page.type(CWFlocator.Input_Transition_name.toString(), transition);
        //////////addition
        await page.click(CWFlocator.RadioButton_yes.toString());
        await page.selectOption(CWFlocator.Select_Left_Expression.toString(), path_value[path_text.indexOf(LExpression)]);
        await page.selectOption(CWFlocator.Select_Operation.toString(), Operation);
        await page.click(CWFlocator.Input_Right_Expression.toString());
        await page.fill(CWFlocator.Input_Right_Expression.toString(), RExpression);
        await this.sleep(2500);
        //2nd condition
        await page.click(`//a[@class='btn-add btn']`);
        await page.selectOption(`(` + CWFlocator.Select_Left_Expression.toString() + `)[2]`, path_value[path_text.indexOf(LExpression1)]);
        await page.selectOption(`(` + CWFlocator.Select_Operation.toString() + `)[2]`, Operation1);
        await page.click(`(` + CWFlocator.Input_Right_Expression.toString() + `)[2]`);
        await page.fill(`(` + CWFlocator.Input_Right_Expression.toString() + `)[2]`, RExpression1);
        //select who allowed?
        await this.sleep(2000);
        await page.click(CWFlocator.Select_who_allowed.toString());
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[1]`); //SSA
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[3]`); //SSA
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[` + TN + `]`); //Requeestor
        if (TN == `5`) {
            await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[12]`); //Requeestor
        }
        if (TN == `6`) {
            await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[11]`); //Admin
        } // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[5]`); //Admin
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[8]`); //cSA
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[9]`); //cSA
        await page.click(`(//span[@class='dropdown-multiselect__caret'])[1]`);
        await this.sleep(1500);
        //2nd permission
        await page.click(`//button[@class='btn btn-add']`);
        await page.click(CWFlocator.RadioButton_yes1.toString());
        await page.selectOption(`(` + CWFlocator.Select_Left_Expression.toString() + `)[3]`, path_value[path_text.indexOf(LExpression1)]);
        await page.selectOption(`(` + CWFlocator.Select_Operation.toString() + `)[3]`, Operation1);
        await page.click(`(` + CWFlocator.Input_Right_Expression.toString() + `)[3]`);
        await page.fill(`(` + CWFlocator.Input_Right_Expression.toString() + `)[3]`, RExpression1);
        await this.sleep(2500);
        //2nd condition
        await page.click(`(//a[@class='btn-add btn'])[2]`);
        await page.selectOption(`(` + CWFlocator.Select_Left_Expression.toString() + `)[4]`, path_value[path_text.indexOf(LExpression)]);
        await page.selectOption(`(` + CWFlocator.Select_Operation.toString() + `)[4]`, Operation);
        await page.click(`(` + CWFlocator.Input_Right_Expression.toString() + `)[4]`);
        await page.fill(`(` + CWFlocator.Input_Right_Expression.toString() + `)[4]`, RExpression);
        //select who allowed?
        await this.sleep(2000);
        await page.click(CWFlocator.Select_who_allowed.toString());
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[11]`); //SSA
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[` + TN + `]`); //SSA
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[13]`); //Requeestor
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[8]`); //Admin
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[4]`); //cSA
        await page.click(`(//span[@class='dropdown-multiselect__caret'])[1]`); //again close
        await this.sleep(1500);

        try { await page.selectOption(CWFlocator.Select_state2.toString(), { label: state2 }); } catch (err) { await page.selectOption(CWFlocator.Select_state2.toString(), { label: state2 + newDate }); }
        try { await page.click(CWFlocator.Button_Save.toString()); } catch (err) { await page.click(`(//button[contains(@class,'btn btn-add')])[3]`); }
        await this.sleep(1500);
        await this.warning();
        await this.sleep(5000);
    }
    async Add_Transiton_from_state1_to_state2_with_permission(TN, transition, state1, state2, LExpression, Operation, RExpression, is_post, status) {
        await this.warning();
        await this.select_add_transition(TN);
        await this.sleep(2500);
        await page.type(CWFlocator.Input_Transition_name.toString(), transition);
        //////////addition
        await page.click(CWFlocator.RadioButton_yes.toString());
        await page.selectOption(CWFlocator.Select_Left_Expression.toString(), path_value[path_text.indexOf(LExpression)]);
        await page.selectOption(CWFlocator.Select_Operation.toString(), Operation);
        await page.click(CWFlocator.Input_Right_Expression.toString());
        await page.fill(CWFlocator.Input_Right_Expression.toString(), RExpression);
        //select who allowed?
        await this.sleep(2000);
        await page.click(CWFlocator.Select_who_allowed.toString());
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[` + TN + `]`); //SSA
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[9]`); //SSA
        if (TN == `5`) {
            await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[12]`); //Requeestor
        }
        if (TN == `6`) {
            await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[11]`); //Admin
        } // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[4]`); //cSA
        await this.sleep(1500);
        try { await page.selectOption(CWFlocator.Select_state2.toString(), { label: state2 }); } catch (err) { await page.selectOption(CWFlocator.Select_state2.toString(), { label: state2 + newDate }); }
        await this.sleep(1500);
        if (is_post == `POST`) {
            await this.Post_Function_Tab(LExpression, Operation, RExpression, status);
        }
        //submit
        try { await page.click(CWFlocator.Button_Save.toString()); } catch (err) { await page.click(`(//button[contains(@class,'btn btn-add')])[3]`); }
        await this.sleep(1500);
        await this.warning();
        await this.sleep(5000);
    }
    async DeleteCurrentWorkflow() {
        // try {
        //     await Promise.all([
        //         page.waitForNavigation({ timeout: 50000 }),
        //         page.goto(`https://app1.spotlighttms.com/app/configurable-workflow`)
        //     ]);
        //     this.sleep(5000);
        // } catch {}
        await this.sleep(1500);
        const before_no_of_WF = await page.locator(`//table[@class='table']/tbody[1]/tr`).count();
        console.log('Total Workflows Before Deletion ' + before_no_of_WF);
        //sort
        await page.click(`(//th[@scope='col']/following-sibling::th)[3]`);
        await page.click(`(//th[@scope='col']/following-sibling::th)[3]`);
        await this.sleep(2500);
        try {
            await page.click(`//table[@class='table']/tbody[1]/tr[1]/td[5]/a[2]/i[1]`);
        } catch (err) {
            await page.click(`//table[@class='table']/tbody[1]/tr[2]/td[5]/a[2]/i[2]`);
        }
        await page.click(`(//div[@class='modal-footer custom-footer']//button)[2]`);
        await this.sleep(3500);

        const after_no_of_WF = await page.locator(`//table[@class='table']/tbody[1]/tr`).count();
        console.log('Total Workflows After Deletion: ' + after_no_of_WF);
        expect(before_no_of_WF).not.to.equal(after_no_of_WF);
    }
    async DeleteTransition() {
        const before_no_of_rows_in_table = await page.locator(`//table[@class='table']/tbody[1]/tr`).count();
        await this.sleep(1500);
        console.log('Total Workflows Before Deletion ' + before_no_of_rows_in_table);
        await page.hover(`(//td[@class='btn-action'])[1]`);
        //sort
        await page.click(`//a[contains(.,'Delete')][1]`);
        await this.sleep(1500);
        await page.click(`//button[@class='cancel mr-1']/following-sibling::button[1]`);
        await this.sleep(4000);

        const after_no_of_rows_in_table = await page.locator(`//table[@class='table']/tbody[1]/tr`).count();
        console.log('Total Workflows After Deletion: ' + after_no_of_rows_in_table);
        expect(before_no_of_rows_in_table).not.to.equal((after_no_of_rows_in_table + "  d"));
    }
    async Duplicate_transition_from_state1_to_state4(transition, state1, state2) {
        await this.sleep(2500);
        await page.hover(`(//td[@class='btn-action'])[1]`);
        await page.click(CWFlocator.a_Delete_Transition.toString());
        await this.sleep(3500);
        await page.type(CWFlocator.Input_Transition_name.toString(), ` `);
        await page.type(CWFlocator.Input_Transition_name.toString(), transition);
        try {
            await page.selectOption(CWFlocator.Select_state2.toString(), { label: state2 + newDate });
        } catch (err) {
            await page.selectOption(CWFlocator.Select_state2.toString(), { label: state2 });
        } //save
        await page.click(CWFlocator.Button_Save.toString());
        await this.sleep(2000);
    }
    async end_tour() {
        await this.sleep(2000);
        // try {
        //     await Promise.all([
        //         page.waitForNavigation({ timeout: 50000 }),
        //         page.goto(`https://app1.spotlighttms.com/customerFeatures/list`)
        //     ]);
        //     this.sleep(5000);
        //     await page.click(`#step-7 > div.popover-navigation > button`);
        // } catch {}
    }
    async Edit_transition_from_state1_to_state4(TN, transition, state1, state2) {
        await page.hover(`(//td[@class='btn-action'])[1]`);

        await page.click(CWFlocator.a_Edit_Transition.toString());
        await this.sleep(2500);
        await page.type(CWFlocator.Input_Transition_name.toString(), `Edited `);
        await this.sleep(500);
        await page.click(`span.dropdown-btn`);
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[1]`); //system

        await page.click(CWFlocator.Button_Save.toString());
        await this.sleep(2000);
    }
    async Move_transition(TN, Direction) {

        await this.sleep(2500);
        if (Direction == 'up') {
            await page.hover(`(//td[@class='btn-action'])[2]`);
            await page.hover(`(//i[@ngbtooltip='Up'])[` + TN + `]`);
            await page.click(`(//i[@ngbtooltip='Up'])[` + TN + `]`);
        } else if (Direction == 'Down') {
            await page.hover(`(//td[@class='btn-action'])[1]`);
            await page.hover(`(//i[@ngbtooltip='Down'])[` + TN + `]`);
            await page.click(`(//i[@ngbtooltip='Down'])[` + TN + `]`);
        }
        await this.sleep(4000);
    }
    async Create_a_user_group_and_add_users_in_it(UG) {
        this.user_Group_name = UG;
        await page.fill(`//input[@id='inlineFilterText3773']`, "Automator");
        await page.press(`//input[@id='inlineFilterText3773']`, 'Enter');
        await this.sleep(2000);
        await page.click(`(//span[@title='Delete'])[1]`); //Delete
        await this.sleep(2000);
        let warn = await page.$eval(`//div[@class='notification success']//p[1]`, (el) => el.innerHTML);
        expect(warn.replace(` `, ``).substring(12, 44)).to.equal(`User group deleted successfully!`);

        try { await page.click(`(//a[@title='Remove All Filters'])[2]`); } catch {}
        await page.click(`//li[@title='Create User Group']`);
        await page.type(`//input[@placeholder='User Group Name']`, this.user_Group_name + " " + dateSec);
        await page.type(`//input[@placeholder='Search for Users']`, `Raees jamal`);
        await this.sleep(1000);
        await page.click(`//ul[@id='userSearchResults']//li[1]`);
        await page.click(`//a[@class='btn btn-blue']`);
        await page.type(`//input[@placeholder='Search for Users']`, `Umair Aslam ssa`);
        await this.sleep(3000);
        await page.fill(`//input[@placeholder='Search for Users']`, `umair aslam user`);
        await page.type(`//input[@placeholder='Search for Users']`, ` `);
        await this.sleep(1000);
        await page.click(`//ul[@id='userSearchResults']//li[1]`);
        await page.click(`//a[@class='btn btn-blue']`);
        await page.type(`//input[@placeholder='Search for Users']`, `umair aslam admin`);
        await this.sleep(1000);
        await page.click(`//ul[@id='userSearchResults']//li[1]`);
        await page.click(`//a[@class='btn btn-blue']`);
        await this.sleep(2000);
        await page.click(`//button[@type='submit']`); //save

    }
    async Add_Admin_using_Filter(UG) {
        await this.sleep(2000);
        await page.fill(`//input[@id='inlineFilterText3773']`, UG + " " + dateSec);
        await page.press(`//input[@id='inlineFilterText3773']`, 'Enter');

        await page.click(`(//span[@title='Edit'])[1]`);
        await this.sleep(2000);
        await page.click(`//input[@type='checkbox']`);
        await page.type(`//input[@placeholder='Search for Users']`, `admin`);
        await this.sleep(1000);
        await page.click(`//ul[@id='userSearchResults']//li[1]`);
        await page.click(`//a[@class='btn btn-blue']`);
        await this.sleep(2000);
        ////delete
        await page.click(`(//span[@class='close'])[3]`);
        await page.click(`(//span[@class='close'])[3]`);
        await page.click(`(//span[@class='close'])[3]`);
        await page.click(`(//span[@class='close'])[3]`);
        await this.sleep(5000);
        // await page.on('dialog', async dialog => {
        //     console.log(dialog.message());
        //     dialog.accept();
        // });
        await page.click(`//button[@type='submit']`); //save

    }
    async Submit_CWF_Ticket_Only() {
        await Promise.all([
            page.click(LandingLocator.Submit.toString())
        ]);
        await this.sleep(6000);
    }
    async Submit_CWF_Ticket() {
        await Promise.all([
            page.click(LandingLocator.Submit.toString())
        ]);
        await this.sleep(10000);
        await page.waitForSelector(`//*[@id="skip-content-main-container"]/main/div[5]/div/app-order-guest-list/div/div[2]/div/div[2]/div[2]/div[1]/p/a`);
        order_id = (await page.$eval(`//*[@id="skip-content-main-container"]/main/div[5]/div/app-order-guest-list/div/div[2]/div/div[2]/div[2]/div[1]/p/a`, (el) => el.innerHTML));
        console.log(order_id);
        var data = await page.$eval(LandingLocator.CartOrderConfirmation.toString(), el => el.innerText);
        expect(data).to.equal('Cart Order Confirmation');
        await page.click(`//div[@class='col-lg-2 col-md-2']//a[1]`);
        await page.waitForSelector(`(//span[@class='labelSingle_odr_newUI'])[1]`);
        let textt = await page.$eval(`(//span[@class='labelSingle_odr_newUI'])[1]`, el => el.innerText);
        console.log(textt);
        let url = await page.url.toString();
        while (textt.includes(`TRANSITION`)) {
            textt = ``;
            await page.reload();
            await this.sleep(2000);
            textt = await page.$eval(`(//span[@class='labelSingle_odr_newUI'])[1]`, el => el.innerText);
            console.log(textt);
        }
        await this.MovetoNextState(2);

    }
    async Submit_CWF_Ticket_Inline() {
        await Promise.all([
            page.click(LandingLocator.Submit.toString())
        ]);
        await this.sleep(10000);
        await page.waitForSelector(`//*[@id="skip-content-main-container"]/main/div[5]/div/app-order-guest-list/div/div[2]/div/div[2]/div[2]/div[1]/p/a`);
        order_id = (await page.$eval(`//*[@id="skip-content-main-container"]/main/div[5]/div/app-order-guest-list/div/div[2]/div/div[2]/div[2]/div[1]/p/a`, (el) => el.innerHTML));
        console.log(order_id);
        var data = await page.$eval(LandingLocator.CartOrderConfirmation.toString(), el => el.innerText);
        expect(data).to.equal('Cart Order Confirmation');
        await page.click(`//div[@class='col-lg-2 col-md-2']//a[1]`);
        await page.waitForSelector(`(//span[@class='labelSingle_odr_newUI'])[1]`);
        // await page.click(`(//input[@type='checkbox'])[2]`);
    }
    async Perform_Inline_Transitons_and_move_Next() {
        const [page1] = await Promise.all([
            page.waitForEvent('popup'),
            page.click(`(//span[@class='labelSingle_odr_newUI']//a)[2]`)
        ]);
        await this.sleep(4000);
        await page1.type(`//input[@name='saved_user_name']/following-sibling::input[1]`, 'Umair Aslam SSA');
        await page1.press(`//input[@name='saved_user_name']/following-sibling::input[1]`, 'ArrowDown');
        await page1.press(`//input[@name='saved_user_name']/following-sibling::input[1]`, 'Enter');
        await this.sleep(3000);
        await page1.selectOption('select[name="treq"]', '1');
        await page1.selectOption(`//div[@id='orderPurpose']//select[1]`, { index: 3 });
        await page1.click(`(//div[@id='order-invitee']//div)[1]`);
        await page1.click(`(//span[@class='invitee_avatar_newUI']/following-sibling::span)[2]`);
        // await page1.locator(`//input[@id='temp_autocomplete_inviteeName_text']/following-sibling::input[1]`).type('Umair Aslam');
        // await page1.locator(`//input[@id='temp_autocomplete_companyId_text']/following-sibling::input[1]`).type('Techtronix');
        await this.sleep(3000);
        await page1.locator(`//select[@id='noTicket']`).selectOption('1');
        await page1.locator(`//a[@id='invSave']//span[1]`).click();
        await page1.locator(`(//input[@value='Submit Order'])[1]`).click();
        //////////////////Move in next
        var status = ``;
        await page1.click(`//div[@class='labelbg_odr_newUI']/following-sibling::select[1]`);
        await page1.selectOption(`//div[@class='labelbg_odr_newUI']/following-sibling::select[1]`, { index: 1 });
        await page1.click(`//input[@value='Approve Order']`);
        await this.sleep(3000);
        console.log('Order Moved in Next state:: ');
        // status = await page1.$eval(`//select[@id='order_status']//option[1]`, (el) => el.innerHTML);
        await page1.selectOption(`//div[@class='labelbg_odr_newUI']/following-sibling::select[1]`, { index: 2 });
        await page1.click(`//input[@value='Deny Order']`);
        console.log('Order Moved in Next state:: ');
        await this.sleep(3000);

    }
    async MovetoNextState(num) {
        try {
            var status = ``;
            for (let index = 0; index < num; index++) {
                await page.click(`//div[@class='labelbg_odr_newUI']/following-sibling::select[1]`);
                try {
                    status = await page.$eval(`//select[@id='order_status']//option[2]`, (el) => el.innerHTML);
                    await page.selectOption(`//div[@class='labelbg_odr_newUI']/following-sibling::select[1]`, { index: 2 });
                } catch {
                    status = await page.$eval(`//select[@id='order_status']//option[1]`, (el) => el.innerHTML);
                    await page.selectOption(`//div[@class='labelbg_odr_newUI']/following-sibling::select[1]`, { index: 1 });
                }
                console.log('Order Moved in Next state ' + status)
                await this.sleep(3000);
            }
        } catch (err) {}

    }
    async MovetoNextState_inline(num) {
        var status = ``;
        await this.sleep(5000);
        await page.waitForSelector(`//td[contains(@class,'tdborder_newUI')]//input[1]`);
        await page.click(`(//tr[@valign='top']//td)[3]`);
        await page.waitForSelector(`(//input[@type='checkbox'])[2]`);
        await page.click(`(//input[@type='checkbox'])[2]`);
        // await this.sleep(2000);
        // try {
        for (let index = 0; index < Number(num); index++) {
            console.log("iteration:   " + index);
            await page.click(`//div[@id='invitee-list']//select[1]`);
            try {
                await page.selectOption(`//div[@id='invitee-list']//select[1]`, { index: 1 });
                status = await page.$eval(`(//select[@id='order_transition_status']//option)[3]`, (el) => el.innerHTML);
            } catch {}
            // try {
            await page.on('dialog', async dialog => {
                console.log(dialog.message())
                await this.sleep(5000)
                await dialog.accept()
                console.log(`
                        dialog Clicked Successfully `)
            });
            // } catch (err) {}
            console.log('Order Moved in Next state ' + status);
            status = ``;
            await this.sleep(20000);
            if (index != 0 || index != `0`) {
                await page.waitForSelector(`//a[@class='close-msg']/following-sibling::p[1]`);
                order_id = (await page.$eval(`//div[text()='Order ID']/following-sibling::span`, (el) => el.innerHTML));
                console.log(`New Order id is: ` + order_id);
            } //
        }
    }
    async Move_Previous_order_in_next_state() {
        // await page.goto(`
        https: //app1.spotlighttms.com/procurementRequest/show/id/` + `4105625`);
            await page.goto(`https://app1.spotlighttms.com/procurementRequest/show/id/` + order_id);await this.sleep(3000);await this.MovetoNextState(2);
    }
    async Post_Function_Tab(LExpression, Operation, RExpression, status) {
        await this.warning();
        await this.sleep(2500);
        await page.click(`(//a[@role='tab'])[2]`);
        await page.selectOption(`//select[@formcontrolname='function_list_id']`, { index: 1 });
        await this.sleep(1500);

        await page.click(`(//span[@class='dropdown-multiselect__caret'])[2]`);
        await this.sleep(1500);
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[1]`); //SSA
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[2]`); //SSA
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[9]`); //SSA
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[8]`); //Requeestor
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[13]`); //Admin
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[4]`); //cSA
        await this.sleep(3000);
        if (status == `Approval`) {
            await page.selectOption(`//label[@class='ng-star-inserted']/following-sibling::select[1]`, { index: 1 });
        } else if (status == `Denial`) {
            await page.selectOption(`//label[@class='ng-star-inserted']/following-sibling::select[1]`, { index: 2 });
        } else if (status == `Created`) {
            await page.selectOption(`//label[@class='ng-star-inserted']/following-sibling::select[1]`, { index: 7 });
        }
        await this.sleep(3000);
        await page.click(`//label[@for='pf-yes0']`);
        await this.sleep(3000);
        await page.selectOption(CWFlocator.Select_Left_Expression2.toString(), path_value[path_text.indexOf(LExpression)]);
        await page.selectOption(CWFlocator.Select_Operation2.toString(), Operation);
        await page.click(CWFlocator.Input_Right_Expression2.toString());
        await page.fill(CWFlocator.Input_Right_Expression2.toString(), RExpression);
        await this.sleep(2000);

        await this.sleep(1500);

    }
    async Verify_Post_Function_Tab(TN, transition, state1, state2, LExpression, Operation, RExpression) {
        await this.warning();

        await this.select_add_transition(TN);
        await this.sleep(2500);
        await page.type(CWFlocator.Input_Transition_name.toString(), transition);

        await page.click(CWFlocator.Select_who_allowed.toString());
        // await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[1]`); //system
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[2]`); //SSA
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[9]`); //SSA
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[8]`); //Requeestor
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[1]`); //Admin
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[4]`); //cSA
        await this.sleep(1500);
        await page.click(`(//a[@role='tab'])[2]`);
        await page.selectOption(`//select[@formcontrolname='function_list_id']`, { index: 1 });
        await this.sleep(1500);

        await page.click(`(//span[@class='dropdown-multiselect__caret'])[2]`);
        await this.sleep(1500);
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[2]`); //SSA
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[9]`); //SSA
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[8]`); //Requeestor
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[1]`); //Admin
        await page.click(`(//li[@class='multiselect-item-checkbox ng-star-inserted'])[4]`); //cSA
        await this.sleep(3000);
        await page.click(`//label[@for='pf-yes0']`);
        await page.selectOption(`//label[@class='ng-star-inserted']/following-sibling::select[1]`, { index: 10 });

        await this.sleep(3000);
        await page.selectOption(CWFlocator.Select_Left_Expression.toString(), path_value[path_text.indexOf(LExpression)]);
        await page.selectOption(CWFlocator.Select_Operation.toString(), Operation);
        await page.click(CWFlocator.Input_Right_Expression.toString());
        await page.fill(CWFlocator.Input_Right_Expression.toString(), RExpression);
        await this.sleep(2000);

        await this.sleep(1500);

        try {
            await page.selectOption(CWFlocator.Select_state2.toString(), { label: state2 + newDate });
        } catch (err) {
            await page.selectOption(CWFlocator.Select_state2.toString(), { label: state2 });
        }
        ////adddeddd
        // await this.Verify_Post_Function_Tab(TN, transition, state1, state2, LExpression, Operation, RExpression);
        //save
        try {
            await page.click(CWFlocator.Button_Save.toString());
        } catch (err) { //cancel
            await page.click(`(//button[contains(@class,'btn btn-add')])[3]`);
        }
        await this.sleep(1500);
        // }
        await this.warning();

        // await page.click(`(//a[@draggable='false'])[3]`);
        await this.sleep(5000);

    }
    async Edit_transition_add_custom_user_group(TN, UG) {
        this.user_Group_name = UG;
        await this.sleep(1500);
        await page.click(CWFlocator.a_Edit_Transition.toString());
        await this.sleep(2500);
        await page.type(CWFlocator.Input_Transition_name.toString(), `
            Edited_ `);
        await this.sleep(500);
        await page.click(`
            span.dropdown - btn `);
        await page.click(` //input[@aria-label='` + this.user_Group_name.toString() + " " + dateSec + `']/following-sibling::div[1]`); //system

        await page.click(CWFlocator.Button_Save.toString());
        await this.sleep(5000);
    }
    async Verify_Full_Screen_and_Zoom_I_O() {
        await page.click(`(//button[@type='button']//i)[3]`);
        await this.sleep(3000);
        await page.click(`(//button[@type='button']//i)[3]`);
        await page.click(`(//button[@type='button']//i)[1]`);
        await page.click(`(//button[@type='button']//i)[1]`);
        await page.click(`(//button[@type='button']//i)[1]`);
        await page.click(`(//button[@type='button']//i)[1]`);
        await page.click(`(//button[@type='button']//i)[1]`);
        await page.click(`(//button[@type='button']//i)[2]`);
        await page.click(`(//button[@type='button']//i)[2]`);
        await page.click(`(//button[@type='button']//i)[2]`);
        await page.click(`(//button[@type='button']//i)[2]`);
        await page.click(`(//button[@type='button']//i)[2]`);



    }
    async Create_package_order() {

        await page.goto(`https://app1.spotlighttms.com/app/event-detail/` + event_id);
        await page.click(`(//a[contains(@class,'btn btn-request')])[2]`);
        await page.click(`//button[contains(@class,'btn button')]`);
        await this.sleep(3000);
        await page.selectOption(`(//div[@class='content pt-1']//select)[1]`, { index: 1 });
        await page.selectOption(`(//div[@class='content pt-1']//select)[2]`, { index: 1 });
        await page.fill(`(//input[@min='0'])[1]`, '35');
        await page.click(`//button[@class='btn button']//span[1]`);
    }
}
module.exports = { CWF };