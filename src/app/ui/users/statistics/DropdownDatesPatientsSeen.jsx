'use client'

import { useEffect, useState } from "react"
import { Dropdown } from "../../Dropdown"
import { getVerified } from "@/app/requests/getVerified"
import { months } from "@/app/libs/values"
import { NonRepeatArray } from "@/app/libs/utils"
import { useStatisticsStore } from "@/app/store/users/statistics/statistics.store"

export const DropdownDatesPatientsSeen = ()=>{
    const [currentElement, setCurrentElement] = useState(0)
    const [elements, setElements] = useState([{
        description: "",
        value: {
            year: new Date().getFullYear(),
            month: new Date().getMonth()
        }
    }])
    const setDatesPatientsSeen = useStatisticsStore(state => state.setDatesPatientsSeen)

    const [datesPatientsSeenLoading, setDatesPatientsSeenLoading] = useState(true)

    const elementOnClickHandle = (index) => setCurrentElement(index)

    useEffect(()=> setDatesPatientsSeen(elements[currentElement].value), [currentElement, elements])
    
    useEffect(()=> async()=>{
        const datesPatientsSeen = await getDatesPatientsSeen(localStorage.getItem("user_token"))
        if (datesPatientsSeen.length){
            setDatesPatientsSeenLoading(false)
            setElements(datesPatientsSeen.map((date)=>{
                date.onClick = elementOnClickHandle
                return date
            }))
        }
    },[])

    return(
        <Dropdown
            description={elements[currentElement].description}
            elements={elements}
            loading={datesPatientsSeenLoading}
        />
    )
}

const getDatesPatientsSeen = async (token)=>{
    const medicalHistories = await getMedicalHistories(token)
    const datesPatientsSeenRepeatedElements = medicalHistories.map((medicalHistory)=>{ 
        const medicalHistoryDate = new Date (medicalHistory.mh_date)
        return JSON.stringify({
            description: `Pacientes atendidos en ${months[medicalHistoryDate.getMonth()]} del ${medicalHistoryDate.getFullYear()}`,
            value: {
                month: medicalHistoryDate.getMonth(),
                year: medicalHistoryDate.getFullYear()
            }            
        })
    })

    return NonRepeatArray(datesPatientsSeenRepeatedElements).map((date) =>{ return JSON.parse(date)})
}

const getMedicalHistories = async (token)=>{
    const medicalHistories = await getVerified('https://ipasme-am-backend.onrender.com/api/medical_histories', token)

    return medicalHistories
}