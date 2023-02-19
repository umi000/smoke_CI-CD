const { Given, When, Then } = require('cucumber')
const { LoginPage } = require('../page_object/login.page')
const { LandingPage } = require('../page_object/landing.page')
const { MarketMaintainance } = require('../page_object/MarketMaintainance.page');
const { OrderApproval } = require('../page_object/OrderApproval.page');

const loginpage = new LoginPage();
const landingpage = new LandingPage();
const marketMaintainance = new MarketMaintainance();

Then('Navigate to CustomerFeatures tab', async() => {
    await loginpage.Dismiss_Card_SSA();
    await marketMaintainance.end_tour();
    await marketMaintainance.select_customer_feature();

});
Then('Verify Hide External Ticket is off', async() => {
    await marketMaintainance.Verify_Hide_External_Tickets();
});
Then('Verify Stub Hub Ticket is enable', async() => {
    await marketMaintainance.Verify_Stub_Hub_Tickets();

});
Then('Select Marketplace ticket', async() => {
    await marketMaintainance.navigate_home();
    await loginpage.Dismiss_Card_SSA();
    await marketMaintainance.select_all_location();
    await marketMaintainance.Select_Marketplace_ticket();
});
Then('Select Company Owned ticket for {string} and user {string} for shipping', async(Order_type, user) => {
    if (user == 'SSA') {
        await marketMaintainance.navigate_home();
        await loginpage.Dismiss_Card_SSA();
    } else if (user == 'CSA') {
        await loginpage.Dismiss_Card();
    }
    await landingpage.select_location('All Location', 'Company Owned');
    // await marketMaintainance.select_all_location();
    await marketMaintainance.select_Ticket_from_LandingPage_for_shipping(Order_type);
});

Then('Select Company Owned ticket for {string} and user {string}', async(Order_type, user) => {
    if (user == 'SSA') {
        await marketMaintainance.navigate_home();
        await loginpage.Dismiss_Card_SSA();
    } else if (user == 'CSA') {
        try { await loginpage.Dismiss_Card(); } catch {}
    }
    await landingpage.select_location('All Location', 'Company Owned');

    // await marketMaintainance.select_all_location();
    await marketMaintainance.select_Ticket_from_LandingPage(Order_type);
});
//other user
Then('Select Marketplace ticket_', async() => {
    // await marketMaintainance.navigate_home();
    await loginpage.Dismiss_Card();
    await marketMaintainance.Select_Marketplace_ticket();
});
Then('Scroll page Down', async() => {
    await marketMaintainance.scroll_page_down();
});

Then('Select Marketplace ticket for other users', async() => {
    // await marketMaintainance.navigate_home();
    // await loginpage.Dismiss_Card();
    await marketMaintainance.Select_Marketplace_ticket__();
});
Then('Select Marketplace Dropdown', async() => {
    // await marketMaintainance.navigate_home();
    await marketMaintainance.Select_Marketplace_ticket_Dropdown();
});
Then('Insert Order Details for {string}', async(type) => {
    await marketMaintainance.Insert_Order_Details(type);
});
Then('Insert_Order_Details_for {string} purchase_and_for {string}', async(order_type, user) => {
    await marketMaintainance.Insert_Order_Details_others(order_type, user);
});
Then('Submit for {string}', async(user) => {
    await marketMaintainance.Submit(user);
});
Then('Buy then continue', async() => {
    await marketMaintainance.Buy_Continue();
});
Then('Select Random event', async() => {
    await marketMaintainance.Select_Random_event();
});
Then('Change order status as {string} for {string} purchase', async(status, type) => {
    await marketMaintainance.Change_Order_status(status, type);
});
Then('Approve Order', async() => {
    await marketMaintainance.ApproveOrder();
});