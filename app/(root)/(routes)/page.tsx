import HomeBillboard from "@/components/HomeBillboard";
import prismadb from "@/lib/prismadb";

const HomePage = async() => {
  const storesWithRecentBillboards = await prismadb.store.findMany({
    include: {
      billboards: {
        select: {
          label       :true,
          imageUrl    :true,
          
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    },
  });
   const billboardsForEachStore = storesWithRecentBillboards.map(store => {
    const Billboard = store.billboards[0]; 
    return {
      id: store.id,
      label: Billboard?.label,
      imageUrl: Billboard?.imageUrl
    };
  });
  return (
    <div>
      {billboardsForEachStore.map((billboard)=>(
         <HomeBillboard data={billboard}/>
      ))}
      
    </div>
  );
};
 
export default HomePage;
