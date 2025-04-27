import { z } from 'zod'

export const Schema = z.object({
    id: z.number(),
    title: z.string().min(5),
    url: z.string().min(5),
    description: z.string().optional(),
    price: z.string().optional(),
    completed: z.boolean(),
})

export type Wish = z.infer<typeof Schema>;