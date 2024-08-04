"use client";
import React from 'react'
import {useFormStatus} from 'react-dom'

const SubmitButton = () => {
    const { pending } = useFormStatus()
  return (
    <button disabled={pending} type='submit'>SubmitButton</button>
  )
}

export default SubmitButton