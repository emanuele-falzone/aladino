import { Client } from "pg";

import { Vehicle } from "../../domain/Vehicle";
import { VehicleRepository } from "../../domain/VehicleRepository";

export class VehiclePostgresRepository implements VehicleRepository {
    private client: Client;

    constructor(host: string, port: number, user: string, password: string, database: string) {
        this.client = new Client({
            user,
            host,
            database,
            password,
            port
        });
        this.client.connect()
    }

    async insert(vehicle: Vehicle): Promise<any> {
        return this.client.query('INSERT INTO vehicles(plate, name) VALUES($1, $2)',
            [vehicle.plate, vehicle.name])
    }
    async findAll(): Promise<Vehicle[]> {
        return this.client.query('SELECT name, plate FROM vehicles')
            .then(res => res.rows.map(VehiclePostgresRepository.rowToVehicle));
    }
    async findByPlate(plate: string): Promise<Vehicle[]> {
        return this.client.query('SELECT name, plate FROM vehicles WHERE plate = $1', [plate])
            .then(res => res.rows.map(VehiclePostgresRepository.rowToVehicle))
    }

    private static rowToVehicle = (vehicle: { name: string; plate: string; }) => {
        return new Vehicle(vehicle.name, vehicle.plate)
    };
}