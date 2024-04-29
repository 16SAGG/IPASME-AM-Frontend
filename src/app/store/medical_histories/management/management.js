import { create } from "zustand";

export const useManagementStore = create((set)=>({
    search : "",
    setSearch: (search) =>{
        set({search})
    }
}))