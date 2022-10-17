const { Given, When, Then } = require('cucumber')
const { LoginPage } = require('../page_object/login.page')
const { LandingPage } = require('../page_object/landing.page')
const { MarketMaintainance } = require('../page_object/MarketMaintainance.page');
const { OrderApproval } = require('../page_object/OrderApproval.page');
const { DvmSeatics } = require('../page_object/DvmSeatics.page');

const loginpage = new LoginPage();
const landingpage = new LandingPage();
const marketMaintainance = new MarketMaintainance();
const Dvmseatics = new DvmSeatics();


Then('Select Ticket Type Dropdown as {string}', async(type) => {
    await marketMaintainance.select_all_location();
    await Dvmseatics.Select_ticket_type_Dropdown(type);
});
Then('Verify Reset button', async() => {
    await Dvmseatics.Reset_Map();
});
Then('read map', async() => {
    await Dvmseatics.Read_map();
});
Then('Read map tickets Dynamically & Verify No of tickets', async() => {
    await Dvmseatics.Read_map_dynamically_and_Verify_No_of_tickets();
});
Then('Select random event from Landing page', async() => {
    await Dvmseatics.Select_LandingPage_Random_Event();
});
Then('Check Zoom in & Zoom out functionality', async() => {
    await Dvmseatics.Check_Zoom_in_and_Zoom_out_functionality();
});