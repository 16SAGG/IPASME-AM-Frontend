"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getVerified } from "@/app/requests/getVerified"
import { extractDate } from "@/app/libs/utils"
import clsx from "clsx"
import { TextArea } from "@/app/ui/TextArea"
import { PrimaryButton } from "@/app/ui/PrimaryButton"
import { createMedicalHistories } from "@/app/requests/createMedicalHistories"

export const CreateForm = ({id})=>{
    const [date, setDate] = useState("")
    const [todayDate, setTodayDate] = useState("")
    const [specialty, setSpecialty] = useState("")
    const [turn, setTurn] = useState("")
    const [doctorName, setDoctorName] = useState("")
    const [doctorCI, setDoctorCI] = useState("")
    const [patientName, setPatienName] = useState("")
    const [patientCI, setPatientCI] = useState("")
    const [description, setDescription] = useState("")

    const [appointmentLoading, setAppointmentLoading] = useState(true)

    const descriptionOnChange = (event) => setDescription(event.target.value)
    
    const [result, setResult] = useState({})
    const {push} = useRouter()

    
    useEffect(()=>async ()=>{
        const appointmentResult = await getAppointment(localStorage.getItem("user_token"), id)
        setAppointmentLoading(false)
        setDate(extractDate(await appointmentResult.date))
        setSpecialty(await appointmentResult.specialty)
        setTurn(await appointmentResult.turn)
        setDoctorName(`${await appointmentResult.doctor_name} ${await appointmentResult.doctor_last}`)
        setDoctorCI(await appointmentResult.doctor_id)
        setPatienName(`${await appointmentResult.patient_name} ${await appointmentResult.patient_last}`)
        setPatientCI(await appointmentResult.patient_id)
    },[])

    useEffect(()=>{
        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth() + 1
        const day = currentDate.getDate()
        setTodayDate(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)
        if (result.ok){
            push('/users/appointments/management')
        }
    }, [result])

    return(
        <form
            className="flex flex-col gap-12"
            onSubmit={(event)=> event.preventDefault()}
        >
            <h1
                className="text-4xl font-semibold text-center"
            >
                Crear Historia Medica
            </h1>

            <div
                className={clsx("flex flex-col gap-6 rounded-xl", {
                    "bg-complementary text-complementary animate-pulse" : appointmentLoading
                })}
            >
                <h2 className="text-center font-semibold text-complementary">--Cita--</h2>
                <p><span className="font-semibold">Día:</span> {date}</p>
                <p><span className="font-semibold">Especialidad:</span> {specialty}</p>
                <p><span className="font-semibold">Turno:</span> {turn}</p>
            </div>

            <div
                className={clsx("flex flex-col gap-6 rounded-xl", {
                    "bg-complementary text-complementary animate-pulse" : appointmentLoading
                })}
            >
                <h2 className="text-center font-semibold text-complementary">--Doctor--</h2>
                <p><span className="font-semibold">Nombre:</span> {doctorName}</p>
                <p><span className="font-semibold">CI:</span> {doctorCI}</p>
            </div>

            <div
                className={clsx("flex flex-col gap-6 rounded-xl", {
                    "bg-complementary text-complementary animate-pulse" : appointmentLoading
                })}
            >
                <h2 className="text-center font-semibold text-complementary">--Paciente--</h2>
                <p><span className="font-semibold">Nombre:</span> {patientName}</p>
                <p><span className="font-semibold">CI:</span> {patientCI}</p>
            </div>
            {
                (todayDate === date) ?
                <>
                    <div
                        className="flex flex-col"
                    >
                        <TextArea
                            placeholder={"Descripcion"}
                            defaultValue={description}
                            onChange={descriptionOnChange}
                        />
                    </div>

                    <p>{result.message}</p>

                    <div
                        className="flex gap-2"
                    >
                        <CreateButton
                            createParams={{
                                id,
                                "appointment" : id,
                                description
                            }}
                            setResult={setResult}
                        />
                    </div>
                </>
                :
                <></>
            }
        </form>
    )
}


const CreateButton = ({createParams, setResult}) =>{
    const [loading, setLoading] = useState(false)

    const onClickHandle = async () =>{
        setLoading(true)
        
        const nonVoidFields = createParams.description
        if (nonVoidFields){
            const medicalHistoryReq = await createMedicalHistories(localStorage.getItem("user_token"), createParams.appointment, createParams.description)
            
            if (!medicalHistoryReq.message) setResult({ok: "Ok"})
            else setResult(medicalHistoryReq)
        }else{
            if (!nonVoidFields) setResult({message: "Todos los campos son obligatorios"})
        }

        setLoading(false)
    }

    return(
        <PrimaryButton
            onClick={()=>onClickHandle()}
            content={"Crear"}
            loading={loading}
        />
    )
}

const getAppointment = async (token, id) =>{
    let appointment = []

    do{
        appointment = await getVerified(`http://localhost:4000/api/appointments/doctor/patient/${id}`, token)
    }while(appointment.message === 'Something Goes Wrong')

    return appointment
}