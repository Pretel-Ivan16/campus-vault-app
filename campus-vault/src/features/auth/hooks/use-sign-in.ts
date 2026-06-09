import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signInSchema, type SignInInput } from "../schemas/sign-in-schema";
import { signInWithEmail } from "../services/sign-in-service";

export function useSignInForm() {
	const form = useForm<SignInInput>({
		resolver: zodResolver(signInSchema),
		mode: "onChange",
		reValidateMode: "onChange",
	});

	function getErrorMessage(error: unknown): string {
		if (typeof error === "string" && error.trim()) {
			return error;
		}

		if (
			typeof error === "object" &&
			error !== null &&
			"message" in error &&
			typeof (error as { message?: unknown }).message === "string"
		) {
			return (error as { message: string }).message;
		}

		return "No se pudo iniciar sesion. Intenta nuevamente.";
	}

	async function onSubmit(data: SignInInput) {
		form.clearErrors();

		try {
			const result = await signInWithEmail(data);

			if (result?.error) {
				const message = getErrorMessage(result.error);

				if (message.toLowerCase().includes("email")) {
					form.setError("email", { type: "server", message });
					return;
				}

				form.setError("root", { type: "server", message });
				return;
			}

			window.location.href = "/dashboard";
		} catch {
			form.setError("root", {
				type: "server",
				message: "Ocurrio un error de red. Intenta nuevamente.",
			});
		}
	}

	return {
		...form,
		onSubmit,
	};
}
