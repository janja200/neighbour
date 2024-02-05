"use client"
import CardWrapper from "./card-wrapper";
import {useForm} from "react-hook-form"
import * as z from "zod"
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormErros from "./form-error";
import FormSuccess from "./form-success";
import { login } from "@/actions/auth/login";
import { useState, useTransition } from "react";

export const LoginForm = () => {
  const [errors,setErrors]=useState<string | undefined>("")
  const [success,setSuccess]=useState<string | undefined>("")
  const [isPending,startTransition]=useTransition()
  const form =useForm<z.infer<typeof LoginSchema>>({
    resolver:zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password:"",
    }


  })
  const onSubmit=(values:z.infer<typeof LoginSchema>)=>{
    setErrors("")
    setSuccess("")
    startTransition(()=>{
      login(values).then((data)=>{
        setErrors(data.error)
        setSuccess(data.success)
      })
    })
    
  }
    return ( 
       <CardWrapper
         headerLabel="Welcome back"
         backButtonLabel="Dont have an account"
         backButtonHref="/auth/register"
         showSocial
       >
         <Form {...form}>
           <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
             <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="johndoe@gmail.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="password"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="********"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
             </div>
             <FormErros message={errors}/>
             <FormSuccess message={success}/>
             <Button disabled={isPending} type="submit" className="w-full">
                Login
              </Button>
           </form>
         </Form>
       </CardWrapper>
     );
}
 
