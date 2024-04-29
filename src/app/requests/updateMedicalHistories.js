export const updateMedicalHistories = async (id, token, description) =>{    
    try {
        const response = await fetch(`https://ipasme-am-backend.onrender.com/api/medical_histories/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ description }),
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