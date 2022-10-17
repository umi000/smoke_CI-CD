Feature: 
Background: Navigation
    Given Navigate to TicketManager website ==> "https://app01-qa10.spotlighttms.com/"
@smoke @sanity
Scenario: Register already created user
    When We Enter Company code as "<code>" and Email as "<email>"
    Then verify warning: "<warning>"
Examples: 
    |code| email               | warning     |
    |ACME| uaslam1000@gmail.com| User already|
    |ACM | uaslam1000@gmail.com| Invalid code|
    |ACME| uaslam1000@gmail.co | Invalid mail|
@smoke @sanity
Scenario: Forgot Password
    When we forgot password then we have to enter username as "<username>"
    Then verify password Warning: "<username>"
Examples: 
    |username   |  warning     |
    |Umair.aslam|  User already|
@smoke @sanity
Scenario: Forgot Username
    When we forgot username then we have to enter email as "<email>"
    Then verify username Warning: "<email>"
Examples: 
    |code| email               | warning     |
    |ACME| uaslam1000@gmail.com| User already|