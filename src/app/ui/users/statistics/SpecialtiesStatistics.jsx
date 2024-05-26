'use client'

import Image from "next/image";
import Link from "next/link";
import { getVerified } from "@/app/requests/getVerified"
import { useEffect, useState } from "react";
import { useStatisticsStore } from "@/app/store/users/statistics/statistics.store";
import { LoadingSpinner } from "../../LoadingSpinner";

export const SpecialtiesStatistics = ()=>{
    const [specialties, setSpecialties] = useState([])

    const [specialtiesLoading, setSpecialtiesLoading] = useState(true)

    useEffect(()=>async()=>{
        const specialtiesResult = await getSpecialties(localStorage.getItem("user_token"))
        if (specialtiesResult.length){
            setSpecialtiesLoading(false)
            setSpecialties(await specialtiesResult)
        }
    }, [])

    return(
        <div
            className="grid grid-cols-2 gap-3"
        >
            {
                (!specialtiesLoading) ?
                    specialties.map((specialty, _index) =>
                        <SpecialtyBox
                            id={specialty.id}
                            name={specialty.name}
                            key={_index}
                        />
                    )
                :
                    ["", "", "", "", "", ""].map((i, _index)=>
                        <SkeletonSpecialtyBox
                            key={_index}
                        />
                    )
            }
        </div>
    )
}

const SpecialtyBox = ({id, name}) =>{
    const [patientsSeenQuantity, setPatientsSeenQuantity] = useState(0)
    const datesPatientsSeen = useStatisticsStore(state => state.datesPatientsSeen)

    const [patientsSeenQuantityLoading, setPatientsSeenQuantityLoading] = useState(true)
    
    useEffect(()=>{
        setPatientsSeenQuantityLoading(true)
        setTimeout(async()=>{
            const patientsSeenQuantityResult = await getPatientsSeenQuantityBySpecialtyOnADate(localStorage.getItem("user_token"), id, datesPatientsSeen.month, datesPatientsSeen.year)
        if (patientsSeenQuantityResult >= 0){
            setPatientsSeenQuantityLoading(false)
            setPatientsSeenQuantity(await patientsSeenQuantityResult)
        }}, 1000)
    }, [datesPatientsSeen])

    return(
        <Link
            href = {`/users/statistics/${id}`}
            className="flex flex-col border border-complementary rounded-xl p-3 h-40"
        >
            <div
                className="flex justify-center items-center min-h-14"
            >
                <p
                    className="text-lg text-center sm:text-xl"
                >
                    {name}
                </p>
            </div>
            <div
                className="flex justify-center items-center grow"
            >
                {
                    (!patientsSeenQuantityLoading)?
                        <p
                            className="text-4xl font-semibold text-center"
                        >
                            {patientsSeenQuantity}
                        </p>
                    : 
                        <LoadingSpinner/>
                }
                
            </div>
            <div
                className="flex justify-center"
            >
                <Image
                    src={"/icons/more-icon.svg"}
                    width={20}
                    height={20}
                    alt="Icono de Más"
                    className="complementary-color-filter"
                />
            </div>
        </Link>
    )
}

const SkeletonSpecialtyBox = () =>{
    return(
        <div
            className="border border-complementary bg-complementary animate-pulse rounded-xl h-40"
        ></div>
    )
}

const getPatientsSeenQuantityBySpecialtyOnADate = async (token, id, month, year) =>{
    let specialtyStatistic = []

    do{
        specialtyStatistic = await getVerified(`http://localhost:4000/api/patients/specialty/${id}/${month + 1}/${year}`, token)
    }while(specialtyStatistic.message)
    
    return specialtyStatistic.length
}

const getSpecialties = async (token) =>{
    const specialties = await getVerified('http://localhost:4000/api/specialty', token)

    return specialties
}

