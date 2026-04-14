import * as zod from "zod";

export const searchForUserSchema = zod.object({

    users: zod.array(zod.object()),
    total: zod.number(),
    skip: zod.number(),
    limit: zod.number()
})