const { Given, When, Then } = require('cucumber')
const { LoginPage } = require('../page_object/login.page')
const { LandingPage } = require('../page_object/landing.page')
const { MarketMaintainance } = require('../page_object/MarketMaintainance.page')
const { OrderApproval } = require('../page_object/OrderApproval.page')
const { PaymentModule } = require('../page_object/Payment.page')
const loginLocator = require('../page_locators/loginLocator')

const loginpage = new LoginPage();
const landingpage = new LandingPage();
const marketmaintainance = new MarketMaintainance();
const orderApproval = new OrderApproval();
const paymentModule = new PaymentModule();

When('we forgot password then we have to enter username as {string}', async(username) => {
    await loginpage.forgot_Password(username);
});
When('we forgot username then we have to enter email as {string}', async(email) => {
    await loginpage.forgot_username(email);
});
When('We Enter Company code as {string} and Email as {string}', async(code, email) => {
    await loginpage.Register_user(code, email);
});
Then('verify username Warning: {string}', async(email) => {
    await loginpage.verify_username_warning(email);
});
Then('verify password Warning: {string}', async(warning) => {
    await loginpage.verify_password_warning(warning);
});
Then('verify warning: {string}', async(warning) => {
    await loginpage.verify_warning(warning);

});