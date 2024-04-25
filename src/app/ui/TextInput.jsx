'use client'
import clsx from "clsx"

export const TextInput = ({id, placeholder, isPassword, defaultValue, loading = false, onChange = ()=>{}}) =>{
    return(
        <input
            id={id}
            type={clsx("", {
                "password" : isPassword,
                "text" : !isPassword
            })}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled = {loading}
            className={clsx("border border-complementary rounded-xl px-6 py-3", {
                "bg-complementary animate-pulse" : loading
            })}
            onChange={(event) => onChange(event)}
        />
    )
}