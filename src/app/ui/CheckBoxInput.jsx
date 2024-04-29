'use client'
import clsx from "clsx"

export const CheckBoxInput = ({ idSufix, placeholder, defaultValue, loading = false, onChange = ()=>{}}) =>{
    return(
        <div
            className={clsx("flex border border-complementary rounded-xl px-6 py-3", {
                "bg-complementary animate-pulse h-[54px]" : loading
            })}
        >   
            <label
                htmlFor={`check-box-${idSufix}`}
                className={clsx("grow",{
                    "hidden" : loading
                })}
            >
                {placeholder}
            </label>
            <input
                id={`check-box-${idSufix}`}
                type="checkbox"
                defaultValue={defaultValue}
                disabled = {loading}
                className={clsx("",{
                    "hidden" : loading
                })}
                
                onChange={(event) => onChange(event)}
            />
        </div>
    )
}