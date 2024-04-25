import { DropdownDatesPatientsSeen } from "@/app/ui/users/statistics/DropdownDatesPatientsSeen";
import { SpecialtyStatistics } from "@/app/ui/users/statistics/id/SpecialtyStatistics";
import { Title } from "@/app/ui/users/statistics/id/Title";


export default function SpecialtiesStatisticsPage ({params}){
    return(
        <main
            className="flex flex-col gap-12"
        >
            <Title
                id={params.id}
            />
            <div
                className="flex flex-col gap-3"
            >
                <DropdownDatesPatientsSeen/>
                <SpecialtyStatistics id={params.id}/>
            </div>
        </main>
    )
}