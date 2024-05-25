"use client"

import { extractDate } from "@/app/libs/utils"
import { getVerified } from "@/app/requests/getVerified"
import { useManagementStore } from "@/app/store/patients/management/management.store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const MedicalHistoriesList = () =>{
    const [userType, setUserType] = useState("0")
    useEffect(()=>{
        setUserType(localStorage.getItem("user_type"))
    })
    
    return(
        <>
            {(userType === "1") ? <MedicalHistoriesListDoctor/> : <></>}
            {(userType === "2") ? <MedicalHistoriesListReceptionist/> : <></>}
        </>
    )
}

const MedicalHistoriesListDoctor= ()=>{
    const [medicalHistoriesPool, setMedicalHistoriesPool] = useState([])
    const [medicalHistories, setMedicalHistories] = useState([])

    const [medicalHistoriesLoading, setMedicalHistoriesLoading] = useState(true)

    const search = useManagementStore(state => state.search)

    useEffect(()=>async()=>{
        const result = await getPatients(localStorage.getItem("user_token"))
        console.log(result)
        setMedicalHistoriesLoading(false)
        setMedicalHistoriesPool(await result)
        setMedicalHistories(await result)
    }, [])

    useEffect(()=>{
        if (!search) setMedicalHistories(medicalHistoriesPool)
        else setMedicalHistories(medicalHistoriesPool.filter(medicalHistory => medicalHistory.ci.toUpperCase().includes(search.toUpperCase())))
    }, [search])

    return(
        <ul
            className="flex flex-col gap-3"
        >
            {
                (!medicalHistoriesLoading) ?
                    medicalHistories.map((medicalHistory)=>
                        <PatientItem
                            id={medicalHistory.id}
                            ci={medicalHistory.ci}
                            key={medicalHistory.id}
                        />
                    )
                :
                    ["", "", "", "", ""].map((item, _index) =>
                        <SkeletonMedicalHistoryItem
                            key={_index}
                        />
                    )
            }
        </ul>
    )
}


const MedicalHistoriesListReceptionist = ()=>{
    const [medicalHistoriesPool, setMedicalHistoriesPool] = useState([])
    const [medicalHistories, setMedicalHistories] = useState([])

    const [medicalHistoriesLoading, setMedicalHistoriesLoading] = useState(true)

    const search = useManagementStore(state => state.search)

    useEffect(()=>async()=>{
        const result = await getMedicalHistories(localStorage.getItem("user_token"))
        setMedicalHistoriesLoading(false)
        setMedicalHistoriesPool(await result)
        setMedicalHistories(await result)
    }, [])

    useEffect(()=>{
        console.log(medicalHistoriesPool)
        if (!search) setMedicalHistories(medicalHistoriesPool)
        else setMedicalHistories(medicalHistoriesPool.filter(medicalHistory => medicalHistory.ci.toUpperCase().includes(search.toUpperCase()) || medicalHistory?.date?.toUpperCase().includes(search.toUpperCase()) || medicalHistory.name.toUpperCase().includes(search.toUpperCase())))
    }, [search])

    return(
        <ul
            className="flex flex-col gap-3"
        >
            {
                (!medicalHistoriesLoading) ?
                    medicalHistories.map((medicalHistory)=>
                        <MedicalHistoryItem
                            id={medicalHistory.id}
                            date={extractDate(medicalHistory.date)}
                            ci={medicalHistory.ci}
                            specialty={medicalHistory.name}
                            turn= {medicalHistory.turn}
                            key={medicalHistory.id}
                        />
                    )
                :
                    ["", "", "", "", ""].map((item, _index) =>
                        <SkeletonMedicalHistoryItem
                            key={_index}
                        />
                    )
            }
        </ul>
    )
}

const PatientItem = ({id, ci}) =>{
    return(
        <li>
            <Link
                href={`/users/medical_histories/management/patient/${id}`}
                className="flex items-center gap-1 border border-complementary rounded-xl px-6 py-3"
            >
                <div
                    className="flex flex-col gap-2 grow "
                >
                    <p
                        className="text-left"
                    >
                        <span className="text-complementary">Cedula:</span> {ci}
                    </p>
                </div>
                <Image
                    src={"/icons/arrow-icon.svg"}
                    width={20}
                    height={20}    
                    alt="Flecha decorativa"
                    className="complementary-color-filter -rotate-90"
                />
            </Link>
        </li>
    )
}

const MedicalHistoryItem = ({id, date, ci, specialty, turn}) =>{
    return(
        <li>
            <Link
                href={`/users/medical_histories/management/${id}`}
                className="flex items-center gap-1 border border-complementary rounded-xl px-6 py-3"
            >
                <div
                    className="flex flex-col gap-2 grow "
                >
                    <p
                        className="text-left"
                    >
                        <span className="text-complementary">ID:</span> {id}
                    </p>
                    <p
                        className="text-left"
                    >
                        <span className="text-complementary">Cedula:</span> {ci}
                    </p>
                    <p
                        className="text-left"
                    >
                        <span className="text-complementary">Especialidad:</span> {specialty}
                    </p>
                    <p
                        className="text-left"
                    >
                        <span className="text-complementary">Fecha:</span> {date}
                    </p>
                    <p
                        className="text-left"
                    >
                        <span className="text-complementary">Turno:</span> {turn}
                    </p>
                </div>
                <Image
                    src={"/icons/arrow-icon.svg"}
                    width={20}
                    height={20}    
                    alt="Flecha decorativa"
                    className="complementary-color-filter -rotate-90"
                />
            </Link>
        </li>
    )
}

const SkeletonMedicalHistoryItem = () =>{
    return(
        <li
            className="border border-complementary bg-complementary rounded-xl h-[162px] animate-pulse"
        >
        </li>
    )
}

const getMedicalHistories = async (token) =>{
    let medicalHistories = []

    do{
        medicalHistories = await getVerified(`http://localhost:4000/api/medical_histories/patient/specialty`, token)
    }while(medicalHistories.message)
    
    return medicalHistories
}

const getPatients = async (token) =>{
    let patients = []

    do{
        patients = await getVerified(`http://localhost:4000/api/patients`, token)
    }while(patients.message)
    
    return patients
}