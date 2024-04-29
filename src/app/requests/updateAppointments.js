export const updateAppointments = async (id, token, date, doctor, patient, appointmentType, specialty, turn) =>{    
    try {
        const response = await fetch(`https://ipasme-am-backend.onrender.com/api/appointments/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ "appointment_date": date, doctor, patient, "appointment_type": appointmentType, specialty, turn}),
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
        })

        const data = await response.json()
        
        return await data
    }
    catch{
        return JSON.stringify({message: "Error"})
    }
}