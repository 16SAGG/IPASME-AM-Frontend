import Image from "next/image"

export const IpasmeLogo = ()=>{
    return(
        <Image 
            src="/ipasme-logo.svg"
            width={68}
            height={68}
            alt="IPASME logo"
        />
    )
}