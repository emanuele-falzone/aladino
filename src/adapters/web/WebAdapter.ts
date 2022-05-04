import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { VehicleService } from '../../domain/VehicleService';
import { Auth } from './Auth';
import { Error } from './Error';
import { Garage } from './Garage';
import { Home } from './Home';
import { Register } from './Register';

export class WebAdapter {
    private port: number;
    private password: string;
    private vehicleService: VehicleService

    constructor(_: string, port: number, password: string, vehicleService: VehicleService) {
        this.port = port
        this.password = password
        this.vehicleService = vehicleService
    }

    listen(): void {
        const app = express()
        app.use('/static', express.static('./src/adapters/web/static'))
        app.set('view engine', 'pug')
        app.set('views', './src/adapters/web/views');
        app.use(express.urlencoded());

        app.use(Home.getRouter())
        const auth = new Auth(this.password)
        app.use(auth.getRouter())
        app.use(new Garage(this.vehicleService).getRouter())
        app.use(new Register(this.vehicleService).getRouter())
        app.use(Error.getRouter())



        app.listen(this.port, () => {
            console.log(`Aladino is running on port ${this.port}.`);
        });
    }
}