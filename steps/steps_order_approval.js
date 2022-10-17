const { Given, When, Then } = require('cucumber')
const { LoginPage } = require('../page_object/login.page')
const { LandingPage } = require('../page_object/landing.page')
const { MarketMaintainance } = require('../page_object/MarketMaintainance.page')
const { OrderApproval } = require('../page_object/OrderApproval.page')

const loginpage = new LoginPage();
const landingpage = new LandingPage();
const marketmaintainance = new MarketMaintainance();
const orderApproval = new OrderApproval();

Then('Verify Approval Manager is Enable', async() => {
    await orderApproval.Verify_Approval_Manager_is_Enable();
});
Then('Set Manager approver as {string} with email as {string}', async(manager_approver, email) => {
    await orderApproval.Set_Approval_Manager_and_email(manager_approver, email);
});
Then('Verify Ticket Approval Manager is Enable', async() => {
    await orderApproval.Verify_Ticket_Approval_Manager_is_Enable();
});
Then('Verify Order purpose approver is Enable', async() => {
    await orderApproval.Verify_Order_purpose_approver_is_Enable();
});
Then('Manager Approval Only as {string} for {string} purchase', async(status, type) => {
    await orderApproval.Manager_Approval_only(status, type);
});
Then('Set Hook Payment Method', async() => {
    await orderApproval.Set_Hook_Payment_Method();
});
Then('Change first status as {string} for {string} from pending manager approval state {string}', async(status, type, isApproveDirectly) => {
    await orderApproval.Change_first_status_as_Approval_Rejection(status, type, isApproveDirectly);
});
Then('Change second status as {string} for {string} from order purpose approval state', async(status, type) => {
    await orderApproval.Change_second_status_as_Approval_Rejection(status, type);
});
Then('Change Third status as {string} for {string} from Pending Review state', async(status, type) => {
    await orderApproval.Change_Third_status_as_Approval_Rejection(status, type);
});
Then('Verify FCFS is Enabled', async() => {
    await orderApproval.Verify_FCFS_is_Enabled();
});
Then('Dismiss_Card_SSA_', async() => {
    await loginpage.Dismiss_Card_SSA_();
});