import React from 'react'

interface LabelAuthProps {
  text: string|number;
}

export function LabelAuthForm({text}: LabelAuthProps) {
  return (
    <label className='block text-sm font-semibold tracking-wide text-slate-700'>
      {text}
    </label>
  )
}