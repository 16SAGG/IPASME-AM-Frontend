'use client'

import { useEffect, useState } from "react"
import { PrimaryLink } from "../../PrimaryLink"

export const NewAppointment = ()=>{
    const [userType, setUserType] = useState("0")
    useEffect(()=>{
        setUserType(localStorage.getItem("user_type"))
    })

    return(
        <>
            {(userType === '2') ? 
                <PrimaryLink
                    content={"Crear Nueva Cita"}
                    href={`/users/appointments/management/create`}
                />
            :
                null
            }
            
        </>
    )
}