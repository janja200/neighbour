import NavbarHome from "@/components/NavbarHome";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function HomeLayout({
    children,
 
}:{
    children:React.ReactNode;

}){
   const {userId}=auth()
   if(!userId){
    redirect("/")
   }
  
   return(
    <>
    <NavbarHome/>
    {children}
    </>
   )
}