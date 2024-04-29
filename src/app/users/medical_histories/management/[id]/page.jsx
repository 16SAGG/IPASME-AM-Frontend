import { EditForm } from "@/app/ui/medical_histories/management/EditForm";

export default function EditMedicalHistoriesPage ({params}){
    return(
        <main>
            <EditForm
                id={params.id}
            />
        </main>
    )
}