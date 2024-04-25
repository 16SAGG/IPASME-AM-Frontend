'use client'

import { login } from "@/app/requests/login"
import { IpasmeLogo } from "../IpasmeLogo"
import { PrimaryButton } from "../PrimaryButton"
import { TextInput } from "../TextInput"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export const LoginForm = ()=>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [result, setResult] = useState({})
    const [loading, setLoading] = useState(false)
    const {push} = useRouter()

    useEffect(()=>{
        if (result.message) setLoading(false)
        if (result.token){
            localStorage.setItem("user_token", result.token)
            localStorage.setItem("user_id", result.id)
            localStorage.setItem("user_name", result.name)
            localStorage.setItem("user_last_name", result.last_name)
            localStorage.setItem("user_ci", result.ci)
            localStorage.setItem("user_email", result.email)
            localStorage.setItem("user_type", result.user_type)
            localStorage.setItem("user_specialty", result.specialty)
            localStorage.setItem("user_turn", result.turn)
            localStorage.setItem("user_birthdate", result.birthdate)
            localStorage.setItem("user_gender", result.gender)

            push('/users/statistics')
        }
    }, [result])


    const onClickHandle = async()=>{
        setLoading(true)
        setResult(await login(email, password))
    }

    const passwordOnChange = (event)=>{setPassword(event.target.value)}
    const emailOnChange = (event)=>{setEmail(event.target.value)}

    return(
        <form
            className='flex flex-col gap-24'
            onSubmit={(event)=> event.preventDefault()}
        >
            <div
                className="flex justify-center"
            >
                <IpasmeLogo/>
            </div>

            <div
                className="flex flex-col gap-6"
            >
                <div
                    className="flex flex-col gap-2"
                >
                    <h1
                        className="text-4xl font-semibold text-center"
                    >
                        Inicio de Sesión
                    </h1>
                    <p
                        className="text-center"
                    >
                        Introduzca sus datos
                    </p>
                </div>

                <div
                    className="flex flex-col gap-2"
                >
                    <TextInput
                        id={"sign-in-email"}
                        placeholder={"Correo"}
                        onChange={emailOnChange}
                    />
                    <TextInput
                        id={"sign-in-password"}
                        placeholder={"Contraseña"}
                        isPassword={true}
                        onChange={passwordOnChange}
                    />
                </div>
            </div>

            <p>{result.message}</p>

            <PrimaryButton
                onClick={()=> onClickHandle()}
                content={"Iniciar"}
                loading={loading}
            />
        </form>
    )
}