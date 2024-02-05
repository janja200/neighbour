"use client"

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButton from "./BackButton";
import Header from "./header";
import Social from "./social";

interface CardWrapperProps{
    children:React.ReactNode,
    headerLabel:string,
    backButtonLabel:string,
    backButtonHref:string,
    showSocial?:boolean
}
const CardWrapper:React.FC< CardWrapperProps> = ({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
    showSocial
}) => {
    return (    
        <Card className="w-[400px]">
         <CardHeader>
            <Header label={headerLabel}/>
         </CardHeader>
         <CardContent>
            {children}
         </CardContent>
         {showSocial && (
            <CardFooter>
                <Social/>
            </CardFooter>
         )}
         <CardFooter>
            <BackButton
              label={backButtonLabel}
              href={backButtonHref}
            />
         </CardFooter>
        </Card>
     );
}
 
export default CardWrapper;