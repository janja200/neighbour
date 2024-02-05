import getBillboard from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/BCcomponents/Billboard";
import ProductList from "@/components/BCcomponents/ProductList";
import Container from "@/components/BCcomponents/ui/Container";
import prismadb from "@/lib/prismadb";

export const revalidate=0;
interface bussinessClientPageProps{
  params:{storeId:string}
}
const bussinessClientPage = async({
  params
}:bussinessClientPageProps) => {
  const Billboardid = await prismadb.billboard.findFirst({
    where: {
      storeId: params.storeId, 
    },
    select: {
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
   
    const billboardId = Billboardid?.id;
    const products=await getProducts({isFeatured:true},params.storeId)

    const billboard=await getBillboard(billboardId!,params.storeId)
    return ( 
        <Container>
            <div className="space-y-10 pb-10">
              <Billboard data={billboard}/>
            </div>
            <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
               <ProductList title="Featured Products" data={products}/>
            </div>
        </Container>
     );
}
 
export default bussinessClientPage;