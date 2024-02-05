"use server"
import {  RegisterSchema } from "@/schemas"
import * as z from "zod"
import bcrypt from "bcrypt"
import prismadb from "@/lib/prismadb"
import { getUserByEmail } from "@/data/user"
export const Register=async(values:z.infer<typeof RegisterSchema>)=>{
    const validatedFields=RegisterSchema.safeParse(values)
    if(!validatedFields){
        return {error:"Invalid fields!"}
    }
    const {email,password,name}=values
    const hashedPassword=await bcrypt.hash(password,10)
    const existingUser=await getUserByEmail(email)
    if(existingUser){
        return {error:"email already in use"}
    }
    await prismadb.user.create({
        data:{
            email,
            name,
            password:hashedPassword,

        }
    })
    return {success:"User created"}
}