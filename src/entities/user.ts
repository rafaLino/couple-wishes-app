import { z } from "zod";


export const Schema = z.object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    partner: z.string().optional(),
    couple_id: z.number()
})

export const CreateUserSchema = Schema
    .extend({
        phone: z.string().min(11),
        password: z.string().min(4)
    }).omit({
        id: true,
        partner: true,
        couple_id: true,
    })


export type User = z.infer<typeof Schema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;