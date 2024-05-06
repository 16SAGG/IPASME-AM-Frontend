import { CreateForm } from "@/app/ui/medical_histories/management/appointment/CreateForm";

export default function CreateMedicalHistory ({params}){
    return(
        <main>
            <CreateForm id={params.id}/>
        </main>
    )
}