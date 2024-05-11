export const createPatients = async (token, name, lastName, ci, birthdate, gender, email, phone, address) =>{
    try {
        const response = await fetch('http://localhost:4000/api/patients', {
            method: 'POST',
            body: JSON.stringify({ name, lastName, ci, birthdate, gender, email, phone, address }),
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