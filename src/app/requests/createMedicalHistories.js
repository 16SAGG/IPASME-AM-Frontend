export const createMedicalHistories = async (token, appointment, description) =>{
    try {
        const response = await fetch('http://localhost:4000/api/medical_histories', {
            method: 'POST',
            body: JSON.stringify({ appointment, description }),
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