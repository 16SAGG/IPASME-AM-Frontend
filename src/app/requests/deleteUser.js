export const deleteUser = async (id, token) =>{
    try {
        const response = await fetch(`https://ipasme-am-backend.onrender.com/api/users/${id}`, {
            method: 'DELETE',
            headers: {
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