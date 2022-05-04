import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber'
import { Vehicle } from '../../src/domain/Vehicle';
import { VehicleRepository } from '../../src/domain/VehicleRepository';
import { VehicleService } from '../../src/domain/VehicleService';
import { InMemoryVehicleRepository } from '../stubs/InMemoryVehicleRepository';
import { AladinoWorld } from './AladinoWorld';

export class DomainWorld extends AladinoWorld {

    constructor({ attach, log, parameters }: IWorldOptions) {
        super({ attach, log, parameters });
    }

    private vehicleRepository: VehicleRepository = new InMemoryVehicleRepository();
    public vehicleService: VehicleService = new VehicleService(this.vehicleRepository);

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

setWorldConstructor(DomainWorld)