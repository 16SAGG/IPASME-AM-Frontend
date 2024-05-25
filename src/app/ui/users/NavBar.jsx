"use client"

import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const linksPool = [
    {
        icon : "/icons/statistics-icon.svg",
        name : "Estadísticas",
        href : "/users/statistics",
        userType : ['0']
    },
    {
        icon : "/icons/users-icon.svg",
        name : "Usuarios",
        href : "/users/management",
        userType : ['0']
    },
    {
        icon : "/icons/medical-histories-icon.svg",
        name : "Historiales Medicos",
        href : "/users/medical_histories/management",
        userType : ['1', '2']
    },
    {
        icon : "/icons/patients-icon.svg",
        name : "Pacientes",
        href : "/users/patients/management",
        userType : ['2']
    },
    {
        icon : "/icons/appointments-icon.svg",
        name : "Citas",
        href : "/users/appointments/management",
        userType : ['1', '2']
    },
    {
        icon : "/icons/logout-icon.svg",
        name : "Salir",
        href : "/",
        userType : ['0', '1', '2']
    },
]

export const NavBar = ()=>{
    const [links, setLinks] = useState([])

    useEffect(()=>{
        setLinks(linksPool.map((link) =>{
            if (link.userType.includes(localStorage.getItem("user_type"))){
                return(
                    <NavBarAnchor
                        icon={link.icon}
                        name={link.name}
                        href={link.href}
                        key={link.href}
                    />
                )
            }
        }))
    }, [])
    
    return(
        <nav
            className="flex fixed bottom-0 left-0 min-h-16 w-full bg-primary z-10 md:top-0 md:bottom-auto"
        >
            {links}
        </nav>
    )
}

const NavBarAnchor = ({href, icon, name}) =>{
    const pathName = usePathname()
    return(
        <Link
            href={href}
            className="flex items-end gap-4 justify-center grow py-3"
        >
            <p
                className={clsx("hidden md:block",
                {
                    "text-secondary" : (pathName.includes(href) && href !== '/'),
                })}
            >
                {name}
            </p>
            <Image
                src={icon}
                width={40}
                height={40}
                alt={`Icono de ${name}`}
                className={clsx("md:hidden", {
                    "terciary-color-filter" : (!pathName.includes(href) || href === '/'),
                })}
            />
        </Link>
    )
}