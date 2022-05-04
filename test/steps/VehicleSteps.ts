import { Before, Given, Then, When, DataTable } from '@cucumber/cucumber';
import { Vehicle } from '../../src/domain/Vehicle';
import { AladinoWorld } from '../worlds/AladinoWorld';

When('Salvatore richiede la lista dei veicoli',
    async function (this: AladinoWorld) {
        await this.requestVechicleList();
    }
);

Given('che Salvatore non ha mai registrato un veicolo', function () { });

Given('che in passato Salvatore ha registrato i veicoli',
    async function (this: AladinoWorld, dataTable: DataTable) {
        for (let row of dataTable.rows()) {
            await this.registerVehicle(row[0], row[1]);
        }
        await this.requestVechicleList();
    }
);

When('Salvatore registra il veicolo {} con targa {}',
    async function (this: AladinoWorld, name: string, plate: string) {
        await this.registerVehicle(name, plate);
        await this.requestVechicleList();
    }
);

Then('Salvatore riceve la seguente lista',
    function (this: AladinoWorld, dataTable: DataTable) {
        this.client.confirmVehicleListSize(dataTable.rows().length)
        for (let row of dataTable.rows()) {
            this.client.confirmVehicleListContains(row[0], row[1]);
        }
    }
);

Then('la registrazione fallisce',
    function (this: AladinoWorld) {
        this.client.confirmError()
    }
);

Then('Salvatore riceve una lista vuota',
    function (this: AladinoWorld) {
        this.client.confirmVehicleListIsEmpty()
    }
);