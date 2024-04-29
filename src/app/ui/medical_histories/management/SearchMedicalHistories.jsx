"use client"

import { Search } from "@/app/ui/Search";
import { useManagementStore } from "@/app/store/medical_histories/management/management.store";

export const SearchMedicalHistories = ()=> {
    const setSearch = useManagementStore(state => state.setSearch)
    
    return(
        <Search
            setSearch={setSearch}
        />
    )
}