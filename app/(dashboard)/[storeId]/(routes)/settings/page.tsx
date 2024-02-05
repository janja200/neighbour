import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SettingsForm } from "./_components/SettingsForm";

interface settingsPageProps{
    params:{storeId:string}
}
const SettingsPage:React.FC<settingsPageProps> = async({params}) => {
    const {userId}=auth()
    if(!userId){
        redirect("/")
    }
    const store=await prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    })
    if(!store){
        redirect("/")
    }
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
             <SettingsForm store={store}/>
            </div>
        </div>
     );
}
 
export default SettingsPage;