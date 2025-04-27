import { z } from 'zod';

const envSchema = z.object({
    VITE_API: z.string(),
    VITE_ALLOWED_USERS: z.string().transform(e => e.split(','))
});

export default envSchema.parse(import.meta.env);