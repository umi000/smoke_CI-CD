Feature: smoke ci cd
  Background: Navigation
    Given Navigate to TicketManager website ==> "https://app01-qa10.spotlighttms.com/"
  @smoke @sanity
  Scenario: QA-38==>  Is Portal Deployed
    When We Enter Login Creds "<username>" and "<password>"  
  @regression @E2E 
  Scenario: QA-38==>  login as a "<user>"
    When We Enter Login Creds "<username>" and "<password>"
    Then move on landing page
    Then select customer as "<Customer>" 
    Then Dismiss_Card_SSA
   Examples:
     |username                      | password    |   user  | Customer|
     |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |  uiautomator1|
  Scenario: QA-39==>  Purchase Marketplace ticket from (Search Detail) with "<order_type>" Purchase and status as "<status>" (with invitee) for ==> "<user>"
        Then Navigate to CustomerFeatures tab 
        Then Verify Hide External Ticket is off
        Then Select Marketplace ticket
        Then Insert Order Details for "<order_type>" 
   Examples:
    |username                      | password    |   user  |order_type    | status       | Customer|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Business      | order_approve| UIautomator|
    @smoke @sanity @functional
    Scenario: QA-39==>  Purchase Marketplace ticket from (Search Detail) with "<order_type>" Purchase and status as "<status>" (with invitee) for ==> "<user>"
        Then Select Marketplace ticket
        Then Insert Order Details for "<order_type>"
   Examples:
    |username                      | password       | user           | loc            |order_type   | event| Customer     | no_of_tickets|
    |umair.aslam.ssa@techtronix.biz| Test_12345     |   SSA          |All Location    |Personal     |arena |  uiautomator |     1        |
Scenario: QA-42==>  Create order from (Landing page) with order type "<Order_type>" with invitee
        Then Dismiss_Card_SSA
        Then Select Location as "<loc>" and ticket as "<Ticket type>"
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Insert first invitee detail for "<user>"
        Then Insert all "<no_of_tickets>" invitee details
        Then Submit Ticket
   Examples:
    |username                      | password    |   user  |Order_type     | loc            | Ticket type         | event| Customer| no_of_tickets|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Business Use   |All Locations   |Company Owned | arena| uiautomator|  1|
    Scenario: QA-42==>  Create order from (Landing page) with order type "<Order_type>" with invitee
        Then Dismiss_Card_SSA
        Then Select Location as "<loc>" and ticket as "<type>"
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Insert first invitee detail for "<user>"
        Then Insert all "<no_of_tickets>" invitee details
        Then Submit Ticket
   Examples:
    |username                      | password    |   user  |Order_type     | loc            | type         | event| Customer| no_of_tickets|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Personal Use   |All Locations   |Company Owned | arena| uiautomator|  1|
    @smoke @sanity  
    Scenario: QA-43==>  Verify Is Static Map available? for "<user>"
        Then Dismiss_Card_SSA
        Then Select Ticket Type Dropdown as "<Ticket type>"
        Then Scroll page Down
        Then read map
   Examples:
    |username                          | password  |user|Ticket type          |Order_type  |status        |status2      | status3     |is_approve_directly| PaymentData  |
    |umair.aslam.ssa@techtronix.biz    | Test_12345|CSA |All Available Tickets|Business Use|order_approve |order_approve|order_approve| 0                 | First Data QA|
