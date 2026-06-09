import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Correo electrónico inválido"),
  password: z.string()
});

export type SignInInput = z.infer<typeof signInSchema>