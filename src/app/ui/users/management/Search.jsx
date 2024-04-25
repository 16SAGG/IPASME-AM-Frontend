"use client"

import { useManagementStore } from "@/app/store/users/management/management.store"
import { TextInput } from "../../TextInput"

export const Search = () =>{
    const setSearch = useManagementStore(state => state.setSearch)

    const searchOnChange = (event) =>{setSearch(event.target.value)}
    return(
        <TextInput
            placeholder={"Buscar..."}
            onChange={searchOnChange}
        />
    )
}