##     @smoke @sanity  
##     Scenario: QA-43==>  Verify Is Dynamic Map available? and check No of tickets dynamically for "<user>"
##         Then Dismiss_Card_SSA
##         Then Select Ticket Type Dropdown as "<Ticket type>"
##         Then Scroll page Down
##         Then Select random event from Landing page
##         Then Read map tickets Dynamically & Verify No of tickets
##         Then Verify Reset button
##    Examples:
##     |username                          | password  |user|Ticket type  |Order_type  |status        |status2      | status3     |is_approve_directly| PaymentData  |
##     |umair.aslam.ssa@techtronix.biz    | Test_12345|SSA |Market Place |Business Use|order_approve |order_approve|order_approve|0                  | First Data QA|
   @regression
    Scenario: QA-44==> REPORT:"<R_name>"" ==> Verify Count
        Then Navigate to "<R_name>" Report
        Then Reset View
        Then Apply aggregate function "<func>" on "<R_name>" Report
        Then Verify aggregate function count for "<R_name>"
   Examples:
    |username                      | password    |   user  |R_name             |func    |Order_type     | loc            | type         | event| Customer| no_of_tickets|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Invitee Information|Count   |Business Use   |All Locations   |Company Owned | arena| uiautomator|  1|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |All Tickets        |Count   |Business Use   |All Locations   |Company Owned | arena| uiautomator|  1|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Shipping           |Count   |Business Use   |All Locations   |Company Owned | arena| uiautomator|  1|
    @regression
    Scenario: QA-44==> REPORT:"<R_name>"==> Verify sum 
        Then Navigate to "<R_name>" Report
        Then Apply aggregate function "<func>" on "<R_name>" Report
        Then Reduce no of Tickets using multiple inline filters
        Then Verify aggregate function Sum for "<R_name>"
   Examples:
    |username                      | password    |   user  |R_name        |func|Order_type     | loc            | type         | event| Customer| no_of_tickets|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Shipping      |Sum  |Business Use   |All Locations   |Company Owned | arena| uiautomator|  1|
    @regression
    Scenario: QA-44==> REPORT:"<R_name>"==> Verify average
        Then Navigate to "<R_name>" Report
        Then Apply aggregate function "<func>" on "<R_name>" Report
        Then Verify aggregate function Average for "<R_name>"
   Examples:
    |username                      | password    |   user  |R_name        |func  |Order_type     | loc            | type         | event| Customer| no_of_tickets|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Shipping      |Average   |Business Use   |All Locations   |Company Owned | arena| uiautomator|  1|
    Scenario: QA-44==>  Verify "<_type>" Graph
        Then Navigate to "<R_name>" Report
        Then Verify "<_type>" Graph with Label as "<Label>" and Data Column as "<Data_Column>" for "<R_name>"
        Then Verify Check box
    Examples:
    |username                      | password    |   user  |R_name        |_type|Order_type     |Label          | Data_Column       | loc              | type         | event| Customer| no_of_tickets|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Usage by Team |Pie |Business Use   |Performer Name | Tickets Available |  All Locations   |Company Owned | arena| uiautomator|  1|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Usage by Team |Bar |Business Use   |Performer Name | Tickets Available |  All Locations   |Company Owned | arena| uiautomator|  1|
    @smoke
    Scenario: QA-44==> REPORT:"<R_name>"==> Verify: Is_aggregation_disabled
        Then Navigate to "<R_name>" Report
        Then Apply aggregate function "<func2>" on "<R_name>" Report
        Then Verify: Is aggregation disabled
   Examples:
    |username                      | password    |   user  |R_name              |func1|func2  |Order_type     | loc            | type         | event| Customer| no_of_tickets|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Unsubscribe Status  |  |   |Business Use   |All Locations   |Company Owned | arena| uiautomator|  1|
        Scenario: QA-46==>  Ship order through FedEx and also cancel shipment
        Then Navigate to CustomerFeatures tab 
        Then Verify FedeEx Integration is enable
        Then Select Company Owned ticket for "<Order_type>" and user "<user>" for shipping
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Insert first invitee detail for "<user>"
        Then Insert all "<no_of_tickets>" invitee details
        Then Submit for "<user>"
        Then Change first status as "<status>" for "<Order_type>" from pending manager approval state "<is_approve_directly>"
        Then Process Shipment using FedEx
    Examples:
        |           username           | password |user| Order_type |    status   |   status2   |   status3   |is_approve_directly| PaymentData |no_of_tickets|loc             |type          | 
        |umair.aslam.ssa@techtronix.biz|Test_12345| SSA|Business Use|order_approve|order_approve|order_approve|         1         |First Data QA|      1      |All Location    |Company Owned |
    Scenario: QA-46==>  Ship order through UPS 
        Then Dismiss_Card_SSA_
        Then Navigate to CustomerFeatures tab 
        Then Verify UPS Integration is enable
        Then Select Company Owned ticket for "<Order_type>" and user "<user>" for shipping
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Insert first invitee detail for "<user>"
        Then Insert all "<no_of_tickets>" invitee details
        Then Submit for "<user>"
        Then Change first status as "<status>" for "<Order_type>" from pending manager approval state "<is_approve_directly>"
        Then Process Shipment using UPS
    Examples:
        |           username           | password |user| Order_type |    status   |   status2   |   status3   |is_approve_directly| PaymentData |no_of_tickets|
        |umair.aslam.ssa@techtronix.biz|Test_12345| SSA|Business Use|order_approve|order_approve|order_approve|         1         |First Data QA|      1      |
    Scenario: QA-46==>  Ship order through FedEx/UPS with multiple invitees second method
        Then Dismiss_Card_SSA_  
        Then Select Company Owned ticket for "<Order_type>" and user "<user>" for shipping
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Insert first invitee detail for "<user>"
        Then Insert all "<no_of_tickets>" invitee details
        Then Submit for "<user>"
        Then Change first status as "<status>" for "<Order_type>" from pending manager approval state "<is_approve_directly>"
        Then Process Multiple "<no_of_tickets>" Shipment using Second method 
    Examples:
        |           username           | password |user| Order_type |    status   |   status2   |   status3   |is_approve_directly| PaymentData |no_of_tickets|
        |umair.aslam.ssa@techtronix.biz|Test_12345| SSA|Business Use|order_approve|order_approve|order_approve|         1         |First Data QA|      2      |
    Scenario: QA-46==>  Ship order through FedEx/UPS with multiple invitees using first method and print
        Then Dismiss_Card_SSA_
        Then Select Company Owned ticket for "<Order_type>" and user "<user>" for shipping
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Insert first invitee detail for "<user>"
        Then Insert all "<no_of_tickets>" invitee details
        Then Submit for "<user>"
        Then Change first status as "<status>" for "<Order_type>" from pending manager approval state "<is_approve_directly>"
        Then Process Multiple "<no_of_tickets>" Shipment using First method
        Then Print Packing List
        Then test
    Examples:
        |           username           | password |user| Order_type |    status   |   status2   |   status3   |is_approve_directly| PaymentData |no_of_tickets|
        |umair.aslam.ssa@techtronix.biz|Test_12345| SSA|Business Use|order_approve|order_approve|order_approve|         1         |First Data QA|      2      |
    Scenario: QA-48==>  Verify Workflow for Payment Processing (Alpha)
        Then Navigate to CustomerFeatures tab
        Then Verify Alpha is Enable
   Examples:
    |username                          | password  |user|Order_type  |status        |status2      | status3     |is_approve_directly| PaymentData  |
    |umair.aslam.ssa@techtronix.biz    | Test_12345|CSA |Business Use|order_approve |order_approve|order_approve|0                  | First Data QA|
    @settings @Functional
    Scenario: QA-50==>  Check Settings for order approval
        Then Navigate to CustomerFeatures tab
        Then Verify Approval Manager is Enable
        And Verify Ticket Approval Manager is Enable
        And Verify Order purpose approver is Enable
        Then Set Manager approver as "<manager_approver>" with email as "<email>"
        Examples:
    |username                          | password    |   user  |Order_type  | status |      manager_approver |email|
    |umair.aslam.ssa@techtronix.biz    | Test_12345  |   SSA   |Personal Use| order_deny |  tmautomator.csa  | tmautomator.csa@techtronix.biz|
      @regression
       Scenario: QA-50==>  Submit order those are in Pending by approval manager for "<Order_type>" and status as "<status>" with invitee
        Then Select Company Owned ticket for "<Order_type>" and user "<user>" 
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Insert first invitee detail for "<user>"
        Then Submit for "<user>"
        Then Change first status as "<status>" for "<Order_type>" from pending manager approval state "<is_approve_directly>"
   Examples:
    |username                          | password    |   user  |loc         |type          |Order_type  |customer   | status        | is_approve_directly|
    |umair.aslam.ssa@techtronix.biz    | Test_12345  |   SSA   |All Location|Company Owned |Business Use|uiautomator| order_approve | 1                  |
    |umair.aslam.ssa@techtronix.biz    | Test_12345  |   SSA   |All Location|Company Owned |Business Use|uiautomator|order_deny    | 0                  |

    Scenario: QA-50==>  Submit order on FCFS basis with order type "<Order_type>" without invitee
        Then Navigate to CustomerFeatures tab
        Then Verify FCFS is Enabled
        Then Select Company Owned ticket for "<Order_type>" and user "<user>" 
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Submit for "<user>"  
        Then wait for a while
   Examples:
    |username                      | password    |   user  |Order_type      | customer     | status|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Personal Use    |  uiautomator | order_approve|
    
    Scenario: QA-51==> REPORT:"<R_name>"==> Check if every report and list page is opening and verify Select all filter and remove all filter
        Then Navigate to "<R_name>" Report
        Then Verify No of records After removing all Filters 
        Then Verify select all Filter
   Examples:
    |username                      | password    |   user  |R_name                |Order_type     | loc            | type         | event| Customer| no_of_tickets|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Invitee Information   |Business Use   |All Locations   |Company Owned | arena| uiautomator|  1|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |All Tickets           |Business Use   |All Locations   |Company Owned | arena| uiautomator|  1|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Shipping              |Business Use   |All Locations   |Company Owned | arena| uiautomator|  1|
    
    Scenario: QA-51==> REPORT:"<R_name>"==> Check if every report and list page is opening inline filter 
        Then Navigate to "<R_name>" Report
        Then Remove All Filter
        Then Verify InLine Filter
   Examples:
    |username                      | password    |   user  |R_name        |Order_type     | loc            | type         | event| Customer| no_of_tickets|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Shipping|Business Use   |All Locations   |Company Owned | arena| uiautomator|  1|
    Scenario: QA-51==> REPORT:"<R_name>"==> verify filter tab and Export reports in PDF+EXCEL and verify DeSelect all filter
        Then Navigate to "<R_name>" Report
        Then Remove All Filter
        Then Verify Filter tab
        Then Export as PDF
        Then Export as Excel
        Then Verify DeSelect all Filter
   Examples:
    |username                      | password    |   user  |R_name        |Order_type     | loc            | type         | event| Customer| no_of_tickets|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Shipping|Business Use   |All Locations   |Company Owned | arena| uiautomator|  1|
    Scenario: QA-51==> REPORT:"<R_name>"==> verify save report and verify email address           
        Then Navigate to "<R_name>" Report
        Then Save Report
        Then Send Report at invalid mail address
        And  Send Report at Valid mail address
   Examples:
    |username                      | password    |   user  |R_name        |Order_type     | loc            | type         | event| Customer| no_of_tickets|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Invitee Information|Business Use   |All Locations   |Company Owned | arena| uiautomator|  1|
    Scenario: QA-51==> REPORT:"<R_name>"==> verify Pagination 
        Then Navigate to "<R_name>" Report
        Then Verifiy Pagination 
   Examples:
    |username                      | password    |   user  |R_name        |Order_type     | loc            | type         | event| Customer| no_of_tickets|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Shipping|Business Use   |All Locations   |Company Owned | arena| uiautomator|  1|
    Scenario: Logout SSA (SSA Cases Completed)
        Then Dismiss_Card_SSA_
        Then logout SSA
        #########################################
  @regression @E2E 
  Scenario: QA-38==>  login as a "<user>"
    When We Enter Login Creds "<username>" and "<password>"
    Then move on landing page
    Then Dismiss_Card
    Then Wait for few seconds
   Examples:
     |username                      | password    |   user  | 
     |tmautomator.csa@techtronix.biz| tmautomator123 | CSA  |
  @regression @E2E 
    Scenario: QA-39==>  MarketPlace Module maintainance with "<order_type>" Purchase (with invitee) and status as "<status>" for ==> "<user>"
        Then Select Marketplace ticket_
        Then Insert_Order_Details_for "<order_type>" purchase_and_for "<user>"
        # Then Change order status as "<status>" for "<order_type>" purchase
        # Then Approve Order
   Examples:
    |username                      | password        |   user           |order_type    | status |
    |tmautomator.csa@techtronix.biz| tmautomator123  |   CSA            |Business      | order_approve|
    Scenario: QA-42==>  Create order from (Search page) with order type "<Order_type>" without any invitee
        Then Dismiss_Card
        Then Select Location as "<loc>" and ticket as "<type>"
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Submit Ticket
    Examples:
    |username                      | password    |   user  |Order_type     | loc            | type         | event| Customer| no_of_tickets|
    |tmautomator.csa@techtronix.biz| tmautomator123 | CSA  |Personal Use |All Location    |Company Owned |arena|  uiautomator |  1|
    @smoke @sanity  
    Scenario: QA-43==>  Verify Zoom in Zoom out functionality for "<user>"
        Then Dismiss_Card
        Then Select Ticket Type Dropdown as "<Ticket type>"
        Then Check Zoom in & Zoom out functionality 
   Examples:
    |username                          | password      |user    |Ticket type  |Order_type  |status        |status2      | status3     |is_approve_directly| PaymentData  |
    |tmautomator.csa@techtronix.biz    | tmautomator123|CSA     |Market Place |Business Use|order_approve |order_approve|order_approve|0                  | First Data QA|
    @smoke @sanity   
    Scenario: QA-48==>  Payment Gateway Module Maintainance for "<Order_type>" Purchase (with invitee) and status as "<status>" for ==> "<user>"
        Then Dismiss_Card
        Then Select Ticket Type Dropdown as "<type>"
        Then Select Company Owned ticket for "<Order_type>" and user "<user>"
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Submit for "<user>"
        Then Change first status as "<status>" for "<Order_type>" from pending manager approval state "<is_approve_directly>"
        Then Set Hook Payment Method
        Then Change second status as "<status2>" for "<Order_type>" from order purpose approval state
        Then Change Third status as "<status3>" for "<Order_type>" from Pending Review state
        Then Perform Payment using "<PaymentData>"
    Examples:
    |username                          | password      |Loc         |type          |user       |Order_type  |status        |status2      | status3     |is_approve_directly| PaymentData  |
    |tmautomator.csa@techtronix.biz    | tmautomator123|All location|Company Owned |CSA        |Business Use|order_approve |order_approve|order_approve|0                  | First Data QA|
     @regression @smoke @E2E
    Scenario: QA-48==>  (Refund) as condition "<Refund_Operation>" for "<Order_type>" Purchase (with invitee) and status as "<status>" for ==> "<user>"
        Then Select Company Owned ticket for "<Order_type>" and user "<user>"
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Submit for "<user>"
        Then Change first status as "<status>" for "<Order_type>" from pending manager approval state "<is_approve_directly>"
        Then Perform Payment using "<PaymentData>"
        Then Refund Order as "<Refund_Operation>"
    Examples:
    |username                          | password      |user|Order_type  |status        |Refund_Operation               | status3     |is_approve_directly| PaymentData  |
    |tmautomator.csa@techtronix.biz    | tmautomator123|CSA |Business Use|order_approve |request_refund_complete        |order_approve|1                  | First Data QA|
    |tmautomator.csa@techtronix.biz    | tmautomator123|CSA |Personal Use|              |request_partial_refund_complete|order_approve|1                  | First Data QA|
     Scenario: QA-48==>  (Refund) as condition "<Refund_Operation>" for "<Order_type>" Purchase (with invitee) and status as "<status>" for ==> "<user>"
        Then Select Company Owned ticket for "<Order_type>" and user "<user>"
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Submit for "<user>"
        Then Change first status as "<status>" for "<Order_type>" from pending manager approval state "<is_approve_directly>"
        Then Perform Payment using "<PaymentData>"
        Then Refund Order as "<Refund_Operation>"
    Examples:
    |username                          | password      |user|Order_type  |status        |Refund_Operation               | status3     |is_approve_directly| PaymentData  |
    |tmautomator.csa@techtronix.biz    | tmautomator123|CSA |Personal Use|              |request_partial_refund_cancel  |order_approve|1                  | First Data QA|
      @E2E @Functional @regression
    Scenario: QA-50==>  Submit order with order type <Order_type> and change status as <status>
        Then Select Company Owned ticket for "<Order_type>" and user "<user>"
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Submit for "<user>"
        Then Change first status as "<status>" for "<Order_type>" from pending manager approval state "<is_approve_directly>"
        Then Change second status as "<status2>" for "<Order_type>" from order purpose approval state
        Then Change Third status as "<status3>" for "<Order_type>" from Pending Review state
    Examples:
    |username                          | password      |user|Order_type  |status        |status2      | status3     |is_approve_directly|
    |tmautomator.csa@techtronix.biz    | tmautomator123|CSA |Business Use|order_approve |order_approve|order_approve|0|
    
  Scenario: QA-38==>  logout as a "<user>"
    Then Dismiss_Card
    Then logout
    Examples:
    |username                          | password      |user|Order_type  |status        |status2      | status3     |is_approve_directly|
    |tmautomator.csa@techtronix.biz    | tmautomator123|CSA |Business Use|order_approve |order_approve|order_approve|0|
