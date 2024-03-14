"use client"
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
    const {pending} = useFormStatus();
  return (
    <Button variant="outline"  className="text-white bg-orange-600 w-36 rounded hover:text-white"
          type="submit">{pending? "Submitting...": "Submit"}</Button>
  )
}

export default SubmitButton
