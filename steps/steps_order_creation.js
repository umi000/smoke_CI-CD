const { Given, When, Then } = require('cucumber')
const { LoginPage } = require('../page_object/login.page')
const { LandingPage } = require('../page_object/landing.page')

const loginpage = new LoginPage();
const landingpage = new LandingPage();

Then('wait for a while', async() => {
    await landingpage.wait_for_a_while();
});
Then('Select Location as {string} and ticket as {string}', async(location, type) => {
    await landingpage.select_location(location, type);
});
Then('Insert Ticket details as order type {string} for {string}', async(order_type, user) => {
    await landingpage.Insert_Ticket_Details(order_type, user);
});
Then('Submit Ticket', async() => {
    await landingpage.Submit_Ticket();
});
Then('Insert first invitee detail for {string}', async(user) => {
    await landingpage.Insert_invitee_default(user);

});

Then('Insert all {string} invitee details', async(no_of_tickets) => {
    await landingpage.Insert_invitees(no_of_tickets);
});
Then('Search event as {string} and add {string} tickets', async(event, no_of_tickets) => {
    await landingpage.Search_event(event, no_of_tickets);
});