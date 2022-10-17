@regression 
Feature: Order Approval Maintainance
    Background: Navigation
        Given Navigate to TicketManager website
##1Done-------------------------------
    @E2E @Functional @regression
    Scenario: Submit order with order type <Order_type> and change status as <status>
        When We Enter Login Creds "<username>" and "<password>"
        Then move on landing page
        Then Select Company Owned ticket for "<Order_type>" and user "<user>"
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Submit for "<user>"
        Then Change first status as "<status>" for "<Order_type>" from pending manager approval state "<is_approve_directly>"
        Then Change second status as "<status2>" for "<Order_type>" from order purpose approval state
        Then Change Third status as "<status3>" for "<Order_type>" from Pending Review state
        Then logout 
    Examples:
    |username                          | password      |user|Order_type  |status        |status2      | status3     |is_approve_directly|
    |tmautomator.csa@techtronix.biz    | tmautomator123|CSA |Business Use|order_approve |order_approve|order_approve|0|
    @settings @Functional
    Scenario: Check Settings for order approval
        When We Enter Login Creds "<username>" and "<password>"
        Then move on landing page
        Then select customer as "<Customer>"
        Then Navigate to CustomerFeatures tab
        Then Verify Approval Manager is Enable
        And Verify Ticket Approval Manager is Enable
        And Verify Order purpose approver is Enable
        Then Set Manager approver as "<manager_approver>" with email as "<email>"
        # Then logout SSA
        Examples:
    |username                          | password    |   user  |Order_type  | status |      manager_approver |email|
    |umair.aslam.ssa@techtronix.biz    | Test_12345  |   SSA   |Personal Use| order_deny |  tmautomator.csa  | tmautomator.csa@techtronix.biz|
    
       @regression
       Scenario: Submit order those are in Pending by approval manager for "<Order_type>" and status as "<status>" with invitee
        # When We Enter Login Creds "<username>" and "<password>"
        # Then move on landing page
        # Then select customer as "<Customer>"
        Then Select Company Owned ticket for "<Order_type>" and user "<user>" 
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Insert first invitee detail for "<user>"
        Then Submit for "<user>"
        Then Change first status as "<status>" for "<Order_type>" from pending manager approval state "<is_approve_directly>"
   Examples:
    |username                          | password    |   user  |Order_type  |customer   | status        | is_approve_directly|
    |umair.aslam.ssa@techtronix.biz    | Test_12345  |   SSA   |Business Use|uiautomator| order_approve | 1                  |
    |umair.aslam.ssa@techtronix.biz    | Test_12345  |   SSA   |Business Use|uiautomator|order_deny    | 0                  |

    Scenario: Submit order on FCFS basis with order type "<Order_type>" without invitee
        When We Enter Login Creds "<username>" and "<password>"
        Then move on landing page
        Then select customer as "<Customer>"
        Then Navigate to CustomerFeatures tab
        Then Verify FCFS is Enabled
        Then Select Company Owned ticket for "<Order_type>" and user "<user>" 
        Then Insert Ticket details as order type "<Order_type>" for "<user>"
        Then Submit for "<user>"  
        Then wait for a while   
   Examples:
    |username                      | password    |   user  |Order_type      | customer     | status|
    |umair.aslam.ssa@techtronix.biz| Test_12345  |   SSA   |Personal Use    |  uiautomator | order_approve|
    
