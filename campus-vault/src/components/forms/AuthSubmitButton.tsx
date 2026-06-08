interface AuthSubmitButtonProps {
  text: string;
  disabled?: boolean;
}

export function AuthSubmitButton({ text, disabled = false }: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[#001644] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#02256b] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {text}
    </button>
  );
}
