export const getVerified = async (url, token)=> {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "x-access-token": token,
            },
        })

        const data = await response.json()
        
        return await data
    }
    catch{
        return JSON.stringify({message: "Error"})
    }
}