export const createAppointment = async (token, date, doctor, patient, appointmentType, specialty, turn) =>{
    try {
        const response = await fetch('https://ipasme-am-backend.onrender.com/api/appointments', {
            method: 'POST',
            body: JSON.stringify({ "appointment_date" : date, doctor, patient, "appointment_type": appointmentType, specialty, turn }),
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