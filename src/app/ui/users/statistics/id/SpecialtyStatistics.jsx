'use client'

import { getAge } from "@/app/libs/utils"
import { getVerified } from "@/app/requests/getVerified"
import { useStatisticsStore } from "@/app/store/users/statistics/statistics.store"
import { useEffect, useState } from "react"

export const SpecialtyStatistics = ({id}) =>{
    const [patientsSeenItems, setPatientsSeenItems] = useState({
        "man":0,
        "woman":0,
        "children":0,
        "adults":0,
        "thirdAge":0,
        "total":0
    })
    const datesPatientsSeen = useStatisticsStore(state => state.datesPatientsSeen)
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>async()=>{
        setLoading(true)
        const patientsSeenItemsResult = await getPatientsSeenItemsBySpecialtyOnADate(localStorage.getItem("user_token"), id, datesPatientsSeen.month, datesPatientsSeen.year)
        if (patientsSeenItemsResult){
            setLoading(false)
            setPatientsSeenItems(patientsSeenItemsResult)
        }
        
    }, [datesPatientsSeen])

    return(
        <div
            className="grid grid-cols-2 gap-3"
        >
            {
                (!loading)?
                    <>
                        <StatisticBox
                            title={"Hombres"}
                            content={patientsSeenItems.man}
                        />
                        <StatisticBox
                            title={"Mujeres"}
                            content={patientsSeenItems.woman}
                        />
                        <StatisticBox
                            title={"Niños"}
                            content={patientsSeenItems.children}
                        />
                        <StatisticBox
                            title={"Adultos"}
                            content={patientsSeenItems.adults}
                        />
                        <StatisticBox
                            title={"Tercera Edad"}
                            content={patientsSeenItems.thirdAge}
                        />
                        <StatisticBox
                            title={"Total"}
                            content={patientsSeenItems.total}
                        />
                    </>
                :
                    ["", "", "", "", "", ""].map((item, _index)=>
                        <SkeletonStatisticsBox
                            key={_index}
                        />
                    )
            }
            
        </div>
    )
}


const StatisticBox = ({title, content}) =>{
    return(
        <div
            className="flex flex-col border border-complementary rounded-xl p-3 h-40"
        >
            <div
                className="flex justify-center items-center min-h-14"
            >
                <p
                    className="text-lg text-center sm:text-xl"
                >
                    {title}
                </p>
            </div>
            <div
                className="flex justify-center items-center grow"
            >
                <p
                    className="text-5xl font-semibold text-center"
                >
                    {content}
                </p>
            </div>
        </div>
    )
}

const SkeletonStatisticsBox = () =>{
    return(
        <div
            className="border border-complementary bg-complementary rounded-xl h-40  animate-pulse"
        >

        </div>
    )
}

const getPatientsSeenItemsBySpecialtyOnADate = async (token, id, month, year) =>{
    let patientsSeen = []

    do{
        patientsSeen = await getVerified(`https://ipasme-am-backend.onrender.com/api/patients/specialty/${id}/${month + 1}/${year}`, token)
    }while(patientsSeen.message)

    const patientsSeenItems = {
        "man": patientsSeen.filter((patient) => patient.gender === 0 || patient.gender === 2).length,
        "woman": patientsSeen.filter((patient) => patient.gender === 1).length,
        "children": patientsSeen.filter((patient) => getAge(patient.birthdate) < 18).length,
        "adults": patientsSeen.filter((patient) => getAge(patient.birthdate) >= 18 && getAge(patient.birthdate) < 65).length,
        "thirdAge": patientsSeen.filter((patient) => getAge(patient.birthdate) >= 65).length,
        "total": patientsSeen.length
    }

    return patientsSeenItems
}