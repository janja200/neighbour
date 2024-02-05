
import { CheckCircleIcon } from "lucide-react";

interface formSuccessProps{
    message?:string
}
const FormSuccess:React.FC<formSuccessProps> = ({
    message
}) => {
    if(!message){
        return null
    }
    return ( 
        <div className="bg-emerald-500/15 p-3 flex  rounded-md items-center gap-x-2 text-sm text-emerald-500">
          <CheckCircleIcon className="h-4 w-4"/>
          <p>{message}</p>
        </div>
     );
}
 
export default FormSuccess;