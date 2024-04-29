import { EditForm } from "@/app/ui/appointments/management/EditForm";

export default function EditAppointmentPage ({params}){
    return(
        <main>
            <EditForm
                id={params.id}
            />
        </main>
    )
}