import {z} from 'zod';

export const forgetPasswordSchema = z.object({
  email: z.string().email('e-mail inválido'),
});

export type TypeForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;
