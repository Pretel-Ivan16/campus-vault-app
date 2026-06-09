import type { SignInInput } from "../schemas/sign-in-schema";

import { authClient } from "@/lib/auth-client";

export async function signInWithEmail(data: SignInInput) {
	return authClient.signIn.email({
		email: data.email,
		password: data.password,
	});
}
