import express from "express";
import { z } from "zod";
import ValidationError from "../utils/errors";
import {
    GetRequest, GetRequestZodT, GetResponse,
} from "./types";

export default class Router {
    router: express.Router;

    constructor() {
        this.router = express.Router();
    };

    get<T extends GetRequestZodT, K extends z.ZodObject<any>>(path: string, guards: {
        params?: T["params"];
        query?: T["query"];
    }, handler: (req: GetRequest<T>, res: GetResponse<K>) => void) {
        this.router.get(path, (req, res, next) => {
            const parseParams = guards.params?.safeParse(req.params);
            const parseQuery = guards.query?.safeParse(req.query);

            try {
                if (!parseParams?.success) throw new ValidationError("params", parseParams?.error!);
                if (!parseQuery?.success) throw new ValidationError("query", parseQuery?.error!);
            } catch (err) {
                console.log(err);
            };

            next();
        }, handler);

        return this;
    };
};