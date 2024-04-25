export const signup = async (name, lastName, ci, birthdate, gender, email, password, userType, specialty, turn) =>{    
    try {
        const response = await fetch('https://ipasme-am-backend.onrender.com/api/auth/sign_up', {
            method: 'POST',
            body: JSON.stringify({ name, "last_name" : lastName, ci, birthdate, gender, email, password, "user_type" : userType, specialty, turn }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const data = await response.json()
        
        return await data
    }
    catch{
        return JSON.stringify({message: "Error"})
    }
}