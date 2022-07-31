# language: en

Feature: List my vehicles
    In order to track the maintenance of vehicles
    As a mechanic
    I want to get the list of my vehicles

    Scenario: I already have some vehicles
        Given that I registered the vehicles
            | name        | plate    |                      
            | Fiat Uno    | COD48548 |
            | Africa Twin | AS01916  |
        When I ask for the vehicle list 
        Then I get the following vehicles
            | name        | plate    |                      
            | Fiat Uno    | COD48548 |
            | Africa Twin | AS01916  |
