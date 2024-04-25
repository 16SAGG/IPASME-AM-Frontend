'use client'
import clsx from "clsx"

export const DangerButton = ({content, onClick, loading}) =>{
    return(
        <button
            disabled = {loading}
            onClick={onClick}
            className={clsx("flex justify-center max-w-28 rounded-xl px-6 py-3 text-secondary font-bold w-full", {
                "bg-danger": !loading,
                "bg-complementary": loading
            })}
        >
            {content}
        </button>
    )
}