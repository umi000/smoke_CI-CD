const { Given, When, Then } = require('cucumber')
const { LoginPage } = require('../page_object/login.page')
const { Graph } = require('../page_object/Graph.page');

const loginpage = new LoginPage();
const graph = new Graph();

Then('Verify aggregate function count for {string}', async(R_name) => {
    await graph.Verify_aggregate_function_of_count(R_name);
});
Then('Verify aggregate function Average for {string}', async(R_name) => {
    await graph.Verify_aggregate_function_of_average(R_name);
});
Then('Apply aggregate function {string} on {string} Report', async(func, R_name) => {
    await graph.Apply_aggregate_function(R_name, func);
});
Then('Apply aggregate function on {string} Report', async(R_name) => {
    await graph.Apply_aggregate_function(R_name);
});
Then('Reduce no of Tickets using multiple inline filters', async() => {
    await graph.Reduce_no_of_Tickets_using_multiple_inline_filters();
});
Then('Verify aggregate function Sum for {string}', async(R_name) => {
    await graph.Verify_aggregate_function_of_sum(R_name);
});
Then('Verify: Is aggregation disabled', async() => {
    await graph.Is_aggregation_disabled();
});
Then(`Verify {string} Graph with Label as {string} and Data Column as {string} for {string}`, async(_type, Label, Data_Column, R_name) => {
    await graph.Verify_Pie_graph(_type, Label, Data_Column, R_name);

});
Then('Verify Check box', async() => {
    await graph.Verify_Check_box();
});
Then('Reset View', async() => {
    await graph.reset_view();
});