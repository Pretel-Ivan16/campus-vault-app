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

  async function onSubmit(data: SignUpInput) {
    const result = await signUpWithEmail(data);
    console.log(result);
  }

  return {
    ...form,
    onSubmit,
  };
}