import { PatientMedicalHistory } from "@/app/ui/medical_histories/management/patient/[id]/PatientMedicalHistory";

export default function MedicalHistoriesAppointmentPage ({params}){
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
                <PatientMedicalHistory id={params.id}/>
            </div>
        </main>
    )
}