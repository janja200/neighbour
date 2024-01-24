import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
    req:Request,
    {params}:{params:{storeId:string}}
){
    try {
        const {userId}=auth()
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const StoreId=params.storeId
        const body=await req.json()
        const {name}=body
        if(!name){
            return new NextResponse("name is required",{status:400})  
        }
        if(!StoreId){
            return new NextResponse("store id is required",{status:400})  
        }
        const UpdatedStore=await prismadb.store.updateMany({
            where:{
                id:StoreId,
                userId
            },
            data:{
                name
            }
        })
        return NextResponse.json(UpdatedStore)
    } catch (error) {
        console.log("[store-patch]",error)
        return new NextResponse("Internal error",{status:500})
    }
}

export async function DELETE(
    _req:Request,
    {params}:{params:{storeId:string}}
){
    try {
        const {userId}=auth()
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const StoreId=params.storeId
        if(!StoreId){
            return new NextResponse("store id is required",{status:400})  
        }
        const deletedStore=await prismadb.store.deleteMany({
            where:{
                id:StoreId,
                userId
            }})
        return NextResponse.json(deletedStore)
    } catch (error) {
        console.log("[store-delete]",error)
        return new NextResponse("Internal error",{status:500})
    }
}