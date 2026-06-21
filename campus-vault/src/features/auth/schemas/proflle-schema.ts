import z from "zod";

export const profileSchema = z.object({
  username: z
    .string()
    .min(3, "El username debe tener al menos 3 caracteres")
    .max(30),

  bio: z
    .string()
    .max(300)
    .optional(),
  
  universityId: z.number(),
})

export type ProfileInput = z.infer<typeof profileSchema>

