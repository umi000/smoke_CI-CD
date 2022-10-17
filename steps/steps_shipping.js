const { Given, When, Then } = require('cucumber')
const { LoginPage } = require('../page_object/login.page')
const { LandingPage } = require('../page_object/landing.page')
const { MarketMaintainance } = require('../page_object/MarketMaintainance.page')
const { OrderApproval } = require('../page_object/OrderApproval.page')
const { PaymentModule } = require('../page_object/Payment.page')
const { ShippingModule } = require('../page_object/ShippingModule.page')

const loginpage = new LoginPage();
const landingpage = new LandingPage();
const marketmaintainance = new MarketMaintainance();
const orderApproval = new OrderApproval();
const paymentModule = new PaymentModule();
const shippingModule = new ShippingModule();

Then('Verify FedeEx Integration is enable', async() => {
    await shippingModule.Verify_FedeEx_Integration_is_enable();
});
Then('Verify UPS Integration is enable', async() => {
    await shippingModule.Verify_UPS_Integration_is_enable();
});
Then('Process Shipment using FedEx', async() => {
    // await shippingModule.test();
    await shippingModule.Process_FedEx_Shipment();
});
Then('Process Multiple {string} Shipment using First method', async(no_of_tickets) => {
    await shippingModule.Process_Multiple_FedEx_Shipment_first(no_of_tickets);
});
Then('Process Multiple {string} Shipment using Second method', async(no_of_tickets) => {
    await shippingModule.Process_Multiple_FedEx_Shipment_second(no_of_tickets);
});
Then('Process Shipment using UPS', async() => {
    await shippingModule.Process_UPS_Shipment();
});
Then('Cancel Shipment', async() => {
    await shippingModule.Cancel_Shipment();
});
Then('Print Packing List', async() => {
    await shippingModule.Print_Packing_List();
});
Then('test', async() => {
    await shippingModule.test();
});