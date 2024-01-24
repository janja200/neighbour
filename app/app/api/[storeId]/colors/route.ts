import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function POST(
    req:Request,
    {params}:{params:{storeId:string}}
){
   try {
     const {userId}=auth()
     const body=await req.json();
     if(!userId){
        return new NextResponse("unauthenticated",{status:401});
     }
    const {name,value}=body

    if(!name && !value){
       return new NextResponse("Name and value are required",{status:400});
     }
    if(!params.storeId){
        return new NextResponse("StoreId is required",{status:400});
      }
    const storeByUserId= await prismadb.store.findFirst({
        where:{
            id:params.storeId
        }
    })
    if(!storeByUserId){
        return new NextResponse("Unauthorized",{status:403})
    }
     const color =await prismadb.color.create({
        data:{
            name,
            value,
            storeId:params.storeId
        }
      
     })
     return NextResponse.json(color);
   } catch (error) {
     console.log("[STOREID]/COLOR",error)
     return new NextResponse("internal error",{status:500});
   }
}

export async function GET(
    req:Request,
    {params}:{params:{storeId:string}}
){
   try {
    
    if(!params.storeId){
        return new NextResponse("StoreId is required",{status:400});
      }
  
     const color =await prismadb.color.findMany({
        where:{
            storeId:params.storeId
        }
      
     })
     return NextResponse.json(color);
   } catch (error) {
     console.log("[STOREID]/SIZESGET",error)
     return new NextResponse("internal error",{status:500});
   }
}