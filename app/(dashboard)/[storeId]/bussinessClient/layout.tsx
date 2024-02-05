import NavbarBC from "@/components/BCcomponents/NavbarBC";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"


export default async function DashboardLayout({
    children,
    params
}:{
    children:React.ReactNode;
    params:{storeId:string}
}){
    const {userId}=auth()
    if(!userId){
        redirect("/")
    }
  

    return(
        <>
          <NavbarBC storeId={params.storeId}/>
          {children}
        </>
    )
}