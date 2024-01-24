import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function POST(
    req:Request,
){
   try {
     const {userId}=auth()
     const body=await req.json();
     if(!userId){
        return new NextResponse("Unauthorized",{status:401});
     }
    const {name}=body

    if(!name){
       return new NextResponse("name is required",{status:400});
     }
     const store =await prismadb.store.create({
        data:{
            name,
            userId
        }
      
     })
     return NextResponse.json(store);
   } catch (error) {
     console.log("[store_post",error)
     return new NextResponse("internal error",{status:500});
   }
}