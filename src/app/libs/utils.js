export const NonRepeatArray = (prev_array = [])=>{
    return Array.from(new Set(prev_array))
}

export const getAge = (birthdate) =>{
    return new Date().getFullYear() - new Date(birthdate).getFullYear() 
}

export const extractDate = (date) =>{
    if (!date) return
    const regexDate = /(\d{4})-(\d{1,2})-(\d{1,2})/;
    const match = date.match(regexDate);
    
    return match[1] + "-" + match[2] + "-" + match[3]
}