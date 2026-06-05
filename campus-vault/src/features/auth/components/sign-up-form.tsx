"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import { signUpSchema, SignUpInput } from "../schemas/sign-up-schema";

import { authClient } from "@/lib/auth-client";

export function SignUpForm(){
  const{
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema)
  });
  
  async function onSubmit(data:SignUpInput) {
    const result = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  
    console.log(result)
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre</label>

        <input 
          type="text"
          {...register("name")}
        />

        {errors.name && (
          <p>{errors.name.message}</p>
        )}
      </div>
      <div>
        <label>Email</label>

        <input 
          type="text"
          {...register("email")}
        />

        {errors.email && (
          <p>{errors.email.message}</p>
        )}
      </div>
      <div>
        <label>Contraseña</label>

        <input 
          type="text"
          {...register("password")}
        />

        {errors.password && (
          <p>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Registrarse
      </button>
    </form>
  );
}
