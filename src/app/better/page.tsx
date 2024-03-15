import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import prisma from "../db";
import { create, deleteItem, edit } from "../action";
import UpdateButton from "@/components/UpdateButton";
import DeleteButton from "@/components/DeleteButton";
import SubmitButton from "@/components/SubmitButton";
import FormElement from "@/components/FormElement";


async function getData(){
    const data= await prisma.todo.findMany({
      select:{
        input: true,
        id: true
      },
      orderBy: {
        createdAt: 'desc'
      },
    });
  
    return data;
  }

async function Better() {
    const data = await getData();
  return (
    <div className="bg-zinc-900 items-center justify-center bg-cover h-screen grid gap-10 py-40">
      <div className="w-[579px]"> 
        <FormElement/>
      </div>
      <div className="flex flex-col gap-y-2 text-white text-center">
        {data.map((todo)=>(
          <div key={todo.id} className="flex gap-1">
            <form action={edit} className="flex gap-5 w-full">
                <input type="text" value={todo.id} name="inputId" hidden/>
                <input type="text" name="input" defaultValue={todo.input} className=" border rounded p-2 w-full bg-stone-900 "/>
                <div className="flex gap-1">
                <UpdateButton/>
                
                </div>
            </form>
            <form action={deleteItem} className="flex-grow">
                <input type="text" value={todo.id} name="inputId" hidden/>
                <DeleteButton/>
            </form>
          </div>
          ))}
      </div>
    </div>
  )
}

export default Better
