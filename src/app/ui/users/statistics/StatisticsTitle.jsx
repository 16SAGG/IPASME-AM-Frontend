"use client"

import { useEffect, useState } from "react"

export const StatisticsTitle = () => {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [gender, setGender] = useState(0)

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setName(localStorage.getItem("user_name"))
        setLastName(localStorage.getItem("user_last_name"))
        setGender(localStorage.getItem("user_gender"))

        setLoading(false)
    }, [])

    return(
        <div
            className="flex flex-col gap-2"
        >
            {
                (!loading)?
                    <p className="text-center">
                        Bienvenid{gender === "0" ? "o" : ""}{gender === "1" ? "a" : ""}{gender === "2" ? "e" : ""}, <span className="font-bold">{name} {lastName}.</span>
                    </p>
                :
                    <div
                        className="border border-complementary bg-complementary animate-pulse rounded-xl h-[28px]"
                    >  
                    </div>
            }
            
            <h1
                className="text-4xl font-semibold text-center"
            >
                Estadísticas
            </h1>
        </div>
    )
}