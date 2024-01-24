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
    const {name,billboardId}=body

    if(!name && !billboardId){
       return new NextResponse("Label and imageUrl are required",{status:400});
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
     const category =await prismadb.category.create({
        data:{
            name,
            billboardId,
            storeId:params.storeId
        }
      
     })
     return NextResponse.json(category);
   } catch (error) {
     console.log("[STOREID]/BILLBOARDS",error)
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
  
     const categories =await prismadb.category.findMany({
        where:{
            storeId:params.storeId
        }
      
     })
     return NextResponse.json(categories);
   } catch (error) {
     console.log("[STOREID]/BILLBOARDSGET",error)
     return new NextResponse("internal error",{status:500});
   }
}