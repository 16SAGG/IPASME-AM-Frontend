"use client"

import { useEffect, useState } from "react"
import { PrimaryButton } from "../../PrimaryButton"
import { SelectInput } from "../../SelectInput"
import { useRouter } from "next/navigation"
import { getVerified } from "@/app/requests/getVerified"
import { DateInput } from "../../DateInput"
import { extractDate } from "@/app/libs/utils"
import { DangerButton } from "../../DangerButton"
import Image from "next/image"
import { deleteVerified } from "@/app/requests/deleteVerified"
import { updateAppointments } from "@/app/requests/updateAppointments"

export const EditForm = ({id})=>{
    const [date, setDate] = useState("")
    const [doctor, setDoctor] = useState(0)
    const [patient, setPatient] = useState(0)
    const [appointmentType, setAppointmentType] = useState(0)
    const [specialty, setSpecialty] = useState(0)
    const [turn, setTurn] = useState(0)

    const [doctorPool, setDoctorPool] = useState([])
    const [patientPool, setPatientPool] = useState([])
    const [appointmentTypePool, setAppointmentTypePool] = useState([])
    const [specialtyPool, setSpecialtyPool] = useState([])
    const [turnPool, setTurnPool] = useState([])

    const [appointmentLoading, setAppointmentLoading] = useState(true)
    const [doctorLoading, setDoctorLoading] = useState(true)
    const [patientLoading, setPatientLoading] = useState(true)
    const [appointmentTypeLoading, setAppointmentTypeLoading] = useState(true)
    const [specialtyLoading, setSpecialtyLoading] = useState(true)
    const [turnLoading, setTurnLoading] = useState(true)

    const dateOnChange = (event) => setDate(event.target.value)
    const doctorOnChange = (event) => setDoctor(event.target.value)
    const patientOnChange = (event) => setPatient(event.target.value)
    const appointmentTypeOnChange = (event) => setAppointmentType(event.target.value)
    const specialtyOnChange = (event) => {
        setSpecialty(event.target.value)
        getDoctorsMiddleware(event.target.value, turn)
    }
    const turnOnChange = (event) => {
        setTurn(event.target.value)
        getDoctorsMiddleware(specialty, event.target.value)
    }

    const getDoctorsMiddleware = async (specialty, turn) =>{
        setDoctorLoading(true)
        const doctorsResult = await getDoctors(localStorage.getItem("user_token"), specialty, turn)
        if (doctorsResult.length){
            if (!doctor) setDoctor(await doctorsResult[0].id)
            setDoctorLoading(false)
            setDoctorPool(await doctorsResult.map((doctor) =>{
                return {
                    id : doctor.id,
                    name : `${doctor.name} ${doctor.last_name} - ${doctor.ci}`
                }
            }))
        }
        else{
            setDoctorLoading(false)
            setDoctor(null)
            setDoctorPool([])
        }
    }

    const [result, setResult] = useState({})
    const {push} = useRouter()

    useEffect(()=>async ()=>{
        const appointmentResult = await getAppointment(localStorage.getItem("user_token"), id)
        if (!appointmentResult.message){
            setAppointmentLoading(false)
            setDate(extractDate(await appointmentResult.appointment_date))
            setDoctor(await appointmentResult.doctor)
            setPatient(await appointmentResult.patient)
            setAppointmentType(await appointmentResult.appointment_type)
            setSpecialty(await appointmentResult.specialty)
            setTurn(await appointmentResult.turn)
            getDoctorsMiddleware(appointmentResult.specialty, appointmentResult.turn)
        }
        const patientsResult = await getPatients(localStorage.getItem("user_token"))
        if (patientsResult.length){
            setPatientLoading(false)
            setPatientPool(await patientsResult.map((patient) =>{
                return {
                    id : patient.id,
                    name : `${patient.name} ${patient.last_name} - ${patient.ci}`
                }
            }))
        }
        const appointmentTypesResult = await getAppointmentTypes(localStorage.getItem("user_token"))
        if (appointmentTypesResult.length){
            setAppointmentTypeLoading(false)
            setAppointmentTypePool(await appointmentTypesResult)
        }
        const specialtiesResult = await getSpecialties(localStorage.getItem("user_token"))
        if (specialtiesResult.length){
            setSpecialtyLoading(false)
            setSpecialtyPool(await specialtiesResult)
        }
        const turnsResult = await getTurns(localStorage.getItem("user_token"))
        if (turnsResult.length){
            setTurnLoading(false)
            setTurnPool(await turnsResult)
        }
    },[])

    useEffect(()=>{
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
                Editar Cita
            </h1>

            <div
                className="flex flex-col"
            >
                <DateInput
                    placeholder={"Fecha"}
                    defaultValue={date}
                    onChange={dateOnChange}
                    loading={appointmentLoading}
                />                
            </div>

            <div
                className="flex flex-col gap-6"
            >
                <SelectInput
                    placeholder={"Especialidad"}
                    idSufix={"specialty"}
                    loading={specialtyLoading}
                    defaultValue={specialty}
                    options={specialtyPool}
                    onChange={specialtyOnChange}
                />
                <SelectInput
                    placeholder={"Turno"}
                    idSufix={"turn"}
                    loading={turnLoading}
                    defaultValue={turn}
                    options={turnPool}
                    onChange={turnOnChange}
                />
                {(doctorPool) 
                    ? 
                        <SelectInput
                            placeholder={"Doctor"}
                            idSufix={"doctor"}
                            loading={doctorLoading}
                            defaultValue={doctor}
                            options={doctorPool}
                            onChange={doctorOnChange}
                        />
                    :
                        <p>No hay doctores disponibles segun esas especificaciones</p>
                }
                
                
            </div>

            <div
                className="flex flex-col gap-6"
            >
                <SelectInput
                    placeholder={"Paciente"}
                    idSufix={"patient"}
                    loading={patientLoading}
                    defaultValue={patient}
                    options={patientPool}
                    onChange={patientOnChange}
                />
                <SelectInput
                    placeholder={"Tipo de Cita"}
                    idSufix={"appointment_type"}
                    loading={appointmentTypeLoading}
                    defaultValue={appointmentType}
                    options={appointmentTypePool}
                    onChange={appointmentTypeOnChange}
                />
            </div>

            <p>{result.message}</p>

            <div
                className="flex gap-2"
            >
                <EditButton
                    createParams={{
                        id,
                        date,
                        doctor,
                        patient,
                        appointmentType,
                        specialty,
                        turn
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
        const nonVoidFields = createParams.date && createParams.doctor != null && createParams.patient != null && createParams.appointmentType != null && createParams.specialty >= 0 && createParams.turn >= 0 
        if (nonVoidFields){
            const updatePatientsReq = await updateAppointments(createParams.id, localStorage.getItem("user_token"), createParams.date, parseInt(createParams.doctor), parseInt(createParams.patient), parseInt(createParams.appointmentType), parseInt(createParams.specialty), parseInt(createParams.turn))
            
            if (!updatePatientsReq.message) setResult({ok: "Ok"})
            else setResult(updatePatientsReq)
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
        const deletePatientsReq = await deleteVerified(`https://ipasme-am-backend.onrender.com/api/appointments/${id}`, localStorage.getItem("user_token"))

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

const getAppointment = async (token, id) =>{
    let appointment = []

    do{
        appointment = await getVerified(`https://ipasme-am-backend.onrender.com/api/appointments/${id}`, token)
    }while(appointment.message === 'Something Goes Wrong')

    return appointment
}

const getDoctors = async (token, specialty, turn) =>{
    let doctors = []

    do{
        doctors = await getVerified(`https://ipasme-am-backend.onrender.com/api/users/doctors/${specialty}/${turn}`, token)
    }while(doctors.message === 'Something Goes Wrong')

    return doctors
}

const getPatients = async (token) =>{
    let patients = []

    do{
        patients = await getVerified(`https://ipasme-am-backend.onrender.com/api/patients`, token)
    }while(patients.message === 'Something Goes Wrong')
    
    return patients
}

const getAppointmentTypes= async (token) =>{
    let appointmentTypes = []

    do{
        appointmentTypes = await getVerified(`https://ipasme-am-backend.onrender.com/api/appointment_type`, token)
    }while(appointmentTypes.message === 'Something Goes Wrong')
    
    return appointmentTypes
}

const getSpecialties = async (token) =>{
    let specialties = []

    do{
        specialties = await getVerified(`https://ipasme-am-backend.onrender.com/api/specialty`, token)
    }while(specialties.message === 'Something Goes Wrong')
    
    return specialties
}

const getTurns = async (token) =>{
    let turns = []

    do{
        turns = await getVerified(`https://ipasme-am-backend.onrender.com/api/turn`, token)
    }while(turns.message === 'Something Goes Wrong')
    
    return turns
}