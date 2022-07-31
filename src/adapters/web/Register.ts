import { NextFunction, Request, Response, Router } from 'express';
import { VehicleService } from '../../domain/VehicleService';
import { Garage } from './Garage';
import { Error } from './Error';

export class Register {
    public static ENDPOINT = "/register-vehicle"

    private vehicleService: VehicleService
    constructor(vehicleService: VehicleService) {
        this.vehicleService = vehicleService
    }

    getRouter(): Router {
        const router = Router()


        router.get(Register.ENDPOINT, (request: Request, response: Response, next: NextFunction) => {
            response.render("register")
        })

        router.post(Register.ENDPOINT, (request: Request, response: Response, next: NextFunction) => {
            this.vehicleService.registerVehicle(request.body.name, request.body.plate)
                .then(() => {
                    response.redirect(Garage.ENDPOINT)
                })
                .catch(() => {
                    response.redirect(Error.ENDPOINT)
                })
        })

        return router;
    }
}

