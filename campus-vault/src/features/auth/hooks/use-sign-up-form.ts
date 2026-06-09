import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema, type SignUpInput } from "../schemas/sign-up-schema";
import { signUpWithEmail } from "../services/sign-up-service";

export function useSignUpForm() {
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
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

    return "No se pudo completar el registro. Intenta nuevamente.";
  }

  async function onSubmit(data: SignUpInput) {
    form.clearErrors();

    try {
      const result = await signUpWithEmail(data);

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