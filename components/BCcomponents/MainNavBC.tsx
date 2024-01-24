"use client"
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface mainNavProps{
    data:Category[]
}
const MainNavBC:React.FC<mainNavProps> = ({
    data
}) => {
    const pathname=usePathname()
    const routes=data.map((route)=>({
        href:`/bussinessClient/category/${route.id}`,
        label:route.name,
        active:pathname===`/bussinessClient/category/${route.id}`
    }))
    return ( 
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-4">
            {routes.map((route)=>(
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn("text-sm font-medium transition-colors hover:text-black",
                  route.active ? "text-black":"text-neutral-500"
                  )}
                >
                  {route.label}
                </Link>
            ))}
        </nav>
     );
}
 
export default MainNavBC;