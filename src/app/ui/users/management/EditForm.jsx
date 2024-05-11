"use client"

import { useEffect, useState } from "react"
import { DateInput } from "../../DateInput"
import { PrimaryButton } from "../../PrimaryButton"
import { SelectInput } from "../../SelectInput"
import { TextInput } from "../../TextInput"
import { useRouter } from "next/navigation"
import { getVerified } from "@/app/requests/getVerified"
import { extractDate } from "@/app/libs/utils"
import { updateUser } from "@/app/requests/updateUser"
import { DangerButton } from "../../DangerButton"
import { deleteVerified} from "@/app/requests/deleteVerified"
import Image from "next/image"

export const EditForm = ({id})=>{
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [gender, setGender] = useState(0)
    const [userType, setUserType] = useState(0)
    const [specialty, setSpecialty] = useState(0)
    const [turn, setTurn] = useState(0)

    const [gendersPool, setGendersPool] = useState([])
    const [userTypesPool, setUserTypesPool] = useState([])
    const [turnsPool, setTurnsPool] = useState([])
    const [specialtiesPool, setSpecialtiesPool] = useState([])

    const [userLoading, setUserLoading] = useState(true)
    const [gendersLoading, setGendersLoading] = useState(true)
    const [userTypesLoading, setUserTypesLoading] = useState(true)
    const [specialtiesLoading, setSpecialtiesLoading] = useState(true)
    const [turnsLoading, setTurnsLoading] = useState(true)

    const nameOnChange = (event) => setName(event.target.value)
    const lastNameOnChange = (event) => setLastName(event.target.value)
    const birthdateOnChange = (event) => setBirthdate(event.target.value)
    const genderOnChange = (event) => setGender(event.target.value)
    const userTypeOnChange = (event) => setUserType(event.target.value)
    const specialtyOnChange = (event) => setSpecialty(event.target.value)
    const turnOnChange = (event) => setTurn(event.target.value)

    const [result, setResult] = useState({})
    const {push} = useRouter()

    useEffect(()=>async()=>{
        if (id){
            const userResult = await getUser(localStorage.getItem("user_token"), id)
            if (!userResult.message){
                setUserLoading(false)
                setName(await userResult.name)
                setLastName(await userResult.lastName)
                setBirthdate(extractDate(await userResult.birthdate))
                setGender(await userResult.gender)
                setUserType(await userResult.userType)
                setSpecialty(await userResult.specialty)
                setTurn(await userResult.turn)
            }

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
        }
    }, [id])

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
                Editar Usuario
            </h1>

            <div
                className="flex flex-col gap-6"
            >
                <TextInput
                    placeholder={"Nombre"}
                    defaultValue={name}
                    loading={userLoading}
                    onChange={nameOnChange}
                />
                <TextInput
                    placeholder={"Apellido"}
                    defaultValue={lastName}
                    loading={userLoading}
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
                    loading={userLoading}
                    onChange={birthdateOnChange}
                />
                <SelectInput
                    placeholder={"Genero"}
                    idSufix={"gender"}
                    defaultValue={gender}
                    options={gendersPool}
                    loading={gendersLoading}
                    onChange={genderOnChange}
                />
            </div>

            <div
                className="flex flex-col gap-6"
            >
                <SelectInput
                    placeholder={"Tipo de Usuario"}
                    idSufix={"user-type"}
                    defaultValue={userType}
                    options={userTypesPool}
                    loading={userTypesLoading}
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
                <EditButton
                    createParams={{
                        id,
                        name,
                        lastName,
                        birthdate,
                        gender,
                        userType,
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
        
        const nonVoidFields = createParams.name && createParams.lastName && createParams.birthdate && createParams.gender != null && createParams.userType != null && createParams.specialty != null && createParams.turn != null
        if (nonVoidFields){
            const updateUserReq = await updateUser(createParams.id, localStorage.getItem("user_token"), createParams.name, createParams.lastName, createParams.birthdate, createParams.gender, createParams.userType, createParams.specialty, createParams.turn)
            
            if (!updateUserReq.message) setResult({ok: "Ok"})
            else setResult(updateUserReq)
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
        const deleteUserReq = await deleteVerified(`http://localhost:4000/api/users/${id}`, localStorage.getItem("user_token"))

        if (!deleteUserReq.message) setResult({ok: "Ok"})
        else setResult(deleteUserReq)

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

const getUser = async (token, id) =>{
    let users = []

    do{
        users = await getVerified(`http://localhost:4000/api/users/${id}`, token)
    }while(users.message === 'Something Goes Wrong')
    
    return users
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