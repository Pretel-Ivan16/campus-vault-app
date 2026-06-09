"use client"

import { useSignInForm } from "../hooks/use-sign-in"
import { AuthFormHeader } from "@/components/forms/AuthFormHeader"
import { AuthInput } from "@/components/forms/AuthInput"
import { AuthSubmitButton } from "@/components/forms/AuthSubmitButton"

export function SignInForm() {
  const{
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    onSubmit,
  } = useSignInForm();

  return(
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full gap-3.5 max-w-md flex-col space-y-5 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8"
    >
      <AuthFormHeader
        title="Ingresa a tu cuenta"
        subtitle="Completa tus datos para ingresar a tu cuenta."
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

      {errors.root?.message && (
        <p className="text-sm font-medium text-rose-600">{errors.root.message}</p>
      )}

      <AuthSubmitButton text="Iniciar Sesión" disabled={isSubmitting}/>
    </form>
  )
}