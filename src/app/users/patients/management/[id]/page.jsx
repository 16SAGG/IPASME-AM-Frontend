import { EditForm } from "@/app/ui/patients/management/EditForm";

export default function EditPatientsPage ({params}){
    return(
        <main>
            <EditForm
                id={params.id}
            />
        </main>
    )
}