Feature: QA-184: CWF Settings Maintainance
    Background: Navigation
        Given Navigate to TicketManager website
    Scenario: QA-182==>  Enable settings for CWF
        When We Enter Login Creds "<username>" and "<password>"
        Then move on landing page
        Then Dismiss_Card
        # Then select customer as "<Customer>"
        Then Navigate to CustomerFeatures tab 
        Then Verify Configurable Workflow is Enable
    Examples:
    |username                      |password    |   user  | Customer| no_of_tickets|
    |umair.aslam.ssa@techtronix.biz|Test_12345  |   SSA   | CWF_Automator|  1|
    Scenario: QA-182: Verify UI elements Configurable workflow list page & Validate Default states and default image  
        Then Dismiss_Card_SSA
        And Verify Default Workflow is Disable
        And Verify Configurable Workflow is Visible in Menu        
        Then Verify Headers
        And Verify Title 
        And Verify Create Button 
        And Verify List elements
        Then Validate Default image contain all 3 Default states
   Examples:
    |username                      | password    |   user  | Customer|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   | CWF_Automator|
    Scenario: QA-193: Create custom user groups for CWF
        Then Dismiss_Card_SSA
        Then Set Order Purpose approver
        Then Set Venue Admin
        Then Navigate to Custom User Settings
        Then Create a user group as "<User Group>" and add users in it
        Then Add Admin using Filter in "<User Group>"
    Examples:
     |WF                       |User Group|
     |Automator with permission|Automator |
    Scenario: QA-182: Validate Default states and default image    
        Then Dismiss_Card_SSA
        Then Verify Configurable Workflow is Visible in Menu
        Then Create New Workflow "<WF>" and Validate Default states Created, Approved, Denied
        Then Validate Default image contain all 3 Default states
   Examples:
    |username                      | password    |   user  |WF            |Order_type     | loc            | type         | event| Customer| no_of_tickets|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |ACME_Automator|Business Use   |All Locations   |Company Owned | arena| CWF_Automator|  1|
    Scenario: QA-184: Create workflow WITH PERMISSION for CWF_002 
        Then Set Current Date Time Stamp
        Then Navigate to Configurable Workflow
        # Then Create New Workflow "Automator Sample" and Validate Default states Created, Approved, Denied
        Then Sort workflows by Date updated Desc and edit workflow
        Then Add State as "Pending Manager Approval"
        Then Add State as "Custom 1"
        Then Add State as "Order Purpose Approval"
        Then Add State as "Ticket Admin Approval"
        Then Add State as "Custom 2"
        Then Add State as "waitlisted"
        Then Add State as "Finished"
        # Then Verify Post Function Tab Transiton"1" as "To_Post_func_<state3>" from "<state1>" to "<state3>" with permission and condition as "Order Notes" "contains" "Test12"
        Then Add Transiton"1" as "To manager approval" from "Created" to "Pending Manager Approval" with permission and condition as "Order Notes" "contains" "Test12" "POST" "Created"
        Then Add Transiton"1" as "To Ticket Admin Approval" from "Created" to "Ticket Admin Approval" with permission and condition as "Order Status" "!=" "Denied" and "Tickets face value" "<=" "100" and "Order Status" "!=" "Denied"
        Then Add Transiton"2" as "To approved" from "Pending Manager Approval" to "Approved" with permission and condition as "Invitee Contact Company" "==" "Techtronix" "POST" "Approval"
        Then Add Transiton"2" as "To Custom 1" from "Pending Manager Approval" to "Custom 1" with permission and condition as "Requester Approving Manager Name" "contains" "SSA" and "Invitee Shipping City" "!=" "pakistan" and "Order Status" "==" "Initial"
        Then Add Transiton"3" as "To Finished" from "Denied" to "Finished" with permission and condition as "Ordered Parking Passes" "<" "500"
        Then Add Transiton"3" as "To Order Purpose Approval" from "Denied" to "Order Purpose Approval" with permission and condition as "Event Name" "starts_with" "Los Angeles"
        Then Add Transiton"4" as "To Custom 1" from "Custom 1" to "Order Purpose Approval" with permission and condition as "Order Purpose" "ends_with" "Purpose"
        Then Add Transiton"4" as "To Custom 2" from "Custom 1" to "Custom 2" with permission and condition as "Order Status" "!=" "Denied"
        Then Add Transiton"5" as "To Aproved" from "Order Purpose Approval" to "Approved" with permission and condition as "Order Notes" "contains" "Test12"
        Then Add Transiton"6" as "To Custom 1" from "Ticket Admin Approval" to "Custom 1" with permission and condition as "Order Status" "==" "Ticket Admin Approval" and "Tickets face value" ">=" "10" and "Tickets face value" ">=" "0"
        Then Add Transiton"7" as "To Waitlist" from "Custom 2" to "Waitlisted" with permission and condition as "Requester Approving Manager Email" "does_not_contain" "gmail" and "Order Opportunity Name" "!=" "Sample"
        Then Add Transiton"8" as "To Approved" from "Waitlisted" to "Approved" with permission and condition as "Ordered Tickets" "<=" "2" "POST" "Approval"
        Then Add Transiton"8" as "To Denied" from "Waitlisted" to "Denied" with permission and condition as "Recipient Email" "contains" "umair" "POST" "Denial"
        Then Add Transiton"10" as "To Denied" from "Approved" to "Denied" with permission and condition as "Tickets Row" "not_in" "D" "POST" "Denial"
        Then Add Transiton"10" as "To Finished" from "Approved" to "Finished" with permission and condition as "Tickets face value" ">=" "5"
   Examples:
    |WF                       |state1 |state2                |state3                  |state4         |state5   |state6  |state7|Direction|
    |Automator with permission|created|Order Purpose Approval|Pending Manager Approval|Pending Payment|Cancelled|Approved|Denied|Down|
    Scenario: QA-195: Attach workflow on ticket and multiple using Bulk Edit
        Then Navigate to Ticket Inventory
        Then Attach Workflow on ticket as "<WF>" via inventory and as well as from workflow assignment report IF getting error
        Then Attach Workflow on ticket as "<WF>" using Bulk Edit
        Then Attach Same Workflow on ticket as "<WF>"
    Examples:
     |WF                       |
     |Automator with permission|
     Scenario: QA-185==>  Create order with invitee for worflow assigned event
        Then Dismiss_Card_SSA
        Then Move on event and Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Insert first invitee detail for "<user>"
        Then Insert all "<no_of_tickets>" invitee details
        Then Submit CWF Ticket
   Examples:
    |user|  Order_type   | loc            | type         |no_of_tickets|
    |SSA |Personal Use   |All Location    |Company Owned |1            |
    Scenario: QA-185==>  login CSA
        Then logout SSA
        When We Enter Login Creds "<username>" and "<password>"
        Then move on landing page
        Then Dismiss_Card
        Then Move Previous order in next state
        Then Move on event and Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Insert first invitee detail for "<user>"
        Then Insert all "<no_of_tickets>" invitee details
        Then Submit CWF Ticket Inline
        Then Perform Inline Transitons and move Next
   Examples:
     |username            | password   |   user  | 
     |uaslam1000@gmail.com| Test12345  | CSA      |
     Scenario: QA-185==>  login ADMIN
        Then logout SSA
        When We Enter Login Creds "<username>" and "<password>"
        Then move on landing page
        Then Dismiss_Card
        Then Move Previous order in next state
        Then Move on event and Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Insert first invitee detail for "<user>"
        Then Insert all "<no_of_tickets>" invitee details
        Then Submit CWF Ticket
        Then Perform Inline Transitons and move Next
   Examples:
     |username            | password   |   user  | 
     |uaslam1004@gmail.com| Test12345  | Admin   |
