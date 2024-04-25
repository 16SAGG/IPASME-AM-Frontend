export const login = async (email, password) =>{
    try {
        const response = await fetch('https://ipasme-am-backend.onrender.com/api/auth/sign_in', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
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