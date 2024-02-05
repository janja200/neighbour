"use server"
import { signIn } from "@/auth"
import { redirectPath } from "@/routes"
import { LoginSchema } from "@/schemas"
import { error } from "console"
import * as z from "zod"
export const login=async(values:z.infer<typeof LoginSchema>)=>{
    const validatedFields=LoginSchema.safeParse(values)
    if(!validatedFields){
        return {error:"Invalid fields!"}
    }
    const {email,password}=values
    try {
        signIn("credentials",{
            email,
            password,
            redirectTo:redirectPath
        })
    } catch (error) {
        return {error:"Invalid credentials"}
    }
    throw error
}