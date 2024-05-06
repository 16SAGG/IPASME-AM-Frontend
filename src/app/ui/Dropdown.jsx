"use client"

import Image from "next/image"

export const Dropdown = ({description, elements, loading = false}) =>{
    return(
        <>
            {
                (!loading) ?
                    <div
                        className="h-40 grid grid-cols-1 grid-rows-1 dropdown"
                    >
                        {
                            (elements.length > 0) ?
                                <>
                                    <BackSide elements={elements}/>
                                    <FrontSide description={description}/>
                                </>
                            :
                                <NonElements/>
                        }
                        
                    </div>
                :
                    <div
                        className="h-40 order border-complementary bg-complementary rounded-xl animate-pulse"
                    >
                        
                    </div>
            }
        </>
    )
}

const NonElements = ({}) =>{
    return(
        <div
            className="flex items-center justify-center"
        >
            <p>No hay elementos disponibles</p>
        </div>
    )
}

const FrontSide = ({description = "Cargando..."}) =>{
    return(
        <div
            className="z-10 dropdown-cover flex items-center col-start-1 row-start-1 duration-500 bg-secondary border border-complementary rounded-xl"
        >
            <div
                className="flex flex-col gap-4"
            >
                <p
                    className="text-center sm:px-20"
                >
                    {description}
                </p>
                <div
                    className="flex justify-center"
                >
                    <Image
                        src="/icons/arrow-icon.svg"
                        width={20}
                        height={20}
                        alt="Flecha Decorativa"
                        className="dropdown-arrow complementary-color-filter"
                    />
                </div>
            </div>
        </div>
    )
}

const BackSide = ({elements}) =>{
    
    return(
        <div
            className="flex flex-col max-h-40 col-start-1 row-start-1 bg-primary rounded-xl px-3 pb-6 overflow-auto"
        >
            {
                elements.map((elemnt, index) =>
                    <button
                        className="text-left text-secondary py-2"
                        onClick={(elemnt.onClick) ? ()=>elemnt.onClick(index) : ()=>{}}
                        key={index}
                    >
                        {elemnt.description}
                    </button>
                )
            }
        </div>
    )
}