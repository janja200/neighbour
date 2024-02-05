import credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import type { NextAuthConfig } from "next-auth"
import { getUserByEmail } from "./data/user"
import bcryt from "bcryptjs"

export default {
  providers: [
    credentials({
        async authorize(credentials){
            const validatedFields=LoginSchema.safeParse(credentials)
            if(validatedFields.success){
                const {email,password}=validatedFields.data
                const user=await getUserByEmail(email)
                if(!user || !user.password) return null
                const passwordMatch=await bcryt.compare(password,user.password)
                if(passwordMatch) return user
            } 
            return null
        }
    })
  ],
} satisfies NextAuthConfig