################################
    @regression @E2E 
  Scenario: QA-38==>  login as a "<user>"
    When We Enter Login Creds "<username>" and "<password>"
    Then move on landing page
    Then Dismiss_Card
   Examples:
     |username                      | password    |   user  | 
     |tm.automator                  | tmautomator123 | Admin  |
@regression @E2E @functional
    Scenario: QA-39==>  Purchase Marketplace ticket from (Landing Detail) page with order type "<Order_type>" with invitee for ==> "<user>"
        Then Dismiss_Card
        And  Select Marketplace Dropdown
        Then Scroll page Down
        And  Buy then continue
        Then Insert_Order_Details_for "<order_type>" purchase_and_for "<user>"
   Examples:
    |username         | password       | user   |order_type     | loc         | event| Customer   | no_of_tickets| status|
    |tm.automator     | tmautomator123 | Admin  |Business       |All Location  |arena |uiautomator | 1            | order_approve |
Scenario: QA-42==>  Create order from (Order Detail) with order type "<Order_type>" with invitee
        Then Dismiss_Card
        Then Select Location as "<loc>" and ticket as "<type>"
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Insert first invitee detail for "<user>"
        Then Insert all "<no_of_tickets>" invitee details
        Then Submit Ticket
   Examples:
    |username                      | password       |   user |Order_type     | loc            | type         | event| Customer| no_of_tickets|
    |tm.automator                  | tmautomator123 | Admin  |Personal Use   |All Location    |Company Owned |arena|  uiautomator | 1|

  Scenario: QA-38==>  logout as a "<user>"
    Then Dismiss_Card
    Then logout Standard User
    Examples:
    |username                      | password       |   user |Order_type     | loc            | type         | event| Customer| no_of_tickets|
    |tm.automator                  | tmautomator123 | Admin  |Personal Use   |All Location    |Company Owned |arena|  uiautomator | 1|
