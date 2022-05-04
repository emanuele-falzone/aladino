import { Vehicle } from "./Vehicle";

export interface VehicleRepository {
    insert(vehicle: Vehicle): Promise<any>;
    findAll(): Promise<Vehicle[]>;
    findByPlate(plate: string): Promise<Vehicle[]>;
}
