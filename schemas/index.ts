import * as z from "zod";
export const LoginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(1,{
        message:"Password is required"
    })
})

export const RegisterSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6,{
        message:"Password is required and min is six characters"
    }),
    name:z.string().min(1,{
        message:"Name is required"
    }),
})