########################
@regression @E2E 
  Scenario: QA-38==>  login as a "<user>"
    When We Enter Login Creds "<username>" and "<password>"
    Then move on landing page
    Then Dismiss_Card
   Examples:
     |username                      | password    |   user  | 
     |tmautomator.user              | tmautomator123 |  Standard User  |
@regression @E2E @functional
   Scenario: QA-39==>  Purchase Marketplace ticket from (Event Detail) page with order type "<Order_type>" with invitee for ==> "<user>"
        Then Dismiss_Card
        And  Select Marketplace ticket for other users
        Then Select Random event
        And  Buy then continue
        Then Insert_Order_Details_for "<order_type>" purchase_and_for "<user>"
        Then Submit for "<user>"  
   Examples:
    |username                      | password       | user           | loc            |order_type         | event| Customer| no_of_tickets|
    |tmautomator.user              | tmautomator123 | Standard user  |All Location    |Business           |arena|  uiautomator | 1|
    Scenario: QA-42==>  Create order from (Landing page) with order type "<Order_type>" without any invitee
        Then Dismiss_Card
        Then Select Location as "<loc>" and ticket as "<type>"
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Submit Ticket
   Examples:
    |username                      | password    |   user  |Order_type     | loc            | type         | event| Customer    | no_of_tickets|
    |tmautomator.user              | tmautomator123 |  Standard User  |Personal Use   |All Location    |Company Owned |arena|  uiautomator |  1|
    @smoke @sanity  
    Scenario: QA-43==>  Verify Zoom in Zoom out functionality for "<user>"
        Then Dismiss_Card
        Then Select Ticket Type Dropdown as "<Ticket type>"
        Then Check Zoom in & Zoom out functionality 
   Examples:
    |username                          | password      |user            |Ticket type  |Order_type  |status        |status2      | status3     |is_approve_directly| PaymentData  |
    |tmautomator.user                  | tmautomator123|Standard User   |Company Owned |Business Use|order_approve |order_approve|order_approve|0                  | First Data QA|
    Scenario: QA-38==>  logout as a "<user>"
      Then Dismiss_Card
      Then logout Standard User
    Examples:
    |username           | password      |   user |
    |tmautomator.user   | tmautomator123|Standard User   |
######################################
  @smoke @sanity
  Scenario: QA-38==>  login with username only
    When We Enter Login Creds "<username>" and "<password>"
    Then move on landing page
    Then Read Error for username
    Then Wait for few seconds
   Examples:
     |username                      | password    |
     |tmautomator.csa@techtronix.biz|             |
  @smoke @sanity
  Scenario: QA-38==>  login with password only
    When We Enter Login Creds "<username>" and "<password>"
    Then move on landing page
    Then Read Error for password
    Then Wait for few seconds
   Examples:
     |username                      | password    |
     |                              | tmautomator123 |
