import { z } from "zod";

export default class ValidationError extends Error {
    constructor(object: "params" | "query" | "body", err: z.ZodError) {
        super(`validation error in ${object} object\n\n${err.issues.map(issue => {
            // let suggestion = "";

            // if (issue.code === "too_small") suggestion = `length at x should be y`;

            return `${object}.${issue.path.join(".")}: ${issue.message}`;
        }).join("\n")}`);
    };
};