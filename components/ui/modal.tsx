"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";

interface modalProps{
    title:string;
    description:string;
    onClose:()=>void;
    isOpen:boolean;
    children?:React.ReactNode;
}
const Modal:React.FC<modalProps>=({
    title,
    description,
    onClose,
    isOpen,
    children
})=>{
    const onChange=(open:boolean)=>{
        if(!open){
            onClose();
        }
    }
    return(
        <Dialog open={isOpen} onOpenChange={onChange}>
             <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                       {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
             </DialogContent>
        </Dialog>
    )
}

export default Modal;