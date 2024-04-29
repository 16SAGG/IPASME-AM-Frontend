"use client"

import { Search } from "@/app/ui/Search";
import { useManagementStore } from "@/app/store/patients/management/management.store";

export const SearchPatients = ()=> {
    const setSearch = useManagementStore(state => state.setSearch)
    
    return(
        <Search
            setSearch={setSearch}
        />
    )
}