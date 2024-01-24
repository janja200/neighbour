import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
 
export async function GET(
    _req:Request,
    {params}:{params:{colorId:string}}
){
    try {
       
        if(!params.colorId){
            return new NextResponse("ColorId is required",{status:400})  
        }
        const color=await prismadb.color.findUnique({
            where:{
                id:params.colorId,
            }})
        return NextResponse.json(color)
    } catch (error) {
        console.log("[colorId]",error)
        return new NextResponse("Internal error",{status:500})
    }
}
export async function PATCH(
    req:Request,
    {params}:{params:{storeId:string,colorId:string}}
){
    try {
        const {userId}=auth()
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const StoreId=params.storeId
        const body=await req.json()
        const {name,value}=body
        if(!name && !value){
            return new NextResponse("name and value are required",{status:400});
          }
         if(!params.storeId && !params.colorId){
             return new NextResponse("StoreId and colorid are required",{status:400});
           }
           const storeByUserId= await prismadb.store.findFirst({
            where:{
                id:params.storeId
            }
        })
        if(!storeByUserId){
            return new NextResponse("Unauthorized",{status:403})
        }
        const UpdatedColor=await prismadb.color.updateMany({
            where:{
                id:params.colorId,
                               
            },
            data:{
                name,
                value
            }
        })
        return NextResponse.json(UpdatedColor)
    } catch (error) {
        console.log("[store-patch]/ColorId",error)
        return new NextResponse("Internal error",{status:500})
    }
}

export async function DELETE(
    _req:Request,
    {params}:{params:{storeId:string,colorId:string}}
){
    try {
        const {userId}=auth()
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        
        const storeByUserId= await prismadb.store.findFirst({
            where:{
                id:params.storeId
            }
        })
        if(!storeByUserId){
            return new NextResponse("Unauthorized",{status:403})
        }
        if(!params.colorId){
            return new NextResponse("ColorId  is required",{status:400})  
        }
        const deletedColor=await prismadb.color.deleteMany({
            where:{
                id:params.colorId,
            }})
        return NextResponse.json(deletedColor)
    } catch (error) {
        console.log("[delete-Color]",error)
        return new NextResponse("Internal error",{status:500})
    }
}