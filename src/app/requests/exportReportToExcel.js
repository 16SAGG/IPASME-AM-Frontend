export const exportReportToExcel = async (token) =>{
    try {
        const response = await fetch('http://localhost:4000/api/medical_histories/export', {
            method: 'GET',
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