"use client"

import clsx from "clsx"

export const TextArea = ({placeholder, defaultValue, loading = false, onChange = ()=>{}}) =>{
    return(
        <textarea
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled = {loading}
            className={clsx("border border-complementary rounded-xl px-6 py-3 h-48", {
                "bg-complementary animate-pulse" : loading
            })}
            cols={10}
            onChange={(event) => onChange(event)}
        />
    )
}