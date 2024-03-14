"use client"
import React, { useRef } from 'react'
import SubmitButton from './SubmitButton'
import { create } from '@/app/action'
import { Input } from './ui/input'
import { useFormState } from 'react-dom'

function FormElement() {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useFormState(create, null)
  return (
    <form action={async(formData: FormData)=>{
        //create(formData); if i wasn't catching error this is the way to go
        formAction(formData);
        formRef.current?.reset();
    }} className=" gap-4" ref={formRef}>
        <div className='flex gap-4'>
            <Input placeholder="Enter Todo" className="w-full bg-slate-400 p-2 rounded text-lg"
            type="text"
            name="input"/>
            <SubmitButton/>
        </div>
        <p className='text-red-500'>{state as string}</p>
    </form>
  )
}

export default FormElement
