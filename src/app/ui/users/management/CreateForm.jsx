"use client"

import { useEffect, useState } from "react"
import { DateInput } from "../../DateInput"
import { PrimaryButton } from "../../PrimaryButton"
import { SelectInput } from "../../SelectInput"
import { TextInput } from "../../TextInput"
import { signup } from "@/app/requests/signup"
import { useRouter } from "next/navigation"
import { getVerified } from "@/app/requests/getVerified"

export const CreateForm = ()=>{
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [ci, setCi] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [gender, setGender] = useState(0)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [userType, setUserType] = useState(0)
    const [specialty, setSpecialty] = useState(0)
    const [turn, setTurn] = useState(0)

    const [gendersPool, setGendersPool] = useState([])
    const [userTypesPool, setUserTypesPool] = useState([])
    const [turnsPool, setTurnsPool] = useState([])
    const [specialtiesPool, setSpecialtiesPool] = useState([])

    const [gendersLoading, setGendersLoading] = useState(true)
    const [userTypesLoading, setUserTypesLoading] = useState(true)
    const [specialtiesLoading, setSpecialtiesLoading] = useState(true)
    const [turnsLoading, setTurnsLoading] = useState(true)

    const nameOnChange = (event) => setName(event.target.value)
    const lastNameOnChange = (event) => setLastName(event.target.value)
    const ciOnChange = (event) => setCi(event.target.value)
    const birthdateOnChange = (event) => setBirthdate(event.target.value)
    const genderOnChange = (event) => setGender(event.target.value)
    const emailOnChange = (event) => setEmail(event.target.value)
    const passwordOnChange = (event) => setPassword(event.target.value)
    const passwordConfirmOnChange = (event) => setPasswordConfirm(event.target.value)
    const userTypeOnChange = (event) => setUserType(event.target.value)
    const specialtyOnChange = (event) => setSpecialty(event.target.value)
    const turnOnChange = (event) => setTurn(event.target.value)

    const [result, setResult] = useState({})
    const {push} = useRouter()

    useEffect(()=>async ()=>{
        const gendersResult = await getGenders(localStorage.getItem("user_token"))
        if (gendersResult.length){
            setGendersLoading(false)
            setGendersPool(await gendersResult)
        }
        const userTypesResult = await getUserTypes(localStorage.getItem("user_token"))
        if (userTypesResult.length){
            setUserTypesLoading(false)
            setUserTypesPool(await userTypesResult)
        }
        const specialtiesResult = await getSpecialties(localStorage.getItem("user_token"))
        if (specialtiesResult.length){
            setSpecialtiesLoading(false)
            setSpecialtiesPool(await specialtiesResult)
        }
        const turnsResult = await getTurns(localStorage.getItem("user_token"))
        if (turnsResult.length){
            setTurnsLoading(false)
            setTurnsPool(await turnsResult)
        }
    },[])

    useEffect(()=>{
        if (result.ok){
            push('/users/management')
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
                Crear Usuario
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
                    isPassword={true}
                    placeholder={"Contraseña"}
                    defaultValue={password}
                    onChange={passwordOnChange}
                /> 
                <TextInput
                    isPassword={true}
                    placeholder={"Confirmar contraseña"}
                    defaultValue={passwordConfirm}
                    onChange={passwordConfirmOnChange}
                />
            </div>

            <div
                className="flex flex-col gap-6"
            >
                <SelectInput
                    placeholder={"Tipo de Usuario"}
                    idSufix={"user-type"}
                    defaultValue={userType}
                    loading={userTypesLoading}
                    options={userTypesPool}
                    onChange={userTypeOnChange}
                />
                <SelectInput
                    placeholder={"Especialidad"}
                    idSufix={"user-specialty"}
                    defaultValue={specialty}
                    options={specialtiesPool}
                    loading={specialtiesLoading}
                    onChange={specialtyOnChange}
                />
                <SelectInput
                    placeholder={"Turno"}
                    idSufix={"user-turn"}
                    defaultValue={turn}
                    options={turnsPool}
                    loading={turnsLoading}
                    onChange={turnOnChange}
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
                        password,
                        passwordConfirm,
                        userType,
                        specialty,
                        turn
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
        
        const nonVoidFields = createParams.name && createParams.lastName && createParams.ci && createParams.birthdate && createParams.gender != null && createParams.email && createParams.password && createParams.userType != null && createParams.specialty != null && createParams.turn != null
        const passwordAndPasswordConfirmMatch = createParams.password.includes(createParams.passwordConfirm)
        
        if (nonVoidFields & passwordAndPasswordConfirmMatch){
            const signupReq = await signup(createParams.name, createParams.lastName, createParams.ci, createParams.birthdate, createParams.gender, createParams.email, createParams.password, createParams.userType, createParams.specialty, createParams.turn)
                
            if (!signupReq.message) setResult({ok:  "Ok"})
            else setResult(signupReq)
        }else{
            if (!nonVoidFields) setResult({message: "Todos los campos son obligatorios"})
            if (!passwordAndPasswordConfirmMatch) setResult({message: "La contraseña no es igual a su confirmacion"})
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
        genders = await getVerified(`http://localhost:4000/api/gender`, token)
    }while(genders.message === 'Something Goes Wrong')

    return genders
}

const getUserTypes = async (token) =>{
    let userTypes = []

    do{
        userTypes = await getVerified(`http://localhost:4000/api/user_type`, token)
    }while(userTypes.message === 'Something Goes Wrong')

    return userTypes
}

const getSpecialties = async (token) =>{
    let specialties = []

    do{
        specialties = await getVerified(`http://localhost:4000/api/specialty`, token)
    }while(specialties.message === 'Something Goes Wrong')

    return specialties
}

const getTurns = async (token) =>{
    let turns = []

    do{
        turns = await getVerified(`http://localhost:4000/api/turn`, token)
    }while(turns.message === 'Something Goes Wrong')

    return turns
}