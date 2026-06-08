import type { SignUpInput } from "../schemas/sign-up-schema";

import { authClient } from "@/lib/auth-client";

export async function signUpWithEmail(data: SignUpInput) {
  return authClient.signUp.email({
    name: data.name,
    email: data.email,
    password: data.password,
  });
}