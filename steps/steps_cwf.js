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
Then('Create New workflow with name {string}', async(WF) => {
    await cwf.Create_New_workflow_with_name(WF);
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
Then(`Create New Workflow {string} and Validate Default states Created, Approved, Denied`, async(WF) => {
    await cwf.Create_New_Workflow_and_Validate_Default_states_Created_Approved_Denied(WF);
});
Then(`Validate Default image contain all 3 Default states`, async() => {
    await cwf.Validate_Default_image_contain_all_3_Default_states();
});
Then(`Navigate to Configurable Workflow`, async() => {
    await loginpage.Dismiss_Card_SSA();
    await cwf.Navigate_to_Configurable_Workflow();
});
Then(`Navigate to Custom User Settings`, async() => {
    await marketMaintainance.end_tour();
    await loginpage.Dismiss_Card_SSA();
    await cwf.Navigate_to_Custom_User_Settings();
});
Then(`Navigate to Ticket Inventory`, async() => {
    await marketMaintainance.end_tour();
    await loginpage.Dismiss_Card_SSA();
    await cwf.Navigate_to_Ticket_Inventory();
});
Then(`Sort workflows by Date updated Desc and edit workflow`, async() => {
    await cwf.Sort_workflows_by_Date_updated_Desc_and_edit_workflow();
});
Then('Move Previous order in next state', async() => {
    await cwf.Move_Previous_order_in_next_state();
});
Then(`Verify UI elements Add State`, async() => {
    await cwf.verify_UI_elements_Add_State();
});
Then(`Add State as {string}`, async(state1) => {
    await cwf.Add_State(state1);
});
Then(`Add Transiton{string} as {string} from {string} to {string}`, async(TN, transition, state1, state2) => {
    await cwf.Add_Transiton_from_state1_to_state2(TN, transition, state1, state2);
});
Then(`Set Current Date Time Stamp`, async() => {
    await cwf.Set_Current_Date_Time_Stamp();
});
Then(`Add Transiton{string} as {string} from {string} to {string} with permission and condition as {string} {string} {string}`, async(TN, transition, state1, state2, LExpression, Operation, RExpression) => {
    await cwf.Add_Transiton_from_state1_to_state2_with_permission(TN, transition, state1, state2, LExpression, Operation, RExpression, "is_post", "status");
});
Then(`Add Transiton{string} as {string} from {string} to {string} with permission and condition as {string} {string} {string} {string} {string}`, async(TN, transition, state1, state2, LExpression, Operation, RExpression, is_post, status) => {
    await cwf.Add_Transiton_from_state1_to_state2_with_permission(TN, transition, state1, state2, LExpression, Operation, RExpression, is_post, status);
});
Then(`Add Transiton{string} as {string} from {string} to {string} with permission and condition as {string} {string} {string} and {string} {string} {string}`, async(TN, transition, state1, state2, LExpression, Operation, RExpression, LExpression1, Operation1, RExpression1) => {
    await cwf.Add_Transiton_from_state1_to_state2_with_permission_2(TN, transition, state1, state2, LExpression, Operation, RExpression, LExpression1, Operation1, RExpression1);
});
Then(`Add Transiton{string} as {string} from {string} to {string} with permission and condition as {string} {string} {string} and {string} {string} {string} and {string} {string} {string}`, async(TN, transition, state1, state2, LExpression, Operation, RExpression, LExpression1, Operation1, RExpression1, LExpression2, Operation2, RExpression2) => {
    await cwf.Add_Transiton_from_state1_to_state2_with_permission_3(TN, transition, state1, state2, LExpression, Operation, RExpression, LExpression1, Operation1, RExpression1, LExpression2, Operation2, RExpression2);
});
Then(`Duplicate transition as {string} from {string} to {string}`, async(transition, state1, state2) => {
    await cwf.Duplicate_transition_from_state1_to_state4(transition, state1, state2);
});
Then(`Edit transition{string} as {string} from {string} to {string}`, async(TN, transition, state1, state2) => {
    await cwf.Edit_transition_from_state1_to_state4(TN, transition, state1, state2);
});
Then(`Verify Full Screen and Zoom In Out`, async() => {
    await cwf.Verify_Full_Screen_and_Zoom_I_O();
});
Then(`Delete Current Workflow`, async() => {
    await cwf.DeleteCurrentWorkflow();
});
Then(`Delete Current Transition`, async() => {
    await cwf.DeleteTransition();
});
Then(`Move transition{string} in {string}`, async(TN, Direction) => {
    await cwf.Move_transition(TN, Direction);
});
Then(`Create a user group as {string} and add users in it`, async(UG) => {
    await cwf.Create_a_user_group_and_add_users_in_it(UG);
});
Then(`Add Admin using Filter in {string}`, async(UG) => {
    await cwf.Add_Admin_using_Filter(UG);
});
Then(`Set Venue Admin`, async() => {
    await cwf.Set_Venue_Admin();
});
Then(`Set Order Purpose approver`, async() => {
    await cwf.Set_Order_Purpose_approver();
});
Then(`Edit transition{string} and add {string}`, async(TN, UG) => {
    await cwf.Edit_transition_add_custom_user_group(TN, UG);
});
Then(`Attach Workflow on ticket as {string} via inventory and as well as from workflow assignment report IF getting error`, async(WF) => {
    await cwf.Attach_Workflow_on_ticket(WF);
});
Then(`Attach Workflow on ticket as {string} using Bulk Edit`, async(WF) => {
    await cwf.Attach_Workflow_on_ticket_bulk_Edit(WF);
});
Then(`Attach Same Workflow on ticket as {string}`, async(WF) => {
    await cwf.Attach_same_Workflow_on_ticket(WF);
});
Then(`Move on event and Insert Ticket details as order type {string} for {string}`, async(order_type, user) => {
    await cwf.Move_on_event_Insert_Ticket_Details(order_type, user);
});
Then(`Move on event and Insert Ticket details as order type {string} for {string} {string}`, async(order_type, user, TG) => {
    await cwf.Move_on_event_Insert_Ticket_Details_for_Bulk_approval(order_type, user, TG);
});
Then(`Create package order`, async() => {
    await cwf.Create_package_order();
});
Then(`Perform Bulk Order`, async() => {
    await cwf.Perform_Bulk_Order();
});
Then('Submit CWF Ticket', async() => {
    await cwf.Submit_CWF_Ticket();
});
Then('Submit CWF Ticket Only', async() => {
    await cwf.Submit_CWF_Ticket_Only();
});
Then('Submit CWF Ticket Inline', async() => {
    await cwf.Submit_CWF_Ticket_Inline();
});
Then('Perform Inline Transitons and move Next', async() => {
    // await cwf.Perform_Inline_Transitons_and_move_Next();
    await cwf.MovetoNextState_inline('1');
});
Then(`Verify Post Function Tab Transiton{string} as {string} from {string} to {string} with permission and condition as {string} {string} {string}`, async(TN, transition, state1, state2, LExpression, Operation, RExpression) => {
    await cwf.Verify_Post_Function_Tab(TN, transition, state1, state2, LExpression, Operation, RExpression);
});