export const updateUser = async (id, token, name, lastName, birthdate, gender, userType, specialty, turn) =>{    
    try {
        const response = await fetch(`http://localhost:4000/api/users/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ name, lastName, birthdate, gender, userType, specialty, turn }),
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