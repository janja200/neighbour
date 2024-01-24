import prismadb from "@/lib/prismadb";

const DashboardPage=async ({params}:{params:{storeId:string}}) => {
     const store= await prismadb.store.findFirst({
        where:{
            id:params.storeId
        }
     })
    return ( 
        <div>
            active store:{store?.name}
        </div> 
    );
}
 
export default DashboardPage;