import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import session from 'express-session';
import { Garage } from './Garage';
import { Home } from './Home';

export const ENDPOINT = "/accedi"

declare module 'express-session' {
    interface SessionData {
        loggedIn: boolean;
    }
}

export class Auth {

    private password: string

    constructor(password: string) {
        this.password = password
    }

    getRouter(): Router {
        let router = Router()

        router.use(session({
            secret: 'Keep it secret'
            , name: 'uniqueSessionID'
            , saveUninitialized: false
        }))

        router.post(ENDPOINT, (request: Request, response: Response) => {
            if (request.body.password == this.password) {
                request.session.loggedIn = true
                response.redirect(Garage.ENDPOINT)

            } else {
                response.redirect(Home.ENDPOINT)
            }
        })

        router.use((request: Request, response: Response, next: NextFunction) => {
            if (!request.session.loggedIn) {
                response.redirect(Home.ENDPOINT)
            } else {
                next()
            }
        })

        return router;
    }
}
