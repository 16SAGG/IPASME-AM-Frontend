'use client'

import { getVerified } from "@/app/requests/getVerified"
import { useEffect, useState } from "react"

export const Title = ({id}) =>{
    const [specialtyName, setSpecialtyName] = useState("")

    const [loading, setLoading] = useState(true)
    
    useEffect(()=>async()=>{
        const specialtyNameResult = await getSpecialtyName(localStorage.getItem("user_token"), id)
        if(specialtyNameResult){
            setLoading(false)
            setSpecialtyName(specialtyNameResult)
        }
    },[id])


    return(
        <>
            {
                (!loading) ?
                    <h1
                        className="text-4xl font-semibold text-center"
                    >
                        {specialtyName}
                    </h1>
                :
                    <div
                        className="border border-complementary bg-complementary rounded-xl h-[40px] animate-pulse"
                    ></div>
            }
        </>
    )
}

const getSpecialtyName = async (token, id) =>{
    let specialty = []

    do{
        specialty = await getVerified(`https://ipasme-am-backend.onrender.com/api/specialty/${id}`, token)
    }while(specialty.message)

    return specialty.name
}