"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { productColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface productClientProps{
  data:productColumn[]
}
export const ProductClient:React.FC<productClientProps>=({
  data
})=>{
    const router=useRouter()
    const params=useParams()

    return(
        <>
         <div className="flex items-center justify-between">
           <Heading 
              title={`Products (${data.length})`}
              description="Manage products for your store"
           />
           <Button onClick={()=>router.push(`/${params.storeId}/products/new`)}>
             <Plus className="mr-2 h-4 w-4"/>
             Add new
           </Button>
         </div>
         <Separator/>
         <DataTable searchKey="name" columns={columns} data={data}/>
         <Heading title="Api" description="Api calls for products"/>
         <Separator/>
         <ApiList entityName="products" entityId="productId"/>
        </>
    )
}