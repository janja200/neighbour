"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { billboardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface billboardClientProps{
  data:billboardColumn[]
}
export const BillboardClient:React.FC<billboardClientProps>=({
  data
})=>{
    const router=useRouter()
    const params=useParams()

    return(
        <>
         <div className="flex items-center justify-between">
           <Heading 
              title={`Billboards (${data.length})`}
              description="Manage billboards for your store"
           />
           <Button onClick={()=>router.push(`/${params.storeId}/billboards/new`)}>
             <Plus className="mr-2 h-4 w-4"/>
             Add new
           </Button>
         </div>
         <Separator/>
         <DataTable searchKey="label" columns={columns} data={data}/>
         <Heading title="Api" description="Api calls for billbords"/>
         <Separator/>
         <ApiList entityName="billboards" entityId="billboardid"/>
        </>
    )
}