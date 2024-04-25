"use client"

import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
    {
        icon : "/icons/statistics-icon.svg",
        name : "Estadísticas",
        href : "/users/statistics"
    },
    {
        icon : "/icons/users-icon.svg",
        name : "Usuarios",
        href : "/users/management"
    },
]

export const NavBar = ()=>{
    return(
        <nav
            className="flex fixed bottom-0 left-0 min-h-16 w-full bg-primary z-10 md:top-0 md:bottom-auto"
        >
            {links.map((link) =>
                <NavBarAnchor
                    icon={link.icon}
                    name={link.name}
                    href={link.href}
                    key={link.href}
                />
            )}
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
                    "text-secondary" : pathName.includes(href),
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
                    "terciary-color-filter" : !pathName.includes(href),
                })}
            />
        </Link>
    )
}