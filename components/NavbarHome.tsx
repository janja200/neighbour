import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "./MainNavHome";
import { redirect } from "next/navigation";
const NavbarHome =async () => {

   const {userId}=auth()
  
   if(!userId){
      redirect("/")
   }
   
    
    return ( 
        <div
         className="border-b">
           <div className="flex h-16 items-center px-4">
               <h1 className="text-3xl text-bold">Neighbour</h1>
              <MainNav className="mx-6"/>
              <div className="ml-auto flex items-center space-x-4">
                 <UserButton afterSignOutUrl="/"/>
              </div>
            </div> 
        </div>
     );
}
 
export default NavbarHome;