"use client"

import { getVerified } from "@/app/requests/getVerified"
import { useManagementStore } from "@/app/store/patients/management/management.store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const PatientsList = () =>{
    const [patientsPool, setPatientsPool] = useState([])
    const [patients, setPatients] = useState([])

    const [patientsLoading, setPatientsLoading] = useState(true)

    const search = useManagementStore(state => state.search)

    useEffect(()=>async()=>{
        const result = await getPatients(localStorage.getItem("user_token"))
        if (result.length){
            setPatientsLoading(false)
            setPatientsPool(await result)
            setPatients(await result)
        }
    }, [])

    useEffect(()=>{
        if (!search) setPatients(patientsPool)
        else setPatients(patientsPool.filter(patient => patient.ci.toUpperCase().includes(search.toUpperCase())))
    }, [search])

    return(
        <ul
            className="flex flex-col gap-3"
        >
            {
                (!patientsLoading) ?
                    patients.map((patient)=>
                        <PatientItem
                            id={patient.id}
                            ci={patient.ci}
                            key={patient.id}
                        />
                    )
                :
                    ["", "", "", "", ""].map((item, _index) =>
                        <SkeletonPatientItem
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
                href={`/users/patients/management/${id}`}
                className="flex items-center gap-1 border border-complementary rounded-xl px-6 py-3"
            >
                <p
                    className="grow text-left"
                >
                    {ci}
                </p>
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

const SkeletonPatientItem = () =>{
    return(
        <li
            className="border border-complementary bg-complementary rounded-xl h-[54px] animate-pulse"
        >
        </li>
    )
}

const getPatients = async (token) =>{
    let patients = []

    do{
        patients = await getVerified(`https://ipasme-am-backend.onrender.com/api/patients`, token)
    }while(patients.message)
    
    return patients
}