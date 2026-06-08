import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";
import { LabelAuthForm } from "./LabelAuthForms";

interface AuthInputProps {
  label: string;
  type: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

export function AuthInput({label, type, error, registration}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5">

      <LabelAuthForm text={label}/>

      <div className="relative">
        <input
          type={inputType}
          {...registration}
          className={`w-full border-slate-300 bg-slate-50 px-4 py-3 text-center text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-[#001644] focus:bg-white focus:outline-none ${isPasswordField ? "pr-11" : ""}`}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
            className="absolute inset-y-0 right-3 flex items-center text-slate-500 transition hover:text-slate-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (<p className="pt-0.5 text-xs font-medium text-rose-600">{error}</p>)}

    </div>
  )
}

