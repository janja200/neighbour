import NavbarBC from "@/components/BCcomponents/NavbarBC";
import BcModalProvider from "@/providers/bcModalProvider";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"


export default async function DashboardLayout({
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
          <NavbarBC/>
          {children}
        </>
    )
}