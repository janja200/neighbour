"use client"
import Link from "next/link"
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const MainNav = ({className, ...props}:React.HTMLAttributes<HTMLElement>) => {
    const pathname=usePathname()
   
    const routes=[
      {
        href:"store",
        label:"   Bussiness",
        active:pathname==="store",
      }
    ];
    
    return (
        <nav
          className={cn("flex items-center space-x-4 lg:space-x-6", className)}
          {...props}
        >
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                route.active ? 'text-black border-b-4 border-black dark:text-white' : 'text-muted-foreground'
              )}
            >
              {route.label}
          </Link>
          ))}
        </nav>
      )
}
 
export default MainNav;