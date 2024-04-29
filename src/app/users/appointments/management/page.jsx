import { PrimaryLink } from "@/app/ui/PrimaryLink";
import { AppointmentsList } from "@/app/ui/appointments/management/AppointmentsList";
import { SearchAppointments } from "@/app/ui/appointments/management/SearchAppointments";

export default function AppointmentsManagementPage (){
    return(
        <main
            className="flex flex-col gap-12"
        >
            <h1
                className="text-4xl font-semibold text-center"
            >
                Citas
            </h1>
            <div
                className="flex flex-col gap-6"
            >
                <div
                    className="flex flex-col gap-3"
                >
                    <SearchAppointments/>
                    <PrimaryLink
                        content={"Crear Nueva Cita"}
                        href={`/users/appointments/management/create`}
                    />
                </div>
                <AppointmentsList/>
            </div>
        </main>
    )
}