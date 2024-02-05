"use server"
import prismadb from "@/lib/prismadb"

interface storeLocationProps{
    latitude:number,
    longitude:number,
    storeId:string
}
export const StoreLocation=async(
    {latitude,longitude,storeId}:storeLocationProps)=>{
   const storeInDb=await prismadb.store.findFirst({
    where:{
        id:storeId
    }
   })
   let response=null
   const locationAdded=await prismadb.location.findFirst({
    where:{
        storeId
    }
   })
   if(storeInDb && !locationAdded){
       response=await prismadb.location.create({
            data:{
                latitude,
                longitude,
                storeId
            }
        })
    }
    
    return {data:response}
}