import express from "express";
import { Router } from "./router";

export const createServer = (port = 50451, options?: {}) => {
    const router = new Router();

    const app = express()
        .use("/", router.router);

    return {
        router,
        server: {
            app,
            listen: (cb?: () => void) => {
                app.listen(port, cb);
            },
        },
    };
};
