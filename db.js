// const { expect } = require("chai");
// const { createConnection } = require("mysql");

// var con = createConnection({
//     host: `qa-c.corwpp5wzvrb.us-west-2.rds.amazonaws.com`,
//     port: "3306",
//     user: `umair.aslam`,
//     database: `spotlight_tms_UI_qa10`,
//     password: `BNMznUvIlkwioi6#`

// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query(`
//         SELECT id, invitation_code, invitation_sent, request_id, email_host_on_response, invitee_status, recipient_first_name FROM spotlight_tms_UI_qa10.tms_procurement_request_invitees WHERE tms_procurement_request_invitees.request_id = '54940'
//         AND id NOT IN(SELECT invitee_id FROM spotlight_tms_UI_qa10.tms_procurement_request_invitee_information WHERE request_id = '54940')
//         `, function(err, result, fields) {
//         if (err) throw err;
//         console.log(result[0].event_id);
//         console.log(result);
//     });
// });