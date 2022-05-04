import { NextFunction, Request, Response, Router } from 'express';

export class Error {
    public static ENDPOINT = "/errore"
    static getRouter(): Router {
        const router = Router()

        router.get(this.ENDPOINT, (request: Request, response: Response, next: NextFunction) => {
            response.render("error")
        })

        return router;
    }
}

