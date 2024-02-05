"use client"

import Heading from "@/components/Heading"
import { Separator } from "@/components/ui/separator"
import { orderColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface orderClientProps{
  data:orderColumn[]
}
export const OrderClient:React.FC<orderClientProps>=({
  data
})=>{

    return(
        <>
           <Heading 
              title={`Orders (${data.length})`}
              description="Manage orders for your store"
           />
         <Separator/>
         <DataTable searchKey="products" columns={columns} data={data}/>
        
        </>
    )
}