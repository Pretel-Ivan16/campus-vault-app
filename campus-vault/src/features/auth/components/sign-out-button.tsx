"use client"

import { authClient } from "@/lib/auth-client"

export function SignOutButton(){
  async function handleSignOut() {
    await authClient.signOut();

    window.location.href = "/sign-in"
  }

  return(
    <button onClick={handleSignOut}>
      Cerrar Sesion
    </button>
  )
}