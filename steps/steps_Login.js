const { Given, When, Then } = require('cucumber')
const { LoginPage } = require('../page_object/login.page')
const { expect } = require('chai')

const loginpage = new LoginPage();


Given('Navigate to TicketManager website ==> {string}', async(url) => {
    await loginpage.navigate(url);
});
Given('Navigate to TicketManager website', async() => {
    await loginpage.navigate();
});
When('We Enter Backend Login Creds {string} and {string}', async(username, password) => {
    await loginpage.login_Backend(username, password);
});
When('We Enter Login Creds {string} and {string}', async(username, password) => {
    await loginpage.login(username, password);
});
When('Test start', async() => {
    let error = ' Usernameee';
    expect(error).to.include(' Username ');
});
Then('move on landing page', async function() {
    await loginpage.landing_page();
});
Then(`Create New Customer as {string}`, async function(CustomerName) {
    await loginpage.Create_New_Customer(CustomerName);
});
Then('select customer as {string}', async function(Customer) {
    await loginpage.select_customer(Customer);
});
Then('Hover on avatar and verify dropdown', async function() {
    await loginpage.logout_SSA();
    // await loginpage.Hover_on_avatar_and_verify_dropdown();
});
Then('Search New Customer Name: {string} City: {string} Email: {string} Subdomain {string}', async function(Name, City, Email, Subdomain) {
    await loginpage.search_customer_filter(Name, City, Email, Subdomain);
});
Then('Dismiss_Card', async function() {
    await loginpage.Dismiss_Card();
});
Then('Dismiss_Card_SSA', async function() {
    await loginpage.Dismiss_Card_SSA();
});
Then('Search customer as {string} and SubDomain as {string} on main UI', async function(customer, SubDomain) {
    await loginpage.search_Customer_UI(customer, SubDomain);
});
Then(`Verify cart Icon super title`, async function() {
    await loginpage.Verify_cart_Icon_super_title();
});
Then('Add Random ticket to cart', async function() {
    await loginpage.Add_Random_ticket_to_cart();
});
Then('logout', async function() {
    await loginpage.logout_SSA();
});
Then('logout SSA', async function() {
    await loginpage.logout_SSA();
});
Then('logout Standard User', async function() {
    await loginpage.logout_Standard_User_Admin();
});
Then('logout Admin', async function() {
    await loginpage.Dismiss_Card_SSA_();
    await loginpage.logout_Standard_User_Admin();
});
Then('Read Error for username', async function() {
    await loginpage.Read_Error_of_username();
});

Then('Read Error for password', async function() {
    await loginpage.Read_Error_of_password();
});

Then('Wait for few seconds', async function() {
    await loginpage.sleep(15000);
});