'use client'
import clsx from "clsx"

export const PrimaryButton = ({content, onClick, loading}) =>{
    return(
        <button
            disabled = {loading}
            onClick={onClick}
            className={clsx("grow rounded-xl px-6 py-3 text-secondary font-bold w-full", {
                "bg-primary": !loading,
                "bg-complementary": loading
            })}
        >
            {content}
        </button>
    )
}