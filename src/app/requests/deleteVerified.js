export const deleteVerified = async (url, token) =>{
    try {
        const response = await fetch(url, {
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