const common = `
  --require runner/hooks.js 
  --require runner/assertions.js
  --require steps/steps_graph.js 
  --require steps/steps_order_creation.js
  --require steps/steps_market_maintainance.js
  --require steps/steps_order_approval.js
  --require steps/steps_payment.js
  --require steps/steps_Login.js
  --require steps/steps_shipping.js
  --require steps/steps_DvmSeatics.js
  --require steps/steps_Report.js
  --require steps/steps_Register_forgot_user.js
  --require report.js
  `;

module.exports = {
    default: `${common} features/**/*.feature --publish`
};
