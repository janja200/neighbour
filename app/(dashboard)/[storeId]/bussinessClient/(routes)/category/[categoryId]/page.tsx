import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/BCcomponents/Billboard";
import Container from "@/components/BCcomponents/ui/Container";
import Filter from "./_components/Filter";
import NoResults from "@/components/BCcomponents/ui/No-results";
import ProductCard from "@/components/BCcomponents/ui/productCard";
import MobileFilter from "@/components/BCcomponents/MobileFilter";

export const revalidate=0;
interface CategoryPageProps{
    params:{categoryId:string,storeId:string},
    searchParams:{
        colorId:string,
        sizeId:string,
    }
}
const CategoryPage:React.FC<CategoryPageProps> = async({
    params,
    searchParams
}) => {
    const products=await getProducts({
        categoryId:params.categoryId,
        colorId:searchParams.colorId,
        sizeId:searchParams.sizeId,
    },params.storeId)
    const sizes=await getSizes(params.storeId)
    const colors =await getColors(params.storeId)
    const category=await getCategory(params.categoryId,params.storeId)

    return ( 
        <div className="bg-white">
            <Container>
                <Billboard data={category.billboard}/>
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                   <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                    <MobileFilter sizes={sizes} colors={colors}/>
                    <div className="hidden lg:block">
                        <Filter
                          valueKey="sizeId"
                          name="Sizes"
                          data={sizes}
                        />
                        <Filter
                          valueKey="colorId"
                          name="Colors"
                          data={colors}
                        />
                    </div>
                    <div className="mt-6 lg:col-span-4 lg:mt-0">
                      {products.length===0 && <NoResults/> }
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {products.map((item)=>(
                            <ProductCard key={item.id} data={item}/>
                        ))}
                      </div>
                    </div>
                   </div>
                </div>
            </Container>
        </div>
     );
}
 
export default CategoryPage;