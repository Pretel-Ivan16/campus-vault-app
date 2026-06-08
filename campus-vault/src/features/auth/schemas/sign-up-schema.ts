import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  
  email: z
    .string()
    .email({ message: "Ingresa un correo electronico valido" }),
  
  password: z
    .string()
    .min(7, { message: "La contrasena debe tener mas de 6 caracteres" })
    .regex(/[A-Z]/, { message: "La contrasena debe incluir al menos 1 mayúscula" })
    .regex(/[0-9]/, { message: "La contrasena debe incluir al menos 1 numero" })
    .regex(/[^A-Za-z0-9]/, { message: "La contrasena debe incluir al menos 1 signo" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Debes repetir la contrasena" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Las contrasenas no coinciden",
});

export type SignUpInput =
  z.infer<typeof signUpSchema>;
