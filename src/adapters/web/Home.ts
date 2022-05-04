import { NextFunction, Request, Response, Router } from 'express';

export class Home {
    public static ENDPOINT = "/"
    static getRouter(): Router {
        const router = Router()

        router.get(this.ENDPOINT, (request: Request, response: Response, next: NextFunction) => {
            response.render("home")
        })

        return router;
    }
}

