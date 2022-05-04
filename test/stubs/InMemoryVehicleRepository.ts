import { Vehicle } from "../../src/domain/Vehicle";
import { VehicleRepository } from "../../src/domain/VehicleRepository";

export class InMemoryVehicleRepository implements VehicleRepository {
    private vehiclesByName: Map<String, Vehicle[]>
    private vehiclesByPlate: Map<String, Vehicle>

    constructor() {
        this.vehiclesByName = new Map<String, Vehicle[]>();
        this.vehiclesByPlate = new Map<String, Vehicle>();
    }
    insert(vehicle: Vehicle): Promise<any> {
        if (this.vehiclesByPlate.has(vehicle.plate)) {
            return Promise.reject(new Error("A vehicle with the same plate already exists"))
        }
        if (!this.vehiclesByName.has(vehicle.name)) {
            this.vehiclesByName.set(vehicle.name, []);
        }
        let vehicles: Vehicle[] = this.vehiclesByName.get(vehicle.name)!;
        vehicles.push(vehicle);
        this.vehiclesByName.set(vehicle.name, vehicles);
        this.vehiclesByPlate.set(vehicle.plate, vehicle);
        return Promise.resolve(true);
    }
    findAll(): Promise<Vehicle[]> {
        return Promise.resolve([...this.vehiclesByPlate.values()]);
    }
    findByPlate(plate: string): Promise<Vehicle[]> {
        if (this.vehiclesByPlate.has(plate)) {
            return Promise.resolve([this.vehiclesByPlate.get(plate)!])
        }
        return Promise.resolve([]);
    }
}