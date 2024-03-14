"use client"
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'

function DeleteButton() {
    const {pending} = useFormStatus();
  return (
    <Button type="submit" className="bg-red-500 rounded" variant="outline">
        {pending? "Deleting...": "Delete"}</Button>
  )
}

export default DeleteButton
