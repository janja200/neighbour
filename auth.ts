import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {PrismaAdapter} from "@auth/prisma-adapter"
import prismadb from "./lib/prismadb"
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter:PrismaAdapter(prismadb),
  session:{strategy:"jwt"},
  ...authConfig,
})