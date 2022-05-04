import { Before, IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber'
import { Client } from 'pg';
import { VehiclePostgresRepository } from '../../src/adapters/VehiclePostgresRepository';
import { Vehicle } from '../../src/domain/Vehicle';
import { VehicleRepository } from '../../src/domain/VehicleRepository';
import { VehicleService } from '../../src/domain/VehicleService';
import { InMemoryVehicleRepository } from '../stubs/InMemoryVehicleRepository';
import { AladinoWorld } from './AladinoWorld';

export class PersistentWorld extends AladinoWorld {

    public connectionString: string
    private vehicleRepository: VehicleRepository
    public vehicleService: VehicleService

    constructor({ attach, log, parameters }: IWorldOptions) {
        super({ attach, log, parameters });
        this.connectionString = parameters.connectionString;
        this.vehicleRepository = new VehiclePostgresRepository(this.connectionString);
        this.vehicleService = new VehicleService(this.vehicleRepository);
    }


    async requestVechicleList() {
        this.client.receiveVehicleList(await this.vehicleService.listRegisteredVehicles());
    }

    async registerVehicle(name: string, plate: string) {
        try {
            await this.vehicleService.registerVehicle(name, plate);
        } catch (e) {
            this.client.receiveError(e as Error);
        }
    }
}

Before(async function (this: PersistentWorld) {
    let pgClient = new Client({ connectionString: this.connectionString });
    pgClient.connect()
    await pgClient.query("TRUNCATE TABLE vehicles;")
});

setWorldConstructor(PersistentWorld)