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

Then('Verify Alpha is Enable', async() => {
    await paymentModule.Verify_alpha_is_enable();
    await loginpage.navigate(loginLocator.locators.url.toString());
});
Then('Perform Payment using {string}', async(PaymentData) => {
    await paymentModule.Perform_Payment(PaymentData);
});
Then('Refund Order as {string}', async(Refund_Operation) => {
    await paymentModule.Refund_Order(Refund_Operation);
});
// Then('test', async() => {
//     await paymentModule.test();
// });