export const updateUser = async (id, token, name, lastName, birthdate, gender, userType, specialty, turn) =>{    
    try {
        const response = await fetch(`https://ipasme-am-backend.onrender.com/api/users/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ name, "last_name": lastName, birthdate, gender, "user_type": userType, specialty, turn }),
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