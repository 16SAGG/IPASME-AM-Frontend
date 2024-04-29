"use client"

import { Search } from "@/app/ui/Search";
import { useManagementStore } from "@/app/store/users/management/management.store";

export const SearchUsers = ()=> {
    const setSearch = useManagementStore(state => state.setSearch)
    
    return(
        <Search
            setSearch={setSearch}
        />
    )
}