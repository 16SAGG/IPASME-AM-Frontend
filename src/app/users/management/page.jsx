import { PrimaryLink } from "@/app/ui/PrimaryLink";
import { Search } from "@/app/ui/users/management/Search";
import { UsersList } from "../../ui/users/management/UsersList";


export default function ManagementPage (){
    return(
        <main
            className="flex flex-col gap-12"
        >
            <h1
                className="text-4xl font-semibold text-center"
            >
                Usuario
            </h1>
            <div
                className="flex flex-col gap-6"
            >
                <div
                    className="flex flex-col gap-3"
                >
                    <Search/>
                    <PrimaryLink
                        content={"Crear Nuevo Usuario"}
                        href={`/users/management/create`}
                    />
                </div>
                <UsersList/>
            </div>
        </main>
    )
}