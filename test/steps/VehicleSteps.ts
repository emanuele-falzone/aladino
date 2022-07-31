import { Given, Then, When, DataTable } from '@cucumber/cucumber';
import { AladinoWorld } from '../worlds/AladinoWorld';

When('I ask for the vehicle list',
    async function (this: AladinoWorld) {
        await this.requestVechicleList();
    }
);

Given('that I registered the vehicles',
    async function (this: AladinoWorld, dataTable: DataTable) {
        for (let row of dataTable.rows()) {
            await this.registerVehicle(row[0], row[1]);
        }
        await this.requestVechicleList();
    }
);

When('I register the vehicle {} with plate {}',
    async function (this: AladinoWorld, name: string, plate: string) {
        await this.registerVehicle(name, plate);
        await this.requestVechicleList();
    }
);

Then('I get the following vehicles',
    function (this: AladinoWorld, dataTable: DataTable) {
        this.client.confirmVehicleListSize(dataTable.rows().length)
        for (let row of dataTable.rows()) {
            this.client.confirmVehicleListContains(row[0], row[1]);
        }
    }
);

Then('I got informed that a vehicle with the same plate has already been registered',
    function (this: AladinoWorld) {
        this.client.confirmError()
    }
);

Then('I got informed that the vehicle is now registered',
    function (this: AladinoWorld) {
        this.client.confirmNoError()
    }
);
