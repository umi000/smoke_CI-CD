const { Given, When, Then } = require('cucumber')
const { LoginPage } = require('../page_object/login.page')
const { LandingPage } = require('../page_object/landing.page')
const { MarketMaintainance } = require('../page_object/MarketMaintainance.page');
const { OrderApproval } = require('../page_object/OrderApproval.page');
const { DvmSeatics } = require('../page_object/DvmSeatics.page');
const { CWF } = require('../page_object/cwf.page');

const loginpage = new LoginPage();
const landingpage = new LandingPage();
const marketMaintainance = new MarketMaintainance();
const Dvmseatics = new DvmSeatics();
const cwf = new CWF();


Then('Verify Configurable Workflow is Enable', async() => {
    await cwf.Verify_Configurable_Workflow_is_Enable();
});
Then('Verify Default Workflow is Disable', async() => {
    await cwf.Verify_Default_Workflow_is_Disable();
});
Then('Verify Configurable Workflow is Visible in Menu', async() => {
    await cwf.Verify_Configurable_Workflow_is_Visible_in_Menu();
});
Then(`Verify Headers`, async() => {
    await cwf.Verify_Headers();
});
Then(`Verify Title`, async() => {
    await cwf.Verify_Title();
});
Then(`Verify Create Button`, async() => {
    await cwf.Verify_Button();
});
Then(`Verify List elements`, async() => {
    await cwf.Verify_List_elements();
});
Then(`Validate Default states Created, Approved, Denied`, async() => {
    await cwf.Validate_Default_states_Created_Approved_Denied();
});
Then(`Validate Default image contain all 3 Default states`, async() => {
    await cwf.Validate_Default_image_contain_all_3_Default_states();
});
Then(`Navigate to Configurable Workflow`, async() => {
    loginpage.Dismiss_Card_SSA();
    await cwf.Navigate_to_Configurable_Workflow();
});
Then(`Sort workflows by Date updated Desc and edit workflow`, async() => {
    await cwf.Sort_workflows_by_Date_updated_Desc_and_edit_workflow();
});
Then(`Add State as {string} and verify UI elements`, async(state1) => {
    await cwf.Add_State_and_verify_UI_elements(state1);
});