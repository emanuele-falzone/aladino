import { IWorldOptions, World } from "@cucumber/cucumber";
import { Client } from "./support/Client";

export abstract class AladinoWorld extends World {
    public client: Client

    constructor({ attach, log, parameters }: IWorldOptions) {
        super({ attach, log, parameters });
        this.client = new Client();
    }

    async requestVechicleList() {
        throw new Error("Method not implemented.");
    }

    async registerVehicle(name: string, plate: string) {
        throw new Error("Method not implemented.");
    }
}