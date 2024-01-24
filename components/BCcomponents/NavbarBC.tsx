import Link from "next/link";
import Container from "./ui/Container";
import MainNavBC from "./MainNavBC";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./NavbarActions";

export const revalidate=0;
const NavbarBC = async() => {
  const categories=await getCategories()
    return ( 
        <Container>
         <div className="relative border-b fixed px-4 sm:px-6 lg:px-8 flex h-16 items-center ">
          <Link href="/bussinessClient" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">
                Store
            </p>
          </Link>
          <MainNavBC data={categories}/>
          <NavbarActions/>
         </div>
        </Container>
     );
}
 
export default NavbarBC;