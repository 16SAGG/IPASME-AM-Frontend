"use client"

import { getVerified } from "@/app/requests/getVerified"
import { useManagementStore } from "@/app/store/users/management/management.store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const UsersList = () =>{
    const [usersPool, setUsersPool] = useState([])
    const [users, setUsers] = useState([])

    const [usersLoading, setUsersLoading] = useState(true)

    const search = useManagementStore(state => state.search)

    useEffect(()=>async()=>{
        const result = await getUsers(localStorage.getItem("user_token"))
        if (result.length){
            setUsersLoading(false)
            setUsersPool(await result)
            setUsers(await result)
        }
    }, [])

    useEffect(()=>{
        if (!search) setUsers(usersPool)
        else setUsers(users.filter(user => user.email.includes(search)))
    }, [search])

    return(
        <ul
            className="flex flex-col gap-3"
        >
            {
                (!usersLoading) ?
                    users.map((user)=>
                        <UserItem
                            id={user.id}
                            email={user.email}
                            key={user.id}
                        />
                    )
                :
                    ["", "", "", "", ""].map((item, _index) =>
                        <SkeletonUserItem
                            key={_index}
                        />
                    )
            }
        </ul>
    )
}

const UserItem = ({id, email}) =>{
    return(
        <li>
            <Link
                href={`/users/management/${id}`}
                className="flex items-center gap-1 border border-complementary rounded-xl px-6 py-3"
            >
                <p
                    className="grow text-left"
                >
                    {email}
                </p>
                <Image
                    src={"/icons/arrow-icon.svg"}
                    width={20}
                    height={20}    
                    alt="Flecha decorativa"
                    className="complementary-color-filter -rotate-90"
                />
            </Link>
        </li>
    )
}

const SkeletonUserItem = () =>{
    return(
        <li
            className="border border-complementary bg-complementary rounded-xl h-[54px] animate-pulse"
        >
        </li>
    )
}

const getUsers = async (token) =>{
    let users = []

    do{
        users = await getVerified(`https://ipasme-am-backend.onrender.com/api/users`, token)
    }while(users.message)
    
    return users
}