"use client"

import { useEffect, useState } from "react"
import { DateInput } from "../../DateInput"
import { PrimaryButton } from "../../PrimaryButton"
import { SelectInput } from "../../SelectInput"
import { TextInput } from "../../TextInput"
import { useRouter } from "next/navigation"
import { getVerified } from "@/app/requests/getVerified"
import { createPatients } from "@/app/requests/createPatients"

export const CreateForm = ()=>{
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [ci, setCi] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [gender, setGender] = useState(0)
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const [gendersPool, setGendersPool] = useState([])

    const [gendersLoading, setGendersLoading] = useState(true)

    const nameOnChange = (event) => setName(event.target.value)
    const lastNameOnChange = (event) => setLastName(event.target.value)
    const ciOnChange = (event) => setCi(event.target.value)
    const birthdateOnChange = (event) => setBirthdate(event.target.value)
    const genderOnChange = (event) => setGender(event.target.value)
    const emailOnChange = (event) => setEmail(event.target.value)
    const phoneOnChange = (event) => setPhone(event.target.value)
    const addressOnChange = (event) => setAddress(event.target.value)

    const [result, setResult] = useState({})
    const {push} = useRouter()

    useEffect(()=>async ()=>{
        const gendersResult = await getGenders(localStorage.getItem("user_token"))
        if (gendersResult.length){
            setGendersLoading(false)
            setGendersPool(await gendersResult)
        }
    },[])

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
                <TextInput
                    placeholder={"Cedula"}
                    defaultValue={ci}
                    onChange={ciOnChange}
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
                <CreateButton
                    createParams={{
                        name,
                        lastName,
                        ci,
                        birthdate,
                        gender,
                        email,
                        phone,
                        address
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
        
        const nonVoidFields = createParams.name && createParams.lastName && createParams.ci && createParams.birthdate && createParams.gender != null && createParams.email && createParams.address && createParams.phone
        
        if (nonVoidFields){
            const createPatientReq= await createPatients(localStorage.getItem("user_token"), createParams.name, createParams.lastName, createParams.ci, createParams.birthdate, createParams.gender, createParams.email, createParams.phone, createParams.address)
                
            if (!createPatientReq.message) setResult({ok:  "Ok"})
            else setResult(createPatientReq)
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

const getGenders = async (token) =>{
    let genders = []

    do{
        genders = await getVerified(`https://ipasme-am-backend.onrender.com/api/gender`, token)
    }while(genders.message === 'Something Goes Wrong')

    return genders
}