'use client'

import { extractDate } from "@/app/libs/utils"
import { getVerified } from "@/app/requests/getVerified"
import { useEffect, useState } from "react"

export const PatientMedicalHistory = ({id}) =>{
    const [medicalHistories, setMedicalHistories] = useState([])

    const [medicalHistoriesLoading, setMedicalHistoriesLoading] = useState(true)


    useEffect(()=>async ()=>{
        const medicalHistoriesResult = await getMedicalHistoriesByPatient(id, localStorage.getItem("user_token"))
        console.log(medicalHistoriesResult)
        setMedicalHistoriesLoading(false)
        setMedicalHistories(medicalHistoriesResult)
    },[])

    return(
        <ul
            className="flex flex-col gap-12"
        >
            {
                (!medicalHistoriesLoading) ?
                medicalHistories.map((medicalHistory, _index)=>
                    <MedicalHistoryItem
                        date={extractDate(medicalHistory.date)}
                        doctor={`${medicalHistory.doctor_name} ${medicalHistory.lastName} -- ${medicalHistory.ci}`}
                        specialty={medicalHistory.specialty_name}
                        turn={medicalHistory.turn}
                        description={medicalHistory.description}
                        key={_index}
                    />
                )
            :
                ["", "", "", "", ""].map((item, _index) =>
                    <></>
                )
            }
        </ul>
    )
}

const MedicalHistoryItem = ({date, doctor, specialty, turn, description}) =>{
    return(
        <li
            className="flex flex-col gap-3"
        >
            <h2 className="text-center font-semibold text-complementary">--{date}--</h2>
            <div>
                <p><span className="font-semibold">Doctor:</span> {doctor}</p>
                <p><span className="font-semibold">Especialidad:</span> {specialty}</p>
                <p><span className="font-semibold">Turno:</span> {turn}</p>
                <p className="break-words"><span className="font-semibold">description:</span> {description}</p>
            </div>
        </li>
    )
}

const getMedicalHistoriesByPatient = async (id, token) =>{
    let medicalHistories = []

    do{
        medicalHistories = await getVerified(`http://localhost:4000/api/medical_histories/patient/${id}`, token)
    }while(medicalHistories.message === 'Something Goes Wrong')

    return medicalHistories
}