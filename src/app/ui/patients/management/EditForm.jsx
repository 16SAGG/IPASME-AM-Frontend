"use client"

import { useEffect, useState } from "react"
import { DateInput } from "../../DateInput"
import { PrimaryButton } from "../../PrimaryButton"
import { SelectInput } from "../../SelectInput"
import { TextInput } from "../../TextInput"
import { useRouter } from "next/navigation"
import { getVerified } from "@/app/requests/getVerified"
import { extractDate } from "@/app/libs/utils"
import { DangerButton } from "../../DangerButton"
import { deleteVerified } from "@/app/requests/deleteVerified"
import Image from "next/image"
import { updatePatients } from "@/app/requests/updatePatients"

export const EditForm = ({id})=>{
const [name, setName] = useState("")
const [lastName, setLastName] = useState("")
const [birthdate, setBirthdate] = useState("")
const [gender, setGender] = useState(0)
const [email, setEmail] = useState("")
const [phone, setPhone] = useState("")
const [address, setAddress] = useState("")

const [gendersPool, setGendersPool] = useState([])

const [patientsLoading, setPatientsLoading] = useState(true)
const [gendersLoading, setGendersLoading] = useState(true)

const nameOnChange = (event) => setName(event.target.value)
const lastNameOnChange = (event) => setLastName(event.target.value)
const birthdateOnChange = (event) => setBirthdate(event.target.value)
const genderOnChange = (event) => setGender(event.target.value)
const emailOnChange = (event) => setEmail(event.target.value)
const phoneOnChange = (event) => setPhone(event.target.value)
const addressOnChange = (event) => setAddress(event.target.value)

useEffect(()=>async()=>{
    if (id){
        const patientsResult = await getPatient(localStorage.getItem("user_token"), id)
        if (!patientsResult.message){
            setPatientsLoading(false)
            setName(await patientsResult.name)
            setLastName(await patientsResult.last_name)
            setBirthdate(extractDate(await patientsResult.birthdate))
            setGender(await patientsResult.gender)
            setEmail(await patientsResult.email)
            setPhone(await patientsResult.phone)
            setAddress(await patientsResult.address)
        }
        const gendersResult = await getGenders(localStorage.getItem("user_token"))
        if (gendersResult.length){
            setGendersLoading(false)
            setGendersPool(await gendersResult)
        }
    }
}, [id])

const [result, setResult] = useState({})
const {push} = useRouter()

useEffect(()=>{
    if (result.ok){
        push('/users/patients/management')
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
            Crear Paciente
        </h1>

        <div
            className="flex flex-col gap-6"
        >
            <TextInput
                placeholder={"Nombre"}
                defaultValue={name}
                onChange={nameOnChange}
            />
            <TextInput
                placeholder={"Apellido"}
                defaultValue={lastName}
                onChange={lastNameOnChange}
            />
        </div>

        <div
            className="flex flex-col gap-6"
        >
            <DateInput
                idSufix={"birthdate"}
                placeholder={"Fecha de Nacimiento"}
                defaultValue={birthdate}
                onChange={birthdateOnChange}
            />
            <SelectInput
                placeholder={"Genero"}
                idSufix={"gender"}
                loading={gendersLoading}
                defaultValue={gender}
                options={gendersPool}
                onChange={genderOnChange}
            />
        </div>

        <div
            className="flex flex-col"
        >
            <TextInput
                placeholder={"Correo"}
                defaultValue={email}
                onChange={emailOnChange}
            />
        </div>

        <div
            className="flex flex-col gap-6"
        >
            <TextInput
                placeholder={"Telefono"}
                defaultValue={phone}
                onChange={phoneOnChange}
            /> 
            <TextInput
                placeholder={"Ubicacion"}
                defaultValue={address}
                onChange={addressOnChange}
            />
        </div>

        <p>{result.message}</p>

        <div
            className="flex gap-2"
        >
            <EditButton
                createParams={{
                    id,
                    name,
                    lastName,
                    birthdate,
                    gender,
                    email,
                    phone,
                    address
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
        
        const nonVoidFields = createParams.name && createParams.lastName && createParams.birthdate && createParams.gender != null && createParams.phone && createParams.email && createParams.address
        if (nonVoidFields){
            const updatePatientsReq = await updatePatients(createParams.id, localStorage.getItem("user_token"), createParams.name, createParams.lastName, createParams.birthdate, createParams.gender, createParams.email, createParams.phone, createParams.address)
            
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
        const deletePatientsReq = await deleteVerified(`https://ipasme-am-backend.onrender.com/api/patients/${id}`, localStorage.getItem("user_token"))

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

const getPatient = async (token, id) =>{
    let patients = []

    do{
        patients = await getVerified(`https://ipasme-am-backend.onrender.com/api/patients/${id}`, token)
    }while(patients.message === 'Something Goes Wrong')

    return patients
}

const getGenders = async (token) =>{
let genders = []

do{
    genders = await getVerified(`https://ipasme-am-backend.onrender.com/api/gender`, token)
}while(genders.message === 'Something Goes Wrong')

return genders
}