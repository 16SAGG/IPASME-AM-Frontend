export const signup = async (name, lastName, ci, birthdate, gender, email, password, userType, specialty, turn) =>{    
    try {
        const response = await fetch('http://localhost:4000/api/auth/sign_up', {
            method: 'POST',
            body: JSON.stringify({ name, lastName, ci, birthdate, gender, email, password, userType, specialty, turn }),
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