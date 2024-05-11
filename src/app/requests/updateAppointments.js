export const updateAppointments = async (id, token, date, doctor, patient, appointmentType, specialty, turn) =>{    
    try {
        const response = await fetch(`http://localhost:4000/api/appointments/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ date, doctor, patient, appointmentType, specialty, turn}),
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