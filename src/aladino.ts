import { VehiclePostgresRepository } from "./adapters/persistence/VehiclePostgresRepository";
import { VehicleRepository } from "./domain/VehicleRepository";
import { VehicleService } from "./domain/VehicleService";
import { WebAdapter } from "./adapters/web/WebAdapter";

import { debug } from "debug";
import { exit } from "process";

const log = debug("aladino")

const POSTGRES_HOST = getEnv("POSTGRES_HOST");
const POSTGRES_PORT = number(getEnv("POSTGRES_PORT"));
const POSTGRES_USER = getEnv("POSTGRES_USER");
const POSTGRES_PASSWORD = getEnv("POSTGRES_PASSWORD");
const POSTGRES_DBNAME = getEnv("POSTGRES_DBNAME");
const HOST = getEnv("HOST");
const PORT = number(getEnv("PORT"));
const PASSWORD = getEnv("PASSWORD");

const vehicleRepository: VehicleRepository = new VehiclePostgresRepository(POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DBNAME);
const vehicleService: VehicleService = new VehicleService(vehicleRepository);
const webAdapter: WebAdapter = new WebAdapter(HOST, PORT, PASSWORD, vehicleService)

webAdapter.listen()

function getEnv(key: string): string {
    if (!process.env[key]) {
        log(`Please set ${key} environment variable.`)
        exit(1)
    }
    return process.env[key]!
}

function number(s: string): number {
    return Number(s)
}
