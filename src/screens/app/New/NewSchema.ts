import {z} from 'zod';

export const NewSchema = z.object({
  description: z.string().min(1, 'Descrição obrigatória'),
  amount: z.preprocess(
    val => Number(val),
    z.number().min(0.01, 'Informe um valor maior que zero'),
  ),
});

export type TypeNewSchema = z.infer<typeof NewSchema>;
