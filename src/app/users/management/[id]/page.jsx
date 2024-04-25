import { EditForm } from "@/app/ui/users/management/EditForm";

export default function EditUserPage ({params}){
    return(
        <main>
            <EditForm
                id={params.id}
            />
        </main>
    )
}