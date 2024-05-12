"use client"

import { useEffect, useState } from "react"
import { PrimaryButton } from "../../PrimaryButton"
import { SelectInput } from "../../SelectInput"
import { useRouter } from "next/navigation"
import { getVerified } from "@/app/requests/getVerified"
import { createMedicalHistories } from "@/app/requests/createMedicalHistories"
import { TextArea } from "../../TextArea"
import clsx from "clsx"
import { extractDate } from "@/app/libs/utils"

export const CreateForm = ()=>{
    const [date, setDate] = useState("")
    const [specialty, setSpecialty] = useState("")
    const [turn, setTurn] = useState("")
    const [doctorName, setDoctorName] = useState("")
    const [doctorCI, setDoctorCI] = useState("")
    const [patientName, setPatienName] = useState("")
    const [patientCI, setPatientCI] = useState("")
    const [appointment, setAppointment] = useState(-1)
    const [description, setDescription] = useState("")

    const [appointmentPool, setAppointmentPool] = useState([])

    const [appointmentDataLoading, setAppointmentDataLoading] = useState(false)
    const [appointmentLoading, setAppointmentLoading] = useState(true)

    const appointmentOnChange = (event) => {
        setAppointment(event.target.value)
        getAppointmentMiddleware(event.target.value)
    }
    const descriptionOnChange = (event) => setDescription(event.target.value)
    
    const getAppointmentMiddleware = async (id)=>{
        if (id < 0) return
        setAppointmentDataLoading(true)
        const appointmentResult = await getAppointment(localStorage.getItem("user_token"), id)
        setAppointmentDataLoading(false)
        setDate(extractDate(await appointmentResult.date))
        setSpecialty(await appointmentResult.specialty)
        setTurn(await appointmentResult.turn)
        setDoctorName(`${await appointmentResult.doctor_name} ${await appointmentResult.doctor_last}`)
        setDoctorCI(await appointmentResult.doctor_id)
        setPatienName(`${await appointmentResult.patient_name} ${await appointmentResult.patient_last}`)
        setPatientCI(await appointmentResult.patient_id)
    }

    const [result, setResult] = useState({})
    const {push} = useRouter()

    useEffect(()=>async ()=>{
        const appointmentsResult = await getAppointments(localStorage.getItem("user_token"))
        setAppointmentLoading(false)
        if (appointmentsResult.length){
            setAppointmentPool([{id:-1, name:""}, ...await appointmentsResult.map((appointment) =>{
                return {
                    id : appointment.id,
                    name : appointment.id
                }
            })])
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
                Crear Historia Medica
            </h1>

            <div
                className="flex flex-col"
            >
                <SelectInput
                    placeholder={"Citas"}
                    idSufix={"appointment"}
                    loading={appointmentLoading}
                    defaultValue={appointment}
                    options={appointmentPool}
                    onChange={appointmentOnChange}
                />
            </div>

            {(appointment > - 1) ?
                <>
                    <div
                        className={clsx("flex flex-col gap-6 rounded-xl", {
                            "bg-complementary text-complementary animate-pulse" : appointmentDataLoading
                        })}
                    >
                        <h2 className="text-center font-semibold text-complementary">--Cita--</h2>
                        <p><span className="font-semibold">Día:</span> {date}</p>
                        <p><span className="font-semibold">Especialidad:</span> {specialty}</p>
                        <p><span className="font-semibold">Turno:</span> {turn}</p>
                    </div>

                    <div
                        className={clsx("flex flex-col gap-6 rounded-xl", {
                            "bg-complementary text-complementary animate-pulse" : appointmentDataLoading
                        })}
                    >
                        <h2 className="text-center font-semibold text-complementary">--Doctor--</h2>
                        <p><span className="font-semibold">Nombre:</span> {doctorName}</p>
                        <p><span className="font-semibold">CI:</span> {doctorCI}</p>
                    </div>

                    <div
                        className={clsx("flex flex-col gap-6 rounded-xl", {
                            "bg-complementary text-complementary animate-pulse" : appointmentDataLoading
                        })}
                    >
                        <h2 className="text-center font-semibold text-complementary">--Paciente--</h2>
                        <p><span className="font-semibold">Nombre:</span> {patientName}</p>
                        <p><span className="font-semibold">CI:</span> {patientCI}</p>
                    </div>
                </>
            :
                <></>
            }

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
                        appointment,
                        description,
                    }}
                    setResult={setResult}
                />
            </div>
        </form>
    )
}

const CreateButton = ({createParams, setResult}) =>{
    const [loading, setLoading] = useState(false)

    const onClickHandle = async () =>{
        setLoading(true)
        
        const nonVoidFields = createParams.appointment > 0 && createParams.description
        
        if (nonVoidFields){
            const createMedicalHistoriesReq= await createMedicalHistories(localStorage.getItem("user_token"), createParams.appointment, createParams.description)
                
            if (!createMedicalHistoriesReq.message) setResult({ok:  "Ok"})
            else setResult(createMedicalHistoriesReq)
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

const getAppointments = async (token) =>{
    let appointments = []

    do{
        appointments = await getVerified(`http://localhost:4000/api/appointments/whitout/medical_histories`, token)
    }while(appointments.message === 'Something Goes Wrong')
    
    return appointments
}

const getAppointment = async (token, id) =>{
    let appointment = []

    do{
        appointment = await getVerified(`http://localhost:4000/api/appointments/doctor/patient/${id}`, token)
    }while(appointment.message === 'Something Goes Wrong')

    return appointment
}