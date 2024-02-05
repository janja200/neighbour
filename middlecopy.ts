import { authMiddleware } from "@clerk/nextjs";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiAuthPrefix, authRoutes, publicRoutes, redirectPath } from "./routes";
 
//export default authMiddleware({
 // publicRoutes:["/api/:path*"]
//});
const {auth}=NextAuth(authConfig)
export default auth((req)=>{
  const isLoggedIn=!!req.auth
  const {nextUrl}=req
  const isApiAuthRoute=nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute=publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute=authRoutes.includes(nextUrl.pathname)
  if(isApiAuthRoute){
    return null
  }
  if(isAuthRoute){
    if(isLoggedIn){
      return Response.redirect(new URL("/",nextUrl))
    }
    return null
  }
  if(!isLoggedIn && !isPublicRoute){
    return Response.redirect(new URL(redirectPath,nextUrl))
  }
  return null
})
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 