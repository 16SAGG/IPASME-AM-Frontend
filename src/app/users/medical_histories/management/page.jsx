import { PrimaryLink } from "@/app/ui/PrimaryLink";
import { SearchPatients } from "@/app/ui/patients/management/SearchPatients";
import { MedicalHistoriesList } from "@/app/ui/medical_histories/management/MedicalHistoriesList";


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
                    <PrimaryLink
                        content={"Crear Nuevo Historial Medico"}
                        href={`/users/medical_histories/management/create`}
                    />
                </div>
                <MedicalHistoriesList/>
            </div>
        </main>
    )
}