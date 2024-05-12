import { PrimaryLink } from "@/app/ui/PrimaryLink";
import { AppointmentsList } from "@/app/ui/appointments/management/AppointmentsList";
import { NewAppointment } from "@/app/ui/appointments/management/NewAppointment";
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
                    <NewAppointment/>
                </div>
                <AppointmentsList/>
            </div>
        </main>
    )
}