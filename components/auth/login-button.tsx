"use client"

import { useRouter } from "next/navigation"

interface loginButtonProps{
    children:React.ReactNode,
    mode?:"modal"|"redirect",
    asChild?:boolean
}
const LoginButton:React.FC<loginButtonProps> = ({
    children,
    mode="redirect",
    asChild
}) => {
    const router=useRouter()
    const onClick=()=>{
        router.push("/auth/login")
    }
    return ( 
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
     );
}
 
export default LoginButton;