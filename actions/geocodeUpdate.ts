"use server"
import prismadb from "@/lib/prismadb"

interface GeocodeUpdateProps{
    latitude:number,
    longitude:number,
    storeId:string
}
export const GeocodeUpdate=async(
    {latitude,longitude,storeId}:GeocodeUpdateProps)=>{
   const storeInDb=await prismadb.store.findFirst({
    where:{
        id:storeId
    }
   })
   
   if(storeInDb){
       const response=await prismadb.location.create({
            data:{
                latitude,
                longitude,
                storeId
            }
        })
        console.log(response)
    }
    
}