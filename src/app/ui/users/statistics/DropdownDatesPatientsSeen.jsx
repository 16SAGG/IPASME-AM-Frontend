'use client'

import { useEffect, useState } from "react"
import { Dropdown } from "../../Dropdown"
import { getVerified } from "@/app/requests/getVerified"
import { months } from "@/app/libs/values"
import { NonRepeatArray } from "@/app/libs/utils"
import { useStatisticsStore } from "@/app/store/users/statistics/statistics.store"

export const DropdownDatesPatientsSeen = ()=>{
    const [currentElement, setCurrentElement] = useState(0)
    const [elements, setElements] = useState([])
    const setDatesPatientsSeen = useStatisticsStore(state => state.setDatesPatientsSeen)

    const [datesPatientsSeenLoading, setDatesPatientsSeenLoading] = useState(true)

    const elementOnClickHandle = (index) => setCurrentElement(index)

    useEffect(()=> {
        console.log("ddps: month: ", elements[currentElement]?.value.month)
        
        setDatesPatientsSeen(
        (elements.length > 0) ? elements[currentElement].value :
        {month: new Date().getMonth(), year: new Date().getFullYear()}
    )},
        [currentElement, elements]
    )
    
    useEffect(()=> async()=>{
        const datesPatientsSeen = await getDatesPatientsSeen(localStorage.getItem("user_token"))
        console.log(datesPatientsSeen)
        setDatesPatientsSeenLoading(false)
        if (datesPatientsSeen){
            setElements(datesPatientsSeen.map((date)=>{
                date.onClick = elementOnClickHandle
                return date
            }))
        }
    },[])

    return(
        <Dropdown
            description={(elements.length > 0) ? elements[currentElement].description : null}
            elements={elements}
            loading={datesPatientsSeenLoading}
        />
    )
}

const getDatesPatientsSeen = async (token)=>{
    const medicalHistories = await getMedicalHistories(token)

    if (!medicalHistories.length) return
    const datesPatientsSeenRepeatedElements = medicalHistories.map((medicalHistory)=>{ 
        const medicalHistoryDate = new Date (medicalHistory.date)
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
    const medicalHistories = await getVerified('http://localhost:4000/api/medical_histories/patient/specialty', token)
    return medicalHistories
}