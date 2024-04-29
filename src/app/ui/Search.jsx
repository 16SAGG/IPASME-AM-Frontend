"use client"

import { TextInput } from "./TextInput"

export const Search = ({setSearch}) =>{
    const searchOnChange = (event) =>{setSearch(event.target.value)}
    return(
        <TextInput
            placeholder={"Buscar..."}
            onChange={searchOnChange}
        />
    )
}
