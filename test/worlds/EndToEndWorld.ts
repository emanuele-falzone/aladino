import { Before, IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber'
import { Client } from 'pg';
import { Vehicle } from '../../src/domain/Vehicle';
import { AladinoWorld } from './AladinoWorld';
const axios = require('axios').default;

export class EndToEndWorld extends AladinoWorld {

    public url: string
    public connectionString: string

    constructor({ attach, log, parameters }: IWorldOptions) {
        super({ attach, log, parameters });
        this.url = this.parameters.url;
        this.connectionString = this.parameters.connectionString;
    }

    async requestVechicleList() {
        let response = await axios.get(`${this.url}/vehicles`)
        let vehicles = response.data.map(this.rowToVehicle);
        this.client.receiveVehicleList(vehicles);
    }

    async registerVehicle(name: string, plate: string) {
        try {
            await axios.post(`${this.url}/vehicles`, {
                name,
                plate
            });
        } catch (e) {
            this.client.receiveError(e as Error);
        }
    }

    private rowToVehicle = (vehicle: { name: string; plate: string; }) => {
        return new Vehicle(vehicle.name, vehicle.plate)
    };
}

Before(async function (this: EndToEndWorld) {
    let pgClient = new Client({ connectionString: this.connectionString });
    pgClient.connect()
    await pgClient.query("TRUNCATE TABLE vehicles;")
});

setWorldConstructor(EndToEndWorld)