"use client"

import { extractDate } from "@/app/libs/utils"
import { getVerified } from "@/app/requests/getVerified"
import { useManagementStore } from "@/app/store/appointments/management/management.store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const AppointmentsList = () =>{
    const [appointmentsPool, setAppointmentsPool] = useState([])
    const [appointments, setAppointments] = useState([])

    const [appointmentsLoading, setAppointmentsLoading] = useState(true)

    const search = useManagementStore(state => state.search)

    useEffect(()=>async()=>{
        const result = await getAppointments(localStorage.getItem("user_token"))
        if (result.length){
            setAppointmentsLoading(false)
            setAppointmentsPool(await result)
            setAppointments(await result)
        }
    }, [])

    useEffect(()=>{
        if (!search) setAppointments(appointmentsPool)
        else setAppointments(appointmentsPool.filter(appointment => appointment.doctor_id.toUpperCase().includes(search.toUpperCase()) || appointment.patient_id.toUpperCase().includes(search.toUpperCase()) || appointment.appointment_date.toUpperCase().includes(search.toUpperCase())))
    }, [search])

    return(
        <ul
            className="flex flex-col gap-3"
        >
            {
                (!appointmentsLoading) ?
                    appointments.map((appointment)=>
                        <AppointmentItem
                            id={appointment.id}
                            date={extractDate(appointment.appointment_date)}
                            doctor={appointment.doctor_id}
                            patient={appointment.patient_id}
                            key={appointment.id}
                        />
                    )
                :
                    ["", "", "", "", ""].map((item, _index) =>
                        <SkeletonAppointmentItem
                            key={_index}
                        />
                    )
            }
        </ul>
    )
}

const AppointmentItem = ({id, date, doctor, patient}) =>{
    return(
        <li>
            <Link
                href={`/users/appointments/management/${id}`}
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
                        <span className="text-complementary">Doctor:</span> {doctor}
                    </p>
                    <p
                        className="text-left"
                    >
                        <span className="text-complementary">Paciente:</span> {patient}
                    </p>
                    <p
                        className="text-left"
                    >
                        <span className="text-complementary">Fecha:</span> {date}
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

const SkeletonAppointmentItem = () =>{
    return(
        <li
            className="border border-complementary bg-complementary rounded-xl h-[162px] animate-pulse"
        >
        </li>
    )
}

const getAppointments = async (token) =>{
    let appointments = []

    do{
        appointments = await getVerified(`https://ipasme-am-backend.onrender.com/api/appointments/doctor/patient`, token)
    }while(appointments.message)
    
    return appointments
}