import { create } from "zustand";

export const useStatisticsStore = create((set)=>({
    datesPatientsSeen : {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    },
    setDatesPatientsSeen: (datesPatientsSeen) =>{
        set({datesPatientsSeen})
    }
}))