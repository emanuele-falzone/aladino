import { NextFunction, Request, Response, Router } from 'express';
import { Vehicle } from '../../domain/Vehicle';
import { VehicleService } from '../../domain/VehicleService';

export class Garage {
    public static ENDPOINT = "/il-mio-garage"

    private vehicleService: VehicleService
    constructor(vehicleService: VehicleService) {
        this.vehicleService = vehicleService
    }
    getRouter(): Router {
        const router = Router()

        router.get(Garage.ENDPOINT, (request: Request, response: Response, next: NextFunction) => {
            this.vehicleService.listRegisteredVehicles()
                .then((vehicles: Vehicle[]) => {
                    response.render("garage", { vehicles: vehicles })
                })
        })

        return router;
    }
}

