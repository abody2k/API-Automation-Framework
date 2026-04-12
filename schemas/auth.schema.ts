import * as zod from "zod"

export const loginSchema = zod.object({

        accessToken: zod.string(),
        refreshToken: zod.string(),
        id: zod.number(),
        username: zod.string(),
        email: zod.email(),
        firstName: zod.string(),
        lastName: zod.string(),
        gender: zod.string(),
        image: zod.url()
    })