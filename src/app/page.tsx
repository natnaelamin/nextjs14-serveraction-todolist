import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import prisma from "./db";
import { revalidatePath } from "next/cache";


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

export default async function Home() {

  const data= await getData();

  async function create(formData: FormData){
    "use server";

    const input= formData.get("input") as string;

    await prisma.todo.create({
      data: {
        input: input,
      },
    });

    revalidatePath('/')
  }

  async function edit(formData: FormData){
    "use server"

    const input = formData.get("input") as string;
    const inputId = formData.get("inputId") as string;

    await prisma.todo.update({
      where: {
        id: inputId,
      },
      data:{
        input: input,
      },
    });

    revalidatePath('/')
  }

  async function deleteItem(formData: FormData){
    "use server"

    const inputId = formData.get("inputId") as string;

    await prisma.todo.delete({
      where:{
        id: inputId,
      }
    })

    revalidatePath("/")
  }
  return (
    <div className="bg-zinc-900 items-center justify-center bg-cover h-screen grid gap-10 py-40">
      <div className="w-[579px]"> 
        <form action={create} className="flex gap-4">
          <Input placeholder="Enter Todo" className="w-full bg-slate-400 p-2 rounded text-lg"
          type="text"
          name="input"/>
          <Button variant="outline"  className="text-white bg-orange-600 w-36 rounded hover:text-white"
          type="submit">Submit</Button>
        </form>
      </div>

      <div className="flex flex-col gap-y-2 text-white text-center">
        {data.map((todo)=>(
          <form key={todo.id} action={edit} className="flex gap-5">
            <input type="text" value={todo.id} name="inputId" hidden/>
            <input type="text" name="input" defaultValue={todo.input} className=" border rounded p-2 w-full bg-stone-900 "/>
            <div className="flex gap-1">
              <Button variant="outline" type="submit" className="rounded">Update</Button>
              <Button className="bg-red-500 rounded" formAction={deleteItem} variant="outline">Delete</Button>
            </div>
          </form>
          ))}
      </div>
    </div>
  );
}
