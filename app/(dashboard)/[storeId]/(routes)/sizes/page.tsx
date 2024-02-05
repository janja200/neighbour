import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./_components/SizeClient";
import { sizeColumn } from "./_components/columns";
import {format} from "date-fns"
const SizesPage = async({params}:{params:{storeId:string}}) => {
  const sizes= await prismadb.size.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
       createdAt:"desc"
    }
  })
  const formattedSizes:sizeColumn[]=sizes.map((size)=>({
    id:size.id,
    name:size.name,
    value:size.value,
    createdAt:format(size.createdAt,"MMMM do, yyyy")
  }))
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <BillboardClient data={formattedSizes}/>
            </div>
        </div>
     );
}
 
export default SizesPage;