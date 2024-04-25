import { DropdownDatesPatientsSeen } from "@/app/ui/users/statistics/DropdownDatesPatientsSeen";
import { SpecialtiesStatistics } from "@/app/ui/users/statistics/SpecialtiesStatistics";
import { StatisticsTitle } from "@/app/ui/users/statistics/StatisticsTitle";

export default function StatisticsPage (){
    return(
        <main
            className="flex flex-col gap-12"
        >
            <StatisticsTitle/>
            <div
                className="flex flex-col gap-3"
            >
                <DropdownDatesPatientsSeen
                />
                <SpecialtiesStatistics/>
            </div>
        </main>
    )
}

