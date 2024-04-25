import clsx from "clsx"

export const DateInput = ({placeholder, defaultValue, idSufix, loading=false, onChange = ()=>{}}) =>{
    return(
        <div
            className={clsx("flex flex-col gap-2 border border-complementary rounded-xl px-6 py-3",{
                "bg-complementary animate-pulse" : loading
            })}
        >
            <label
                htmlFor={`date-${idSufix}`}
                className="text-complementary"
            >
                {placeholder}
            </label>
            <div
                className="flex justify-center"
            >
                <input
                    id={`date-${idSufix}`}
                    type="date"
                    className={clsx("grow", {
                        "hidden": loading
                    })}
                    defaultValue={defaultValue}
                    onChange={(event) => onChange(event)}
                />
                <div
                    className={clsx("h-[30px]", {
                        "hidden": !loading
                    })}
                ></div>
            </div>
        </div>
    )
}