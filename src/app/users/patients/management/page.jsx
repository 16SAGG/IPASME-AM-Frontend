import { PrimaryLink } from "@/app/ui/PrimaryLink";
import { SearchPatients } from "@/app/ui/patients/management/SearchPatients";
import { PatientsList } from "@/app/ui/patients/management/PatientsList";


export default function PatientsManagementPage (){
    return(
        <main
            className="flex flex-col gap-12"
        >
            <h1
                className="text-4xl font-semibold text-center"
            >
                Pacientes
            </h1>
            <div
                className="flex flex-col gap-6"
            >
                <div
                    className="flex flex-col gap-3"
                >
                    <SearchPatients/>
                    <PrimaryLink
                        content={"Crear Nuevo Paciente"}
                        href={`/users/patients/management/create`}
                    />
                </div>
                <PatientsList/>
            </div>
        </main>
    )
}