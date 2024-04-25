"use client"

import clsx from "clsx"

export const SelectInput = ({placeholder, options = [], loading = false, defaultValue, idSufix, onChange =()=>{}})=>{
    return(
        <div
            className={clsx("flex flex-col gap-2 border border-complementary rounded-xl px-6 py-3",
                {
                    "bg-complementary animate-pulse": loading
                }
            )}
        >
            <label
                htmlFor={`select-${idSufix}`}
                className="text-complementary"
            >
                {placeholder}
            </label>
            <div
                className="flex justify-center"
            >
                <select
                    id={`select-${idSufix}`}
                    className={clsx("grow", {
                        "hidden": loading
                    })}
                    onChange={(event) => onChange(event)}
                >
                    {options.map((option, index)=>
                        <Option
                            value={option.id}
                            content={option.name}
                            isDefault={index === defaultValue}
                            key={index}
                        />
                    )}
                </select>
                <div
                    className={clsx("h-[30px]", {
                        "hidden": !loading
                    })}
                ></div>
            </div>
        </div>
    )
}

const Option = ({value, content, isDefault})=>{
    return(
        (isDefault) ? 
            <option
                value={parseInt(value)}
                selected
            >
                {content}
            </option>
        :
            <option
                value={parseInt(value)}
            >
                {content}
            </option>
    )
}