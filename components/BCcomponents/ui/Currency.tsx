"use client"

import { useEffect, useState } from "react"

const formatter= new Intl.NumberFormat("en-US",{
    style:"currency",
    currency:"USD"
  })
interface currencyProps{
    value:string | Number
}

const Currency:React.FC<currencyProps> = ({value}) => {
    const [mounted,setMounted]=useState(false)
    useEffect(()=>{
    setMounted(true)
    },[])
    if(!mounted){
        return null
    }
    return ( 
        <div>
            {formatter.format(Number(value))}
        </div>
     );
}
 
export default Currency;