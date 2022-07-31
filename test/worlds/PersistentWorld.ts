import { Before, IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber'
import { Client } from 'pg';
import { VehiclePostgresRepository } from '../../src/adapters/persistence/VehiclePostgresRepository';
import { VehicleRepository } from '../../src/domain/VehicleRepository';
import { VehicleService } from '../../src/domain/VehicleService';
import { AladinoWorld } from './AladinoWorld';
import config from './persistent-world-config.json';

export class PersistentWorld extends AladinoWorld {

    private vehicleRepository: VehicleRepository
    public vehicleService: VehicleService

    constructor({ attach, log, parameters }: IWorldOptions) {
        super({ attach, log, parameters });
        this.vehicleRepository = new VehiclePostgresRepository(
            config.postgres.host,
            config.postgres.port,
            config.postgres.user,
            config.postgres.password,
            config.postgres.database);
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
    let pgClient = new Client({
        host: config.postgres.host,
        port: config.postgres.port,
        user: config.postgres.user,
        password: config.postgres.password,
        database: config.postgres.database
    })
    pgClient.connect()
    await pgClient.query("TRUNCATE TABLE vehicles;")
})

setWorldConstructor(PersistentWorld)