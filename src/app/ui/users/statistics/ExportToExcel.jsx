'use client'

import { useEffect, useState } from "react"
import { PrimaryButton } from "../../PrimaryButton"
import { exportReportToExcel } from "@/app/requests/exportReportToExcel"
import { getVerified } from "@/app/requests/getVerified"

export const ExportToExcel = () =>{
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    return(
        <div
        className="flex flex-col gap-2"
        >
            <PrimaryButton
                onClick={()=>exportReportToExcelHandler(localStorage.getItem("user_token"), setIsLoading, setMessage)}
                content={
                    (isLoading) ?
                        'Cargando...'
                    :
                        'Exportar a Excel'
                }
                loading={isLoading}
            />
            <p className="text-center">{message}</p>
        </div>
    )
}

const exportReportToExcelHandler = async (token, setIsLoading, setMessage) =>{
    let exportObj = {}
    setIsLoading(true)

    setTimeout(
        async ()=>{
            exportObj = await getVerified('http://localhost:4000/api/medical_histories/export', token)

            setMessage("Reporte creado correctamente")
            setIsLoading(false)
        }
    , 1000)
}
