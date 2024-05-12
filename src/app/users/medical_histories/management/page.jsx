import { PrimaryLink } from "@/app/ui/PrimaryLink";
import { SearchPatients } from "@/app/ui/patients/management/SearchPatients";
import { MedicalHistoriesList } from "@/app/ui/medical_histories/management/MedicalHistoriesList";
import { NewMedicalHistory } from "@/app/ui/medical_histories/management/NewMedicalHistory";


export default function MedicalHistoriesManagementPage (){
    return(
        <main
            className="flex flex-col gap-12"
        >
            <h1
                className="text-4xl font-semibold text-center"
            >
                Historial Medico
            </h1>
            <div
                className="flex flex-col gap-6"
            >
                <div
                    className="flex flex-col gap-3"
                >
                    <SearchPatients/>
                    <NewMedicalHistory/>
                </div>
                <MedicalHistoriesList/>
            </div>
        </main>
    )
}