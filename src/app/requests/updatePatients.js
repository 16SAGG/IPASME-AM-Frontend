export const updatePatients = async (id, token, name, lastName, birthdate, gender, email, phone, address) =>{    
    try {
        const response = await fetch(`https://ipasme-am-backend.onrender.com/api/patients/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ name, "last_name": lastName, birthdate, gender, email, phone, address }),
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