Scenario: QA-185==>  Verify Bulk order Approval Multiple Ticket Groups multiple orders
        Then Dismiss_Card
        Then Move on event and Insert Ticket details as order type "<Order_type>" for "<user>" "1"
        Then Insert first invitee detail for "<user>"
        Then Submit CWF Ticket Only
        Then Move on event and Insert Ticket details as order type "<Order_type>" for "<user>" "2"
        Then Insert first invitee detail for "<user>"
        Then Submit CWF Ticket Only
        Then Perform Bulk Order
   Examples:
     |username            | password   |   user| 
     |uaslam1001@gmail.com| Test12345  | Admin   |
    Scenario: QA-185==>  login standard user
        Then logout SSA
        When We Enter Login Creds "<username>" and "<password>"
        Then move on landing page
        Then Dismiss_Card
        Then Move on event and Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Insert first invitee detail for "<user>"
        Then Insert all "<no_of_tickets>" invitee details
        Then Submit CWF Ticket
   Examples:
     |username            | password   |   user          | 
     |uaslam1001@gmail.com| Test12345  | standard User   |
     Scenario: QA-185==>  Create package order with invitee
        Then Dismiss_Card_SSA
        Then Create package order
        Then Submit CWF Ticket
   Examples:
    |user|  Order_type   | loc            | type         |
    |SSA |Personal Use   |All Location    |Company Owned |



