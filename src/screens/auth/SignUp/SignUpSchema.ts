import {z} from 'zod';

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(5, 'nome muito curto')
      .max(15, 'nome muito longo.')
      .transform(value => {
        return value
          .split(' ')
          .map(
            word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(' ');
      }),
    email: z.string().email('e-mail inválido'),
    password: z.string().min(8, 'senha deve ter no mínimo 8 caracteres'),
    passwordConfirm: z.string().min(8, 'Confirme a sua senha'),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: 'A confirmação da senha não confere.',
    path: ['passwordConfirm'],
  });

export type TypeSignUpSchema = z.infer<typeof signUpSchema>;
