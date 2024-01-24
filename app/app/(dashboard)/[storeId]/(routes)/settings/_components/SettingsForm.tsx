"use client"
import { Store } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import * as z from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Heading from "@/components/Heading"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { AlertModal } from "@/components/modals/AlertModal"
import { ApiAlert } from "@/components/ui/ApiAlert"
import { useOrigin } from "@/hooks/useOrigin"
interface settingsFormProps{
    store:Store
}
const formSchema=z.object({
    name:z.string().min(1),
})

type settingsFormValues=z.infer<typeof formSchema>;

export const SettingsForm:React.FC<settingsFormProps>=({
    store
})=>{
    const params=useParams()
    const router =useRouter()
    const origin =useOrigin()
    const [open,setOpen]=useState(false)
    const [loading,setloading]=useState(false)
    const form=useForm<settingsFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:store
    })
    const onSubmit=async(data:settingsFormValues)=>{
        try {
          setloading(true)
          await axios.patch(`/api/stores/${params.storeId}`,data)
          router.refresh()
          toast.success("store updated")
        } catch (error) {
          toast.error("something went wrong")
        }finally{
           setloading(false)
        }
    }
    const onDelete=async()=>{
      try {
        setloading(true)
        await axios.delete(`/api/stores/${params.storeId}`)
        router.refresh()
        router.push("/")
      } catch (error) {
        toast.error("Make sure you removed all products and categories first")
      }finally{
        setloading(false)
      }
    }
    return(
        <>
        <AlertModal
           isOpen={open}
           onClose={()=>setOpen(false)}
           onConfirm={()=>onDelete()}
           loading={loading}
        />
        <div className="flex items-center justify-between">

            <Heading 
               title="Settings"
               description="Manage store"
            />
            <Button
              disabled={loading}
              variant="destructive"
              size="icon"
              onClick={()=>setOpen(true)}
            >
             <Trash className="w-4 h-4 hover:shrink-0"/>
            </Button>
            
        </div>
        <Separator/>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
              <div className="grid grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({field})=>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Store name" 
                              {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                  )}
                />

              </div>
              <Button disabled={loading} className="ml-auto" type="submit">Save changes</Button>
            </form>
        </Form>
        <Separator/>
        <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant="public"/>
        </>
    )
}