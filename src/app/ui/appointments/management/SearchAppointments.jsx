"use client"

import { Search } from "@/app/ui/Search";
import { useManagementStore } from "@/app/store/appointments/management/management.store";

export const SearchAppointments = ()=> {
    const setSearch = useManagementStore(state => state.setSearch)
    
    return(
        <Search
            setSearch={setSearch}
        />
    )
}