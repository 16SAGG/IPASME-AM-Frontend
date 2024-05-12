'use client'

import { useEffect, useState } from "react"
import { PrimaryLink } from "../../PrimaryLink"

export const NewMedicalHistory = ()=>{
    const [userType, setUserType] = useState("0")
    useEffect(()=>{
        setUserType(localStorage.getItem("user_type"))
    })

    return(
        <>
            {(userType === '2') ? 
                <PrimaryLink
                    content={"Crear Nuevo Historial Medico"}
                    href={`/users/medical_histories/management/create`}
                />
            :
                null
            }
            
        </>
    )
}