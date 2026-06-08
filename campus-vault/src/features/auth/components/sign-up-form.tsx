"use client";

import { useSignUpForm } from "../hooks/use-sign-up-form";
import { AuthInput } from "@/components/forms/AuthInput";
import { AuthFormHeader } from "@/components/forms/AuthFormHeader";
import { AuthSubmitButton } from "@/components/forms/AuthSubmitButton";

export function SignUpForm(){
  const{
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    onSubmit,
  } = useSignUpForm();

  return(
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full gap-3.5 max-w-md flex-col space-y-5 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8"
    >
      <AuthFormHeader
        title="Crear cuenta"
        subtitle="Completa tus datos para registrarte."
      />

      <AuthInput 
        label="Nombre" 
        type="text" 
        registration={register("name")}
        error={errors.name?.message}
      />

      <AuthInput 
        label="Correo Electrónico" 
        type="text" 
        registration={register("email")}
        error={errors.email?.message}
      />

      <AuthInput 
        label="Contraseña" 
        type="password" 
        registration={register("password")}
        error={errors.password?.message}
      />

      <AuthInput
        label="Repetir contraseña"
        type="password"
        registration={register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <AuthSubmitButton text="Registrarse" disabled={isSubmitting} />
    </form>
  );
}
