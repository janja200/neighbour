import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
 
export async function GET(
    _req:Request,
    {params}:{params:{categoryId:string}}
){
    try {
       
        if(!params.categoryId){
            return new NextResponse("Category id is required",{status:400})  
        }
        const Category=await prismadb.category.findUnique({
            where:{
                id:params.categoryId,
            },
            include:{
                billboard:true
            }
        })
        return NextResponse.json(Category)
    } catch (error) {
        console.log("[categoryId]",error)
        return new NextResponse("Internal error",{status:500})
    }
}
export async function PATCH(
    req:Request,
    {params}:{params:{storeId:string,categoryId:string}}
){
    try {
        const {userId}=auth()
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const StoreId=params.storeId
        const body=await req.json()
        const {name,billboardId}=body
        if(!name && !billboardId){
            return new NextResponse("name and billbordId are required",{status:400});
          }
         if(!params.storeId && !params.categoryId){
             return new NextResponse("StoreId and categoryId are required",{status:400});
           }
           const storeByUserId= await prismadb.store.findFirst({
            where:{
                id:params.storeId
            }
        })
        if(!storeByUserId){
            return new NextResponse("Unauthorized",{status:403})
        }
        const UpdatedCategory=await prismadb.category.updateMany({
            where:{
                id:params.categoryId,
                               
            },
            data:{
                name,
                billboardId
            }
        })
        return NextResponse.json(UpdatedCategory)
    } catch (error) {
        console.log("[store-patch]/categoryId",error)
        return new NextResponse("Internal error",{status:500})
    }
}

export async function DELETE(
    _req:Request,
    {params}:{params:{storeId:string,categoryId:string}}
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
        if(!params.categoryId){
            return new NextResponse("Category id is required",{status:400})  
        }
        const deletedCategory=await prismadb.category.deleteMany({
            where:{
                id:params.categoryId,
            }})
        return NextResponse.json(deletedCategory)
    } catch (error) {
        console.log("[category-delete]",error)
        return new NextResponse("Internal error",{status:500})
    }
}