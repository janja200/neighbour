import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
 
export async function GET(
    _req:Request,
    {params}:{params:{billboardId:string}}
){
    try {
       
        if(!params.billboardId){
            return new NextResponse("Billboard id is required",{status:400})  
        }
        const Billboard=await prismadb.billboard.findUnique({
            where:{
                id:params.billboardId,
            }})
        return NextResponse.json(Billboard)
    } catch (error) {
        console.log("[billboardId]",error)
        return new NextResponse("Internal error",{status:500})
    }
}
export async function PATCH(
    req:Request,
    {params}:{params:{storeId:string,billboardId:string}}
){
    try {
        const {userId}=auth()
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const StoreId=params.storeId
        const body=await req.json()
        const {label,imageUrl}=body
        if(!label && !imageUrl){
            return new NextResponse("Label and imageUrl are required",{status:400});
          }
         if(!params.storeId && !params.billboardId){
             return new NextResponse("StoreId and billboardId are required",{status:400});
           }
           const storeByUserId= await prismadb.store.findFirst({
            where:{
                id:params.storeId
            }
        })
        if(!storeByUserId){
            return new NextResponse("Unauthorized",{status:403})
        }
        const UpdatedBillboard=await prismadb.billboard.updateMany({
            where:{
                id:params.billboardId,
                               
            },
            data:{
                label,
                imageUrl
            }
        })
        return NextResponse.json(UpdatedBillboard)
    } catch (error) {
        console.log("[store-patch]/billboardId",error)
        return new NextResponse("Internal error",{status:500})
    }
}

export async function DELETE(
    _req:Request,
    {params}:{params:{storeId:string,billboardId:string}}
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
        if(!params.billboardId){
            return new NextResponse("Billboard id is required",{status:400})  
        }
        const deletedBillboard=await prismadb.billboard.deleteMany({
            where:{
                id:params.billboardId,
            }})
        return NextResponse.json(deletedBillboard)
    } catch (error) {
        console.log("[store-delete]",error)
        return new NextResponse("Internal error",{status:500})
    }
}