import getBillboard from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/BCcomponents/Billboard";
import ProductList from "@/components/BCcomponents/ProductList";
import Container from "@/components/BCcomponents/ui/Container";

export const revalidate=0;
const bussinessClientPage = async() => {
    const products=await getProducts({isFeatured:true})
    const billboard=await getBillboard("65a26669df671ce93ebaa94e")
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