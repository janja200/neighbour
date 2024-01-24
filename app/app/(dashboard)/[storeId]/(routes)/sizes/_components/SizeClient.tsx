"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { sizeColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface sizeClientProps{
  data:sizeColumn[]
}
export const BillboardClient:React.FC<sizeClientProps>=({
  data
})=>{
    const router=useRouter()
    const params=useParams()

    return(
        <>
         <div className="flex items-center justify-between">
           <Heading 
              title={`Sizes (${data.length})`}
              description="Manage sizes for your store"
           />
           <Button onClick={()=>router.push(`/${params.storeId}/sizes/new`)}>
             <Plus className="mr-2 h-4 w-4"/>
             Add new
           </Button>
         </div>
         <Separator/>
         <DataTable searchKey="name" columns={columns} data={data}/>
         <Heading title="Api" description="Api calls for sizes"/>
         <Separator/>
         <ApiList entityName="sizes" entityId="sizeId"/>
        </>
    )
}