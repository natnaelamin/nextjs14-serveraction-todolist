"use client"

import { Button } from "./ui/button"
import { useFormStatus } from "react-dom"


function UpdateButton() {
    const {pending} = useFormStatus();
  return (
    <Button variant="outline" type="submit" className="rounded">{ pending ? "updating...": "update"}</Button>
  )
}

export default UpdateButton
