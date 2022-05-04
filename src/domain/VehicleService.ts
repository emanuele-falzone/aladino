import { Vehicle } from "./Vehicle";
import { VehicleRepository } from "./VehicleRepository";

export class VehicleService {
    private vehicleRepository: VehicleRepository;

    constructor(vehicleRepository: VehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    registerVehicle(name: string, plate: string): Promise<Vehicle> {
        const vehicle = new Vehicle(name, plate);
        return this.vehicleRepository.insert(vehicle)
            .then(() => vehicle);
    }

    listRegisteredVehicles(): Promise<Vehicle[]> {
        return this.vehicleRepository.findAll();
    }

    listRegisteredVehiclesByPlate(plate: string): Promise<Vehicle[]> {
        return this.vehicleRepository.findByPlate(plate);
    }
}
