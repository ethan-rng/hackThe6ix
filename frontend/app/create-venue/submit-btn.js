"use client";
import React from 'react'
import { useFormStatus } from "react-dom";


const SubmitBtn = () => {
    const { pending } = useFormStatus();

  return (
    <button disabled={pending} type='submit' className='text-white rounded-3xl w-[32rem] px-16 m-5 py-3 bg-highlight disabled:bg-highlight/95'>
        Submit
    </button>
  )
}

export default SubmitBtn