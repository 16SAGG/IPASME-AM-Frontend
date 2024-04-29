"use client"

import { useEffect, useState } from "react"
import { PrimaryButton } from "../../PrimaryButton"
import { useRouter } from "next/navigation"
import { getVerified } from "@/app/requests/getVerified"
import { TextArea } from "../../TextArea"
import { updateMedicalHistories } from "@/app/requests/updateMedicalHistories"
import { deleteVerified } from "@/app/requests/deleteVerified"
import { DangerButton } from "../../DangerButton"
import Image from "next/image"
import { extractDate } from "@/app/libs/utils"
import clsx from "clsx"

export const EditForm = ({id})=>{
    const [date, setDate] = useState("")
    const [specialty, setSpecialty] = useState("")
    const [turn, setTurn] = useState("")
    const [doctorName, setDoctorName] = useState("")
    const [doctorCI, setDoctorCI] = useState("")
    const [patientName, setPatienName] = useState("")
    const [patientCI, setPatientCI] = useState("")
    const [description, setDescription] = useState("")

    const [medicalHistoryLoading, setMedicalHistoryLoading] = useState(true)
    const [appointmentLoading, setAppointmentLoading] = useState(true)

    const descriptionOnChange = (event) => setDescription(event.target.value)
    
    const [result, setResult] = useState({})
    const {push} = useRouter()

    useEffect(()=>async ()=>{
        const medicalHistoryResult = await getMedicalHistory(localStorage.getItem("user_token"), id)
        if (medicalHistoryResult){
            setMedicalHistoryLoading(false)
            setDescription(medicalHistoryResult.description)
            const appointmentResult = await getAppointment(localStorage.getItem("user_token"), await medicalHistoryResult.appointment)
            setAppointmentLoading(false)
            setDate(extractDate(await appointmentResult.appointment_date))
            setSpecialty(await appointmentResult.specialty)
            setTurn(await appointmentResult.turn)
            setDoctorName(`${await appointmentResult.doctor_name} ${await appointmentResult.doctor_last}`)
            setDoctorCI(await appointmentResult.doctor_id)
            setPatienName(`${await appointmentResult.patient_name} ${await appointmentResult.patient_last}`)
            setPatientCI(await appointmentResult.patient_id)
        }
    },[])

    useEffect(()=>{
        if (result.ok){
            push('/users/medical_histories/management')
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
                Editar Historia Medica
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

            <div
                className="flex flex-col"
            >
                <TextArea
                    placeholder={"Descripcion"}
                    defaultValue={description}
                    loading={medicalHistoryLoading}
                    onChange={descriptionOnChange}
                />
            </div>

            <p>{result.message}</p>

            <div
            className="flex gap-2"
        >
            <EditButton
                createParams={{
                    id,
                    description
                }}
                setResult={setResult}
            />
            <DeleteButton 
                id={id}
                setResult={setResult}
            />
        </div>
    </form>
)
}


const EditButton = ({createParams, setResult}) =>{
    const [loading, setLoading] = useState(false)

    const onClickHandle = async () =>{
        setLoading(true)
        
        const nonVoidFields = createParams.description
        if (nonVoidFields){
            const medicalHistoryReq = await updateMedicalHistories(createParams.id, localStorage.getItem("user_token"), createParams.description)
            
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
            content={"Editar"}
            loading={loading}
        />
    )
}

const DeleteButton = ({id, setResult}) =>{
    const [loading, setLoading] = useState(false)

    const onClickHandle = async () =>{
        setLoading(true)
        const deletePatientsReq = await deleteVerified(`https://ipasme-am-backend.onrender.com/api/medical_histories/${id}`, localStorage.getItem("user_token"))

        if (!deletePatientsReq.message) setResult({ok: "Ok"})
        else setResult(deletePatientsReq)

        setLoading(false)
    }

    return(
        <DangerButton
            onClick={()=>onClickHandle()}
            content={
                <Image
                    src={"/icons/delete-icon.svg"}
                    width={28}
                    height={28}    
                    alt="Equis-Eliminar"
                    className="-rotate-90"
                />
            }
            loading={loading}
        />
    )
}

const getMedicalHistory = async (token, id) =>{
    let medicalHistory = []

    do{
        medicalHistory = await getVerified(`https://ipasme-am-backend.onrender.com/api/medical_histories/${id}`, token)
    }while(medicalHistory.message === 'Something Goes Wrong')

    return medicalHistory
}

const getAppointment = async (token, id) =>{
    let appointment = []

    do{
        appointment = await getVerified(`https://ipasme-am-backend.onrender.com/api/appointments/doctor/patient/${id}`, token)
    }while(appointment.message === 'Something Goes Wrong')

    return appointment
}