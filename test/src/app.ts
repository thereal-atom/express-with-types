import { createServer } from "../../packages/server/src/";
import { z } from "zod";

const {
    server,
    router,
} = createServer();

server.listen(() => {
    console.log("Server started");
});

const paramsSchema = z.object({
    id: z.string(),
});

const querySchema = z.object({
    lang: z
        .string()
        .min(10),
});

const responseBodySchema = z.object({
    message: z.string(),
});

router.get<{
    params: typeof paramsSchema;
    query: typeof querySchema;
}, typeof responseBodySchema>("/user/:id", {
    params: paramsSchema,
    query: querySchema,
}, (req, res) => {
        console.log(req.query.lang);
        console.log(req.params.id);
    },
);