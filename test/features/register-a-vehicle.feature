# language: en

Feature: Register a vehicle
    In order to track the maintenance of vehicles
    As a mechanic
    I want to register a vehicle

    Scenario: Just bought a new vehicle
        Given that I registered the vehicles
            | name        | plate    |                      
            | Africa Twin | AS01916  |
        When I register the vehicle Fiat Uno with plate COD48548 
        Then I got informed that the vehicle is now registered
        And I get the following vehicles
            | name        | plate    |                      
            | Fiat Uno    | COD48548 |
            | Africa Twin | AS01916  |

    Scenario: Register same vehicle twice
        Given that I registered the vehicles
            | name        | plate    |                      
            | Africa Twin | AS01916  |
        When I register the vehicle Africa Twin with plate AS01916
        Then I got informed that a vehicle with the same plate has already been registered